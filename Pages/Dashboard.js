import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Alert, PermissionsAndroid, Pressable } from "react-native"
import { useState, useEffect } from "react";
import Schedule from "../Components/Schedule.json"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import SkeletonContent from 'react-native-skeleton-content';
import ipAddr from "../functions/ip_addr";
import registerNNPushToken from 'native-notify';
import { registerIndieID, unregisterIndieDevice } from 'native-notify';
import { giveCollegeLocation } from "../functions/insideLocations";
import timeToHour from "../functions/currentHour";
import Axios from "axios"
// import SkeletonContent from 'react-native-skeleton-content';



export default function DashBoard({ navigation }) {

    const [currentTime, setCurrentTime] = useState(new Date());
    var name, dept, year, roll;
    const [userDetails, setUserDetails] = useState({ name_n: "", dept_n: "" });
    const [userLoading, setUserLoading] = useState(true);
    const [sch, setSch] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    })
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        // console.log(currentTime.toLocaleTimeString())
        return () => clearInterval(interval);
    }, []);
    const currentDay = currentTime.getDay()
    useEffect(() => {
        async function fetch() {
            try {
                name = await AsyncStorage.getItem("name");
                dept = await AsyncStorage.getItem("dept");
                year = await AsyncStorage.getItem("year");
                roll = await AsyncStorage.getItem("roll");
                console.log(name, dept);
                setUserDetails((prev) => {
                    return {
                        name_n: name,
                        dept_n: dept,
                        year_n: year,
                        roll_n: roll
                    }
                })
                setUserLoading(false);
            } catch (err) {
                console.log("Error in Dashboard.js Fetching User details from async storage : ", err.message)
            }
        }
        fetch()
        async function fetchSchedule() {
            console.log("Started")
            try {
                var token_n = await AsyncStorage.getItem("token")
                var data = await Axios({
                    url: "http://" + ipAddr + ":3000/user/weeklySchedule",
                    method: "get",
                    params: {
                        token: token_n
                    }
                })
                //console.log("weekly schedule : ", data.data.schedule.thursday)

                var sorted_schedule = data.data;
                var currentHour = timeToHour(currentTime.getHours(), currentTime.getMinutes());
                console.log("Current hour : ", currentHour);

                Object.keys(sorted_schedule).forEach(day => {
                    sorted_schedule[day].sort((a, b) => a.hour - b.hour)
                    sorted_schedule[day] = sorted_schedule[day].filter((a) => a.hour >= 3)
                })

                setSch(sorted_schedule);
                // setLoading(false);
            } catch (err) {
                console.log("Error in getting weekly schedule : ", err.message)
            }
        }
        fetchSchedule();
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 30, marginTop: 10 }}
                    onPress={() => {
                        console.log("Notification pressed");
                        navigate.navigate("Notification");
                    }}
                >
                    <Ionicons name="notifications" size={24} color="black" />
                </TouchableOpacity>
            )
        });
    }, [])

    const navigate = useNavigation()

    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });


    //for location

    const [locationEnabled, setLocationEnabled] = useState(false);
    const [displayLocation, setDisplayLocation] = useState(
        'Fetching...'
    );

    useEffect(() => {
        CheckIfLocationPermissionEnabled();
        GetCurrentLocation();
    }, []);

    const CheckIfLocationPermissionEnabled = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            let enabled = await Location.hasServicesEnabledAsync();
            console.log("Location status : " + enabled)
            if (enabled == "denied") {
                if (!granted) Alert.alert(
                    'Location Service not enabled',
                    'Please enable your location services to continue',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );

            } else {
                setLocationEnabled(true);
            }
        } catch (err) {
            console.log("Error in checking location access : ", err.message)
        }
    };
    const GetCurrentLocation = async () => {
        try {
            let { status } = await Location.requestBackgroundPermissionsAsync()
            console.log("Background : " + status)
            if (status !== 'granted') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
                if (!granted) Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            }
            let { coords } = await Location.getCurrentPositionAsync();
            console.log("coordinates : ", coords);
            if (coords) {
                const { latitude, longitude } = coords;
                // let response = await Location.reverseGeocodeAsync({
                //     latitude,
                //     longitude
                // });
                // console.log(response)
                // setDisplayLocation(${response[0].district},${response[0].city})
                setDisplayLocation(giveCollegeLocation(latitude, longitude))
            }
        } catch (err) {
            console.log("Error in assess location : ", err.message)
        }
    };


    return (
        <View style={styles.main}>
            {/* top container */}
            <View style={styles.top}>
                {/*First view for welcome msg */}
                <View>

                    <Text style={{
                        fontSize: 22, fontFamily: "monospace",
                        fontWeight: "bold"
                    }}>Welcome , </Text>
                    <Text style={styles.nametext}><Text style={{
                        fontSize: 30, fontFamily: "monospace",
                    }}>{userDetails.name_n} </Text><Text>{userDetails.dept_n == "IT" ? "B.Tech " : "B.E "} {userDetails.dept_n}</Text></Text>

                </View>
                {/* second view for 3 boxes */}
                <View style={styles.boxContainer} >
                    <View>
                        <Pressable style={styles.box}
                            onPress={() => { navigate.navigate("Attendence") }}>
                            <Text style={{ fontSize: 23, fontFamily: "monospace" }}>11</Text>
                            <Text style={{ width: 100, textAlign: "center", padding: 1 }}>Classes Missed</Text>
                        </Pressable>
                    </View>
                    <View style={styles.box2}>
                        <Text style={styles.time}>{formattedTime}</Text>
                        <Text><Ionicons name="location" size={15} color="black" />{" " + displayLocation}</Text>
                    </View>
                </View>
            </View>

            {/* <ion-icon name="apps"></ion-icon> */}
            {/* bottom container */}
            <View style={styles.bottom}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 5, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontFamily: "monospace" }}>Upcoming classes</Text>
                    <Pressable onPress={() => { navigate.navigate("Schedule") }}><Ionicons name="calendar" size={22}></Ionicons></Pressable>

                </View>
                <View style={styles.periods}>


                    <View>{sch[days[currentDay]].length == 0 ?
                        <View style={styles.overBox}>
                            <View><Text style={styles.classOverText}>Hurrah !  Classes are over for today</Text></View>
                            <View>
                                <View
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 9 }}><Text style={{ fontWeight: 900, fontSize: 17 }}>Suggested Activities</Text></View>
                                <View style={styles.actBox}>
                                    <TouchableOpacity style={styles.btnBoxes} onPress={() => navigate.navigate("Attendence")}>
                                        <View style={styles.pressBox}>
                                            <FontAwesome name="hand-stop-o" size={34} color="black" />
                                            <Text style={styles.boxText}>Entry Attendance</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnBoxes}>
                                        <View style={styles.pressBox}>
                                            <Ionicons name='timer-sharp' size={34} color="black" />
                                            <Text style={styles.boxText}>Today's Routine</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> :
                        <FlatList
                            data={sch[days[currentDay]]}
                            renderItem={({ item }) => {
                                //console.log(item.Subject)
                                return (
                                    <View style={styles.periodsRow}>
                                        <View style={styles.rowLeft}>
                                            <Text style={{ fontSize: 20 }}>{item.hour}</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <View style={styles.rowTop}>
                                                <Text style={{ fontSize: 20 }}>{item.courseName}</Text>

                                            </View>
                                            <View style={styles.rowBottom}>
                                                <View style={{ justifyContent: "flex-start" }}><Text><Ionicons name="person" size={15} color="black" /> {item.staff}</Text></View>
                                                <Text>    <Ionicons name="location" size={15} color="black" /> {item.location ? item.location : "Location not given"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        />}


                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    btnBoxes: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        padding: 20,
        backgroundColor: "#F2EFE5",
        borderRadius: 20,
        elevation: 10,
        flexBasis: "39%",
    },
    pressBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    overBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignSelf: "flex-start"
    },
    classOverText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    actBox: {
        display: "flex",
        flexDirection: "row"
    },
    main: {
        flex: 1,
        padding: 20,
    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 3,
    },
    welcome: {
        flex: 1
    },
    nametext: {
        justifyContent: "center",
        marginLeft: 30
    },
    boxContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    box: {
        height: 100,
        width: 100,
        elevation: 5,
        backgroundColor: "#fff",
        // borderWidth: 1,
        //borderColor: "silver",
        borderRadius: 10,
        marginBottom: 5,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    box2: {
        //time box
        flex: 2,
        height: 120,
        elevation: 5,
        backgroundColor: "#fff",
        // borderWidth: 1,
        //borderColor: "silver",
        borderRadius: 10,
        marginBottom: 5,
        marginLeft: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    time: {
        fontSize: 30,
        fontFamily: "monospace",
        marginBottom: 5
    },
    periods: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        rowGap: 10
    },
    periodsRow: {
        backgroundColor: "white",
        padding: 10,
        width: "100%",
        marginBottom: 5,
        flexDirection: "row",
        marginTop: 5,
        borderColor: "silver",
        borderWidth: 1,
        borderRadius: 10,
        elevation: 5

    },
    rowLeft: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        marginRight: 5,
        paddingRight: 6
    },
    rowRight: {
        flex: 9
    },
    rowTop: {
        flex: 1,
        //marginLeft: 30
        paddingLeft: 10
    },
    rowBottom: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    boxText: {
        textAlign: "center"
    }
})
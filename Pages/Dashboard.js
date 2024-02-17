import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Alert, PermissionsAndroid, Pressable } from "react-native"
import { useState, useEffect } from "react";
import Schedule from "../Components/Schedule.json"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { giveCollegeLocation } from "../functions/insideLocations";

export default function DashBoard({ navigation }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    var name, dept, year, roll;
    const [userDetails, setUserDetails] = useState({ name_n: "", dept_n: "" });
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);


        // console.log(currentTime.toLocaleTimeString())
        return () => clearInterval(interval);

    }, []);

    useEffect(() => {
        async function fetch() {
            name = await AsyncStorage.getItem("name");
            dept = await AsyncStorage.getItem("dept");
            year = await AsyncStorage.getItem("year");
            roll = await AsyncStorage.getItem("roll");
            console.log(name, dept);
            setUserDetails({
                name_n: name,
                dept_n: dept,
                year_n: year,
                roll_n: roll
            })
        }
        fetch()
    }, [])
    
    const navigate = useNavigation()

    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity
                style={{ marginRight: 30, marginTop: 10 }}
                onPress={() => {
                    console.log("Notification pressed");
                    navigate.navigate("Notification")
                }}
            >
                <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
        )
    });

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
                // setDisplayLocation(`${response[0].district},${response[0].city}`)
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
                    }}>Welcome, </Text>
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


            {/* bottom container */}
            <View style={styles.bottom}>
                <Text style={{ fontSize: 20, fontFamily: "monospace", marginBottom: 5 }}>Upcoming classes</Text>

                <View style={styles.periods}>


                    <View>
                        <FlatList
                            data={Schedule}
                            renderItem={({ item }) => {
                                //console.log(item.Subject)
                                return (
                                    <View style={styles.periodsRow}>
                                        <View style={styles.rowLeft}>
                                            <Text style={{ fontSize: 20 }}>{item.Hour}</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <View style={styles.rowTop}>
                                                <Text style={{ fontSize: 20 }}>{item.Subject}</Text>

                                            </View>
                                            <View style={styles.rowBottom}>
                                                <View style={{ flex: 2, justifyContent: "flex-start" }}><Text><Ionicons name="person" size={15} color="black" /> {item.staff}</Text></View>
                                                <Text style={{ flex: 1 }}>    <Ionicons name="location" size={15} color="black" /> {item.location}</Text>
                                            </View>
                                        </View>

                                    </View>
                                )
                            }}
                        />


                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
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
        justifyContent: "space-around",
        width: "100%",

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

    }

})
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Animated, Modal, Alert, PermissionsAndroid, Pressable, Button } from "react-native"
import { useState, useEffect } from "react";
import Schedule from "../Components/Schedule.json"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import SkeletonContent from 'react-native-skeleton-content';
import ipAddr from "../functions/ip_addr";
import registerNNPushToken from 'native-notify';
import { registerIndieID, unregisterIndieDevice } from 'native-notify';
import { giveCollegeLocation } from "../functions/insideLocations";
// import SkeletonContent from 'react-native-skeleton-content';
import axios from 'axios';



export default function DashBoard({ navigation }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    var name, dept, year, roll;
    const [userDetails, setUserDetails] = useState({ name_n: "", dept_n: "" });
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        // console.log(currentTime.toLocaleTimeString())
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetch() {
            try {
                name = await AsyncStorage.getItem("name");
                console.log(name);
                setUserDetails((prev) => {
                    return {
                        name_n: name
                    }
                })
                setUserLoading(false);
            } catch (err) {
                console.log("Error in Dashboard.js Fetching User details from async storage : ", err.message)
            }
        }
        fetch()
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
            console.log("Enter 1")
            let { coords } = await Location.getCurrentPositionAsync();
            console.log("Enter 2")
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

    const Apply = async (courseNo, finalDay, finalHour, originalHour, subject) => {
        
        try {
            const res = await axios({
                url: "http://" + ipAddr + ":3000/user/notifyEnrolledStudents",
                params: {courseNo, finalDay, finalHour, originalHour, subject, staffName: userDetails.name_n },
                method : "get"
            })
            console.log(res)
        } catch (err) {
            console.log("Error in send notify interrupt to backend : ", err.message)
        }
    }

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
                    }}>{userDetails.name_n} </Text><Text>{userDetails.dept_n}</Text></Text>

                </View>
                {/* second view for 3 boxes */}
                <View style={styles.boxContainer} >
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


                    <View>
                        <FlatList
                            data={Schedule}
                            renderItem={({ item }) => {
                                //console.log(item.Subject)
                                return (
                                    <ClassBox hour={item.Hour} sem={6} subject={item.Subject} location={item.location} courseNo={item.courseNo} Apply={Apply} />
                                )
                            }}
                        />


                    </View>
                </View>
            </View>

        </View>
    );
}

function ClassBox({ hour, sem, subject, location, courseNo, Apply }) {
    const [open, setOpen] = useState(false);
    const [zoomAnim] = useState(new Animated.Value(0))

    const [size, setSize] = useState(60);
    const trans = () => {
        Animated.timing(
            zoomAnim,
            {
                toValue: size,
                duration: 300,
                useNativeDriver: false,
            }
        ).start();

        if (size == 0) {
            setSize(60);
        } else {
            setSize(0);
        }
    }


    const [freeHours, setFreeHours] = useState({
        "monday" : [],
        "tuesday" : [],
        "wednesday" : [],
        "thursday" : [],
        "friday" : []
    })

    const [selected, setSelected] = useState([])

    useEffect(() => {
        async function getHours() {
            const res = await axios({
                url: "http://" + ipAddr + ":3000/user/freehours",
                method : "get"
            })
            console.log(res.data)
            setFreeHours(res.data)
        }
        getHours();
    }, [])

    const markSelected = (day, hour) => {
        const days = {
        "monday" : Array(8).fill(false),
        "tuesday" : Array(8).fill(false),
        "wednesday" : Array(8).fill(false),
        "thursday" : Array(8).fill(false),
        "friday" : Array(8).fill(false)
        }
        days[day][hour] = true;
        setSelected([day, hour])
    }

    return <TouchableOpacity style={styles.periodsRow} onPress={trans} activeOpacity={0.6}>
        <View style={styles.rowLeft}>
            <Text style={{ fontSize: 20 }}>{hour}</Text>
        </View>
        <View style={styles.rowRight}>
            <View style={styles.rowTop}>
                <Text style={{ fontSize: 20 }}>{subject}</Text>
            </View>
            <View style={styles.rowBottom}>
                <View style={{ flex: 2, justifyContent: "flex-start" }}><Text>{sem + "th sem"}</Text></View>
                <Text style={{ flex: 3 }}><Ionicons name="location" size={15} color="black" /> {"No Location GIven"}</Text>
            </View>
            <Modal
                visible={open}
                transparent={true}
                onRequestClose={() => {
                    setOpen(false);
                }}
                animationType="fade"
            >
                <View style={styles.floatView}>
                    <View style={styles.floatForm}>
                        <View style={styles.formChild}>
                            <Text style={styles.formHead}>Next Free Slots Available</Text>
                        </View>
                        <View style={styles.formBody}>
                            {
                                Object.keys(freeHours).map(day => {
                                    return <View style={styles.entireFreeRow}>
                                        <View style={styles.dayBox}>
                                            <Text style={styles.dayText}>{day}</Text>
                                        </View>
                                        <View style={styles.freeRow}>
                                            {
                                                freeHours[day].map(hour => {
                                                    return <TouchableOpacity onPress={() => markSelected(day, hour)} style={{...styles.smallBox, backgroundColor: (selected[0] == day && selected[1] == hour) ? "green" : "white"}}>
                                                        <Text>{hour}</Text>
                                                    </TouchableOpacity>
                                                })
                                            }
                                        </View>
                                    </View>
                                })
                            }
                        </View>
                        <View style={styles.formChild}>
                            <Button title="Apply" onPress={() => {
                                Apply(courseNo, selected[0], selected[1], hour, subject);
                                setOpen(false)
                            }}/>
                        </View>
                        <View style={styles.formChild}>
                            <Button title="close" onPress={() => setOpen(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Animated.View
                style={{
                    height: zoomAnim,
                }}
            >
                <View style={styles.rowBottomest}>
                    <View style={styles.actionBox}><Pressable onPress={() => setOpen(true)}>
                        <Text style={styles.actionText}>Postponse Class</Text></Pressable></View>
                    <View style={styles.actionBox}><Pressable><Text style={styles.actionText}>Change Venue</Text></Pressable></View>
                    <View style={styles.actionBox}><Pressable><Text style={styles.actionText}>Cancel class</Text></Pressable></View>
                </View>
            </Animated.View>
        </View>

    </TouchableOpacity>
}

const styles = StyleSheet.create({
    entireFreeRow: {
        display: "flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    dayText : {
        fontSize: 16,
        textTransform: "capitalize"
    },
    freeRow: {
        display: "flex",
        flexDirection: "row",
        columnGap: 10
    },
    dayBox: {
        width: 100
    },
    smallBox: {
        padding : 5,
        backgroundColor :"white",
        borderRadius: 4,
        borderWidth: 1
    },
    formBody: {
        display: "flex",
        flexDirection: "column",
        rowGap: 10
    },  
    formChild : {
    },
    floatView : {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.1)"
    },
    floatForm: {
        padding : 20,
        backgroundColor: "#FFF7F1",
        borderRadius: 25,
        borderWidth : 2,
        borderColor: "black",
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        rowGap:20
    },
    formHead: {
        fontSize: 20
    },  
    actionText: {
        fontSize: 15,
        color: "blue"
    },
    rowBottomest: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10
    },
    actionBox: {
        flexGrow: 1,
        flexBasis: "33%",
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
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons, Feather, FontAwesome, Entypo, } from '@expo/vector-icons';
import Iuri from "../assets/sample_profile.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tooltip from 'rn-tooltip';
import { LogContext } from '../App';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    var name, dept, year, roll;
    const navigator = useNavigation()
    const [userDetails, setUserDetails] = useState({ name_n: "", dept_n: "" });
    const setLog = useContext(LogContext);
    useEffect(() => {
        async function fetch() {
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
        }
        fetch()
    }, [])

    const colorCodes = ["", "grey", "purple", "orange", "brown"]

    const logout = async () => {
        console.log("Logout process")
        try {
            await AsyncStorage.clear();
            setLog(false);
        } catch(err) {
            console.log("ERROR: error in logging out", err.message)
        }
    }

    return (
        <View>
            <View>
                <View style={styles.topContainer}>
                    <View>
                        <Image source={require("../assets/sample_profile.jpg")} style={{ height: 160, width: 150, borderRadius: 100 }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{userDetails.name_n}</Text>
                        <Text style={styles.dept}>B.Tech {userDetails.dept_n == "IT" ? "Information Technology" : userDetails.dept_n}</Text>
                    </View>
                    <View style={{
                        position: "absolute",
                        top: 15,
                        left: 15
                    }}>
                        <Tooltip backgroundColor="lightgrey" withOverlay={false} popover={<Text style={{ textTransform: "capitalize" }}>{colorCodes[userDetails.year_n] + " tag"}</Text>}>
                            <Entypo name="awareness-ribbon" size={34} color={colorCodes[userDetails.year_n]} /></Tooltip></View>

                    <Feather name="edit" size={24} color="black" style={{ position: "absolute", right: 15, top: 15 }} />
                </View>
            </View>
            <View style={styles.midContainer}>
                <View style={styles.btnBoxes}>
                    <Pressable style={styles.pressBox}>
                        <MaterialCommunityIcons name="bookshelf" size={34} color="black" />
                        <Text style={styles.boxText}>My Courses</Text>
                    </Pressable>
                </View>
                <View style={styles.btnBoxes}>
                    <Pressable style={styles.pressBox} onPress={() => navigator.navigate("Schedule")}>
                        <MaterialIcons name="schedule" size={34} color="black" />
                        <Text style={styles.boxText}>Schedule</Text>
                    </Pressable>
                </View>
                <View style={styles.btnBoxes}>
                    <Pressable style={styles.pressBox}>
                        <FontAwesome name="hand-stop-o" size={34} color="black" />
                        <Text style={styles.boxText}>Attendence</Text>
                    </Pressable>
                </View>
                <View style={styles.btnBoxes}>
                    <Pressable style={styles.pressBox}>
                        <Ionicons name='timer-sharp' size={34} color="black" />
                        <Text style={styles.boxText}>Today's Routine</Text>
                    </Pressable>
                </View>
                <View style={styles.btnBoxes}>
                    <Pressable style={styles.pressBox} >
                        <FontAwesome name="lock" size={34} color="black" />
                        <Text style={styles.boxText}>Change Password</Text>
                    </Pressable>
                </View>
                <View style={styles.btnBoxes}>
                    <Pressable style={styles.pressBox} onPress={logout}>
                        <MaterialIcons name="logout" size={34} color="red" />
                        <Text style={styles.boxText}>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = {
    boxText: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: 400
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontSize: 30
    },
    dept: {
        fontSize: 15
    },
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    topContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        padding: 20,
        backgroundColor: "#F2EFE5",
        borderRadius: 20,
        elevation: 10,
        // borderWidth : 2,
        // borderColor : "silver"
    },
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
    midContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    }
}

export default Profile
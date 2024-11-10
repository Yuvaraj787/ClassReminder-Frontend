import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView, Alert, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogContext } from '../App';
import { useNavigation } from '@react-navigation/native';
import ipAddr from "../functions/ip_addr";

import registerNNPushToken from 'native-notify';
import { registerIndieID, unregisterIndieDevice } from 'native-notify';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigator, route }) => {
    const navigation = useNavigation();
    const [on, Seton] = useState(true);
    const [log, setLogStatus] = useState(false);
    const [rollNo, setRollNo] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({});
    const setLog = useContext(LogContext)[0];

    const validateForm = () => {
        let errors = {};
        if (!rollNo.trim()) errors.rollNo = "! Please enter Roll Number";
        if (!password.trim()) errors.password = "! Please enter Password";
        console.log("now ?")
        setError(errors);
        console.log("after ?")
        return Object.keys(errors).length === 0;
    }


    const manageMissed = async (roll) => {

        try {
            console.log(roll)
            const res = await axios({
                url: `https://${ipAddr}/user/getMyCourses`,
                method: "get",
                params: { roll: parseInt(roll) }
            })

            //console.log(res.data)
            var newArray = res.data.map(course => ({
                courseNo: course.courseNo,
                classMissed: 0,
            }));
            //console.log(newArray)
            // console.log(existingData)
            const existingData = await AsyncStorage.getItem('classData');
            //console.log(existingData)
            const parsedData = JSON.parse(existingData);

            const misses = JSON.stringify(newArray)
            try {
                if (parsedData === null) {
                    await AsyncStorage.setItem('classData', misses);
                    console.log('Array stored successfully');
                }
                else {
                    console.log("Data already exists !")
                }
            } catch (error) {
                console.error('Error storing array:', error);
            }
        }
        catch (err) {
            console.log("err:" + err.message)
        }
    }


    const handleSubmit = async () => {
        setLoading(true)
        if (validateForm()) {
            try {
                const res = await axios({
                    url: `https://${ipAddr}/auth/login`,
                    method: "post",
                    params: { roll: rollNo, password }
                });
                if (res.data.newUser) {
                    Alert.alert("New User", "Please register before logging in");
                } else if (!res.data.wrongPassword) {
                    const { name, roll, year, dept } = res.data.userData
                    await AsyncStorage.setItem("name", name)
                    await AsyncStorage.setItem("roll", roll + "")
                    await AsyncStorage.setItem("year", year + "")
                    await AsyncStorage.setItem("dept", dept)
                    await AsyncStorage.setItem("token", res.data.token)
                    registerIndieID(roll + "", 21202, 'uBio8ApDXJCEbISWb0BS5X')
                    setLog(true)
                    manageMissed(roll)
                } else {
                    Alert.alert("Wrong Credentials", "Incorrect password");
                }
            } catch (error) {
                Alert.alert("ERROR", error.message)
                console.log("ERROR in login page: ", error.message);
            }
        } else {
            Alert.alert("Invalid Form", "Please fill in all fields correctly");
        }
        setLoading(false)
    }

    useEffect(() => {
        if (log) {
            setLog(true);
        }
    }, [log])

    return (
        <View style={[styles.container, { backgroundColor: on ? "#164863" : "#f5f5f5" }]}>
            <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "monospace", color: on ? "white" : "black", paddingBottom: 30 }}>Student Login</Text>

            <View style={styles.form}>
                <TextInput value={rollNo} placeholder="Roll Number " style={styles.input} onChangeText={setRollNo} />
                {error.rollNo && <Text style={styles.err}>{error.rollNo}</Text>}
                <TextInput value={password} placeholder="Password " style={styles.input} onChangeText={setPassword} secureTextEntry />
                {error.password && <Text style={styles.err}>{error.password}</Text>}
                <Pressable title='Login' onPress={handleSubmit}>
                {loading ? <ActivityIndicator size="large" animating={loading}/>:<Button title='Login' onPress={handleSubmit} />}
                </Pressable>
                <View style={styles.infoBox}>
                    <Pressable style={styles.infoView} onPress={() => navigation.navigate("StaffLogin")}><Text style={styles.infoText}>Staff Login</Text></Pressable>
                    {/* <Pressable style={styles.infoView}><Text style={styles.infoText}>Forget Password</Text></Pressable> */}
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12,
        marginTop: 10
    },
    infoView: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "#F7DED0",
        backgroundColor: "#9195F6",
        borderRadius: 6,
        padding: 7
    },
    infoText: {
        fontSize: 14,
        fontWeight: "900"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        width: "80%",
        elevation: 10
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 12,
        borderRadius: 5
    },
    text: {
        marginBottom: 15,
        fontSize: 16
    },
    err: {
        color: "red",
    }
});

export default Login
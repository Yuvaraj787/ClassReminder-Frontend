import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({navigation, route}) {
    const navigate = useNavigation();
    const [on, Seton] = useState(true)

    const [rollNo, setrollNo] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const validateForm = () => {
        let error = {}
        console.log("length rollNo : " + rollNo.length + " password length : " + password.length)
        if (rollNo == '') error.rollNo = "! Please Enter rollNo"
        if (password == '') error.password = "! please enter password"
        setError(error)
        console.log(Object.keys(error).length)
        return Object.keys(error).length === 0;

    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form is Valid");
            axios({
                url: "http://10.16.49.174:3000/auth/login",
                method: "POST",
                params: { roll : rollNo, password }
            })
                .then(async (res) => {
                    console.log(res.data)
                    if (res.data.newUser) {
                        Alert("New User ? ", "Please Register before login")
                        navigate.navigate("Signup")
                    }
                    else if (!res.data.wrongPassword) {
                        const { name, roll, year, dept } = res.data.userData
                        console.log(name, roll)
                        await AsyncStorage.setItem("name", name)
                        await AsyncStorage.setItem("roll", roll + "")
                        await AsyncStorage.setItem("year", year + "")
                        await AsyncStorage.setItem("dept", dept)
                        await AsyncStorage.setItem("token", res.data.token)
                        navigate.navigate("Dashboard")
                    } else if (res.data.wrongPassword) {
                        Alert.alert("Wrong Crediantials", "wrong password")
                    }
                }).catch(err => {
                    console.log("ERROR : ",err.message)
                })
        }
        else {
            Alert.alert("Invalid Form", "Missing or invalid creditianls")
        }
    }
    return (
        <View style={[styles.container, { backgroundColor: on ? "#164863" : "#f5f5f5" }]}>
            <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "monospace", color: on ? "white" : "black", paddingBottom: 30 }}>Login Form</Text>


            <View style={styles.form}>
                <TextInput value={rollNo} placeholder="Roll Number " style={styles.input} onChangeText={setrollNo} />
                {
                    error.rollNo ? <Text style={styles.err}>{error.rollNo}</Text> : null
                }
                <TextInput value={password} placeholder="Password " style={styles.input} onChangeText={setPassword} secureTextEntry />
                {
                    error.password ? <Text style={styles.err}>{error.password}</Text> : null
                }
                <Button title='Login' onPress={() => {
                    console.log("login button pressed by " + rollNo)
                    handleSubmit()
                }} />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
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

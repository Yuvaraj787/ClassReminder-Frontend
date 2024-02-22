import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ipAddr from "../functions/ip_addr";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';


export default function App({navigator, route}) {
    const [on, Seton] = useState(true)

    const [name, setname] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [staffs, setStaffs] = useState([
        {label: 'Selvi Ravindran', value: 'Selvi Ravindran'},
        {label: 'Swaminathan', value: 'Swaminathan'},
        {label: 'Jasmine', value: 'Jasmine'},
        {label: 'Senthil Kumar', value: 'Senthil Kumar'},
    ]);

    const validateForm = () => {
        let error = {}
        console.log("length name : " + name.length + " password length : " + password.length)
        if (name == '') error.name = "! Please Enter name"
        if (password == '') error.password = "! please enter password"
        setError(error)
        console.log(Object.keys(error).length)
        return Object.keys(error).length === 0;
    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form is Valid");
            axios({
                url: "http://10.16.49.174:3000/auth/staff/login",
                method: "POST",
                params: { name : name, password }
            })
                .then(async (res) => {
                    console.log(res.data)
                    if (res.data.newUser) {
                        Alert("New User ? ", "Please Register before login")
                    }
                    else if (!res.data.wrongPassword) {
                        const { name, roll, year, dept } = res.data.userData
                        console.log(name, roll)
                        await AsyncStorage.setItem("name", name)
                        await AsyncStorage.setItem("roll", roll + "")
                        await AsyncStorage.setItem("year", year + "")
                        await AsyncStorage.setItem("dept", dept)
                        await AsyncStorage.setItem("token", res.data.token)
                        console.log("correct password")
                        route.params.setLoggedIn(true);
                    } else if (res.data.wrongPassword) {
                        Alert.alert("Wrong Crediantials", "wrong password")
                    }
                }).catch(err => {
                    console.log("ERROR in login page: ",err.message)
                })
        }
        else {
            Alert.alert("Invalid Form", "Missing or invalid creditianls")
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: on ? "#164863" : "#f5f5f5" }]}>
            <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "monospace", color: on ? "white" : "black", paddingBottom: 30 }}>Staff Login</Text>


            <View style={styles.form}>
            <DropDownPicker
                    searchable={true}
                    open={open}
                    value={value}
                    items={staffs}
                    setOpen={setOpen}
                    setValue={setValue}
                    style={styles.input} 
                    setItems={setStaffs}
                    placeholder={'Select Faculty'}
                />                {
                    error.name ? <Text style={styles.err}>{error.name}</Text> : null
                }
                <TextInput value={password} placeholder="Password " style={styles.input} onChangeText={setPassword} secureTextEntry />
                {
                    error.password ? <Text style={styles.err}>{error.password}</Text> : null
                }
                <Button title='Login' onPress={() => {
                    console.log("login button pressed by " + name)
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

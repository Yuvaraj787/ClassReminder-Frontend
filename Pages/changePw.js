import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView, Alert, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogContext } from '../App';
import { useNavigation } from '@react-navigation/native';
import ipAddr from "../functions/ip_addr";

const ChangePw = ({ route }) => {
    const navigator = useNavigation();
    const [error, setError] = useState({});
    const setLog = useContext(LogContext)[0];

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const validateForm = async () => {
        let errors = {};
        if (!currentPassword.trim()) errors.currentPassword = "! Please enter old Password";
        if (!newPassword.trim()) errors.newPassword = "! Please enter new Password";
        else if (newPassword.length < 8) errors.newPassword = "! Password must be minimum 8 letters";
        const staff = await AsyncStorage.getItem("staff")
        const rollNum = await AsyncStorage.getItem("roll");
        const StaffName = await AsyncStorage.getItem("name")

        if (staff === "yes") {
            console.log("staff" + staff)
            try {
                const res = await axios({
                    url: `http://${ipAddr}:3000/auth/staff/login`,
                    method: "post",
                    params: { name: StaffName, password: currentPassword }
                });
                console.log(res.data)
                if (res.data.invalid) {
                    console.log("wrong pw")
                    errors.currentPassword = "! Wrong Password";
                    setError(errors);
                    console.log("hi")
                    return false;
                }
            } catch (err) {
                console.log(err.message)
            }

        }

        else {
            console.log("student")

            try {
                console.log(rollNum)
                const res = await axios({
                    url: `http://${ipAddr}:3000/auth/login`,
                    method: "post",
                    params: { roll: rollNum, password: currentPassword }
                });
                if (res.data.wrongPassword) {
                    errors.currentPassword = "! Wrong Password";
                }

            } catch (err) {
                console.log(err.message)
            }

        }
        setError(errors);
        console.log(errors)
        return Object.keys(errors).length === 0;
    }

    const logout = async (staff) => {
        console.log("Logout process")
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('roll')
            await AsyncStorage.removeItem('name')
            await AsyncStorage.removeItem('staff')

            setLog(false);
            if (staff) {
                await AsyncStorage.clear();
                //navigator.navigate("StaffLogin")
            }

        } catch (err) {
            console.log("ERROR: error in logging out", err.message)
        }
    }
    const handleSubmit = async () => {
        //  if (validateForm()) console.log("Form is Valid")
        if (validateForm()) {
            const staff = await AsyncStorage.getItem("staff")

            if (staff) {
                const name = await AsyncStorage.getItem("name");
                const res = await axios({
                    url: `http://${ipAddr}:3000/auth/changepw`,
                    method: "post",
                    params: { passWord: newPassword, staff: true, name: name }
                });
                console.log(res.data)
                if (res.data.sucess) {
                    logout(true)
                }

            }
            else {

                const rollNum = await AsyncStorage.getItem("roll");
                const name = await AsyncStorage.getItem("name");

                const res = await axios({
                    url: `http://${ipAddr}:3000/auth/changepw`,
                    method: "post",
                    params: { roll: rollNum, passWord: newPassword, staff: false, name: name }
                });
                console.log(res.data)
                if (res.data.sucess) {
                    logout(false)
                }

            }

        }

    }

    return (
        <View style={[styles.container, { backgroundColor: "#164863" }]}>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white", fontFamily: "monospace", paddingBottom: 30 }}>Change Password</Text>

            <View style={styles.form}>
                <TextInput value={currentPassword} placeholder="Current Password" style={styles.input} onChangeText={setCurrentPassword} secureTextEntry />
                {error.currentPassword && <Text style={styles.err}>{error.currentPassword}</Text>}
                <TextInput value={newPassword} placeholder="New Password " style={styles.input} onChangeText={setNewPassword} secureTextEntry />
                {error.newPassword && <Text style={styles.err}>{error.newPassword}</Text>}
                <Pressable title='Change Password' onPress={handleSubmit}>
                    <Button title='Change Password' onPress={handleSubmit} />
                </Pressable>
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

export default ChangePw
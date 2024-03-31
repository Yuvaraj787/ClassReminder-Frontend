import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView, Alert, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogContext } from '../App';
import { useNavigation } from '@react-navigation/native';
import ipAddr from "../functions/ip_addr";

const ChangePw = ({ navigator, route }) => {
    const navigation = useNavigation();
    const [error, setError] = useState({});

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const validateForm = async () => {
        let errors = {};
        if (!currentPassword.trim()) errors.currentPassword = "! Please enter old Password";
        if (!newPassword.trim()) errors.newPassword = "! Please enter new Password";
        else if (newPassword.length < 8) errors.newPassword = "! Password must be minimum 8 letters";
        const staff = AsyncStorage.getItem("staff")
        if (staff) {

        }
        else {
            const roll = await AsyncStorage.getItem("roll");
            const res = await axios({
                url: `http://${ipAddr}:3000/auth/login`,
                method: "post",
                params: { roll: roll, password: currentPassword }
            });
            if (res.data.wrongPassword) {
                errors.currentPassword = "! Wrong Password";
            }
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            const staff = AsyncStorage.getItem("staff")

            if (staff) {
                const name = await AsyncStorage.getItem("name");
                const res = await axios({
                    url: `http://${ipAddr}:3000/auth/changepw`,
                    method: "post",
                    params: { roll: roll, passWord: newPassword, staff: true, name: name }
                });
            }
            else {

                const roll = await AsyncStorage.getItem("roll");
                const name = await AsyncStorage.getItem("name");

                const res = await axios({
                    url: `http://${ipAddr}:3000/auth/changepw`,
                    method: "post",
                    params: { roll: roll, passWord: newPassword, staff: false, name: name }
                });

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
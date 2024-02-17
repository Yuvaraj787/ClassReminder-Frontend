import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function App() {
    const navigate = useNavigation();

    const [userDetails, setUserDetails] = useState({
        roll: "",
        name: "",
        dept: "",
        year: "",
        password: ""
    });
    const [error, setError] = useState({});

    const validateForm = () => {
        let errors = {};
        if (!userDetails.roll) errors.roll = "Please enter your roll number";
        if (!userDetails.name) errors.name = "Please enter your name";
        if (!userDetails.dept) errors.dept = "Please enter your department";
        if (!userDetails.year) errors.year = "Please enter your year";
        if (!userDetails.password) errors.password = "Please enter your password";
        setError(errors);
        return Object.keys(errors).length === 0;
    }

    const handleChange = (field, value) => {

        setUserDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form is valid. Submitting... new8");
            axios({
                url: "http://10.16.49.174:3000/auth/register",
                method: "post",
                params: userDetails
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        Alert.alert("Success", "Register Successfull. Login to continue")
                        navigate.navigate("Login")
                    }
                    else if (!res.data.newUser) {
                        Alert.alert("Warning", "Account Already registered. Login to continue")
                        navigate.navigate("Login");
                    }
                    else {
                        Alert.alert("Unknown Error")
                    }
                }).catch(err => {
                    Alert.alert("Server Error")
                    console.log("ERROR: " + err.message)
                })

        } else {
            console.log("Form validation failed. Please check the fields.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up form</Text>
            <View style={styles.form}>
                <TextInput
                    value={userDetails.roll}
                    onChangeText={value => handleChange('roll', value)}
                    placeholder="Roll Number"
                    style={styles.input}
                />

                {error.roll && <Text style={styles.error}>{error.roll}</Text>}

                <TextInput
                    value={userDetails.name}
                    onChangeText={value => handleChange('name', value)}
                    placeholder="Name"
                    style={styles.input}
                />
                {error.name && <Text style={styles.error}>{error.name}</Text>}

                <TextInput
                    value={userDetails.dept}
                    onChangeText={value => handleChange('dept', value)}
                    placeholder="Department"
                    style={styles.input}
                />
                {error.dept && <Text style={styles.error}>{error.dept}</Text>}

                <TextInput
                    value={userDetails.year}
                    onChangeText={value => handleChange('year', value)}
                    placeholder="Year"
                    style={styles.input}
                />
                {error.year && <Text style={styles.error}>{error.year}</Text>}

                <TextInput
                    value={userDetails.password}
                    onChangeText={value => handleChange('password', value)}
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                />
                {error.password && <Text style={styles.error}>{error.password}</Text>}

                <Button title="Sign Up" onPress={handleSubmit} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#164863',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#fff"
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
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

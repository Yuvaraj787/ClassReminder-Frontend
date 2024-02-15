import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function App({navigation, route}) {
    const navigate = useNavigation();
    const [on, Seton] = useState(true)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const validateForm = () => {
        let error = {}
        console.log("length username : " + username.length + " password length : " + password.length)
        if (username == '') error.username = "! Please Enter username"
        if (password == '') error.password = "! please enter password"
        setError(error)
        console.log(Object.keys(error).length)
        return Object.keys(error).length === 0;

    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("done uh");
            navigate.navigate("Profile", { name: username })
        }
        else {
            console.log("oh no ")
        }
    }
    return (
        <View style={[styles.container, { backgroundColor: on ? "#164863" : "#f5f5f5" }]}>
            <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "monospace", color: on ? "white" : "black", paddingBottom: 30 }}>Login</Text>
            {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: on ? "white" : "black" }}>Dark mode</Text>
                <Switch
                    value={on}
                    onValueChange={() => Seton((previouValue) => !previouValue)}
                    trackColor={{ true: "blue", false: "red" }}
                    thumbColor="white"
                />
            </View> */}


            <View style={styles.form}>
                <Text style={styles.text}>Username:</Text>
                <TextInput value={username} placeholder="Enter Your username " style={styles.input} onChangeText={setUsername} />
                {
                    error.username ? <Text style={styles.err}>{error.username}</Text> : null
                }
                <Text style={styles.text}>Password:</Text>
                <TextInput value={password} placeholder="Enter Your Password " style={styles.input} onChangeText={setPassword} secureTextEntry />
                {
                    error.password ? <Text style={styles.err}>{error.password}</Text> : null
                }
                <Button title='Login' onPress={() => {
                    console.log("login button pressed by " + username)
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

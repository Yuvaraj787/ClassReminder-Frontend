import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigate = useNavigation();
    const [on, Seton] = useState(true)

    const [staffs, setStaffs] = useState([
        {label: 'Selvi Ravindran', value: 'Selvi Ravindran'},
        {label: 'Swaminathan', value: 'Swaminathan'},
        {label: 'Jasmine', value: 'Jasmine'},
        {label: 'Senthil Kumar', value: 'Senthil Kumar'},
    ]);

    const [courseName, setcourseName] = useState('')
    const [faculty, setfaculty] = useState('')
    const [error, setError] = useState({})
    const [index, setIndex] = useState(1);
    const validateForm = () => {
        let error = {}
        console.log("length courseName : " + courseName.length + " faculty length : " + faculty.length)
        if (courseName == '') error.courseName = "! Please Enter courseName"
        if (faculty == '') error.faculty = "! please enter faculty"
        setError(error)
        console.log(Object.keys(error).length)
        return Object.keys(error).length === 0;

    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("done uh");
            navigate.navigate("Profile", { name: courseName })
        }
        else {
            console.log("oh no ")
        }
    }
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    return (
        <View style={[styles.container, { backgroundColor: on ? "#164863" : "#f5f5f5" }]}>
            <Text style={{ fontSize: 25, fontWeight: "bold", fontFamily: "monospace", color: on ? "white" : "black", paddingBottom: 30 }}>Add a Course</Text>
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
                <Text style={styles.text}>Course Details</Text>
                <TextInput value={courseName} placeholder="course Id / courseName " style={styles.input} onChangeText={setcourseName} />
                {
                    error.courseName ? <Text style={styles.err}>{error.courseName}</Text> : null
                }
                <Text style={styles.text}>Faculty Details</Text>
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
                />
                {
                    error.courseName ? <Text style={styles.err}>{error.courseName}</Text> : null
                }
                <Button title='Add Course' onPress={() => {
                    console.log("login button pressed with course name of " + courseName)
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

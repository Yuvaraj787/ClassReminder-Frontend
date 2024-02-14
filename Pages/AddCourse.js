import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigate = useNavigation();
    const [on, Seton] = useState(true)

    const [staffs, setStaffs] = useState([
        { id:1, dept: "IT", name: "Selvi Ravindran" }, {id:2,  dept: "IT", name: "Swaminathan" }
        // "Selvi Ravindran", "Swaminathan"
    ])

    const [courseName, setcourseName] = useState('')
    const [faculty, setfaculty] = useState('')
    const [error, setError] = useState({})
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
                <SearchableDropdown
              
                    containerStyle={{ padding: 5 }}
                    
                    // itemStyle={{
                    //     padding: 10,
                    //     marginTop: 2,
                    //     backgroundColor: '#ddd',
                    //     borderColor: '#bbb',
                    //     borderWidth: 1,
                    //     borderRadius: 5,
                    // }}

                    onItemSelect={(item) => {
                       
                        setStaffs({ choosen: item });
                      }}

                    itemStyle={styles.input}

                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={staffs}
                    defaultIndex={1}
                    selectedItems={staffs}
                    // items
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: "Select Faculty ",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                            },
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: false,
                        }
                    }
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

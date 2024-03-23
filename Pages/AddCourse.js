import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, TextInput, Button, Image, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ipAddr from "../functions/ip_addr"


import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const navigate = useNavigation();
    const [on, Seton] = useState(true)

    const [staffs, setStaffs] = useState([
        { label: 'Selvi Ravindran', value: 'Selvi Ravindran' },
        { label: 'Swaminathan', value: 'Swaminathan' },
        { label: 'Jasmine', value: 'Jasmine' },
        { label: 'Senthil Kumar', value: 'Senthil Kumar' },
    ]);
    const [allStaff, setAllStaff] = useState([])
    const [subject, setSubjects] = useState([])

    useEffect(() => {
        getSub()
    }, [])


    const getSub = async () => {
        const res = await axios({
            url: `http://${ipAddr}:3000/user/getAllCourses`,
            method: "get",
            params: { sem: 6 }
        })
        //console.log(res.data)

        var subs = []
        var st = []

        res.data.forEach(subject => {
            subs.push({ value: subject._id.courseCode, label: subject._id.name })
            st.push({ value: subject._id.courseCode, staffs: subject.staffs })
            console.log(subject)
        })
        setAllStaff(st)
        setSubjects(subs)
    }


    const [courseName, setcourseName] = useState('')
    const [faculty, setfaculty] = useState('')
    const [error, setError] = useState({})
    const [index, setIndex] = useState(1);

    const validateForm = () => {
        return true;
    }

    const handleSubmit = async () => {
        console.log(value)
        console.log(svalue)
        if (validateForm()) {
            console.log("done uh");
            const token = await AsyncStorage.getItem("token")
            try {
                const res = await axios({
                    url: `http://${ipAddr}:3000/user/enrollCourse`,
                    method: "post",
                    params: { token, courseCode: value, faculty: svalue }
                })
                console.log("sucess")
                console.log(res.data)
                navigate.navigate("CourseDisplay")
            }
            catch (err) {
                console.log(err.message)
            }
        }
        else {
            console.log("oh no ")
        }
    }
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [value, setValue] = useState(null);
    const [svalue, setSvalue] = useState(null);
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
                <DropDownPicker
                    searchable={true}
                    open={open1}
                    value={value}
                    items={subject}
                    setOpen={setOpen1}
                    setValue={(val) => {
                        setValue(val)
                        console.log(allStaff)
                        const course = allStaff.filter(staff => staff.value === val());
                        console.log("Filtered staff for selected value:", course);
                        const staffsArray = []
                        course[0].staffs.forEach(staff => {
                            staffsArray.push({ label: staff, value: staff })
                        })
                        console.log(staffsArray)
                        setStaffs(staffsArray)
                    }
                    }
                    style={styles.input}
                    setItems={setSubjects}
                    placeholder={'Select Course'}
                />
                {
                    error.courseName ? <Text style={styles.err}>{error.courseName}</Text> : null
                }
                <Text style={styles.text}>Faculty Details</Text>
                <DropDownPicker
                    searchable={true}
                    open={open}
                    value={svalue}
                    items={staffs}
                    setOpen={setOpen}
                    setValue={setSvalue}
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
        borderRadius: 5,
        zIndex: 2
    },
    text: {
        marginBottom: 15,
        fontSize: 16
    },
    err: {
        color: "red",
    }
});

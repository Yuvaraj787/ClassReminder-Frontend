import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import ipAddr from "../functions/ip_addr"
import { useFocusEffect } from '@react-navigation/native';

const CoursesDisplay = () => {
    const navigate = useNavigation();
    const [theoryCourses, settheoryCourses] = useState([])
    const [labCourses, setlabCourses] = useState([])

    // const theoryCourses = [
    //     {name:"Internet of Things", faculty: "Selvi Ravindran"},
    //     {name:"Distributed Systems", faculty :"Swaminathan"},
    //     {name:"Internet of Things", faculty: "Selvi Ravindran"},
    //     {name:"Distributed Systems", faculty :"Swaminathan"},
    //     {name:"Internet of Things", faculty: "Selvi Ravindran"},
    // ]

    // const labCourses = [
    //     {name:"Data Analytics Laboratory", faculty: "Bama"},
    //     {name:"IoT Laboratory", faculty :"Selvi Ravindran"},
    //     {name:"Socially relavant Project laboratory", faculty: "Jasmine"},
    // ]

    useEffect(() => {
        GetCourses()
        console.log("course fetching")
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            GetCourses()
            console.log("course fetching")
        }, [])
    );

    const GetCourses = async () => {
        var roll = await AsyncStorage.getItem("roll");
        console.log(roll)
        const res = await axios({
            url: `http://${ipAddr}:3000/user/getMyCourses`,
            method: "get",
            params: { roll }
        });
        console.log(res.data)
        var l = []
        var t = []

        res.data.forEach(course => {
            console.log(course)
            if (course.type == "Theory") {
                t.push(course);
            } else {
                l.push(course);
            }
        });
        settheoryCourses(t)
        setlabCourses(l)
        console.log(res.data)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <View style={styles.sectionHead} >
                    <Text style={styles.headText}>Theories Courses</Text>
                </View>
                <View style={styles.sectionBody}>
                    {
                        theoryCourses.map((course, ind) => {
                            return <View style={styles.courseBox} id={ind + ""}>
                                <Text style={styles.courseText}>{course.name}</Text>
                                <Text style={styles.facultyText}>{course.faculty}</Text>
                            </View>
                        })
                    }
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHead}>
                    <Text style={styles.headText} >Laboratory Courses</Text>
                </View>
                <View style={styles.sectionBody}>
                    {
                        labCourses.map((course, ind) => {
                            return <View style={styles.courseBox} id={(100 + ind) + ""}>
                                <Text style={styles.courseText}>{course.name}</Text>
                                <Text style={styles.facultyText}>{course.faculty}</Text>
                            </View>
                        })
                    }
                </View>
            </View>
            <Pressable onPress={() => {
                console.log("pressed")
                navigate.navigate("AddCourse")
            }}
                style={styles.buttonBox}>

                <Ionicons name="add" size={50} color="white" />

            </Pressable>
            <View style={{ height: 20 }}>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 5,

    },
    section: {

    },
    sectionHead: {
        margin: 13
    },
    headText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    sectionBody: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 13,
        rowGap: 13,
        justifyContent: "",
        margin: "auto",
        marginLeft: 13
    },
    courseBox: {
        padding: 25,
        backgroundColor: "#E5D4FF",
        borderRadius: 15,
        flexBasis: "45%",
        elevation: 5
    },
    courseText: {
        fontSize: 17,
        fontWeight: "500"
    },
    buttonBox: {
        position: "absolute",
        bottom: 10,
        right: 20,
        backgroundColor: "green",
        borderRadius: 10,
        padding: 7, marginBottom: 20
    }

})

export default CoursesDisplay
import { View, Text, StyleSheet, Pressable, ScrollView, Modal, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ipAddr from "../functions/ip_addr"
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faA, faP } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../Components/loading';

const AttendanceDisplay = () => {
    const navigate = useNavigation();
    const [theoryCourses, settheoryCourses] = useState([])
    const [labCourses, setlabCourses] = useState([])
    const [loading,setLoading]=useState(true);

    const [open, setOpen] = useState(false)
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
            url: `https://${ipAddr}/user/getMyCourses`,
            method: "get",
            params: { roll }
        })

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
        //console.log(res.data)
        setLoading(false)
    }

    const [subName, setSubName] = useState("")
    const [att, setAtt] = useState([])

    const viewAtt = async (courseNo) => {
        const name = await AsyncStorage.getItem("name");
        const roll = await AsyncStorage.getItem("roll");

        const res = await axios({
            url: `https://${ipAddr}/att/getAtt`,
            method: "get",
            params: { roll, courseNo }
        })
        console.log(res.data)
        setAtt(res.data)

    }
    return (
        loading?<LoadingSpinner/>:
        <ScrollView style={styles.container}>

            <Modal
                visible={open}
                transparent={true}
                onRequestClose={() => {
                    setOpen(false);
                }}
                animationType="fade"
            >
                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>


                    <View style={styles.floatView}>
                        <View style={styles.floatForm}>
                            <View style={styles.formChild}>
                                <Text style={styles.formHead}>{subName}</Text>
                            </View>

                            <View style={styles.formBody}>
                                {/* <FlatList
                                    data={att}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.body}>
                                            <View style={styles.leftBody}>
                                                <Text style={{ fontSize: 16 }}>{item.date}</Text>
                                            </View>
                                            <View style={styles.rightBody}>
                                                <Text style={{ fontSize: 16 }}>hour-{item.hour}</Text>
                                                <View>
                                                    {item.isPresent ? (
                                                        <FontAwesomeIcon icon={faP} size={15} color="black" />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faA} size={15} color="black" />
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                /> */}

                                {att.map((row, index) => (
                                    <View style={styles.body}>
                                        <View style={styles.leftBody}>
                                            <Text style={{ fontSize: 16 }} >{row.date}</Text>
                                        </View>
                                        <View style={styles.rightBody}>
                                            <Text style={{ fontSize: 16 }}>hour-{row.hour}</Text>
                                            <View>
                                                {row.isPresent ? <FontAwesomeIcon icon={faP} size={15} color="black" /> : <FontAwesomeIcon icon={faA} size={15} color="black" />}
                                            </View>
                                        </View>
                                    </View>
                                ))}

                            </View>
                            <View style={styles.formChild}>
                                <Button title="close" onPress={() => setOpen(false)} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>


            <View style={styles.section}>
                <View style={styles.sectionHead} >
                    <Text style={styles.headText}>Theory Courses</Text>
                </View>
                <View style={styles.sectionBody}>
                    {
                        theoryCourses.map((course, ind) => {
                            return <View style={styles.courseBox}>
                                {/* <Pressable style={[styles.courseBox, { elevation: 20 }]} id={ind + ""} onPress={() => {
                                    viewAtt(course.courseNo)
                                    setSubName(course.name)
                                    setOpen(true)

                                }}> */}
                                    <Text style={styles.courseText}>{course.name}</Text>
                                    <Text style={styles.facultyText}>{course.staff}</Text>
                                {/* </Pressable> */}
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
                            return <View style={styles.courseBox}>
                                {/* <Pressable style={} id={ind + ""} onPress={() => {
                                    viewAtt(course.courseNo)
                                    setSubName(course.name)
                                    setOpen(true)

                                }}> */}
                                    <Text style={styles.courseText}>{course.name}</Text>
                                    <Text style={styles.facultyText}>{course.staff}</Text>
                                {/* </Pressable> */}
                            </View>
                        })
                    }
                </View>
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
        alignItems: "center"

    },
    sectionHead: {
        margin: 13
    },
    headText: {
        fontSize: 20,
        fontWeight: "bold",

    },
    sectionBody: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 13,
        rowGap: 13,
        margin: "auto",
        //marginLeft: 13,
        justifyContent: "center",
        marginBottom: 20
    },
    courseBox: {
        padding: 25,
        backgroundColor: "#F8F6E3",
        borderRadius: 15,
        flexBasis: "95%",
        elevation: 5
    },
    courseText: {
        fontSize: 20,
        fontWeight: "400",
        //textAlign: "center",
        marginBottom: 10
    },
    buttonBox: {
        position: "absolute",
        bottom: 10,
        right: 20,
        backgroundColor: "green",
        borderRadius: 10,
        padding: 7, marginBottom: 20
    },

    formBody: {
        display: "flex",
        flexDirection: "column",
        rowGap: 10,
        minWidth: 200,
    },
    formChild: {
    },
    floatView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "80%",
        backgroundColor: "rgba(0,0,0,0.1)",

    },
    floatForm: {
        padding: 20,
        backgroundColor: "#FFF7F1",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20
    },
    formHead: {
        fontSize: 20
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: 10,
        width: 200,
        //maxHeight: 200,




    },
    leftBody: {
    },
    rightBody: {
        flexDirection: "row",
        columnGap: 20,
        alignItems: "center"
    }

})

export default AttendanceDisplay
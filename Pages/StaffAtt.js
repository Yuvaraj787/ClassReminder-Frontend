import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Button } from "react-native"
//import CheckBox from '@react-native-community/checkbox';
//import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CheckBox from 'react-native-check-box';
import ipAddr from "../functions/ip_addr";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import timeToHour from "../functions/currentHour";
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faA } from '@fortawesome/free-solid-svg-icons';

export default function Att() {
    const [date, setdate] = useState(0)
    const [currentDay, setCurrentDay] = useState(3);
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hours, setHours] = useState([])
    const [currentHour, setCurrentHour] = useState(1);
    const [open, setOpen] = useState(false)
    const [StaffName, setStaffName] = useState("")
    const [studentList, setstudentList] = useState([])
    const [studentStatus, setStudentStatus] = useState({})
    const [CurrentPeriod, setCurrentPeriod] = useState(1)
    //const [selectedRow, setSelectedRow] = useState(null);

    const getScheduleOfStaff = async () => {
        var name = await AsyncStorage.getItem("name");
        setStaffName(name)
        console.log(name)
        //setCurrentDay(currentTime.getDay()) 
        try {

            const res = await axios({
                url: "http://" + ipAddr + ":3000/att/getSchedule",
                params: { staffName: name },
                method: "get"
            })
            console.log(res.data[days[currentDay]])
            setHours(res.data[days[currentDay]])
            console.log(days[currentDay])
            // console.log(res.data)
            //console.log(res.data[days[currentDay]])
            // console.log("hi")

        } catch (err) {
            console.log("Error  in retrieving schedule :", err.message)
        }

    }


    useEffect(() => {
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        setdate(formattedDate)
        getScheduleOfStaff()
        var currentHour = timeToHour(currentTime.getHours(), currentTime.getMinutes());
        console.log("Current hour : ", currentHour);
        setCurrentHour(currentHour)
        //console.log(formattedDate);
    }, [])

    useEffect(() => {
        if (studentList.length > 0) {

            const initialStudentStatus = {};
            studentList.forEach(student => {
                initialStudentStatus[student.roll] = false;
            });
            setStudentStatus(initialStudentStatus);
            setOpen(true);
        }
    }, [studentList]);

    const handleCheckboxChange = (studentId) => {
        setStudentStatus(prevState => ({
            ...prevState,
            [studentId]: !prevState[studentId]
        }));
    }

    const SubmitAttendance = async (course_No, Atthour) => {
        try {
            console.log(Atthour)
            const res = await axios({
                url: "http://" + ipAddr + ":3000/att/submitAtt",
                params: { Date: date, course_No, Att: studentStatus, Atthour, StaffName },
                method: "post"
            })

        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Date : {date}</Text>
            {/*Top for atendence of that day*/}

            <View style={styles.top}>
                {hours.length > 0 ?
                    hours.map((row, index) => {
                        return (
                            <Pressable style={styles.box} onPress={async () => {
                                // console.log("Attendence opened")
                                try {
                                    const res = await axios({
                                        url: "http://" + ipAddr + ":3000/att/getStudentsList",
                                        params: { staff: row.staff, courseNo: row.course_No },
                                        method: "get"
                                    })
                                    setCurrentPeriod(row.hour)
                                    //console.log(res.data)
                                    setstudentList(res.data)
                                    //setSelectedRow(row)
                                    // console.log(studentList)
                                    console.log("Attendence opened")


                                } catch (err) {
                                    console.log("Error in  getting student list: ", err.message)
                                }

                            }}>
                                <View style={styles.rowLeft}>
                                    <Text style={{ fontSize: 20 }}>{row.hour}</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    <Text style={{ fontSize: 18, textAlign: "center" }}>{row.courseName}</Text>
                                </View>

                                <Modal
                                    visible={open}
                                    transparent={true}
                                    onRequestClose={() => {
                                        setOpen(false);
                                    }}
                                    animationType="fade"
                                    key={index}
                                >
                                    <View style={styles.floatView}>
                                        <View style={styles.floatForm}>
                                            <View style={styles.formChild}>
                                                <Text style={[{ fontSize: 10 }, styles.formHead]}>{CurrentPeriod}-{row.courseName}</Text>
                                                <Text style={styles.formHead}>List of Students Enrolled</Text>
                                            </View>
                                            <View style={styles.formBody}>

                                                {studentList.length > 0 ?
                                                    studentList.map((student, index) => (
                                                        <View style={styles.body}>
                                                            <View style={styles.leftBody}>
                                                                <Text key={index}>{index + 1} - {student.name}</Text>
                                                            </View>
                                                            <View style={styles.rightBody}>
                                                                <CheckBox
                                                                    isChecked={studentStatus[student.roll]}
                                                                    checkBoxColor="transparent"
                                                                    onClick={() => handleCheckboxChange(student.roll)}
                                                                    checkedImage={<Icon name="check-circle" size={24} color="green" />}
                                                                    unCheckedImage={<Icon name="circle-o" size={24} color="gray" />}
                                                                />
                                                                <View>
                                                                    {
                                                                        studentStatus[student.roll] ? <></> : <FontAwesomeIcon icon={faA} size={15} color="black" />

                                                                    }
                                                                </View>

                                                            </View>

                                                        </View>
                                                    ))
                                                    : <View><Text>Not fetched</Text></View>
                                                }
                                            </View>
                                            <View style={styles.formChild}>
                                                <Button title="Submit" onPress={() => {
                                                    console.log("Submiting Att")

                                                    SubmitAttendance(row.course_No, CurrentPeriod)
                                                    //console.log(studentStatus)
                                                    setOpen(false)
                                                }}
                                                />
                                            </View>
                                            <View style={styles.formChild}>
                                                <Button title="close" onPress={() => setOpen(false)} />
                                            </View>

                                        </View>
                                    </View>
                                </Modal>
                                {/* <AttendanceModal
                                    isOpen={selectedRow !== null}
                                    onClose={() => setSelectedRow(null)}
                                    row={selectedRow}
                                    studentList={studentList}
                                    studentStatus={studentStatus}
                                    handleCheckboxChange={handleCheckboxChange}
                                    SubmitAttendance={SubmitAttendance} /> */}
                            </Pressable>
                        )
                    })
                    :
                    <View>
                        <Text style={{ fontSize: 23, textAlign: "justify", marginLeft: 10 }}>Dear {StaffName} ,</Text>
                        <Text style={{ fontSize: 20, textAlign: "justify", margin: 20 }}>
                            We regret to inform you that there are no classes scheduled for you today.
                            Thank you ! -
                            RTCRS</Text>
                    </View>
                }

            </View >
            {/* bottom to past Attendance button */}
            <View style={styles.bottom}>
                <Text>Download Past Attendance here</Text>
                <Pressable style={styles.box}>
                    <Text style={{ fontSize: 20 }}>Download Past Attendance</Text>
                </Pressable>
            </View>
        </View >

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    top: {
        flex: 2,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        borderColor: "black",
        borderWidth: 1,
        width: 350,
        height: 100,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f5f5f5",
        elevation: 10,
        borderRadius: 30,
        flexDirection: "row",
    },
    rowLeft: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        marginRight: 5,
        paddingRight: 6
    },
    rowRight: {
        flex: 3
    },

    formBody: {
        display: "flex",
        flexDirection: "column",
        rowGap: 10
    },
    formChild: {
    },
    floatView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    floatForm: {
        padding: 20,
        backgroundColor: "#FFF7F1",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "silver",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20
    },
    formHead: {
        fontSize: 20,
        alignSelf: "center",
        justifyContent: "center"
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: 10,
        width: 200,


    },
    leftBody: {
    },
    rightBody: {
        flexDirection: "row",
        columnGap: 20,
        alignItems: "center"
    }

})
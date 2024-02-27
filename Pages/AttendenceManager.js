import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import Iuri from "../assets/sample_profile.jpg"
import Attendence from "../Components/att.json"

const BunkManager = () => {
    const [pressedIndex, setPressedIndex] = useState(-1);
    const [Att, setAtt] = useState(Attendence)
    const [averagePercentage, setAveragePercentage] = useState(100)

    useEffect(() => {
        calculateAveragePercentage()
    }, [Att])

    const calculateAveragePercentage = () => {
        let totalPercentage = 0;
        Att.forEach((row) => {
            const total = parseInt(row.totalHours);
            const missed = parseInt(row.classMissed);
            const percentage = ((total - missed) / total) * 100;
            totalPercentage += percentage;
        });
        const averagePercentage = totalPercentage / Att.length;
        setAveragePercentage(averagePercentage);
    }

    const handleBoxPress = (index) => {
        setPressedIndex(index);
    }

    const handleClose = (index) => {
        setPressedIndex(index === pressedIndex ? -1 : index);
    }
    const handleMissed = (index, skips, action) => {
        const updatedAtt = [...Att];
        const missed = parseInt(updatedAtt[index].classMissed);
        if (action === 'add' && (skips - missed) > 0) {
            updatedAtt[index].classMissed = (missed + 1).toString();
        } else if (action === 'remove' && missed > 0) {
            updatedAtt[index].classMissed = (missed - 1).toString();
        }
        setAtt(updatedAtt)
    }

    return (
        <ScrollView>
            <View>
                <View style={styles.topContainer}>
                    <View style={{ backgroundColor: "#fff", height: 100, width: 100, borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 30, fontFamily: "monospace" }}>{averagePercentage.toFixed(0)}%</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: 30 }}>Average Percentage</Text>
                    </View>
                </View>
            </View>
            <View style={styles.midContainer}>
                {
                    Att.map((row, index) => {
                        const total = parseInt(row.totalHours)
                        const missed = parseInt(row.classMissed)
                        const Percentage = ((total - missed) / total) * 100
                        const skip = row.type == 'L' ? 15 : 11
                        return (
                            <Pressable
                                onPress={() => { handleBoxPress(index) }}
                            >
                                <View style={[styles.Box, { height: pressedIndex === index ? 130 : 80 }]}>
                                    {/* left container */}
                                    <View>
                                        {row.type == "T" ? <Ionicons name="book" size={24} color="black" /> : ""}
                                        {row.type == "L" ? <Ionicons name="laptop" size={24}></Ionicons> : ""}
                                        {row.type == "E" ? <Ionicons name="bulb" size={24} color="black" /> : ""}
                                    </View>

                                    <View style={styles.mid}>
                                        <Pressable onPress={() => { handleClose(index) }}>
                                            <Text style={[styles.subjectText, {
                                                fontSize: pressedIndex === index ? 21 : 18,
                                                //bottom: pressedIndex === index ? 20 : 0,
                                                transform: [{ translateY: pressedIndex === index ? -15 : 0 }],
                                                justifyContent: "center"
                                            }]}>{row.subject}</Text>
                                        </Pressable>
                                        {pressedIndex === index ? <View style={styles.details}>
                                            <Text>Classes Missed :  {missed}</Text>
                                            <Text>{skip - missed === 0 ? "No skips left" : <Text>Skips Left : {skip - missed}</Text>}</Text>
                                            <Text>Percentage : {Percentage.toFixed(0)}</Text>
                                        </View> : ""}
                                    </View>
                                    <View style={styles.right}>
                                        {pressedIndex === index ? <View style={styles.rightPressed}>
                                            {/* for plus and minuS */}

                                            <Pressable onPress={() => handleMissed(index, skip, "add")} >
                                                <View style={styles.iconBox}>
                                                    <Ionicons name="add" size={30}></Ionicons>
                                                </View>

                                            </Pressable>

                                            <Pressable onPress={() => handleMissed(index, skip, "remove")}>
                                                <View style={styles.iconBox}>

                                                    <Ionicons name="remove" size={30}></Ionicons>
                                                </View>

                                            </Pressable>

                                        </View>
                                            : <Text style={{ fontSize: 18 }}>{Percentage.toFixed(0)} %</Text>
                                        }
                                    </View>
                                </View>
                            </Pressable>
                        )
                    })
                }

            </View>
            <View style={{ height: 80 }}>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10
        },
        textContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        topContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 30,
            padding: 20,
            backgroundColor: "#F2EFE5",
            borderRadius: 20,
            elevation: 20,
            //borderWidth: 1,
            // borderColor: "silver"
        },
        Box: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            marginLeft: 20,
            marginRight: 20,
            padding: 20,
            backgroundColor: "#F2EFE5",
            borderRadius: 20,
            elevation: 5,
            flexDirection: "row",
            justifyContent: "space-between"
        },
        subjectText: {
            fontFamily: "monospace",
            position: "relative",
            // textAlign: 'center',
        },
        midContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        mid: {
            justifyContent: "center"

        },
        details: {
            justifyContent: "center",
            alignItems: "center"

        },
        right: {
            justifyContent: "center",
            alignItems: "center",
        },
        rightPressed: {
            flexDirection: "column",
            height: 100,
            justifyContent: "space-around"
        },
        iconBox: {
            //height: 45,
            backgroundColor: "#fff",
            padding: 5,
            borderRadius: 10,
            //marginBottom: 5,
            elevation: 10

        }
    }
)

export default BunkManager
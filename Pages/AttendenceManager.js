import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import Iuri from "../assets/sample_profile.jpg"
import Att from "../Components/att.json"

const Profile = () => {
    const userDetails = {
        name: "Yuvaraj V",
        dept: "B.Tech Information Technology"
    }
    return (
        <ScrollView>
            <View>
                <View style={styles.topContainer}>
                    <View style={{ backgroundColor: "#fff", height: 100, width: 100, borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 30, fontFamily: "monospace" }}>95%</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: 30 }}>Average Percentage</Text>
                    </View>
                </View>
            </View>
            <View style={styles.midContainer}>

                {
                    Att.map((row, index) => {
                        //console.log(row.subject)
                        return (
                            <Pressable>
                                <View style={styles.Boxes}>

                                    <Text>{row.subject}</Text>
                                </View>
                            </Pressable>
                        )
                    })
                }

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
            alignItems: "center"
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
            elevation: 10,
            // borderWidth : 2,
            // borderColor : "silver"
        },
        Boxes: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            padding: 20,
            backgroundColor: "#F2EFE5",
            borderRadius: 20,
            elevation: 10,
            flexBasis: "39%",
        },
        midContainer: {
            display: "flex",
            flexDirection: "column",
        }
    }
)

export default Profile
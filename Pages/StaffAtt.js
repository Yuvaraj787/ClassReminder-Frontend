import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native"
import { block } from "react-native-reanimated";

export default function Att() {
    return (
        <View style={styles.container}>
            {/*Top for atendence of that day*/}
            <View style={styles.top}>
                <View style={styles.box}>

                </View>
                <View style={styles.box}>

                </View>
                <View style={styles.box}>

                </View>
                <View style={styles.box}>

                </View>
            </View >
            {/* bottom to past Attendance button */}
            <View style={styles.bottom}>
                <Pressable style={styles.box}>
                    <Text style={{ fontSize: 20 }}>Download Past Attendance</Text>
                </Pressable>
            </View>
        </View>

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
        flex: 4,
    },
    bottom: {
        flex: 1,
    },
    box: {
        borderColor: "black",
        borderWidth: 1,
        width: 350,
        height: 100,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f5f5f5"
    }
})
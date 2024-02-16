import { StyleSheet, View, Text, ScrollView, FlatList, Alert, Pressable } from "react-native"
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import Info from "../Components/info.json"
//import SweetAlert from 'react-native-sweet-alert';

export default function Notification() {
    const handlePress = (info, detail) => {
        console.log(info)
        Alert.alert(info, detail, [{ text: "OK", onPress: () => console.log('OK Pressed') }], { cancelable: true });
    }

    // const handlePress = (info, detail) => {
    //     if (SweetAlert) {
    //         SweetAlert.showAlertWithOptions({
    //             title: info,
    //             subTitle: detail,
    //             confirmButtonTitle: 'OK',
    //             confirmButtonColor: '#000',
    //             style: 'success', // or 'error', 'warning', 'info'
    //         });
    //     } else {
    //         console.error('SweetAlert is not available.');
    //     }
    // };

    return (
        <View style={styles.container}>
            <FlatList
                data={Info}
                renderItem={({ item }) => {

                    return (
                        <Pressable onPress={() => { handlePress(item.info, item.detail) }}>
                            <View style={styles.periodsRow}>
                                <View style={styles.rowLeft}>
                                    <Text style={{ fontSize: 20 }}>{item.date}</Text>
                                    <Text>{item.month}</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    <View style={styles.rowTop}>
                                        <Text style={{ fontSize: 20 }}>{item.info}</Text>
                                        <Text>{item.detail}</Text>

                                    </View>
                                    <View style={styles.rowBottom}>
                                        <View style={{ flex: 2, justifyContent: "flex-start" }}><Text><Ionicons name="person" size={15} color="black" /> {item.staff}</Text></View>
                                        <Text style={{ flex: 1 }}>    <Ionicons name="time" size={15} color="black" /> {item.time}</Text>
                                    </View>
                                </View>

                            </View>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    periodsRow: {
        backgroundColor: "white",
        padding: 10,
        width: "100%",
        marginBottom: 5,
        flexDirection: "row",
        marginTop: 5,
        borderColor: "silver",
        borderWidth: 1,
        borderRadius: 25,
        elevation: 5

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
        flex: 9
    },
    rowTop: {
        flex: 1,
        //marginLeft: 30
        paddingLeft: 10
    },
    rowBottom: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,

    }
})
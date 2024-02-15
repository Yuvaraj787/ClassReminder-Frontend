import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native"
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import Info from "../Components/info.json"

export default function Notification() {
    return (
        <View style={style.container}>
            <FlatList
                data={Info}
                renderItem={({ item }) => {

                    return (
                        <View>
                            <Text>Im notification {Info.info}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {

    },
})
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native"
import { useState, useEffect } from "react";
import Schedule from "../Components/Schedule.json"
export default function DashBoard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        // console.log(currentTime.toLocaleTimeString())
        return () => clearInterval(interval);

    }, []);

    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return (
        <View style={styles.main}>
            {/* top container */}
            <View style={styles.top}>
                {/*First view for welcome msg */}
                <View>
                    <Text style={{
                        fontSize: 25, fontFamily: "monospace",
                        fontWeight: "bold"
                    }}>Welcome</Text>
                    <Text style={styles.nametext}><Text style={{
                        fontSize: 30, fontFamily: "monospace",
                    }}>Dhanushkumar </Text><Text>B.tech IT</Text></Text>
                </View>
                {/* second view for 3 boxes */}
                <View style={styles.boxContainer} >
                    <View>
                        <View style={styles.box}>
                            <Text style={{ fontSize: 23, fontFamily: "monospace" }}>11</Text>
                            <Text style={{ width: 100, textAlign: "center", padding: 1 }}>Classes Missed</Text>
                        </View>
                    </View>
                    <View style={styles.box2}>
                        <Text style={styles.time}>{formattedTime}</Text>
                    </View>
                </View>
            </View>


            {/* bottom container */}
            <View style={styles.bottom}>
                <Text style={{ fontSize: 20, fontFamily: "monospace" }}>For upcoming classes</Text>

                <View style={styles.periods}>


                    <View>
                        <FlatList
                            data={Schedule}
                            renderItem={({ item }) => {
                                //console.log(item.Subject)
                                return (
                                    <View style={styles.periodsRow}>
                                        <View style={styles.rowLeft}>
                                            <Text style={{ fontSize: 20 }}>{item.Hour}</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <View style={styles.rowTop}>
                                                <Text style={{ fontSize: 20 }}>{item.Subject}</Text>

                                            </View>
                                            <View style={styles.rowBottom}>
                                                <View style={{ flex: 2, justifyContent: "flex-start" }}><Text>{item.staff}</Text></View>
                                                <Text style={{ flex: 1 }}>📍{item.location}</Text>
                                            </View>
                                        </View>

                                    </View>
                                )
                            }}
                        />


                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,

    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 3,
    },
    welcome: {
        flex: 1
    },
    nametext: {
        justifyContent: "center",
        marginLeft: 30
    },
    boxContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    box: {
        height: 100,
        width: 100,
        elevation: 5,
        backgroundColor: "#fff",
        // borderWidth: 1,
        //borderColor: "silver",
        borderRadius: 10,
        marginBottom: 5,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    box2: {
        //time box
        flex: 2,
        height: 120,
        elevation: 5,
        backgroundColor: "#fff",
        // borderWidth: 1,
        //borderColor: "silver",
        borderRadius: 10,
        marginBottom: 5,
        marginLeft: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    time: {
        fontSize: 30,
        fontFamily: "monospace"
    },
    periods: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",

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
        borderRadius: 10,
        elevation: 5

    },
    rowLeft: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
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
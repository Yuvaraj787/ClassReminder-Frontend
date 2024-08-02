import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, FlatList, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import ipAddr from "../functions/ip_addr"
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


function PerDay({ Schedule }) {
    return (
        <View>
            <FlatList
                data={Schedule}
                renderItem={({ item }) => {
                    //console.log(item.Subject)
                    return (
                        <View style={styles.periodsRow}>
                            <View style={styles.rowLeft}>
                                <Text style={{ fontSize: 20 }}>{item.hour}</Text>
                            </View>
                            <View style={styles.rowRight}>
                                <View style={styles.rowTop}>
                                    <Text style={{ fontSize: 20 }}>{item.courseName}</Text>

                                </View>
                                <View style={styles.rowBottom}>
                                    <View style={{ justifyContent: "flex-start" }}><Text>{item.staff}</Text></View>
                                    <Text ><Ionicons name="location" size={15} color="black" /> {item.location ? item.location : "No Location given"}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>)
}

const renderTabBar = props => (
    <TabBar
        {...props}
        scrollEnabled={true}
        indicatorStyle={{ backgroundColor: 'black' }}
        renderLabel={({ route }) => (
            <Text style={{ color: "black", margin: 8, fontWeight: "bold", fontSize: 17 }}>
                {route.title}
            </Text>
        )}
        gap={1}
        style={{ backgroundColor: '#B5C0D0', overflowX: "scroll" }}
    />
);



export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Monday' },
        { key: 'second', title: 'Tuesday' },
        { key: 'third', title: 'Wednesday' },
        { key: 'fourth', title: 'Thursday' },
        { key: 'fifth', title: 'Friday' }
    ]);

    const [sch, setSch] = React.useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    })
    const renderScene = SceneMap({
        first: () => <PerDay Schedule={sch.monday} />,
        second: () => <PerDay Schedule={sch.tuesday} />,
        third: () => <PerDay Schedule={sch.wednesday} />,
        fourth: () => <PerDay Schedule={sch.thursday} />,
        fifth: () => <PerDay Schedule={sch.friday} />
    });
    React.useEffect(() => {
        async function fetchSchedule() {
            try {
                var token_n = await AsyncStorage.getItem("token")
                var data = await Axios({
                    url: "https://" + ipAddr + "/user/weeklySchedule",
                    method: "get",
                    params: {
                        token: token_n
                    }
                })

                // "thursday": [{"courseCode": "IT5020", "courseName": "Social Network Analysis", "hour": 3, "location": "KP 406", "staff": "Mala"}, {"courseCode": "IT5701", "courseName": "Artificial Intelligence", "hour": 3, "location": "KP 301", "staff": "Senthil Kumar"}, {"courseCode": "IT5020", "courseName": "Social Network Analysis", "hour": 4, "location": "KP 406", "staff": "Mala"}, {"courseCode": "IT5701", "courseName": "Artificial Intelligence", "hour": 4, "location": "KP 301", "staff": "Senthil Kumar"}, {"courseCode": "IT5601", "courseName": "Internet of Things Theory", "hour": 7, "location": "Kp 4056", "staff": "Selvi Ravindran"}],
                
                // console.log("weekly schedule : ", data.data.schedule.thursday)

                var sorted_schedule = data.data;
                Object.keys(sorted_schedule).forEach(day => {
                    sorted_schedule[day].sort((a, b) => a.hour - b.hour)
                })

                console.log("yes it ")

                console.log(sorted_schedule);
                
                console.log("yes it ")

                setSch(sorted_schedule);

                // setLoading(false);
            } catch (err) {
                console.log("Error in getting weekly schedule 1 : ", err.message)
            }
        }
        fetchSchedule();
    }, [])
    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            overScrollMode={"always"}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
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
        fontFamily: "monospace",
        marginBottom: 5
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
        flexGrow: 1,
    }

})
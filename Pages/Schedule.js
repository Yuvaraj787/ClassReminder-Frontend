import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, FlatList, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import Schedule from "../Components/Schedule.json"

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

function PerDay() {
    return (
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
                                    <View style={{ flex: 2, justifyContent: "flex-start" }}><Text><Ionicons name="person" size={15} color="black" /> {item.staff}</Text></View>
                                    <Text style={{ flex: 1 }}>    <Ionicons name="location" size={15} color="black" /> {item.location}</Text>
                                </View>
                            </View>

                        </View>
                    )
                }}
            />
            <Text>Hello</Text>
        </View>)
}

const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled={true}
      indicatorStyle={{ backgroundColor: 'black' }}
      renderLabel={({route}) => (
        <Text style={{ color: "#black", margin: 8, fontWeight:"bold", fontSize:17 }}>
          {route.title}
        </Text>
      )}
      gap={1}
      style={{ backgroundColor: '#B5C0D0', overflowX:"scroll" }}
    />
  );
  

const renderScene = SceneMap({
  first: PerDay,
  second: PerDay,
  third: PerDay,
  fourth : PerDay,
  fifth : PerDay
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Monday' },
    { key: 'second', title: 'Tuesday' },
    { key: 'third', title: 'Wednesday' },
    { key: 'fourth', title: 'Thrusday' },
    { key: 'fifth', title: 'Friday' }
  ]);

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

    }

})

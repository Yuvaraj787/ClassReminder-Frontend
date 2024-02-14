import { StyleSheet, View, Text, ScrollView } from "react-native"

export default function DashBoard() {
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
                    <View style={styles.box}>

                    </View>
                    <View style={styles.box}>

                    </View>
                    <View style={styles.box}>

                    </View>
                </View>
            </View>


            {/* bottom container */}
            <View style={styles.bottom}>
                <Text>For upcoming classes</Text>
                <View style={styles.periods}>
                    <View style={styles.periodsRow}>
                        <Text>Hours</Text>
                        <Text>Subject</Text>
                        <Text>Faculty</Text>
                    </View>
                    <View style={styles.periodsRow}>
                        <Text>Hour 1</Text>
                    </View>
                    <View style={styles.periodsRow}>
                        <Text>Hour 1</Text>
                    </View>
                    <View style={styles.periodsRow}>
                        <Text>Hour 1</Text>
                    </View>
                    <View style={styles.periodsRow}>
                        <Text>Hour 1</Text>
                    </View>
                    <View style={styles.periodsRow}>
                        <Text>Hour 1</Text>
                    </View>
                    <View style={styles.periodsRow}>
                        <Text>Hour 1</Text>
                    </View>
                    <View style={styles.periodsRow}>
                        <Text>Hour 1</Text>
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
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 10,
        margin: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    periods: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    periodsRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",

    }

})
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import Iuri from "../assets/sample_profile.png"


const Profile = () => {
    const userDetails = {
     name: "Yuvaraj V",
     dept: "B.Tech Information Technology"   
    }
  return (
    <View>
        <View>
            <View style={styles.topContainer}>
                <Image source={require("../assets/sample_profile.jpg")} style={{height: 150, width : 150, borderRadius: 100}} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{userDetails.name}</Text>
                    <Text style={styles.dept}>{userDetails.dept}</Text>
                 </View>
                 <Feather name="edit" size={24} color="black" style={{position: "absolute", right : 15, top: 15}} />
            </View>
        </View>
        <View style={styles.midContainer}>
            <View style={styles.btnBoxes}>
              
            </View>
            <View style={styles.btnBoxes}>
              
            </View>
            <View style={styles.btnBoxes}>
              
            </View>
            <View style={styles.btnBoxes}>
              
            </View>
            <View style={styles.btnBoxes}>
              
            </View>
            <View style={styles.btnBoxes}>
              
            </View>
        </View>
    </View>
  )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems : "center"
    },
    name: {
        fontSize: 30
    },
    dept: {
        fontSize: 15
    },
    textContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems:"center"
    },
    topContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        margin : 20,
        padding: 20,
        backgroundColor : "#F2EFE5",
        borderRadius: 20,
        elevation: 10,
        // borderWidth : 2,
        // borderColor : "silver"
    },
    btnBoxes : {
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        margin : 20,
        padding: 50,
        backgroundColor : "#F2EFE5",
        borderRadius: 20,
        elevation: 10,
        flexBasis: "39%",
    },
    midContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap : "wrap",
    }
}

export default Profile
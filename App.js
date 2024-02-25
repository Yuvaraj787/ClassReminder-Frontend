import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';
import React, { useState, useEffect, createContext, useContext } from 'react'
// import SkeletonContent from 'react-native-skeleton-content'
import Login from "./Pages/login";
import AddCourse from "./Pages/AddCourse";
import DashBoard from "./Pages/Dashboard";
import SignUp from "./Pages/Signup";
import Notification from './Pages/Notifications';
import Profile from "./Pages/Profile";
import Attendence from './Pages/AttendenceManager';
import ipAddr from "./functions/ip_addr";
import axios from 'axios';
import StaffLogin from "./Pages/staffLogin"
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Schedule from './Pages/Schedule';
import CoursesDisplay from './Pages/coursesDisplay';
import registerNNPushToken from 'native-notify';
import { registerIndieID, unregisterIndieDevice } from 'native-notify';

// import { registerForPushNotificationsAsync } from './functions/notify_sender';



const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const LogContext = createContext(null);

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  useEffect(() => {
    var tok, roll;
    async function fetch() {
      try {
        tok = await AsyncStorage.getItem("token");
        roll = await AsyncStorage.getItem("roll");
      } catch (err) {
        console.log("Error in app.js token and roll fetching : ",err.message)
      }
      if (!tok) {
        setLoggedIn(false);
        setLoading(false);
        console.log("INFO : No Auth token", tok)
        return;
      }
      console.log("INFO: Auth Token is present")
      console.log(tok, roll)
      axios({
        url: "http://"+ipAddr+":3000/auth/verify",
        method: "POST",
        params: { token: tok }
      }).then(res => {
        if (res.data.success) {
          console.log(res.data, roll)

          if (res.data.roll === roll) {
                   
            setLoggedIn(true);
          }
        }
        setLoading(false);
      }).catch(err => {
        console.log("ERROR:  In verifying token", err.message);
      })
    }
    fetch();

  }, [])
  return (
    loading ? <Loading /> :
      <>
          <LogContext.Provider value={setLoggedIn}>
            {!isLoggedIn ?
            <NavigationContainer>
             <BeforeLogin />
            </NavigationContainer>
           :
          <NavigationContainer>
             <AfterLogin />
          </NavigationContainer>}
          </LogContext.Provider>
      </>
  )
}

export { LogContext }

function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

function AfterLogin({setLoggedIn}) {
  return (
    <>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 30, marginTop: 10 }}
              onPress={() => {
                console.log("Notification Pressed");
                navigation.navigate("Notification");
              }}
            >
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          )
        })}
      >
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="AddCourse" component={AddCourse} options={{headerTitle:"Add a Course"}} />
        <Stack.Screen name="CourseDisplay" component={CoursesDisplay} options={{headerTitle:"My Courses"}} />
        <Stack.Screen name="Attendence" component={Attendence} />
        <Stack.Screen name="Dashboard" component={DashBoard} />
        <Stack.Screen name="Schedule" component={Schedule} />
      </Stack.Navigator>
    </>
  )
}

function MainScreen({setLoggedIn}) {
  return (
    <BottomTab.Navigator initialRouteName='Dashboard'>
      <BottomTab.Screen
        name="Dashboard"
        component={DashBoard}
        // children={()=><DashBoard />}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: () => (<Ionicons name="ios-analytics" size={20} />),
          headerShown: true,
          headerTitle: "Dashboard"
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (<Ionicons name="ios-person" size={20} />),
          headerShown: true,
          headerTitle: "Profile"
        }}
      />
    </BottomTab.Navigator>
  );
}

function BeforeLogin({setLoggedIn}) {
  return (
    <BottomTab.Navigator initialRouteName='Login'>

      <BottomTab.Screen
        name="Login"
        component={Login}
        // children={() => <Login />}
        options={{
          tabBarLabel: "Student Login",
          tabBarIcon: () => (<Entypo name="login" size={20} color="black" />),
          headerShown: true,
          headerTitle: "Student Login",
        }}
        initialParams={{setLoggedIn: setLoggedIn}}
      />
      <BottomTab.Screen
        name="Signup"
        component={SignUp}
        options={{
          tabBarLabel: "Signup",
          tabBarIcon: () => (<Ionicons name="person-add-sharp" size={20} />),
          headerShown: true,
          headerTitle: "Register"
        }}
      />
      <BottomTab.Screen
        name="StaffLogin"
        component={StaffLogin}
        // children={() => <Login />}
        options={{
          tabBarLabel: "Staff Login",
          tabBarIcon: () => (<FontAwesome5 name="chalkboard-teacher" size={20} color="black" />),
          headerShown: true,
          headerTitle: "Staff Login",
        }}
        initialParams={{setLoggedIn: setLoggedIn}}
      />
    </BottomTab.Navigator>
  )
}


const styles = StyleSheet.create({
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  loadingText: {
    fontSize: 22,
    fontWeight: "bold"
  }
})
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from "react-native";
import React from 'react'
import Login from "./Pages/login";
import AddCourse from "./Pages/AddCourse";
import DashBoard from "./Pages/Dashboard";
import SignUp from "./Pages/Signup";
import Notification from './Pages/Notifications';
import Profile from "./Pages/Profile";
import Attendence from './Pages/AttendenceManager';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 30, marginTop: 10 }}
              onPress={() => {
                console.log("Notification pressed");
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
        <Stack.Screen name="AddCourse" component={AddCourse} />
        <Stack.Screen name="Attendence" component={Attendence} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <BottomTab.Navigator initialRouteName='Dashboard'>
      <BottomTab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          tabBarLabel: "Sign Up",
          tabBarIcon: () => (<Ionicons name="ios-person-add" size={20} />)
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: () => (<Ionicons name="ios-log-in" size={20} />)
        }}
      />
      <BottomTab.Screen
        name="Dashboard"
        component={DashBoard}
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
      <BottomTab.Screen
        name="AddCourse"
        component={AddCourse}
        options={{
          tabBarLabel: "Add Course",
          tabBarIcon: () => (<Ionicons name="ios-add-circle" size={20} />),
          headerShown: true,
          headerTitle: "Add Course"
        }}
      />
    </BottomTab.Navigator>
  );
}

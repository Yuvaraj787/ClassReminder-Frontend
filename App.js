import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Pages/login"
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCourse from "./Pages/AddCourse";
import Profile from "./Pages/profile";

const BottomTab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <BottomTab.Navigator initialRouteName='Login'>
        <BottomTab.Screen name="Login" component={Login} />
        <BottomTab.Screen name="Add Couse" component={AddCourse} />
        <BottomTab.Screen name="Profile" component={Profile} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}
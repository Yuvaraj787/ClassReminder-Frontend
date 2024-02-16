import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createStackNavigator } from '@react-navigation/stack';
import Login from "./Pages/login";
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCourse from "./Pages/AddCourse";
import DashBoard from "./Pages/Dashboard";
import SignUp from "./Pages/Signup";
import Notification from './Pages/Notifications';

const BottomTab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <BottomTab.Navigator initialRouteName='Dashboard'>
      <BottomTab.Screen name="SignUp" component={SignUp} />
      <BottomTab.Screen name="Dashboard" component={DashBoard} />
      <BottomTab.Screen name="Login" component={Login} />
    </BottomTab.Navigator>
  );
  <NavigationContainer>
    <BottomTab.Navigator initialRouteName='DashBoard'>
      <BottomTab.Screen name="SignUp" component={SignUp} />
      <BottomTab.Screen name="Dashboard" component={DashBoard} />
      <BottomTab.Screen name="Login" component={Login} />
      <BottomTab.Screen name="Add Couse" component={AddCourse} />
    </BottomTab.Navigator>
  </NavigationContainer>
  )

}

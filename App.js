import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./Pages/login"
import DashBoard from "./Pages/Dashboard"
import SignUp from "./Pages/Signup"

const BottomTab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>

      <BottomTab.Navigator initialRouteName='DashBoard'>
        <BottomTab.Screen name="SignUp" component={SignUp} />
        <BottomTab.Screen name="Dashboard" component={DashBoard} />
        <BottomTab.Screen name="Login" component={Login} />

      </BottomTab.Navigator>

    </NavigationContainer>
  )

}
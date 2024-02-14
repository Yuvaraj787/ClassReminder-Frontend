import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./Pages/login"


const BottomTab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>

      <BottomTab.Navigator initialRouteName='Login'>
        <BottomTab.Screen name="Login" component={Login} />

      </BottomTab.Navigator>

    </NavigationContainer>
  )

}
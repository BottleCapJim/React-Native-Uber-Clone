import { StatusBar } from "expo-status-bar";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (    
    //In react native you use view instead of div because you're developing for a non-web application
    //Navigation container allows you to navigate between different screen (pages)
    //My current screen is named home and it uses code from the component HomeScreen
    //Stack.Navigator is used to define a stack of screens to navigate through
    //Stack.Screen are the different screens in the project
    <NavigationContainer>
      <Provider store={store}>
      <TailwindProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} 
          options={{presentation:'modal', headerShown:false}}/>
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} 
          options={{presentation:'fullScreenModal', headerShown:false}}/>
          <Stack.Screen name="Delivery" component={DeliveryScreen} 
          options={{presentation:'fullScreenModal', headerShown:false}}/>
        </Stack.Navigator>
      </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}

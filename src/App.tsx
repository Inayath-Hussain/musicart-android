/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView, StyleSheet,
} from 'react-native';


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainTabStackParamList } from './config/interface';
import { route } from './routes';
import TabBar from './Navigator/TabBar';
import LoginStackNavigator from './Navigator/LoginStackNavigator';
import ProductStackNavigator from './Navigator/ProductStackNavigator';
import ShopStackNavigator from './Navigator/ShopStackNavigator';
import InvoiceStackNavigator from './Navigator/InvoiceStackNavigator';


const mainTabNavigator = createBottomTabNavigator<MainTabStackParamList>();


// main - bottom navigator
// nested - 3 stack navigator (login/register, home/product-detail, cart/checkout)

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>



      <NavigationContainer>

        <mainTabNavigator.Navigator backBehavior='history' screenOptions={{ unmountOnBlur: true }} tabBar={TabBar}>

          {/* home and product detail */}
          <mainTabNavigator.Screen name={route.home.index} options={{ title: "Home" }}
            children={(props) => <ProductStackNavigator {...props} />} />


          {/* cart and checkout */}
          <mainTabNavigator.Screen name={route.shop.index} options={{ title: "Cart" }}
            children={(props) => <ShopStackNavigator {...props} />} />


          {/* invoice list and detail */}
          <mainTabNavigator.Screen name={route.invoices.index} options={{ title: "Invoice" }}
            children={(props) => <InvoiceStackNavigator {...props} />} />


          {/* login and register */}
          <mainTabNavigator.Screen name={route.users.index} options={{ title: "Login" }}
            children={(props) => <LoginStackNavigator {...props} />} />


        </mainTabNavigator.Navigator>

      </NavigationContainer>

    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "blue",
    flex: 1
  }
})

export default App;

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

import { useSelector } from 'react-redux';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainTabStackParamList } from './config/interface';
import { route } from './routes';
import TabBar from './Navigator/TabBar';
import UserStackNavigator from './Navigator/LoginStackNavigator';
import ProductStackNavigator from './Navigator/ProductStackNavigator';
import ShopStackNavigator from './Navigator/ShopStackNavigator';
import InvoiceStackNavigator from './Navigator/InvoiceStackNavigator';
import SearchBar from './Components/Common/SearchBar';
import { useGetProductsMutation } from './store/slices/productApi';
import { productQuerySelector } from './store/slices/productQuery';



const mainTabNavigator = createBottomTabNavigator<MainTabStackParamList>();



function App(): React.JSX.Element {

  const { queryString } = useSelector(productQuerySelector);
  // useGetProductsMutation({fixedCacheKey: queryString});

  console.log(__DEV__)

  return (
    <SafeAreaView style={styles.container}>

      <NavigationContainer>

        <SearchBar />

        <mainTabNavigator.Navigator backBehavior='history' screenOptions={{ unmountOnBlur: true, headerShown: false }} tabBar={TabBar}>

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
            children={(props) => <UserStackNavigator {...props} />} />


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

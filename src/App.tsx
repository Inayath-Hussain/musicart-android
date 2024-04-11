/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useRef, useState } from 'react';

import {
  SafeAreaView, StyleSheet,
} from 'react-native';

import { useSelector } from 'react-redux';

import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainTabStackParamList } from './config/interface';
import { route } from './routes';
import TabBar from './Navigator/TabBar';
import UserStackNavigator from './Navigator/UserStackNavigator';
import ProductStackNavigator from './Navigator/ProductStackNavigator';
import ShopStackNavigator from './Navigator/ShopStackNavigator';
import InvoiceStackNavigator from './Navigator/InvoiceStackNavigator';
import SearchBar from './Components/Common/SearchBar';
import { useGetProductsQuery } from './store/slices/productApi';
import { productQuerySelector } from './store/slices/productQuery';
import Header from './Components/Common/Header';
import { navigationContext } from './contexts/navigationContext';



const mainTabNavigator = createBottomTabNavigator<MainTabStackParamList>();



function App(): React.JSX.Element {

  const { setNavigationRef } = useContext(navigationContext);

  const navigationContainerRef = useRef<NavigationContainerRef<MainTabStackParamList> | null>(null);

  const { queryString } = useSelector(productQuerySelector);
  useGetProductsQuery(queryString, { refetchOnMountOrArgChange: true });



  return (
    <SafeAreaView style={styles.container}>

      <NavigationContainer onReady={() => setNavigationRef(navigationContainerRef.current)} ref={navigationContainerRef}>

        <Header />

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

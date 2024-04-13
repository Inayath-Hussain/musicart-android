/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useRef } from 'react';

import {
  SafeAreaView, StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainTabStackParamList } from './config/interface';
import { navigationContext } from './contexts/navigationContext';
import { authCookieContext } from './contexts/authCookie';
import Header from './Components/Common/Header';
import { route } from './routes';
import InvoiceStackNavigator from './Navigator/InvoiceStackNavigator';
import ProductStackNavigator from './Navigator/ProductStackNavigator';
import ShopStackNavigator from './Navigator/ShopStackNavigator';
import TabBar from './Navigator/TabBar';
import UserStackNavigator from './Navigator/UserStackNavigator';
import { EmptyCart, getCartService } from './services/cart/getCartItems';
import { UnauthorizedError } from './services/errors';
import { getUserInfoService } from './services/user/getInfo';
import { updateCart } from './store/slices/cartItems';
import { useGetProductsQuery } from './store/slices/productApi';
import { productQuerySelector } from './store/slices/productQuery';
import { updateUserName } from './store/slices/userSlice';



const mainTabNavigator = createBottomTabNavigator<MainTabStackParamList>();



function App(): React.JSX.Element {

  const { setNavigationRef } = useContext(navigationContext);
  const { loggedIn, logout } = useContext(authCookieContext);

  const dispatch = useDispatch();

  const navigationContainerRef = useRef<NavigationContainerRef<MainTabStackParamList> | null>(null);

  const { queryString } = useSelector(productQuerySelector);
  useGetProductsQuery(queryString, { refetchOnMountOrArgChange: true });


  useEffect(() => {
    const call = async () => {
      // get user's cart data
      getCartService()
        .then(result => {
          // if user has no items in cart
          if (result instanceof EmptyCart) {
            return dispatch(updateCart(0))
          }

          dispatch(updateCart(Number(result.total_items)))
        })
        .catch(err => {
          if (err instanceof UnauthorizedError) {
            navigationContainerRef.current?.navigate(route.users.index, { screen: "login" })
            // please login again toast
            // toast("Please login again")
            return
          }

          // couldn't get cart items. please try again later toast
          // toast("Couldn't get cart items")
        })



      getUserInfoService()
        .then(name => {
          dispatch(updateUserName(name))
        })
        .catch(err => {
          if (err instanceof UnauthorizedError) {
            navigationContainerRef.current?.navigate(route.users.index, { screen: "login" })
            // please login again toast

            return
          }

          // couldn't user name. please try again later toast
          // toast("Couldn't get user name")
        })
    }

    // make api call only when user is authenticated
    if (loggedIn) {
      call()
    }
  }, [loggedIn])


  return (
    <SafeAreaView style={styles.container}>

      <NavigationContainer onReady={() => setNavigationRef(navigationContainerRef.current)} ref={navigationContainerRef}>

        <Header />

        <mainTabNavigator.Navigator backBehavior='history' screenOptions={{ unmountOnBlur: true, headerShown: false }} tabBar={(props) => <TabBar {...props} loggedIn={loggedIn} logout={logout} />}>

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

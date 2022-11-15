import React, { useEffect } from 'react'
import {
    StyleSheet,
    Dimensions,
    StatusBar,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

import Home from './app/screens/Home/index'
import StoreDetail from './app/screens/Home/StoreDetails'
import Cart from './app/screens/Home/Cart'
import Checkout from './app/screens/Home/Checkout'
import { Colors } from './app/styles/colors'

const { width, height } = Dimensions.get('window')

import { useNavigation } from '@react-navigation/native'

// import SplashScreen from 'react-native-splash-screen'

const App = () => {

    // useEffect(() => {
    //     // do stuff while splash screen is shown
    //     // After having done stuff (such as async tasks) hide the splash screen
    //     SplashScreen.hide()
    // }, [])
    // const cartt = () => navigation.navigate('Cart')

    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#303030" />
            <Stack.Navigator
                screenOptions={{
                    lazy: true,
                    headerStyle: { backgroundColor: Colors.primaryColor }, // HEADER BACKGROUND COLOR
                    headerTintColor: Colors.white,
                    contentStyle: { backgroundColor: Colors.white },
                }}
            >
                <Stack.Screen
                    name="Home" // natigation name
                    component={Home} // pass component that you want to navigate
                    options={{
                        title: '', // show title in header
                        headerShown: false, // show & hide header
                        // header: () => (<View style={{ height: 50, flexDirection:'row', }}><Text>TITLE</Text><Text>TITLE</Text></View>), //for make custom header
                        // headerStyle: {backgroundColor: '#303030',},
                        // headerTintColor: '#FF0', // for text in header
                        contentStyle: {
                            backgroundColor: '#303030',
                            width: width,
                        },
                    }}
                />
                <Stack.Screen
                    name="StoreDetail"
                    component={StoreDetail}
                    options={{
                        headerShown: false,
                        title: '',
                    }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        title: '',
                        headerShown: true,
                        headerTintColor: Colors.white, // for text in header
                    }}
                />
                <Stack.Screen
                    name="Checkout"
                    component={Checkout}
                    options={{
                        title: 'CHECK OUT',
                        headerShown: true,
                        headerTintColor: Colors.white, // for text in header
                    }}
                />
                {/* Checkout */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
})

export default App

// import React from 'react';
// import {
//     Text,
//     Dimensions,
//     TouchableOpacity
// } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();

// import Home from '../Home/images'
// import StoreDetail from '../Home/StoreDetails'
// import Cart from '../Home/Cart'
// import { Colors } from '../../styles/colors';

// const { width, height } = Dimensions.get('window');

// import { useNavigation } from '@react-navigation/native';

// const App = () => {
//     // const navigation = useNavigation();
//     // const cartt = () => navigation.navigate('Cart')

//     return (
//         <NavigationContainer>

//             <Stack.Navigator
//                 screenOptions={{
//                     lazy: true,
//                     headerStyle: { backgroundColor: Colors.black }, // HEADER BACKGROUND COLOR
//                     // headerTintColor: '#FF0',
//                     contentStyle: { backgroundColor: '#000' },
//                 }}>
//                 <Stack.Screen
//                     name="Home" // natigation name
//                     component={Home} // pass component that you want to navigate
//                     options={{
//                         title: 'Welcome', // show title in header
//                         headerShown: false, // show & hide header
//                         // header: () => (<View style={{ height: 50, flexDirection:'row', }}><Text>TITLE</Text><Text>TITLE</Text></View>), //for make custom header
//                         // headerStyle: {backgroundColor: '#303030',},
//                         // headerTintColor: '#FF0', // for text in header
//                         // whole screen elese header
//                         contentStyle: {
//                             backgroundColor: '#303030',
//                             width: width,
//                         },
//                         // headerLeft: () => ( <Text>Back</Text> ),  // for add text/Icon on left side of the header
//                         // headerRight: () => (<Image source={require('./app/assets/images/image.png')} style={{height:35, width:35,}}/>), // for add text/Icon on right side of the header
//                     }}
//                 />
//                 <Stack.Screen
//                     name="StoreDetail" // natigation name
//                     component={StoreDetail} // pass component that you want to navigate
//                     options={{
//                         title: '', // show title in header
//                         headerShown: true, // show & hide header
//                         // header: () => (<View style={{ height: 50, flexDirection:'row', }}><Text>TITLE</Text><Text>TITLE</Text></View>), //for make custom header
//                         headerStyle: {
//                             backgroundColor: Colors.primaryColor,
//                         },
//                         headerTintColor: '#FFF', // for text in header
//                         // whole screen elese header
//                         contentStyle: {
//                             backgroundColor: Colors.primaryColor,
//                             width: width,
//                         },
//                         // headerLeft: () => ( <Text>Back</Text> ),  // for add text/Icon on left side of the header
//                         // headerRight: () => (<Image source={require('./app/screens/Home/images/star-filled.png')} style={{ height: 35, width: 35, }} />), // for add text/Icon on right side of the header
//                         // headerRight: () => (
//                         //     <TouchableOpacity
//                         //         onPress={() => { 
//                         //             // cartt() 
//                         //         }}
//                         //     >
//                         //         <Text>CART</Text>
//                         //     </TouchableOpacity>
//                         // ), // for add text/Icon on right side of the header <TouchableOpacity><Text>CART</Text></TouchableOpacity>
//                     }}
//                 />
//                 <Stack.Screen
//                     name="Cart" // natigation name
//                     component={Cart} // pass component that you want to navigate
//                     options={{
//                         title: '', // show title in header
//                         headerShown: true, // show & hide header
//                         contentStyle: {
//                             backgroundColor: '#303030',
//                             width: width,
//                         },
//                     }}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };


// export default App;

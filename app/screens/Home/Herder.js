import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import { Colors } from '../../styles/colors'

const Header = ({title, logo}) =>{

    return (
        <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>{title}</Text>
            <Image source={logo} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeBox: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    welcomeText: {
        paddingHorizontal: 20,
        color: Colors.white,
        fontWeight: 'bold',
        letterSpacing: 0.9,
        lineHeight: 35,
        fontSize: 20,
    },
    image: {
        height: 40,
        width: 45,
    },
})

export default Header

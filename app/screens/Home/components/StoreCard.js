import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Colors } from '../../../styles/colors';
const { width, height } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';

const StoreCard = ({
    sId,
    image,
    rating,
    title,
    desc,
    dTime,
    minOrder,
    delivery_charges,
    onClick,
    // navigation,
    props,
    route
}) => {
    const navigation = useNavigation();
    useEffect(() => { }, []);
    // console.log(onclick)
    return (
        <View style={styles.storeCard}>
            <View>
                <ImageBackground source={{ uri: image }} resizeMode="stretch" style={styles.bgImage} >
                    <TouchableOpacity
                        activeOpacity={0.7} style={styles.touchableLink}
                        onPress={() => { navigation.navigate('StoreDetail', { store_id: sId }) }}
                    >
                        {/* RATING */}
                        <View style={styles.ratingCont}>
                            <Text style={styles.rating}>{rating}</Text>
                            <Image source={require('../images/star.png')} style={styles.star} />
                        </View>

                        {/* SHOP NAME & DISCREPTION */}
                        <View style={{ flexDirection: 'column', }}>
                            {/* <Text style={styles.title} numberOfLines={1}>{title}</Text> */}
                            {/* <Text style={styles.desc} numberOfLines={1}>{desc}</Text> */}
                        </View>
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.detailContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.heading}>{dTime} min</Text>
                        <Text style={styles.text}>Delivery time</Text>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.heading}>Rs. {minOrder}</Text>
                        <Text style={styles.text}>Mini. order</Text>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.heading}>
                            {delivery_charges == 0 ? 'Free' : `Rs. ${delivery_charges}`}
                        </Text>
                        <Text style={styles.text}>Delivery fee</Text>
                    </View>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    storeCard: {
        backgroundColor: Colors.primaryColor,
        width: width - 20,//'100%',
        marginHorizontal: 10,
        overflow: 'hidden',
        marginVertical: 6,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        maxHeight: 280,
        minHeight: 280,
    },
    bgImage: {
        overflow: 'hidden',
        // borderRadius: 10,
        width: '100%',
        height: 200,
    },
    touchableLink: {
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 15,
        height: '100%',
        width: '100%',
    },
    ratingCont: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingVertical: 2,
        borderRadius: 20,
        opacity: 0.7,
        right: 15,
        top: 10,
    },
    rating: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
    },
    star: {
        marginLeft: 4,
        height: 14,
        width: 14,
    },
    title: {
        color: Colors.white,
        fontSize: 18,
        // fontFamily: 'Rocky-Bold',
    },
    desc: {
        color: Colors.white,
        fontSize: 14,
        // fontFamily: 'Rocky-Bold',
        marginTop: 8,
    },
    detailContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        flexDirection: 'row',
        height: 80,
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        color: Colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        color: Colors.white,
        fontWeight: '500',
        marginTop: 10,
        fontSize: 12,
    },
});

export default StoreCard;

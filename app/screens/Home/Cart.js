import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ScrollView,
    Platform,
    Modal,
    Image,
    Alert,
    View,
    Text,
} from 'react-native';
import { Colors } from '../../styles/colors';

const trash = require('../../images/trash.jpeg')
const link = `https://bahriadelivery.com/api/`;
const { width, height } = Dimensions.get('window')

import { useNavigation } from '@react-navigation/native';

const Cart = ({ route, props }) => {
    const navigation = useNavigation();

    const { myOrder, store, charges } = route.params;
    const [newOrder, setNewOrder] = useState(myOrder)
    const [total, setTotal] = useState(0)
    let t = 0

    const increement = (val, index) => {
        const newArray = [...newOrder];
        newArray[index].products_quantity = val;
        setNewOrder(newArray);
        Totall(newArray)
    }

    const decreement = (val, index, id) => {
        if (val > 0) {
            const newArray = [...newOrder];
            newArray[index].products_quantity = val;
            setNewOrder(newArray);
            Totall(newArray)
        }
    }

    const deleteItem = (val) => {
        let filteredArray = newOrder.filter(item => item.id !== val)
        setNewOrder(filteredArray)
        Totall(filteredArray)
    }

    const Totall = (newArrays) => {
        let totals = 0
        for (const iterator of newArrays) {
            totals = totals + iterator.product_price * iterator.products_quantity
        }
        setTotal(totals)
    }

    useEffect(() => {
        Totall(newOrder)
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.cartView}>
                    {newOrder.map((item, index) => {
                        if (item.id != 0) {
                            return (
                                <View key={item.id} style={styles.cartItem}>
                                    <Text style={styles.index}>{`${index}.`}</Text>

                                    <View style={styles.namePriceView}>
                                        <Text style={styles.pName}>
                                            {item.product_name}
                                            <Text style={{ color: '#ddd', fontSize: 15 }}>{item.variation != 'no' && ' (' + item.variation + ')'}</Text>
                                        </Text>
                                        <Text style={styles.pPrice}>Rs. {item.product_price * item.products_quantity}</Text>
                                    </View>

                                    <View style={styles.quantityBox}>
                                        <TouchableOpacity activeOpacity={0.8} style={[styles.link, { backgroundColor: Colors.red }]}
                                            onPress={(() => {
                                                decreement(item.products_quantity - 1, index, item.id)
                                            })}
                                        >
                                            <Text style={styles.linkText}>{`-`}</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.quantity}>{item.products_quantity}</Text>

                                        <TouchableOpacity activeOpacity={0.8} style={[styles.link, { backgroundColor: Colors.primaryColor }]}
                                            onPress={(() => {
                                                increement(item.products_quantity + 1, index)
                                            })}
                                        >
                                            <Text style={styles.linkText}>{`+`}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={(() => {
                                        Alert.alert('Alert', `Delete this item... ${item.product_name}`)
                                        deleteItem(item.id)
                                        // Totall()
                                    })}>
                                        <Image source={trash} style={styles.trash} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })}
                </View>
            </ScrollView>

            <View style={{ width: width, backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>

                <Text style={styles.totalText}>
                    TOTAL:   {total}
                </Text>

                <TouchableOpacity
                    style={{ marginRight: 10 }} activeOpacity={0.8}
                    onPress={() => { navigation.navigate('Checkout', { myOrder: newOrder, store: store, charges: charges }) }}
                >
                    <Text style={styles.totalText}>Checkout</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
export default Cart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    cartView: {
        paddingHorizontal: 0,
        marginTop: 20,
    },
    cartItem: {
        borderBottomColor: Colors.grayLight,
        justifyContent: 'space-between',
        borderBottomWidth: 0.7,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 5,
    },
    index: {
        color: Colors.white,
        fontWeight: '500',
    },
    namePriceView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        flex: 1,
    },
    pName: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 16,
        flex: 1,
    },
    pPrice: {
        color: Colors.white,
        textAlign: 'right',
        marginLeft: 10,
        fontSize: 14,
        marginTop: 3,

    },
    quantityBox: {
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 5,
        marginBottom: 5,
    },
    quantity: {
        marginHorizontal: 10,
        fontWeight: '500',
        fontSize: 14,
    },
    link: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 25,
        width: 25,
    },
    linkText: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 18,
    },
    trash: {
        marginBottom: 6,
        marginLeft: 15,
        height: 25,
        width: 20,
    },
    totalText: {
        color: Colors.primaryColor,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
    },
})
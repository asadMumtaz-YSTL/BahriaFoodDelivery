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
    TextInput,
} from 'react-native';
import { Colors } from '../../styles/colors';

const trash = require('../../images/trash.jpeg')
const link = `https://bahriadelivery.com/api/`;
const { width, height } = Dimensions.get('window')

import { useNavigation } from '@react-navigation/native';

const Checkout = ({ route, props }) => {
    const navigation = useNavigation();
    const { store, charges } = route.params;
    const [ip1, setIp1] = useState(false)
    const [ip2, setIp2] = useState(false)
    const [ip3, setIp3] = useState(false)
    const [ip4, setIp4] = useState(false)
    const [ip5, setIp5] = useState(false)
    const [ip6, setIp6] = useState(false)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [sector, setSector] = useState('')
    const [instruction, setInstruction] = useState('')
    const [token, setToken] = useState('')
    const [tokenApply, setTokenApply] = useState(false)
    const [discount, setDiscount] = useState(0)
    const sectorData = [
        { id: 0, name: 'Sector-A', statua: 0 },
        { id: 0, name: 'Sector-B', statua: 0 },
        { id: 0, name: 'Sector-C', statua: 0 },
        { id: 0, name: 'Sector-D', statua: 0 },
        { id: 0, name: 'Sector-E', statua: 0 },
    ]
    const [seeAll, setSeeAll] = useState(false)

    const { myOrder } = route.params;
    const [newOrder, setNewOrder] = useState(myOrder)
    const [total, setTotal] = useState(0)

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
    let disabled = name == '' || streetAddress == '' || phone.length < 11 || sector == '' || instruction == ''

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ marginTop: 20 }}>
                    {/* NAME */}
                    <TextInput
                        style={[styles.inputText, { borderColor: !ip1 ? Colors.primaryColor : Colors.grayLight }]}
                        placeholder='Your Name*'
                        value={name}
                        placeholderTextColor={Colors.grayLight}
                        onFocus={() => { setIp1(true) }}
                        onBlur={() => { setIp1(false) }}
                        onChangeText={(value) => { setName(value) }}
                    />

                    {/* PHONE */}
                    <TextInput
                        style={[styles.inputText, { borderColor: !ip2 ? Colors.primaryColor : Colors.grayLight }]}
                        placeholder='03001234567*'
                        value={phone}
                        placeholderTextColor={Colors.grayLight}
                        onFocus={() => { setIp2(true) }}
                        onBlur={() => { setIp2(false) }}
                        onChangeText={(value) => { setPhone(value) }}
                        maxLength={11}
                    />

                    {/* STREET ADDRES */}
                    <TextInput
                        style={[styles.inputText, { borderColor: !ip3 ? Colors.primaryColor : Colors.grayLight }]}
                        placeholder='House/Appartment, street*'
                        value={streetAddress}
                        placeholderTextColor={Colors.grayLight}
                        onFocus={() => { setIp3(true) }}
                        onBlur={() => { setIp3(false) }}
                        onChangeText={(value) => { setStreetAddress(value) }}
                    />

                    {/* SECCTOR */}
                    <TextInput
                        style={[styles.inputText, { borderColor: !ip4 ? Colors.primaryColor : Colors.grayLight }]}
                        placeholder='Sector*'
                        value={sector}
                        placeholderTextColor={Colors.grayLight}
                        onFocus={() => { setIp4(true) }}
                        onBlur={() => { setIp4(false) }}
                        onChangeText={(value) => { setSector(value) }}
                    />

                    {/* INSTRUCTIONS */}
                    <TextInput
                        style={[styles.inputText, { height: 90, paddingTop: 10, borderColor: !ip5 ? Colors.primaryColor : Colors.grayLight }]}
                        placeholder='Special Instruction About Your Order'
                        value={instruction}
                        placeholderTextColor={Colors.grayLight}
                        onFocus={() => { setIp5(true) }}
                        onBlur={() => { setIp5(false) }}
                        multiline={true}
                        // numberOfLines={3}
                        onChangeText={(value) => { setInstruction(value) }}
                    />

                    {/* PROMO */}
                    <>
                        {tokenApply == false
                            ? <View style={styles.promoView}>
                                <>
                                    <TextInput
                                        style={[styles.promoInput, { borderColor: !ip6 ? Colors.primaryColor : Colors.grayLight }]}
                                        placeholder='Promo e.g 10OFF'
                                        value={token}
                                        placeholderTextColor={Colors.grayLight}
                                        onFocus={() => { setIp6(true) }}
                                        onBlur={() => { setIp6(false) }}
                                        onChangeText={(value) => { setToken(value) }}
                                    />
                                    <Text style={{ position: 'absolute', right: 10, bottom: 1, color: Colors.black, letterSpacing: 0.7, }}>{`Minimum order 500*`}</Text>
                                </>
                                {token != ''
                                    && <TouchableOpacity activeOpacity={0.8}
                                        onPress={() => {
                                            if (tokenApply == false) {
                                                if (total > 500) {
                                                    if (token == '10OFF') {
                                                        setTokenApply(true)
                                                        setDiscount(((total / 100) * 10).toFixed(2))
                                                    }
                                                    else {
                                                        Alert.alert('Alert Message', '\nYou Enter Invalid Promo Code')
                                                    }
                                                }
                                                else {
                                                    Alert.alert('Alert Message', '\nPromo Apply When Your Order Amount 500 or above ')
                                                }
                                            }
                                        }}
                                        style={[styles.promoLink, { borderColor: !ip6 ? Colors.primaryColor : Colors.grayLight }]}>
                                        <Text style={styles.promoText}>APPLY</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            : <TouchableOpacity style={[styles.promoView, { marginBottom: 15, width: 'auto', alignSelf: 'flex-end', marginRight: 25 }]} onPress={() => {
                                setDiscount(0)
                                setTokenApply(false)
                            }}>
                                <Text style={{ color: Colors.white, fontSize: 20, textDecorationLine: 'underline' }}>Remove Promo</Text>
                            </TouchableOpacity>}
                    </>
                </View>

                {/* SEE ALL SEE LESS */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, alignItems: 'center', }}>
                    <Text style={{ fontSize: 20, color: Colors.white, fontWeight: '700' }}>{`SELECT ITEMS`}</Text>

                    {newOrder.length > 2 && <TouchableOpacity
                        onPress={() => {
                            setSeeAll(!seeAll)
                        }}>
                        <Text style={{ fontSize: 16, color: Colors.white, fontWeight: '700' }}>{`SEE ${seeAll == false ? 'ALL' : 'LESS'}`}</Text>
                    </TouchableOpacity>}

                </View>

                {/* PRODUCTS */}
                <View style={[styles.cartView, {}]}>
                    {newOrder.map((item, index) => {
                        if (item.id != 0) {
                            if (seeAll == false) {
                                if (item.id == 1) {
                                    return (
                                        <View key={item.id} style={styles.cartItem}>
                                            <View style={[styles.namePriceView, { marginLeft: 0, }]}>
                                                <Text style={[styles.pName, { flex: 1, }]}>
                                                    {item.product_name}
                                                    <Text style={{ color: '#ddd', fontSize: 15 }}>
                                                        {item.variation != 'no' && ' (' + item.variation + ')'}
                                                    </Text>
                                                    {` x ${item.products_quantity}`}
                                                </Text>
                                                <Text style={styles.pPrice}>Rs. {item.product_price * item.products_quantity}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            }
                            else {
                                return (
                                    <View key={item.id} style={styles.cartItem}>
                                        <Text style={styles.index}>{`${index}.`}</Text>
                                        <View style={styles.namePriceView}>
                                            <Text style={[styles.pName, { flex: 1 }]}>
                                                {item.product_name}
                                                <Text style={{ color: '#ddd', fontSize: 15 }}>
                                                    {item.variation != 'no' && ' (' + item.variation + ')'}
                                                </Text>
                                                {` x ${item.products_quantity}`}
                                            </Text>
                                            <Text style={styles.pPrice}>Rs. {item.product_price * item.products_quantity}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        }
                    })}
                </View>

                {/* STORE */}
                <View style={{ width: width - 50, alignSelf: 'center', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.grayLight, }}>
                    <Text style={styles.totalText}>Store:</Text>
                    <Text style={styles.totalText}>{store}</Text>
                </View>

                {/* SUB TOTAL */}
                <View style={{ width: width - 50, alignSelf: 'center', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.grayLight, }}>
                    <Text style={styles.totalText}>Sub Total:</Text>
                    <Text style={styles.totalText}>{total} RS.</Text>
                </View>

                {/* PROMO DISCOUNT */}
                <>
                    {
                        tokenApply
                        && <View style={{ width: width - 50, alignSelf: 'center', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.grayLight, }}>
                            <Text style={styles.totalText}>Discount:</Text>
                            <Text style={styles.totalText}>-{discount} RS.</Text>
                        </View>
                    }
                </>

                {/* DELIVERY FEE */}
                <View style={{ width: width - 50, alignSelf: 'center', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.grayLight, }}>
                    <Text style={styles.totalText}>Delivery Fee:</Text>
                    <Text style={styles.totalText}>{charges}</Text>
                </View>

                {/* TOTAL */}
                <View style={{ width: width - 50, alignSelf: 'center', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalText}>{total - discount - (charges != 'Free Delivery' ? -charges : 0)} RS.</Text>
                </View>

            </ScrollView>

            <View style={{}}>
                <TouchableOpacity activeOpacity={0.8} disabled={disabled}
                    style={[styles.checkoutBtn, { backgroundColor: disabled ? Colors.grayLight : Colors.white }]}
                    onPress={() => {
                        Alert.alert(
                            "ALERT MESSAGE", "\nYour Order Place Susseccfully!",
                            [
                                { text: "Cancel", style: "cancel", onPress: () => console.log("Cancel Pressed") },
                                { text: "OK", onPress: () => navigation.navigate('Home') }
                            ]
                        );
                    }}
                >
                    <Text style={[styles.totalText, { color: disabled ? Colors.black : Colors.primaryColor }]}>CHECK OUT</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
export default Checkout;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    inputText: {
        width: '90%',
        backgroundColor: Colors.white,
        color: '#30303099',
        alignSelf: 'center',
        paddingLeft: 15,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 18,
        marginBottom: 20,
        borderWidth: 2,
    },
    cartView: {
        marginTop: 20,
        width: width - 50,
        alignSelf: 'center',
    },
    cartItem: {
        borderBottomColor: Colors.grayLight,
        justifyContent: 'space-between',
        borderBottomWidth: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
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
        fontSize: 16,
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
    totalText: {
        color: Colors.white,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
    },
    checkoutBtn: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        alignSelf: 'center',
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 8,
        width: '50%',
    },
    promoView: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        marginBottom: 10
    },
    promoInput: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        paddingVertical: 10,
        color: '#30303099',
        marginBottom: 20,
        borderRadius: 8,
        paddingLeft: 15,
        borderWidth: 2,
        fontSize: 18,
        flex: 1,
    },
    promoLink: {
        backgroundColor: Colors.white,
        paddingHorizontal: 25,
        paddingVertical: 10,
        marginBottom: 20,
        borderRadius: 8,
        marginLeft: 20,
        borderWidth: 2,
    },
    promoText: {
        color: Colors.primaryColor,
        fontWeight: '700',
        fontSize: 18,
    },
})
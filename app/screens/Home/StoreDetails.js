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

const link = `https://bahriadelivery.com/api/`;

const star_unfill = require('./images/star-unfilled.png')
const star_fill = require('./images/star-filled.png')
const close_blacl = require('../../images/close_black.png')
const radio_empty = require('../../images/radio_empty.png')
const radio_fill = require('../../images/radio_fill.png')
const cart_icon = require('../../images/cart_white.png')

const { width, height } = Dimensions.get('window');
import { falavers, size } from '../constantData/Data'
const os = Platform.OS
import { useNavigation } from '@react-navigation/native';

const StoreDetail = ({ route, ...props }) => {
    const navigation = useNavigation();

    const { store_id } = route.params;
    const [menuu, setMenuu] = useState([]);
    const [activeMmenu, setActiveMenu] = useState(0);
    const [productss, setProducts] = useState([]);
    const [storeDetail, setStoreDetail] = useState([]);

    // GET SELECTED STORE DETAIL
    useEffect(() => {
        fetch(`${link}store/${store_id}`)
            .then(response => response.json())
            .then(json => {
                setStoreDetail(json.store)
                setMenuu(json.categories)
                setActiveMenu(json.categories[0].id)
                setProducts(json.products)
                // console.log('L42: ', json.products)
            })
            .catch(error => console.error(error))
            .finally();
    }, []);

    // GET PRODUCTS OF SELECTED MENU
    const getCategoryData = (activeMmenus) => {
        fetch(`${link}/category_products/${activeMmenus}`)
            .then(response => response.json())
            .then(json => {
                setProducts(json.products)
                // console.log('L54: ', json.products)
            })
            .catch(error => console.error(error))
            .finally();
    }

    // for get data from API and store in variables
    const [visibleVariation, setVisibleVariation] = useState(false); // HIDE & SHOW VARIATION MODAL
    const [visibleSize, setVisibleSize] = useState(false); // chk flvr select or not
    const [flvrVal, setFlvrVal] = useState(0); // save value of selected falaver
    const [fSize, setFSize] = useState(1); // save value of selected falaver
    const [myOrder, setMyOrder] = useState([
        {
            id: 0,
            store_id: store_id,
            product_id: 0,
            product_name: '',
            products_quantity: 1,
            product_price: 0,
            variation: 'no',
            product_size: '',
        },
    ])
    const [data, setData] = useState({})

    const [productFlavour, setProductFlavour] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})
    const [variName, setVariName] = useState('')
    const [variPrice, setVariPrice] = useState('')

    const toggleVariatModal = () => {
        setVisibleVariation(!visibleVariation);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <View style={{ height: 50, width: width, backgroundColor: Colors.primaryColor, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>

                <View style={{ flex: 3, justifyContent: 'center', }}>
                    <TouchableOpacity style={{ width: 60 }} onPress={() => { navigation.navigate('Home') }}>
                        <Text style={{ fontWeight: '500', color: Colors.white, fontSize: 18, alignSelf: 'center', paddingVertical: 4 }}>{`Back`}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
                    {/* <Text style={{ marginLeft: 5, fontWeight: '700', color: Colors.white, fontSize: 18, }}>{'MY CART'}</Text> */}
                </View>

                <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    {(myOrder[0].id == 0 && myOrder.length == 1)
                        ? null
                        : <TouchableOpacity onPress={() => {
                            navigation.navigate('Cart', {
                                myOrder: myOrder, store: storeDetail?.name, charges: storeDetail?.delivery_charges == 0 ? 'Free Delivery' : `${storeDetail?.delivery_charges} Rs`
                            })
                        }}>
                            <ImageBackground source={cart_icon} resizeMode='contain' style={{ height: 50, width: 35, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ marginLeft: 7, fontWeight: '700', marginTop: -3 }}>
                                    {myOrder[0].id == 0 && myOrder.length == 1 ? '' : (myOrder.length - 1) > 9 ? '9+' : myOrder.length - 1}
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    }

                </View>

            </View>

            {
                storeDetail.length == 0
                    ? <ActivityIndicator size='large' color={Colors.white} style={{ marginTop: 20 }} />
                    : <ScrollView showsVerticalScrollIndicator={false}>

                        {/* RESTURANT LOGO */}
                        <Image source={{ uri: storeDetail?.cover }} resizeMode="stretch" style={styles.bgImage} />

                        {/* STORE DETAILS */}
                        <View style={styles.detailBox}>

                            <Text style={styles.title}>{storeDetail?.name}</Text>
                            {/* <Text style={styles.delivery}>{storeDetail.slug}</Text> */}
                            <Text style={styles.status}>OPEN NOW</Text>

                            <View style={styles.rowCenter}>
                                <Text style={styles.textHeading}>Timing: </Text>
                                <Text style={[styles.textParagraph, {}]}>
                                    {storeDetail.open_time.toUpperCase()} to {storeDetail.close_time.toUpperCase()}
                                    {/* {storeDetail.open_time == '12Pm' ? '12:00 PM' : storeDetail.open_time} to {storeDetail.close_time} */}
                                </Text>
                            </View>

                            <View style={styles.rowCenter}>
                                <Text style={styles.textHeading}>Delivery Time: </Text>
                                <Text style={styles.textParagraph}>{storeDetail.delivery_time} Min</Text>
                            </View>

                            <View style={styles.rowCenter}>
                                <Text style={styles.textHeading}>Delivery Charges: </Text>
                                <Text style={styles.textParagraph}>
                                    {storeDetail?.delivery_charges == 0
                                        ? 'Free Delivery'
                                        : `${storeDetail?.delivery_charges} Rs`}
                                </Text>
                            </View>

                            {/* RATING */}
                            <View style={styles.rowCenter}>
                                <Text style={[styles.textHeading, { textAlign: 'center', }]}>
                                    {`Rating & Reviews (${menuu?.length})`}
                                </Text>
                            </View>
                            <View style={[styles.rowCenter, styles.rating]}>
                                <Image source={star_fill} style={styles.star} />
                                <Image source={star_fill} style={styles.star} />
                                <Image source={star_fill} style={styles.star} />
                                <Image source={star_fill} style={styles.star} />
                                <Image source={star_unfill} style={styles.star} />
                            </View>
                        </View>

                        {/* MENU */}
                        <ScrollView style={styles.menuScroll} horizontal showsHorizontalScrollIndicator={false}                                                                                       >
                            {menuu.map(item => {
                                return (
                                    <TouchableOpacity activeOpacity={0.4} key={item.id}
                                        onPress={() => {
                                            setActiveMenu(item.id)
                                            getCategoryData(item.id)
                                        }}
                                        style={[styles.link, { borderBottomColor: item.id == activeMmenu ? Colors.black : Colors.white, }]}
                                    >
                                        <Text style={styles.menuText}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>

                        {/* PRODUCTS */}
                        <View style={styles.products}>
                            {productss.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index} style={styles.product_item} activeOpacity={0.8}
                                        onPress={() => {
                                            setSelectedProduct(item)
                                            setProductFlavour(item.product_flavour)
                                            console.log('L213: ', item.is_variation)

                                            // if item have variation then display modal & add there
                                            if (item.is_variation == 'yes') {
                                                toggleVariatModal()
                                            }
                                            // add to cart on click
                                            else {
                                                let items = [{
                                                    id: myOrder.length,
                                                    store_id: store_id,
                                                    product_id: item.id,
                                                    product_name: item.name,
                                                    products_quantity: 1,
                                                    product_price: item.discounted_price ? item.discounted_price : item.price,
                                                    product_size: '',
                                                    variation: item.is_variation,
                                                }]

                                                let old_length = myOrder.length
                                                let newArray = [...myOrder, ...items]

                                                setMyOrder(newArray)
                                                let new_length = myOrder.length

                                                old_length < new_length
                                                    && Alert.alert('Alert Message', `${item.name} is added in your cart`); //console.log('L228: Array dataa:  ', myOrder)
                                            }
                                        }}>
                                        <Text style={[styles.pTitle]} numberOfLines={1}>{item.name}</Text>
                                        <Text style={[styles.pDesc]} numberOfLines={1}>{item.slug}</Text>

                                        {/* DISPLAY PRICE */}
                                        <View>
                                            {item.discounted_price
                                                ? <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.pPrice, { textDecorationLine: 'line-through', fontSize: 12, color: '#FFFFFF99' }]}>
                                                        {item.price} Rs
                                                    </Text>
                                                    <Text style={[styles.pPrice, { color: '#00FF0099', },]}>
                                                        {' '} {item.discounted_price} Rs
                                                    </Text>
                                                </View>
                                                : <Text style={[styles.pPrice]}>{item.price} Rs</Text>
                                            }
                                        </View>

                                        {/* PLUS BUTTON */}
                                        <View style={styles.plus}>
                                            <Text style={styles.plusText}>{`+`}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* VARIAVTION MODAL */}
                        {visibleVariation && (
                            <Modal
                                animationType="slide"
                                transparent
                                visible={visibleVariation}
                                style={styles.modal}
                            >
                                <View style={[styles.modalContanier, styles.boxWithShadow]}>
                                    <View style={[styles.modalContant]}>

                                        {/* Close Modal */}
                                        <TouchableOpacity activeOpacity={0.9}
                                            style={[styles.modalCloseIcon, os == 'ios' ? { left: 15 } : { right: 15 }]}
                                            onPress={() => { setVisibleSize(false); setFlvrVal(0); toggleVariatModal(); }}>
                                            <Image source={close_blacl} style={styles.closeIcon} />
                                        </TouchableOpacity>

                                        {/* MODAL HEADING */}
                                        <View style={styles.modalHeader}>
                                            <Text style={styles.modalTitle}>{`SELECT VARIAVTION`}</Text>
                                        </View>

                                        {/* MODAL BODY */}
                                        <View style={styles.modalBody}>

                                            <View style={{ marginBottom: 10 }}>
                                                <ScrollView showsVerticalScrollIndicator={false}>
                                                    {/* TABLE HEADING */}
                                                    <View style={styles.tableCantainer}>
                                                        <Text style={styles.tableHeading}>Item</Text>
                                                        <Text style={styles.tableHeading}>Price</Text>
                                                    </View>

                                                    {/* SHOW FLAVOURS */}
                                                    {productFlavour.map(item => {
                                                        return (
                                                            <View style={styles.tableItem} key={item.id}>
                                                                <View style={styles.leftData}>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            // setSizeData(item)
                                                                            // setVariData(item)
                                                                            setVariName(item.name)
                                                                            setVariPrice(item.price)

                                                                            console.log('L311: ', item)
                                                                            if (item.different_sizes == 'no') {
                                                                                // setVisibleSize(true)
                                                                                setFlvrVal(item.id)
                                                                            } else {
                                                                                setFlvrVal(item.id);
                                                                                // setVisibleSize(false);
                                                                            }
                                                                        }}>
                                                                        <Image source={flvrVal == item.id ? radio_fill : radio_empty} style={styles.radioImage} />
                                                                    </TouchableOpacity>
                                                                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                                                                </View>
                                                                <Text style={{}}>{item.price} Rs</Text>
                                                            </View>
                                                        );
                                                    })}

                                                    {/* DISPLAY SIZE */}
                                                    {visibleSize && (
                                                        <View style={{ marginTop: 20 }}>

                                                            <View style={[styles.tableCantainer]}>
                                                                <Text style={[styles.tableHeading, { textAlign: 'center', fontSize: 18, }]}>Size</Text>
                                                            </View>

                                                            <View>
                                                                {size.map(item => {
                                                                    return (
                                                                        <View style={styles.tableItem} key={item.id}>
                                                                            <View
                                                                                style={styles.leftData}>
                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        if (!visibleSize) {
                                                                                            setVisibleSize(true);
                                                                                            setFlvrVal(item.id);
                                                                                        } else {
                                                                                            setFlvrVal(item.id);
                                                                                            // setVisibleSize(false);
                                                                                        }
                                                                                    }}>
                                                                                    <Image source={fSize == item.id ? radio_fill : radio_empty} style={styles.radioImage} />
                                                                                </TouchableOpacity>

                                                                                <Text style={{ marginLeft: 10 }}>{item.title}</Text>
                                                                            </View>

                                                                            <Text style={{}}>{item.price} Rs</Text>
                                                                        </View>
                                                                    );
                                                                })}
                                                            </View>

                                                        </View>
                                                    )}

                                                </ScrollView>
                                            </View>

                                            {/* ADD TO CART BUTTON */}
                                            <View style={styles.addCartView}>
                                                <TouchableOpacity
                                                    style={styles.addCart}
                                                    onPress={() => {
                                                        toggleVariatModal();

                                                        let items = [{
                                                            id: myOrder.length,
                                                            store_id: store_id,
                                                            product_id: selectedProduct.id,
                                                            product_name: selectedProduct.name,
                                                            products_quantity: 1,
                                                            product_price: variPrice,
                                                            product_size: '',
                                                            variation: variName,
                                                        }]

                                                        let old_length = myOrder.length
                                                        let newArray = [...myOrder, ...items]

                                                        setMyOrder(newArray)
                                                        // console.log('L216: selected item daataaaa: ', items)
                                                        let new_length = myOrder.length

                                                        if (old_length < new_length) {
                                                            // Alert.alert('Alert Message', `${item.name} is added in your cart`)
                                                        }
                                                        console.log('L223: Array dataa:  ', myOrder)
                                                    }}>
                                                    <Text style={styles.cartText}>{`Add to Cart`}</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </ScrollView>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    bgImage: {
        overflow: 'hidden',
        width: '100%',
        height: 260,
    },
    detailBox: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    title: {  // STORE NAME
        // fontFamily: 'fredoka',
        color: Colors.white,
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 24,
        marginTop: 8,
    },
    status: {
        // fontFamily: 'fredoka',
        alignSelf: 'center',
        color: Colors.green,
        fontWeight: '700',
        marginTop: 13,
        fontSize: 16,
    },
    rowCenter: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textHeading: {
        // fontFamily: 'fredoka',
        color: Colors.white,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginTop: 13,
        fontSize: 16,

        flex: 1,
        textAlign: 'right',
        paddingRight: 20,
    },
    textParagraph: {
        color: Colors.white,
        alignSelf: 'center',
        marginTop: 8,
        fontSize: 15,

        flex: 1,
        textAlign: 'left',
    },
    rating: {
        marginTop: 10
    },
    star: {
        marginHorizontal: 5,
        height: 20,
        width: 20,
    },

    // MENU
    menuScroll: {
        backgroundColor: Colors.white,
        width: '100%',
        marginTop: 10,
    },
    link: {
        borderRightColor: Colors.primaryColor,
        borderRightWidth: 0.2,
        borderBottomWidth: 3,
    },
    menuText: {
        color: Colors.black,
        fontWeight: 'bold',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },

    // PRODUCTS
    products: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        width: '100%',
    },
    product_item: {
        backgroundColor: '#00000033',
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: '2%',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 14,
        marginVertical: 7,
        borderRadius: 6,
        width: '46%',
    },
    pTitle: {
        color: Colors.white,
        marginVertical: 5,
        fontWeight: '500',
        fontSize: 14,
    },
    pDesc: {
        marginHorizontal: 8,
        color: '#EEEEEEAA',
        marginVertical: 5,
        fontSize: 12,
    },
    pPrice: {
        color: Colors.white,
        marginVertical: 5,
        fontSize: 14,
    },
    plus: {
        backgroundColor: Colors.white,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        position: 'absolute',
        alignItems: 'center',
        height: 30,
        bottom: 0,
        width: 40,
        right: 0,
    },
    plusText: {
        color: Colors.primaryColor,
        fontWeight: '700',
        fontSize: 24,
    },

    // MODAL
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContanier: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContant: {
        backgroundColor: Colors.white,
        maxHeight: height / 2,
        overflow: 'hidden',
        borderRadius: 10,
        width: '80%',
    },
    modalHeader: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        paddingBottom: 10,
        width: '100%',
    },
    modalTitle: {
        color: Colors.white,
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 16,
    },
    modalCloseIcon: {
        backgroundColor: Colors.grayLight,
        position: 'absolute',
        borderRadius: 50,
        padding: 5,
        zIndex: 2,
        top: 13,
    },
    closeIcon: {
        height: 11,
        width: 11,
    },
    modalBody: {
        backgroundColor: Colors.white,
        maxHeight: height / 2 - 50,
        marginHorizontal: '5%',
        paddingBottom: 40,
        width: '90%',
    },
    tableCantainer: {
        justifyContent: 'space-between',
        borderBottomColor: 'lightgray',
        paddingHorizontal: 7,
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 5,
    },
    tableHeading: {
        color: Colors.black,
        fontWeight: 'bold',
        paddingBottom: 5,
        fontSize: 16,
    },
    tableItem: {
        borderBottomColor: Colors.grayLight,
        justifyContent: 'space-between',
        borderBottomWidth: 0.9,
        flexDirection: 'row',
        paddingHorizontal: 7,
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 6,
    },
    leftData: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioImage: {
        height: 18,
        width: 18,
    },
    addCartView: {
        backgroundColor: Colors.primaryColor,
        position: 'absolute',
        // paddingTop: 10,
        width: '112%',
        bottom: 0,
        left: '-6%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingBottom: 4,
    },
    addCart: {
        backgroundColor: Colors.primaryColor,
        alignSelf: 'center',
        borderRadius: 8,
        paddingTop: 3,
        width: '100%',
    },
    cartText: {
        textAlign: 'center',
        color: Colors.white,
        paddingVertical: 8,
        fontWeight: '700',
        fontSize: 16,
    },
    boxWithShadow: {
        shadowColor: '#ffffff99',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
    },
});

export default StoreDetail;
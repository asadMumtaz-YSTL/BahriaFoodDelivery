import React, { useState, useEffect } from 'react'
import {
    ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Platform,
    Modal,
    Image,
    Alert,
    View,
    Text,
} from 'react-native'
import { Colors } from '../../styles/colors'
const link = `https://bahriadelivery.com/api/`
const star_unfill = require('./images/star-unfilled.png')
const star_fill = require('./images/star-filled.png')
const close_blacl = require('../../images/close_black.png')
const radio_empty = require('../../images/radio_empty.png')
const radio_fill = require('../../images/radio_fill.png')
const cart_icon = require('../../images/cart_white.png')

import { falavers, size } from '../constantData/Data'
const os = Platform.OS
import { useNavigation } from '@react-navigation/native'
import { styles } from './style_storeDetail'

const StoreDetail = ({ route, ...props }) => {

    const navigation = useNavigation()

    const { store_id } = route.params
    const [menuu, setMenuu] = useState([])
    const [activeMmenu, setActiveMenu] = useState(0)
    const [productss, setProducts] = useState([])
    const [storeDetail, setStoreDetail] = useState([])

    // GET SELECTED STORE DETAIL
    useEffect(() => {
        fetch(`${link}store/${store_id}`)
            .then(response => response.json())
            .then(json => {
                setStoreDetail(json.store)
                setMenuu(json.categories)
                setActiveMenu(json.categories[0].id)
                setProducts(json.products)
            })
            .catch(error => console.error(error))
    }, [])

    // GET PRODUCTS OF SELECTED MENU
    const getCategoryData = (activeMmenus) => {
        fetch(`${link}/category_products/${activeMmenus}`)
            .then(response => response.json())
            .then(json => {
                setProducts(json.products)
            })
            .catch(error => console.error(error))
    }

    // for get data from API and store in variables
    const [visibleVariation, setVisibleVariation] = useState(false) // HIDE & SHOW VARIATION MODAL
    const [visibleSize, setVisibleSize] = useState(false) // chk flvr select or not
    const [flvrVal, setFlvrVal] = useState(0) // save value of selected falaver
    const [fSize, setFSize] = useState(1) // save value of selected falaver
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

    const [productFlavour, setProductFlavour] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})
    const [variName, setVariName] = useState('')
    const [variPrice, setVariPrice] = useState('')

    const toggleVariatModal = () => {
        setVisibleVariation(!visibleVariation)
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>

                <View style={{ flex: 3, justifyContent: 'center', }}>
                    <TouchableOpacity style={{}} onPress={() => { navigation.navigate('Home') }}>
                        <Text style={styles.headerText}>{`BACK`}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 4 }} />

                <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    {(myOrder[0].id == 0 && myOrder.length == 1)
                        ? null
                        : <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Cart', {
                                    myOrder: myOrder, store: storeDetail?.name,
                                    charges: storeDetail?.delivery_charges == 0
                                        ? 'Free'
                                        : `${storeDetail?.delivery_charges} Rs`
                                })
                            }}
                        >
                            <ImageBackground source={cart_icon} resizeMode='contain' style={styles.cartImage} >
                                <Text style={{ marginLeft: 7, fontWeight: '700', marginTop: -3, color: Colors.black }}>
                                    {(myOrder[0].id == 0 && myOrder.length == 1)
                                        ? ''
                                        : (myOrder.length - 1) > 9 ? '9+' : myOrder.length - 1
                                    }
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    }

                </View>

            </View>

            {storeDetail.length == 0
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
                            <Text style={styles.textParagraph}>
                                {storeDetail.open_time.toUpperCase()} to {storeDetail.close_time.toUpperCase()}
                            </Text>
                        </View>

                        <View style={styles.rowCenter}>
                            <Text style={styles.textHeading}>Delivery Time: </Text>
                            <Text style={styles.textParagraph}>{storeDetail.delivery_time} Mints</Text>
                        </View>

                        <View style={styles.rowCenter}>
                            <Text style={styles.textHeading}>Delivery Charges: </Text>
                            <Text style={styles.textParagraph}>
                                {storeDetail?.delivery_charges == 0
                                    ? 'Free'
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
                            return <TouchableOpacity activeOpacity={0.4} key={item.id}
                                onPress={() => {
                                    setActiveMenu(item.id)
                                    getCategoryData(item.id)
                                }}
                                style={[styles.link, { borderBottomColor: item.id == activeMmenu ? Colors.black : Colors.white, }]}
                            >
                                <Text style={styles.menuText}>{item.name}</Text>
                            </TouchableOpacity>
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
                                            const old_length = myOrder.length
                                            console.log('old_length:', old_length)

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

                                            let newArray = [...myOrder, ...items]

                                            setMyOrder(newArray)
                                            let new_length = myOrder.length
                                            console.log('new_length:', new_length)

                                            if (old_length - 1 < new_length) {
                                                Alert.alert('Alert Message', `${item.name} is added in your cart`) //console.log('L228: Array dataa:  ', myOrder)
                                            }
                                        }
                                    }}
                                >
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
                            )
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
                            <View style={styles.modalContanier}>

                                {/* Close Modal */}
                                <TouchableOpacity activeOpacity={0.9}
                                    style={[styles.modalCloseIcon, os == 'ios' ? { left: 15 } : { right: 15 }]}
                                    onPress={() => {
                                        setVisibleSize(false)
                                        setFlvrVal(0)
                                        toggleVariatModal()
                                    }}
                                >
                                    <Image source={close_blacl} style={styles.closeIcon} />
                                </TouchableOpacity>

                                <View style={styles.modalContant}>
                                    {/* MODAL HEADING */}
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>{`SELECT VARIAVTION`}</Text>
                                    </View>

                                    {/* MODAL BODY */}
                                    <View style={styles.modalBody}>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            {/* TABLE HEADING */}
                                            <View style={styles.tableHeader}>
                                                <Text style={styles.tableHeadingText}>Item</Text>
                                                <Text style={styles.tableHeadingText}>Price</Text>
                                            </View>

                                            {/* SHOW FLAVOURS */}
                                            {productFlavour.map(item => {
                                                return (
                                                    <View style={styles.tableItem} key={item.id}>
                                                        <TouchableOpacity
                                                            style={styles.leftData} activeOpacity={0.8}
                                                            onPress={() => {
                                                                // setSizeData(item)
                                                                // setVariData(item)
                                                                setVariName(item.name)
                                                                setVariPrice(item.discounted_price ? item.discounted_price : item.price)

                                                                console.log('L311: ', item)
                                                                if (item.different_sizes == 'no') {
                                                                    setVisibleSize(false)
                                                                    setFlvrVal(item.id)
                                                                } else {
                                                                    setFlvrVal(item.id)
                                                                    setVisibleSize(true)
                                                                }
                                                            }}
                                                        >
                                                            <View style={{ flexDirection: "row", flex: 1, alignItems: 'center' }}>
                                                                <Image source={flvrVal == item.id ? radio_fill : radio_empty} style={styles.radioImage} />
                                                                <Text style={{ marginLeft: 10, color: Colors.black }}>{item.name}</Text>
                                                            </View>

                                                            <View style={{ marginLeft: 20 }}>
                                                                <Text style={{ color: Colors.black }}>
                                                                    {item.discounted_price ? item.discounted_price : item.price} Rs
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })}

                                            {/* DISPLAY SIZE */}
                                            {visibleSize
                                                && <View style={{ marginTop: 20 }}>
                                                    <View style={[styles.tableCantainer]}>
                                                        <Text style={[styles.tableHeadingText, { textAlign: 'center', fontSize: 18, }]}>Sizes</Text>
                                                    </View>

                                                    {size.map(item => {
                                                        return (
                                                            <View style={styles.tableItem} key={item.id}>
                                                                <TouchableOpacity
                                                                    style={styles.leftData}
                                                                    onPress={() => {
                                                                        if (!visibleSize) {
                                                                            setVisibleSize(true)
                                                                            setFlvrVal(item.id)
                                                                        } else {
                                                                            setFlvrVal(item.id)
                                                                            // setVisibleSize(false)
                                                                        }
                                                                    }}>

                                                                    <View style={{ flexDirection: "row", flex: 1, alignItems: 'center' }}>
                                                                        <Image source={fSize == item.id ? radio_fill : radio_empty} style={styles.radioImage} />
                                                                        <Text style={{ marginLeft: 10, color: Colors.black }}>{item.title}</Text>
                                                                    </View>

                                                                    <View style={{ marginLeft: 20 }}>
                                                                        <Text style={{ color: Colors.black }}>
                                                                            {item.discounted_price ? item.discounted_price : item.price} Rs
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            }

                                        </ScrollView>
                                    </View>

                                    {/* ADD TO CART BUTTON */}
                                    <View style={styles.addCartView}>
                                        <TouchableOpacity
                                            style={styles.addCart}
                                            onPress={() => {
                                                toggleVariatModal()

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
                        </Modal>
                    )}
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default StoreDetail

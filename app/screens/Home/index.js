import React, { useEffect, useState } from "react"
import {
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    Keyboard,
    Alert,
    Image,
    View,
    Text,
    StatusBar,
} from 'react-native'

import { Colors } from "../../styles/colors"
import { styles } from "./style_index"
import { AppCategories } from '../constantData/Data'
import StoreCard from './components/StoreCard'

import Header from "./Herder"
import MyTextInput from '../components/TextInput'
const logo = require('../../images/logo.png')

const Home = ({ navigation, text, ...props }) => {

    const [shops, setShops] = useState([])
    const [activeCategory, setActiveCategory] = useState(1)
    const [search, setSearch] = useState('')
    const [visibleSearch, setVisibleSearch] = useState(false)
    const [filteredData, setFilteredData] = useState([])

    // SEARCH SHOP
    const SearchShop = (text) => {
        console.log('its working...',text)
        const result = shops.filter(item => item?.name?.includes(text))
        console.log('its res...', result) 
        setFilteredData(result)
    }

    const kkk = (text) => {

    }

    // GET DATA ACCORDING TO SELECTED CATEGORY
    useEffect(() => {
        // GET FOOD
        if (activeCategory == 1) {
            fetch('https://bahriadelivery.com/api/stores')
                .then(response => response.json())
                .then(json => setShops(json))
                .catch(error => console.error(error))
        }
        // GET FRUITS
        // else if (activeCategory == 2) {
        //     fetch('https://bahriadelivery.com/api/stores')
        //         .then(response => response.json())
        //         .then(json => setShops(json))
        //         .catch(error => console.error(error))
        //         .finally()
        // }
        // // GET VAGETABLES
        // else if (activeCategory == 3) {
        //     fetch('https://bahriadelivery.com/api/stores')
        //         .then(response => response.json())
        //         .then(json => setShops(json))
        //         .catch(error => console.error(error))
        //         .finally()
        // }
        // // GET GROCERY
        // else if (activeCategory == 4) {
        //     fetch('https://bahriadelivery.com/api/stores')
        //         .then(response => response.json())
        //         .then(json => setShops(json))
        //         .catch(error => console.error(error))
        //         .finally()
        // }
    }, [activeCategory])

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle='dark-content' />

            {/* HEADER */}
            <Header title='Bahria Food Delivery' logo={logo} />

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADING */}
                <Text style={styles.heading}>{`Find your food`}</Text>

                {/* SEARCH */}
                <MyTextInput
                    placeholder='Search Food'
                    SehShopss={()=> {SearchShop}}
                    shops={shops}
                />
                
                <View>
                    <TextInput
                        style={[styles.input, { borderColor: visibleSearch == true ? Colors.primaryColor : Colors.grayLight }]}
                        onSubmitEditing={() => Keyboard.dismiss}
                        placeholderTextColor={Colors.textLight}
                        placeholder="Search Food"
                        multiline={false}
                        numberOfLines={1}
                        value={search}
                        onChangeText={(text) => {
                            setSearch(text) // hooks
                            setTimeout(() => { SearchShop(text) }, 500)
                        }}
                        onBlur={() => {
                            setVisibleSearch(false)
                            Keyboard.dismiss
                        }}
                        onFocus={() => {
                            setVisibleSearch(true)
                            Keyboard.dismiss
                        }}
                    />
                </View>

                {/* CATEGORIES */}
                <View style={styles.categoryView}>
                    {AppCategories.map((item) => {
                        return (
                            <TouchableOpacity activeOpacity={0.8} key={item.id}
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: item.id == activeCategory ? Colors.primaryColor : Colors.white
                                }}
                                onPress={() => {
                                    item.id != 1
                                        ? Alert.alert('Alert Message', `\n${item.name} products is coming soon.\n`)
                                        : setActiveCategory(item.id)
                                }}
                            >
                                <Text style={[styles.cateName, { color: item.id == activeCategory ? Colors.primaryColor : Colors.textLight }]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* STORES IF LOADING */}
                <>
                    {shops.length == 0
                        && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color={Colors.primaryColor} style={{ flex: 1, marginTop: 20 }} />
                        </View>
                    }
                </>

                {/* STORES */}
                <>
                    {(search != '' ? filteredData : shops).map((item) => {
                        return (
                            <StoreCard
                                key={item?.id}
                                sId={item?.id}
                                image={item?.cover}
                                rating={item?.rating}
                                title={item?.name}
                                desc={item?.slug}
                                dTime={item?.delivery_time}
                                minOrder={item?.minimum_order}
                                delivery_charges={item?.delivery_charges}
                            />
                        )
                    })}
                </>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

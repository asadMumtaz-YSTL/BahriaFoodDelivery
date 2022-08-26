import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    Keyboard,
    Alert,
    View,
    Text,
} from 'react-native'
import { Colors } from "../../styles/colors";
import { styles } from "./style";
import { AppCategories } from '../constantData/Data'
import StoreCard from './components/StoreCard';

const Home = ({ navigation, text, ...props }) => {

    const [shops, setShops] = useState([])
    const [activeCategory, setActiveCategory] = useState(1)
    const [search, setSearch] = useState('')
    const [visibleSearch, setVisibleSearch] = useState(false)
    const [filteredData, setFilteredData] = useState([]);

    // GET STORES FROM APIS
    // useEffect(() => {
    //     fetch('https://bahriadelivery.com/api/stores')
    //         .then(response => response.json())
    //         .then(json => setShops(json))
    //         .catch(error => console.error(error))
    //         .finally();
    // }, []);

    // SEARCH SHOP
    const SearchShop = (shop) => {
        const result = shops.filter(item => item?.name?.includes(shop))
        setFilteredData(result)
    }

    // GET DATA ACCORDING TO SELECTED CATEGORY
    useEffect(() => {
        // GET FOOD
        if (activeCategory == 1) {
            fetch('https://bahriadelivery.com/api/stores')
                .then(response => response.json())
                .then(json => setShops(json))
                .catch(error => console.error(error))
                .finally();
        }
        // GET FRUITS
        // else if (activeCategory == 2) {
        //     fetch('https://bahriadelivery.com/api/stores')
        //         .then(response => response.json())
        //         .then(json => setShops(json))
        //         .catch(error => console.error(error))
        //         .finally();
        // }
        // // GET VAGETABLES
        // else if (activeCategory == 3) {
        //     fetch('https://bahriadelivery.com/api/stores')
        //         .then(response => response.json())
        //         .then(json => setShops(json))
        //         .catch(error => console.error(error))
        //         .finally();
        // }
        // // GET GROCERY
        // else if (activeCategory == 4) {
        //     fetch('https://bahriadelivery.com/api/stores')
        //         .then(response => response.json())
        //         .then(json => setShops(json))
        //         .catch(error => console.error(error))
        //         .finally();
        // }
    }, [activeCategory])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* HEADING */}
                    <Text style={styles.heading}>{`Find your food`}</Text>

                    {/* SEARCH */}
                    <View>
                        <TextInput
                            style={[styles.input, { borderColor: visibleSearch == true ? Colors.primaryColor : Colors.grayLight }]}
                            placeholderTextColor={Colors.Categories}
                            placeholder="Search Food"
                            multiline={false}
                            numberOfLines={1}
                            value={search}
                            onSubmitEditing={() => Keyboard.dismiss}
                            onChangeText={(text) => {
                                setSearch(text) // hooks
                                SearchShop(text) // function
                            }}
                            onBlur={() => {
                                Keyboard.dismiss
                                setVisibleSearch(false)
                            }}
                            onFocus={() => {
                                Keyboard.dismiss
                                setVisibleSearch(true)
                            }}

                        />
                    </View>

                    {/* CATEGORIES */}
                    <View style={styles.categoryView}>
                        {AppCategories.map((item, index) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8} key={item.id} style={{}}
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
                                <ActivityIndicator size='large' color={Colors.primaryColor} style={{ flex: 1 }} />
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
                            );
                        })}
                    </>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home;

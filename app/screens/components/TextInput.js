import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    Keyboard,
} from 'react-native'
import { Colors } from '../../styles/colors'

const MyTextInput = ({ placeholder, SehShopss, shops }) => {

    const [search, setSearch] = useState(null)
    const [visibleSearch, setVisibleSearch] = useState(false)
    const [filteredData, setFilteredData] = useState([])

    const SearchShop = (text) => {
        const result = shops.filter(item => item?.name?.includes(text))
        setFilteredData(result)
        console.log('This is result: ', result)

        // setTimeout(() => {
        //     return result
        // }, 1000)
    }

    return (
        <TextInput
            style = {[styles.input, { borderColor: visibleSearch == true ? Colors.primaryColor : Colors.grayLight }]}
            onSubmitEditing = {() => Keyboard.dismiss}
            placeholderTextColor = {Colors.textLight}
            placeholder = {placeholder}
            multiline = {false}
            numberOfLines = {1}
            value = {search}
            onChangeText = {text => {
                console.log('Text is:', text); setSearch(text)
                setTimeout(() => { SearchShop(text) }, 500)
            }}
            onBlur = {() => {
                setVisibleSearch(false)
                Keyboard.dismiss
            }}
            onFocus = {() => {
                setVisibleSearch(true)
                Keyboard.dismiss
            }}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.white,
        textTransform: 'lowercase',
        justifyContent: 'center',
        color: Colors.textLight,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        fontWeight: '500',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 20,
        fontSize: 18,
        height: 50,
    },
})

export default MyTextInput

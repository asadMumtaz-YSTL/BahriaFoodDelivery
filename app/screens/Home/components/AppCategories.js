import React from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Colors } from "../../../styles/colors";
import { AppCategories } from '../../constantData/Data'

const AppCategory = ({data, ...props }) => {
    return (
        <View style={styles.container}>
            {AppCategories.map((item, index) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.8} key={item.id}
                        onPress={() => { }}
                        style={{}}
                    >
                        <Text style={styles.cateName}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default AppCategory

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 5,
    },
    cateName: {
        color: Colors.textLight,
        fontWeight: '500',
        fontSize: 20,
    }
})

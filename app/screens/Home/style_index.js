import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from '../../styles/colors';
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    content: {
        // paddingBottom: 60,
    },
    welcomeBox: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
    welcomeText: {
        paddingHorizontal: 20,
        color: Colors.white,
        fontWeight: 'bold',
        letterSpacing: 0.9,
        lineHeight: 35,
        fontSize: 20,
    },
    heading: {
        paddingHorizontal: 20,
        color: Colors.black,
        fontWeight: 'bold',
        letterSpacing: 0.9,
        lineHeight: 35,
        fontSize: 24,
    },
    input: {
        backgroundColor: Colors.white,
        textTransform: 'lowercase',
        justifyContent: 'center',
        color: Colors.textLight,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        fontWeight: '500',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 20,
        fontSize: 18,
        height: 50,
    },
    categoryView: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 20,
    },
    cateName: {
        color: Colors.textLight,
        fontWeight: '500',
        fontSize: 20,
    },




    productView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
        flexWrap: 'wrap',
    },
    productBox: {
        width: width / 2 - 30,
        backgroundColor: Colors.textInputBG,
        borderRadius: 8,
        marginBottom: 10,
        height: (width / 2 - 30) * 1.2,
    },
    productImage: {
        width: (width / 2 - 30) - 50,
        alignSelf: 'center',
        height: (width / 2 - 30) - 50
    },
    productName: {
        color: Colors.black,
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center'
    },
    detailView: {
        flexDirection: 'row'
    },
    time: {},
    ratting: {},
    price: {},
    cart: {},
})

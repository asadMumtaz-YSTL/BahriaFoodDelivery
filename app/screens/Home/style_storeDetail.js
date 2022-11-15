import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from '../../styles/colors';
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    header: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: width,
        height: 45,
    },
    headerText: {
        color: Colors.white,
        paddingVertical: 4,
        fontSize: 15,
    },
    cartImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 35,
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
        marginTop: -6,
    },

    // MODAL
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContanier: {
        backgroundColor: "#30303055",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalCloseIcon: {
        backgroundColor: Colors.white,
        position: 'absolute',
        borderRadius: 50,
        padding: 5,
        zIndex: 2,
        top: 15,
    },
    closeIcon: {
        height: 20,
        width: 20,
    },
    modalContant: {
        backgroundColor: Colors.white,
        maxHeight: height / 1.5,
        overflow: 'hidden',
        borderRadius: 10,
        width: '86%',
    },
    modalHeader: {
        backgroundColor: Colors.black,
        alignItems: 'center',
        paddingBottom: 10,
        width: '100%',
        height: 55,
    },
    modalTitle: {
        color: Colors.white,
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 16,
    },
    modalBody: {
        backgroundColor: Colors.white,
        maxHeight: height / 1.5 - 105,
        marginHorizontal: 7,
    },
    tableHeader: {
        justifyContent: 'space-between',
        borderBottomColor: 'lightgray',
        paddingHorizontal: 7,
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 5,
    },
    tableHeadingText: {
        color: Colors.black,
        fontWeight: 'bold',
        paddingBottom: 5,
        fontSize: 16,
    },
    tableItem: {
        borderBottomColor: Colors.grayLight,
        borderBottomWidth: 0.9,
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 6,
    },
    leftData: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioImage: {
        height: 18,
        width: 18,
    },
    addCartView: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 50,
        marginTop:2
    },
    addCart: {
        backgroundColor: Colors.black,
        alignSelf: 'center',
        borderRadius: 10,
        width: '100%',
        height: 50,
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
})

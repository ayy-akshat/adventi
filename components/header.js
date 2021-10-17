import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Image, StatusBar } from 'react-native';

const AdventureAppHeader = () =>
{
    return (
        <View style={styles.header}>
            <Text style={styles.headerTxt}>
                Adventi
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    headerImg: {
        width: 60,
        height: 60,
        marginHorizontal: 10
    },
    headerTxt: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: 30,
        color: "black"
    },
})

export default AdventureAppHeader;
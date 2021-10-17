import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import AdventureAppHeader from '../components/header';
import { WebView } from 'react-native-webview';


export default class PackCheckScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <AdventureAppHeader />

                <Text>
                    Packing Checklist
                </Text>

                <WebView
                    source={{
                        uri: "https://packtor.com/"
                    }}
                    scalesPageToFit={true}
                    style={{
                        marginTop: 20,
                        width: "100%",
                        height: 100,
                        minWidth: "100%",
                        borderRadius: 20
                    }}
                />


            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
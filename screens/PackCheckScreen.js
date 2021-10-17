import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AdventureAppHeader from '../components/header';
import { WebView } from 'react-native-webview';


export default class PackCheckScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <AdventureAppHeader />

                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
                            height: Dimensions.get("screen").height*0.6,
                            minWidth: "100%",
                            borderRadius: 20
                        }}
                    />
                </ScrollView>


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
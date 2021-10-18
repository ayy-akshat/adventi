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
                            height: Dimensions.get("screen").height * 0.6,
                            minWidth: "100%",
                            borderRadius: 20
                        }}
                        ref={(webview) => { this.webview = webview }}
                        onLoad={() => {
                            this.injectJsToWV();
                            if (this.props.route.params)
                            {
                                this.webview.injectJavaScript(`document.getElementById("reiseziel").value = "${this.props.route.params.place}"`);
                            }
                        }}
                    />
                </ScrollView>


            </View>
        );
    }

    injectJsToWV = () => {
        this.webview.injectJavaScript(`
        try {
            var r = document.getElementsByClassName("col-xs-6 text-right")[0].remove();
            var r = document.getElementsByClassName("col-xs-6 text-left")[0].remove();
            }
            catch {
            }
            try {document.getElementsByClassName("container")[1].remove();} catch{}
            try {document.getElementsByTagName("header")[0].remove();} catch{}
            try {document.getElementsByTagName("aside-menu-content")[0].style.background = 'none';} catch{}
            `);
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: "#eefceb"
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
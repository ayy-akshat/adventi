import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import AdventureAppHeader from '../../components/header';

export default class MapToolsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <AdventureAppHeader/>

                <Text>
                    Map Tools
                </Text>

                <TouchableOpacity style={styles.navButton} onPress={() => {this.props.navigation.navigate("Breadcrumbs")}}>
                    <Text style={styles.navButtonTitle}>
                        Breadcrumbs
                    </Text>
                    <Text style={styles.navButtonDesc}>
                        Automatically make a marker of your location every 5 minutes so that if you get lost, you can find your path.
                    </Text>
                </TouchableOpacity>
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
    navButton: {
        width: "100%",
        borderRadius: 1000,
        padding: 20,
        paddingHorizontal: 50,
        backgroundColor: "lightgray",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    navButtonTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        fontStyle: 'italic',
        marginVertical: 10,
        textAlign: 'center',
    },
    navButtonDesc: {
        color: "#000000aa"
    }
});
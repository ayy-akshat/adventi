import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import AdventureAppHeader from '../../components/header';

export default class NatureToolsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <AdventureAppHeader />

                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    <Text>
                        Nature Tools
                    </Text>

                    <TouchableOpacity style={styles.navButton} onPress={() => { this.props.navigation.navigate("PlantIdentifier") }}>
                        <Text style={styles.navButtonTitle}>
                            Plant Identifier
                        </Text>
                        <Text style={styles.navButtonDesc}>
                            Identify a plant from a picture.
                        </Text>
                    </TouchableOpacity>
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
    navButton: {
        width: "100%",
        borderRadius: 1000,
        padding: 20,
        paddingHorizontal: 50,
        backgroundColor: "#CADECD",
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
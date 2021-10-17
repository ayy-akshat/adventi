import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import AdventureAppHeader from '../../components/header';

export default class BreadcrumbsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <Text style={{
                    marginVertical: 20,
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontStyle: 'italic'
                }}>
                    Breadcrumbs
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
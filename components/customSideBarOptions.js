import React from "react";
import { View, Image, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import AdventureAppHeader from "./header";

export default class CustomSideBarOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        return (
            <View style={styles.container}>
                <AdventureAppHeader />
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D3EBE9"
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});
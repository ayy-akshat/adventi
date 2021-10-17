import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import AdventureAppHeader from '../../components/header';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';

var interval = {
    intervals : new Set(),

    make(...args) {
        var newInterval = setInterval(...args);
        interval.intervals.add(newInterval);
        return newInterval;
    },

    clear(id) {
        interval.intervals.delete(id);
        return clearInterval(id);
    },

    clearAll() {
        for (var id of this.intervals) {
            interval.clear(id);
        }
    }
};

export default class BreadcrumbsScreen extends React.Component {
    constructor() {
        super();

        this.state = { locPerms: false, location: {}, locs: [], waitForMap: false };
    }

    componentDidMount() {
        interval.clearAll();
        interval.make(() => {
            console.log("timer fired", new Date().getTime());
        }, 10000);
    }
    
    componentWillUnmount()
    {
        interval.clearAll();
    }

    render() {
        if (this.state.locPerms) {
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

                    <ScrollView>
                        <MapView style={styles.map} region={{
                            latitude: Object.keys(this.state.location) ? this.state.location.coords.latitude : 0,
                            longitude: Object.keys(this.state.location) ? this.state.location.coords.longitude : 0,
                            latitudeDelta: 100,
                            longitudeDelta: 100,
                        }}>
                            {this.state.locs.map((item, index, list) => (
                                <Polyline key={index}
                                    coordinates={(
                                        () => {
                                            if (index == 0) {
                                                return;
                                            }
                                            else {
                                                return [
                                                    list[index-1].coords,
                                                    list[index].coords
                                                ];
                                            }
                                        }

                                    )()}
                                    strokeColor={(
                                        () => {
                                            var c = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"][Math.round(15*index/list.length)];
                                        }
                                    )()}
                                />
                            ))}
                            <Marker coordinate={{
                                latitude: Object.keys(this.state.location) ? this.state.location.coords.latitude : 0,
                                longitude: Object.keys(this.state.location) ? this.state.location.coords.longitude : 0,
                            }}>
                                <View style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 10000,
                                    backgroundColor: 'orange',
                                    borderWidth: 3,
                                    borderColor: 'darkorange',
                                    opacity: 0.8
                                }}>

                                </View>
                            </Marker>
                        </MapView>
                        <TouchableOpacity style={{
                            width: "100%",
                            backgroundColor: "lightgray",
                            padding: 20,
                            borderRadius: 1000,
                            marginVertical: 20,
                            alignItems: 'center'
                        }}
                            onPress={this.getLocation}>
                            <Text style={{
                                fontSize: 20,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                "button"
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }
        else {
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

                    <Text style={{ textAlign: 'center' }}>
                        Click the button to open the map and start tracking location.
                    </Text>
                    <TouchableOpacity style={{
                        width: "100%",
                        backgroundColor: "lightgray",
                        padding: 20,
                        borderRadius: 1000,
                        marginVertical: 20,
                        alignItems: 'center'
                    }}
                        onPress={this.getLocation}>
                        <Text style={{
                            fontSize: 20,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            {this.state.waitForMap ? "Please wait... this may take a second" : "Open map"}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    getLocation = async () => {
        this.setState({ waitForMap: true });
        var { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log("no perm");
        }
        else {
            console.log("getting location now")
            const loc = await Location.getCurrentPositionAsync();
            console.log("got location ", loc);
            var locList = this.state.locs;
            locList.push(loc);
            this.setState({ locPerms: true, location: loc, locs: locList, waitForMap: false });
            console.log(loc);
        }
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
    map: {
        width: "100%",
        height: 500,
        minWidth: "100%",
        minHeight: 500,
        borderRadius: 20
    }
});
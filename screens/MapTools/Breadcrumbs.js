import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AdventureAppHeader from '../../components/header';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

var interval = {
    intervals: new Set(),

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

        this.state = { locPerms: false, location: {}, locs: [], waitForMap: false, tracking: NaN, intervalInput: "", region: {} };
    }

    trackLocEvery = (ms) => {
        interval.clearAll();
        interval.make(() => {
            console.log("timer fired", new Date().getTime());
            this.getLocation();
        }, ms);
        this.setState({ tracking: ms });
    }

    stopTracking = () => {
        interval.clearAll();
        this.setState({ tracking: NaN });
    }

    componentWillUnmount() {
        console.log("clearing intervals");
        interval.clearAll();
    }

    componentDidMount() {
        this.getLocation((loc) => {
            console.log("location", loc.coords);
            this.setState({
                region: {
                    ...loc.coords,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                }
            });
        });
    }

    render() {
        if (this.state.locPerms) {
            return (
                <KeyboardAvoidingView style={styles.container} behavior="position">
                    <SafeAreaView style={styles.sav} />

                    <Text style={{
                        marginVertical: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        fontStyle: 'italic'
                    }}>
                        Breadcrumbs
                    </Text>

                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        <MapView style={styles.map} region={Object.keys(this.state.region) !== 0 ? this.state.region : {
                            latitude: Object.keys(this.state.location) ? this.state.location.coords.latitude : 0,
                            longitude: Object.keys(this.state.location) ? this.state.location.coords.longitude : 0,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03,
                        }}
                            onRegionChangeComplete={(region) => {
                                console.log("region", region)
                                this.setState({ region });
                            }}
                        >
                            {this.state.locs.map((item, index, list) => (
                                <Polyline key={index}
                                    coordinates={(
                                        () => {
                                            if (index == 0) {
                                                return;
                                            }
                                            else {
                                                return [
                                                    list[index - 1].coords,
                                                    list[index].coords
                                                ];
                                            }
                                        }

                                    )()}
                                    strokeColor={list.length > 1
                                        ? (
                                            () => {
                                                console.log("index", index);
                                                console.log("list.length", list.length)
                                                var a = index / (list.length - 1);
                                                var c = `rgba(255, 50, 10, ${a.toString()})`;
                                                console.log(c);
                                                return c;
                                            }
                                        )()
                                        : "orange"}
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
                        <Text style={[styles.thiccBtnTxt, { fontSize: 18 }]}>
                            {isNaN(this.state.tracking) ? "Currently not tracking location" : `Currently tracking location every ${this.state.tracking / 1000 === 1 ? "second" : this.state.tracking / 1000 + " seconds"}`}
                        </Text>
                        <View style={{
                            width: "100%",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <TextInput
                                style={styles.locationInput}
                                placeholder="Track location every _ seconds..."
                                onChangeText={(intervalInput) => this.setState({ intervalInput })}
                                value={this.state.intervalInput}
                                keyboardType="numeric"
                                maxLength={6}
                            />
                            <TouchableOpacity style={styles.searchButton} onPress={() => { this.trackLocEvery(this.state.intervalInput * 1000) }}>
                                <Text>
                                    Set
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.thiccBtn}
                            onPress={this.getLocation}>
                            <Text style={styles.thiccBtnTxt}>
                                Add point manually
                            </Text>
                        </TouchableOpacity>
                        {(
                            () => {
                                if (interval.intervals.size >= 1) {
                                    return (
                                        <TouchableOpacity style={styles.thiccBtn}
                                            onPress={() => {
                                                this.stopTracking();
                                            }}>
                                            <Text style={styles.thiccBtnTxt}>
                                                Stop tracking
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        )()}
                    </ScrollView>
                </KeyboardAvoidingView>
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
                    <TouchableOpacity style={styles.thiccBtn}
                        onPress={this.getLocation}>
                        <Text style={styles.thiccBtnTxt}>
                            {this.state.waitForMap ? "Please wait... this may take a second" : "Open map"}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    getLocation = async (callback) => {
        if (this.state.waitForMap) {
            return;
        }

        this.setState({ waitForMap: true });
        var { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log("no perm");
        }
        else {
            console.log("getting location now")
            const loc = await Location.getCurrentPositionAsync();
            // console.log("got location ", loc);
            var locList = this.state.locs;
            locList.push(loc);
            this.setState({ locPerms: true, location: loc, locs: locList, waitForMap: false });
            console.log(loc);
            callback ? callback(loc) : undefined;
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
        borderRadius: 20,
        marginVertical: 20
    },
    locationInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        width: "74%",
    },
    searchButton: {
        backgroundColor: '#A7C7E7',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        width: "24%",
        alignItems: 'center'
    },
    thiccBtn: {
        width: "100%",
        backgroundColor: "#e7c2a7",
        padding: 20,
        borderRadius: 1000,
        marginVertical: 5,
        alignItems: 'center'
    },
    thiccBtnTxt: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
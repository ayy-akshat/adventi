import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AdventureAppHeader from '../components/header';

export default class AdvisoryScreen extends React.Component {
    constructor() {
        super();

        this.state = { data: {}, weatherInput: "", invalidCity: false, unitF: true };
    }


    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <AdventureAppHeader />

                <Text>
                    Advisory
                </Text>

                <View style={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TextInput
                        style={styles.locationInput}
                        placeholder="Enter City Name for Weather"
                        onChangeText={(weatherInput) => this.setState({ weatherInput })}
                        value={this.state.weatherInput}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={this.getCityWeather}>
                        <Text>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>

                {(
                    () => {
                        if (this.state.invalidCity) {
                            return (
                                <View style={{
                                    width: "100%",
                                }}>
                                    <View style={{
                                        width: "100%",
                                        borderRadius: 15,
                                        backgroundColor: "gray",
                                        padding: 10
                                    }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 30,
                                            fontWeight: 'bold',
                                            textShadowColor: 'black',
                                            textShadowRadius: 5,
                                            marginRight: 20,
                                            fontStyle: 'italic'
                                        }}>
                                            Invalid City
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                        if (Object.keys(this.state.data).length) {
                            return (
                                <ScrollView style={styles.weatherDataScrollView} contentContainerStyle={styles.weatherDataScrollViewContentContainer}>
                                    <View style={{
                                        width: "100%",
                                    }}>
                                        <Text style={{
                                            color: "black",
                                            fontWeight: 'bold',
                                            fontStyle: 'italic',
                                            fontSize: 40,
                                            margin: 10
                                        }}>
                                            {this.state.data.name + ", " + this.state.data.sys.country}
                                        </Text>
                                        <View style={{
                                            width: "100%",
                                            borderRadius: 15,
                                            backgroundColor: "#f9ca9c",
                                            padding: 15,
                                        }}>
                                            <View style={{
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                                <View>

                                                    <TouchableOpacity onPress={() => { this.setState({ unitF: !this.state.unitF }) }} style={{
                                                        marginBottom: 15,
                                                    }}>
                                                        <Text style={{
                                                            color: "white",
                                                            fontSize: 30,
                                                            fontWeight: 'bold',
                                                            textShadowColor: 'black',
                                                            textShadowRadius: 5,
                                                            marginRight: 20,
                                                        }}>
                                                            {
                                                                this.state.unitF
                                                                    ? Math.round((this.state.data.main.temp - 273.15) * (9 / 5) + 32).toString() + "°F"
                                                                    : Math.round(this.state.data.main.temp - 273.15).toString() + "°C"
                                                            }
                                                        </Text>
                                                        <Text style={{
                                                            color: "white",
                                                            fontSize: 15,
                                                            textShadowColor: 'black',
                                                            textShadowRadius: 5,
                                                            marginRight: 20,
                                                        }}>
                                                            {
                                                                this.state.unitF
                                                                    ? Math.round(this.state.data.main.temp - 273.15).toString() + "°C"
                                                                    : Math.round((this.state.data.main.temp - 273.15) * (9 / 5) + 32).toString() + "°F"
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View>
                                                    <Text style={{
                                                        color: "white",
                                                        fontSize: 20,
                                                        textShadowColor: 'black',
                                                        textShadowRadius: 5,
                                                        marginRight: 20,
                                                        textAlign: 'right'
                                                    }}>
                                                        Low: {
                                                            (this.state.unitF
                                                                ? Math.round((this.state.data.main.temp_min - 273.15) * (9 / 5) + 32).toString() + "°F"
                                                                : Math.round(this.state.data.main.temp_min - 273.15).toString() + "°C"
                                                            )
                                                            + "\n"}
                                                        High: {
                                                            this.state.unitF
                                                                ? Math.round((this.state.data.main.temp_max - 273.15) * (9 / 5) + 32).toString() + "°F"
                                                                : Math.round(this.state.data.main.temp_max - 273.15).toString() + "°C"
                                                        }
                                                    </Text>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row'
                                                    }}>
                                                        <Image
                                                            source={{
                                                                uri: `http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`
                                                            }}
                                                            style={{
                                                                width: 30,
                                                                height: 30,
                                                            }}
                                                        />
                                                        <Text style={{
                                                            color: "white",
                                                            fontSize: 20,
                                                            textShadowColor: 'black',
                                                            textShadowRadius: 5,
                                                            marginRight: 20,
                                                            marginTop: 3,
                                                            textAlign: 'right'
                                                        }}>
                                                            {this.state.data.weather[0].description}
                                                        </Text>
                                                        <View style={{ height: 20 }}></View>
                                                    </View>

                                                </View>
                                            </View>

                                        </View>

                                        <View style={{
                                            width: "100%",
                                            borderRadius: 15,
                                            backgroundColor: "#9cc0f9",
                                            padding: 15,
                                            marginTop: 10
                                        }}>
                                            <View>
                                                <Text style={{
                                                    color: "white",
                                                    fontSize: 20,
                                                    textShadowColor: 'black',
                                                    textShadowRadius: 5,
                                                    marginRight: 20,
                                                }}>
                                                    {
                                                        "Wind speed: " + this.state.data.wind.speed + " m/s\n" +
                                                        "Wind direction: " + this.state.data.wind.deg + "\n" +
                                                        (this.state.data.wind.gust ? "Gust: " + this.state.data.wind.gust + "\n" : "")
                                                    }
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            width: "100%",
                                            borderRadius: 15,
                                            backgroundColor: "#91cf7e",
                                            padding: 15,
                                            marginTop: 10
                                        }}>
                                            <View>
                                                <Text style={{
                                                    color: "white",
                                                    fontSize: 20,
                                                    textShadowColor: 'black',
                                                    textShadowRadius: 5,
                                                    marginRight: 20,
                                                }}>
                                                    {
                                                        "Visibility: " + this.state.data.visibility
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{height: 20}}></View>
                                        <TouchableOpacity style={styles.thiccNavBtn} onPress={() => {
                                            this.props.navigation.navigate("Packing Checklist", {place: this.state.data.name + ", " + this.state.data.sys.country});
                                        }}>
                                            <Text style={styles.thiccNavBtnTxt}>
                                                Planning a trip? Make a checklist.
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            )
                        }
                    }
                )()}
            </View>
        );
    }

    getCityWeather = async () => {
        if (!(this.state.weatherInput.trim())) {
            alert("Enter a city.");
            return;
        }
        var r = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + this.state.weatherInput + "&appid=0c7c6d57de44ea0e9bee7f3ed55c97e2");
        var data = await r.json();
        if (data.cod != '404') {
            this.setState({ data, invalidCity: false });
            console.log(data.weather[0].icon);
        }
        else {
            this.setState({ data: {}, invalidCity: true });
        }
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
    weatherDataScrollView: {
        flex: 0.8,
        width: "100%"
    },
    thiccNavBtn: {
        width: "100%",
        backgroundColor: "#caebef",
        padding: 20,
        borderRadius: 1000,
        marginVertical: 5,
        alignItems: 'center'
    },
    thiccNavBtnTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
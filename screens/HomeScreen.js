import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AdventureAppHeader from '../components/header';
import RedditPostWidget from '../components/RedditPostWidget';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            r_EarthPorn: {},
            r_hiking: {},
            placesToVisitPosts: []
        }
    }

    componentDidMount() {
        this.getImage();
        this.getPlaces();
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav} />

                <AdventureAppHeader />

                <ScrollView>
                    <View style={styles.section}></View>
                    <View style={styles.section}>
                        <Text style={styles.thiccSubheader}>
                            Scenery
                        </Text>
                        <Text style={styles.subtitle}>
                            Click to get a new one, hold to open in Reddit.
                        </Text>
                        <RedditPostWidget post={this.state.r_EarthPorn} onPress={this.getImage} />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.thiccSubheader}>
                            Places to visit...
                        </Text>
                        {
                            this.renderPlacesToVisitList(this.state.placesToVisitPosts)
                        }
                    </View>
                </ScrollView>

            </View >
        );
    }

    getImage = async () => {
        var r = await fetch("https://www.reddit.com/r/EarthPorn/random.json");
        var jsonData = await r.json();
        var postData = jsonData[0].data.children[0].data;
        this.setState({ r_EarthPorn: postData });
    }

    getPlaces = async () => {
        var r = await fetch("https://www.reddit.com/r/hiking/randomrising.json");
        var jsonData = await r.json();
        var placesToVisitPosts = jsonData.data.children;
        this.setState({ placesToVisitPosts });
    }

    renderPlacesToVisitList = (places) => {
        if (places) {
            return places.map((item, index) => this.placeToVisit(item, index));
        }
    }

    placeToVisit = ({ data }, key) => {
        console.log("place", data.title);
        return (
            <View style={styles.placeToVisit} key={key}>
                <Text style={styles.placeToVisitTitle}>
                    {data.title}
                </Text>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20
                }}>
                    →
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    section: {
        borderBottomColor: "gray",
        borderBottomWidth: 2,
        paddingVertical: 20,
        marginVertical: 10,
    },
    thiccSubheader: {
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic'
    },
    subtitle: {
        fontSize: 15,
        color: "gray",
    },
    placeToVisit: {
        backgroundColor: "#e5e5e5",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    placeToVisitTitle: {
        maxWidth: "80%",
    }
});
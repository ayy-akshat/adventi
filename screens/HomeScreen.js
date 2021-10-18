import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, FlatList, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import WebView from 'react-native-webview';
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
            <KeyboardAvoidingView style={styles.container} behavior="position">
                <SafeAreaView style={styles.sav} />

                <AdventureAppHeader />

                <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>
                            Click to get a new image, hold to open in Reddit.
                        </Text>
                        <RedditPostWidget post={this.state.r_EarthPorn} onPress={this.getImage} />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.thiccSubheader}>
                            Places to visit...
                        </Text>
                        <Text style={styles.subtitle}>
                            From Tripadvisor
                        </Text>
                        {/* {
                            this.renderPlacesToVisitList(this.state.placesToVisitPosts)
                        } */}

                        <WebView
                            source={{
                                uri: "https://www.tripadvisor.com/"
                            }}
                            scalesPageToFit={true}
                            style={{
                                marginTop: 20,
                                width: "100%",
                                height: Dimensions.get("screen").height * 0.6,
                                minWidth: "100%",
                                borderRadius: 20
                            }}
                            ref={(ref) => {this.webview = ref}}
                            onLoad={this.injectJsToWv}
                        />
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
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

    injectJsToWv = () => {
        this.webview.injectJavaScript(`
        try {
            var r = document.getElementsByClassName("dqRmR cyevx dcDXR dJjeH");
            for (var i = 0; i < r.length; i++) { r[i].remove() }
            } catch{}
            try {document.getElementsByClassName("ad eWQWb _h Gi f e j u")[0].remove();} catch{}
            try {document.getElementsByClassName("bdYcv _Q Gi Ra P6 Za")[0].remove();} catch{}
            try {document.getElementsByClassName("OhjWW Cj Pl PN Py PA")[0].remove();} catch {}
            try {document.getElementsByClassName("dWGoN f e o")[0].remove();} catch{}
            try {document.getElementsByClassName("crvbs")[0].remove();} catch{}
            try {document.getElementsByClassName("prw_rup prw_search_search_results_filters ajax-content active-search-filters")[0].remove()} catch{}
            try {document.getElementsByClassName("ad_column_sticky ui_column is-3-desktop")[0].remove();} catch{}
            try {document.getElementsByClassName("DBxAQ")[0].remove(); window.scrollBy(0, 30)} catch{}
        `)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#eefceb"
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
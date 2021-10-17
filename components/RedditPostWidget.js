import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Linking } from 'react-native';

const RedditPostWidget = (props) => {
    if (!props.post || !Object.keys(props.post).length) {
        return <View></View>;
    }

    console.log("image", props.post.url);
    console.log("title", props.post.title);

    var img = props.post.url;
    return (
        <TouchableOpacity style={{
            width: "100%",
            alignSelf: 'center',
            alignItems: 'center',
            marginVertical: 10
        }} onPress={props.onPress} onLongPress={() => {
            Linking.openURL("https://reddit.com/" + props.post.permalink);
        }}>
            <View style={{
                width: "100%",
                alignSelf: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={{
                        uri: img
                    }}
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 15,
                    }}
                />
                <View style={{
                    position: 'absolute',
                    bottom: 5,
                    marginHorizontal: 20,
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Image
                        source={{
                            uri: "https://www.redditinc.com/assets/images/site/reddit-logo.png"
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 5
                        }}
                    />
                    <Text style={{
                        color: "white",
                        fontSize: 15,
                        fontStyle: 'italic',
                        textShadowColor: 'black',
                        textShadowRadius: 5,
                        marginRight: 20
                    }}>
                        {props.post.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RedditPostWidget;
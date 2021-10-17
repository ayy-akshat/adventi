import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import AdventureAppHeader from '../../components/header';

export default class PlantIdentifierScreen extends React.Component {
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
                    Plant Identifier
                </Text>

                {/* <TouchableOpacity style={styles.takePhotoButton} onPress={this.openCamera}>
                    <Text style={styles.takePhotoButtonText}>
                        Take Photo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.takePhotoButton} onPress={this.openGallery}>
                    <Text style={styles.takePhotoButtonText}>
                        Photo Gallery
                    </Text>
                </TouchableOpacity> */}
            </View>
        );
    }

    // openCamera = () => {
    //     ImagePicker.launchCamera({ includeBase64: true, mediaType: 'photo', quality: 0.5 }, (response) => {
    //         if (response.error) {
    //             console.log('LaunchCamera Error: ', response.error);
    //         }
    //         else {
    //             console.log(response);
    //         }
    //     });
    // }

    // openGallery = () => {
    //     ImagePicker.launchImageLibrary({ includeBase64: true, mediaType: 'photo', quality: 0.5 }, (response) => {
    //         if (response.error) {
    //             console.log('LaunchCamera Error: ', response.error);
    //         }
    //         else {
    //             console.log(response);
    //         }
    //     });
    // }

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
    takePhotoButton: {
        backgroundColor: "#6bbf57",
        borderRadius: 1000,
        padding: 20,
        width: "100%",
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    takePhotoButtonText: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});
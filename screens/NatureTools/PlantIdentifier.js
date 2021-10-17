import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Linking } from 'react-native';
import AdventureAppHeader from '../../components/header';
import { Camera } from 'expo-camera';
import axios from 'axios';

export default class PlantIdentifierScreen extends React.Component {
    constructor() {
        super();

        this.state = { startCamera: false, previewVisible: false, capturedImage: null }
    }

    render() {
        if (this.state.startCamera) {
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

                    <Camera
                        type="back"
                        flashMode="auto"
                        style={styles.camera}
                        ref={r => { this.camera = r }}
                    >
                        <TouchableOpacity style={styles.capturePhotoButton} onPress={this.takePicture}>

                        </TouchableOpacity>
                    </Camera>

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
                        Plant Identifier
                    </Text>

                    <TouchableOpacity style={styles.thiccBtn} onPress={this.startCam}>
                        <Text style={styles.thiccBtnTxt}>
                            Take Photo
                        </Text>
                    </TouchableOpacity>

                </View>
            );
        }
    }

    startCam = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            console.log("no cam perm");
        }
        else {
            this.setState({ startCamera: true });
        }
    }

    takePicture = async () => {
        const photo = await this.camera.takePictureAsync({ base64: true, imageType: "png" });
        this.getInfoFromAPI(photo.base64);
    }

    getInfoFromAPI = async (imgBase64Url) => {
        const data = {
            api_key: "CENSORED",
            images: [imgBase64Url],
            modifiers: ["crops_fast", "similar_images"],
            plant_language: "en",
            plant_details: [
                "common_names",
                "url",
                "name_authority",
                "wiki_description",
                "taxonomy",
                "synonyms"
            ]
        };

        axios.post('https://api.plant.id/v2/identify', data).then(res => {
            console.log('Success:', res.data);
        }).catch(error => {
            console.error('Error: ', error)
        })
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
    },
    thiccBtn: {
        width: "100%",
        backgroundColor: "#A7C7E7",
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
    },
    camera: {
        flex: 0.95,
        width: "100%",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    capturePhotoButton: {
        width: 80,
        height: 80,
        backgroundColor: "#ffffffcc",
        borderColor: "white",
        borderRadius: 50,
        borderWidth: 10,
        position: 'absolute',
        bottom: 25
    }
});
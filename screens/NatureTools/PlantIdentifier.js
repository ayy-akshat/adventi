import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Linking, ScrollView, Dimensions, FlatList } from 'react-native';
import AdventureAppHeader from '../../components/header';
import { Camera } from 'expo-camera';
import axios from 'axios';

const
    NO_PIC = 0,
    SHOT_PIC = 1,
    GOT_DATA = 2,
    DATA_ERROR = 3,

    CAM_NOT_READY = 0,
    CAM_READY = 1,
    CAM_TOOK_PHOTO = 2;

export default class PlantIdentifierScreen extends React.Component {
    constructor() {
        super();

        this.state = { startCamera: false, previewVisible: false, capturedImage: null, pictureState: NO_PIC, data: {}, takePicState: CAM_NOT_READY, dataErrorContent: "" };
    }

    render() {
        console.log("take pic state", this.state.takePicState);
        if (this.state.startCamera) {
            switch (this.state.pictureState) {
                case NO_PIC:
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
                                onCameraReady={() => {
                                    this.setState({ takePicState: CAM_READY });
                                }}
                            >
                                <TouchableOpacity style={[styles.capturePhotoButton, {
                                    opacity: (() => {
                                        if (this.state.takePicState === CAM_READY || this.state.takePicState === CAM_NOT_READY) {
                                            return 0.8;
                                        }
                                        if (this.setState.takePicState === CAM_TOOK_PHOTO) {
                                            return 0.1;
                                        }
                                    })()
                                }
                                ]} onPress={() => {
                                    (this.state.takePicState === CAM_READY) ? this.takePicture() : undefined;
                                }}>

                                </TouchableOpacity>
                            </Camera>

                        </View>
                    )
                    break;

                case SHOT_PIC:
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

                            <Text style={{ fontSize: 25, fontStyle: 'italic', textAlign: 'center' }}>
                                Observing the plant... please wait
                            </Text>

                            <Image
                                source={{
                                    uri: this.state.capturedImage
                                }}
                                style={{
                                    width: "100%",
                                    height: Dimensions.get("screen").height * 0.5,
                                    resizeMode: "contain",
                                }}
                            />

                        </View>
                    )
                    break;

                case GOT_DATA:
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
                                    Take another Photo
                                </Text>
                            </TouchableOpacity>
                            <FlatList
                                style={{ width: "100%" }}
                                contentContainerStyle={{ width: "100%" }}
                                data={[
                                    { top: true },
                                    ...this.state.data.suggestions
                                ]}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderPlantSuggestion}
                            />

                        </View>
                    )
                    break;

                case DATA_ERROR:
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
                                    Take another Photo
                                </Text>
                            </TouchableOpacity>

                            <ScrollView style={{ marginTop: 20 }}>
                                <Text>
                                    An error happened while getting the plant information.
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                    {this.state.dataErrorContent}
                                </Text>
                            </ScrollView>

                        </View>
                    )
                    break;

                default:
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
                    )
                    break;
            }
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
            alert("Plant identifier cannot be used without camera permissions.");
        }
        else {
            this.setState({ startCamera: true, pictureState: NO_PIC, takePicState: CAM_NOT_READY });
        }
    }

    takePicture = async () => {
        const photo = await this.camera.takePictureAsync({ base64: true, imageType: "png" });
        this.setState({ pictureState: SHOT_PIC, takePicState: CAM_TOOK_PHOTO, capturedImage: photo.uri });
        this.getInfoFromAPI(photo.base64);
    }

    getInfoFromAPI = async (imgBase64Url) => {
        const data = {
            api_key: "R9GfyBgyb9bQeOiwe9eRhqtSV8G6iNGRa9AdrZyB5qAF2ScrG6",
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
            // console.log('Success:', res.data);
            var data = res.data;
            // console.log("data:");
            // for (var i = 0; i < JSON.stringify(data.length); i += 9999)
            // {
            //     console.log(JSON.stringify(data).substr(i, i+9999))
            // }
            // console.log("end of data");
            for (var i in data) {
                console.log("\"" + i + "\": " + JSON.stringify(data[i]));
            }
            // console.log(data.suggestions.map((item) => { item }));
            this.setState({ data: data, pictureState: GOT_DATA });
        }).catch(error => {
            // console.error('Error: ', error);
            this.setState({ data: {}, pictureState: DATA_ERROR, dataErrorContent: error.toString() });
        })
    }

    renderPlantSuggestion = ({ item }) => {
        if (item.top) {
            return (
                <Text style={styles.thiccBtnTxt}>
                    {this.state.data.is_plant ? "Similar looking plants:" : "This doesn't look like a plant, but here are the closest looking plants:"}
                </Text>
            )
        }
        else {
            return (
                <View style={styles.plantWidget}>
                    <View style={styles.plantWidgetHorizontalLayout}>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.plantWidgetTitle}>
                                {item.plant_name}
                            </Text>
                            <Text style={styles.plantWidgetSubtitle}>
                                {item.plant_details.scientific_name}
                            </Text>
                        </View>
                        <View style={{ width: "50%" }}>
                            <Text style={styles.plantWidgetDesc}>
                                {item.plant_details.wiki_description ? (item.plant_details.wiki_description.value.length > 200 ? item.plant_details.wiki_description.value.substr(0, 200) + " . . . " : item.plant_details.wiki_description.value) : "No description available."}
                            </Text>
                        </View>
                    </View>
                    {(
                        () => {
                            if (item.plant_details.wiki_description) {
                                return (
                                    <TouchableOpacity style={styles.readMoreBtn} onPress={() => {
                                        Linking.openURL(item.plant_details.url);
                                    }}>
                                        <Text style={styles.readMoreBtnTxt}>
                                            Read more
                                        </Text>
                                        <Text style={styles.readMoreBtnArrow}>
                                            →
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    )()}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: "#edf7eb",
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
    },
    plantWidget: {
        marginVertical: 10,
        borderRadius: 20,
        padding: 20,
        width: "100%",
        backgroundColor: "white",
    },
    plantWidgetHorizontalLayout: {    
        display: 'flex',
        flexDirection: 'row'
    },
    plantWidgetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    readMoreBtn: {
        borderRadius: 10,
        backgroundColor: "gray",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20
    },
    readMoreBtnTxt: {
        fontWeight: 'bold',
        fontSize: 13,
        color: "white",
        marginTop: 4
    },
    readMoreBtnArrow: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white"
    }
});
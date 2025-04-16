import { View, Text, Dimensions, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Client, Storage, ID } from 'appwrite';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PostItemLayout = () => {

    const [marker, setMarker] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarker(coordinate);
  };

  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    // Ask for permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow location access to continue.');
      return;
    }

    // Get current position
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords); // { latitude, longitude }
    setMarker(loc.coords); // Set marker to current location
  };
  const [imageUri, setImageUri] = useState(null);

  // Set up Appwrite client
  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // e.g. https://cloud.appwrite.io/v1
    .setProject('67fffe97002c8842057d');

  const storage = new Storage(client);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      console.log('Image URI:', uri);
      uploadToAppwrite(uri);
    }
  };

  const uploadToAppwrite = async (uri) => {
    try {
      // Read file as a binary string
      const response = await fetch(uri);
const blob = await response.blob();
const file = new File([blob], 'photo.jpg', { type: blob.type });

await storage.createFile('67fffefe002c4723a110', ID.unique(), file);
  
      console.log('✅ Uploaded to Appwrite:', file.name);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await storage.listFiles('67fffefe002c4723a110');
        const imageList = res.files.map(file => ({
          id: file.$id,
          url: storage.getFilePreview('67fffefe002c4723a110', file.$id).href,
        }));
        setImages(imageList);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);



  return (
    <View style={{position: "absolute", top: 0, padding: 15, width: width, backgroundColor: "#000", borderTopWidth: 1, borderTopColor: "#ccc", height: height, zIndex: 100}}>
        
        <AntDesign name="close" size={30} color="white" style={{position: "absolute", right: 30, top: height*0.05}}/>
        <Text style={{color: "white", fontWeight: "700", fontSize: width*0.06, marginTop: height*0.07}}>post new item</Text>

        <ScrollView style={{marginTop: height*0.07}}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 15, padding: 15, backgroundColor: "#000"}}>
                <Text style={{color: "white", fontWeight: "700", fontSize: width*0.05, }}>Title</Text>
                <TextInput 
                    placeholder='name of the item'
                    placeholderTextColor="#ccc"
                    style={{backgroundColor: "#000", color: "white", borderBottomWidth: 1, borderBottomColor: "#ccc", width: width*0.7, marginTop: 5, paddingBottom: 5}}
                />
            </View>
            <View style={{alignItems: "center", gap: 15, padding: 15, backgroundColor: "#000", marginTop: height*0.05}}>
                <Text style={{color: "white", fontWeight: "700", fontSize: width*0.05, }}>Description</Text>
                <TextInput 
                    placeholder='description of the item '
                    placeholderTextColor="#ccc"
                    style={{backgroundColor: "#000", color: "white", borderBottomWidth: 1, borderBottomColor: "#ccc", width: width*0.7, marginTop: 5, paddingBottom: 5}}
                    multiline
                    numberOfLines={5} 
                    textAlignVertical="top" 
                />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", gap: 15, padding: 15, backgroundColor: "#000", marginTop: height*0.05}}>
                <Ionicons name="pricetag-outline" size={24} color="white" />
                <Text style={{color: "white", fontWeight: "700", fontSize: width*0.05, }}>Price</Text>
                <TextInput 
                    placeholder='0.00'
                    placeholderTextColor="#ccc"
                    keyboardType="numeric"
                    style={{backgroundColor: "#000", color: "white", borderBottomWidth: 1, borderBottomColor: "#ccc", width: width*0.3, marginTop: 5, paddingBottom: 5}}
                />
                <Text style={{color: "white", fontWeight: "700", fontSize: width*0.05, }}>$</Text>
            </View>
            <View style={{alignItems: "center", gap: 15, padding: 15, backgroundColor: "#000", marginTop: height*0.05}}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 15, padding: 15, backgroundColor: "#000"}}>
                    <Ionicons name="location-outline" size={24} color="white" />
                    <Text style={{color: "white", fontWeight: "700", fontSize: width*0.05, }}>Location</Text>
                </View>
                <MapView
                    style={{ width: width*0.8, height: height*0.3, borderRadius: 10 }}
                    onPress={handleMapPress}
                    showsUserLocation={true}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >
                    <TouchableOpacity onPress={() => {getLocation(); }} style={{position: "absolute", top: 10, right: 10, backgroundColor: "white", padding: 10, borderRadius: 50}}>
                    <MaterialIcons name="my-location" size={30} color="black" />
                    </TouchableOpacity>
                    {marker && (
                    <Marker coordinate={marker} />
                    )}
                    
                </MapView>
                

                {marker && (
                    <View style={styles.coordsBox}>
                    <Text>Lat: {marker.latitude.toFixed(5) ? marker.latitude.toFixed(5) : location.latitude}</Text>
                    <Text>Lng: {marker.longitude.toFixed(5) ? marker.longitude.toFixed(5) : location.longitude}</Text>
                    </View>
                )}
            </View>
            <View style={{alignItems: "center", gap: 15, padding: 15, backgroundColor: "#000", marginTop: height*0.05}}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 15, padding: 15, backgroundColor: "#000"}}>
                    
                    <MaterialIcons name="image" size={24} color="white" />
                    <Text style={{color: "white", fontWeight: "700", fontSize: width*0.05, }}>Images</Text>
                </View>
                <Text style={{color: "white", fontWeight: "700", fontSize: width*0.04, }}>Add images of the item</Text>
                <TouchableOpacity onPress={pickImage}
                style={{backgroundColor: "#000", borderWidth: 1, borderColor: "#ccc", width: width*0.8, height: height*0.2, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10}}>
                    {!imageUri ? <Ionicons name="camera" size={30} color="white" /> : <Image source={{ uri: imageUri }} style={{ width: width*0.8, height: height*0.2, borderRadius: 10 }} />}
                </TouchableOpacity>
            </View>

            {images.map(image => (
                <View key={image.id} >
                <Image source={{ uri: image.url }} style={{width: 70, height: 50, backgroundColor: "white"}} />
                <Text style={{color: "white"}}>{image.id}</Text>
                <Text style={{color: "white"}}>{image.url}</Text>
                </View>
            ))}
            {images.length === 0 && <Text>No images found.</Text>}
                        

        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    coordsBox: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      elevation: 5,
    },
  });

export default PostItemLayout;
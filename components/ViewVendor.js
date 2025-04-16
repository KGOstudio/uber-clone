import { View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';

const  VendorDetails = ({userName, password, phoneNumber, isBusness, onclick}) => {


    const [aniBuisness, setAniBuisness] = useState(false);


    const [imageUri, setImageUri] = useState(null);
    const [ani1, setAni1] = useState(false);
    const [phoneNumbers, setphoneNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [imageCompany, setImageComapny] = useState("");

    useEffect(() => {
        (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        }
    };


    return (
        <View style={{position: "absolute", width: width, height: height, backgroundColor: "black", padding: 1}}>

            <ScrollView>
            
                <View style={{alignSelf: "center", alignItems: "center", justifyContent: "center", width: width*0.7, marginTop: height*0.1, gap: 15, borderBottomWidth: 1, borderBottomColor: "white", paddingBottom: 30, shadowColor: "white", shadowOffset: {width: 0, height: 150}, shadowOpacity: 0.3, shadowRadius: 70, backgroundColor: "black",}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>Vendor Details</Text>
                    <Text style={{fontSize: 16, marginTop: 10, color: "white"}}>Name: {userName}</Text>
                    {phoneNumber && <Text style={{fontSize: 16, marginTop: 10, color: "white"}}>Phone Number: {phoneNumber}</Text>}
                </View>

                <View /* vendor details view */>
                {!phoneNumber &&
                    <TextInput 
                        placeholder='phonenumber'
                        placeholderTextColor='white'
                        style={{width: width * 0.7, backgroundColor: 'rgba(255,255,255,0.15)', padding: 15, borderRadius: 10, marginTop: height * 0.05, alignSelf: 'center', color: "white"}}
                        value={phoneNumbers}
                        onChangeText={(text) => setphoneNumber(text)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoComplete='username'
                        textContentType='username'
                        textAlignVertical='center'
                        keyboardType='default'
                        returnKeyType='next'
                        returnKeyLabel='next'            
                    />}

                    <Text style={{color: "white", fontSize: width*0.05, marginTop: height*0.05, alignSelf: "center"}}>this bussniss ?</Text>

                    <View style={{padding: 15, width: width, flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: height * 0.01, gap: 15, borderBottomWidth: 1, borderColor: "white", paddingBottom: 15, borderRadius: 50}}>
                        <TouchableOpacity style={{backgroundColor: !aniBuisness ? "" : "white", padding: 15, borderRadius: 30, alignItems: "center", paddingHorizontal: 30, borderWidth: 1, borderColor: "white"}} 
                            onPress={() => setAniBuisness(false)}
                        >
                            <Text style={{color: !aniBuisness ? "white" : "black"}}>for me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{backgroundColor: aniBuisness ? "" : "white", padding: 15, borderRadius: 30, alignItems: "center", paddingHorizontal: 30, borderWidth: 1, borderColor: "white"}} 
                            onPress={() => setAniBuisness(true)}
                        >
                            <Text  style={{color: aniBuisness ? "white" : "black"}}>for a company</Text>
                        </TouchableOpacity>
                    </View>



                    {aniBuisness ?

                    <>
                    <TextInput 
                        placeholder='company name'
                        placeholderTextColor='white'
                        style={{width: width * 0.7, backgroundColor: 'rgba(255,255,255,0.15)', padding: 15, borderRadius: 10, marginTop: height * 0.05, alignSelf: 'center', color: "white"}}
                        value={companyName}
                        onChangeText={(text) => setCompanyName(text)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoComplete='username'
                        textContentType='username'
                        textAlignVertical='center'
                        keyboardType='default'
                        returnKeyType='next'
                        returnKeyLabel='next'            
                    />

                    <View>
                        <Text style={{color: "white", fontSize: width*0.037, marginTop: height*0.05, alignSelf: "center"}}>Let's pick logo company</Text>

                        <TouchableOpacity
                            onpress={() => {pickImage(); }}
                            style={{backgroundColor: "rgba(255,255,255,0.15)", padding: 15, borderRadius: 30, alignItems: "center", paddingHorizontal: 30, marginTop: height*(0.017), width: width*0.7, alignSelf: "center", justifyContent: "center"}}
                        >
                            <Image source={{uri: imageUri}} style={{borderRadius: 50, height: 100, width: 100}}/>
                        </TouchableOpacity>
                    </View>
                    </>
                    : (
                        <View style={{width: width*0.7, alignSelf: "center", marginTop: height*0.01, gap: 15, padding: 0}}>
                            <Text style={{color: "white", fontSize: width*0.037, alignSelf: "center", marginTop: height*0.07, letterSpacing: 1}}>this is a demo vendor account, if you want your item to be from the first item in the app you can pay for that, but if your item have an a lot of views it will be from the first</Text>
                            <Text style={{color: "white", fontSize: width*0.037, alignSelf: "center", letterSpacing: 1, padding: 0}}>you can use it to shoping and buy items from the app.</Text>
                        </View>
                    )
                    }
                    
                </View>

                <View style={{padding: 1, width: width, marginTop: height*0.17}}></View>
                
            </ScrollView>


            <TouchableOpacity onPress={() => {onclick(true, [{companyName: companyName, imageCompany: imageUri}], phoneNumbers); setAni1(true);  }}
            style={{position: "absolute", bottom: height*0.1, backgroundColor: "white", padding: 15, borderRadius: 30, width: width*0.7,alignSelf: "center"}}
            >
                {!ani1 && <Text style={{fontSize: width*0.037, fontWeight: "700", letterSpacing: 1, textAlign: "center"}}>create my vendor account</Text>}
                
                <LottieView 
                    source={require("../assets/Animation - 1703532822735.json")}
                    autoPlay
                    loop
                    style={{width: "100%", height: ani1 ? height*0.05 : 0 }}
                />
            </TouchableOpacity>


        </View>
    )
}

const ViewVendor = ({userName, onclick, phoneNumber}) => {

    const [ani1, setAni1] = useState(false); 

  return (
    <View style={{flex: 1, position: "absolute", padding: 15, backgroundColor: "white", width: width * 0.88, height: height*0.7, borderRadius: 10, alignSelf: "center", justifyContent: "center", alignItems: "center", top: height*0.15}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Vendor Details</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>Name: {userName}</Text>


        <TouchableOpacity 
        onPress={() => {setAni1(true); }}
        style={{backgroundColor: "black", padding: 15, borderRadius: 30, marginTop: 20, width: width*0.7, alignItems: "center"}}
    
        >
            <Text style={{fontSize: 16, color: "white", fontWeight: "700"}}>make a vendor account</Text>
        </TouchableOpacity>

        <Text style={{fontSize: 16, marginTop: 10, color: "gray"}}>
            *Note: This is a demo vendor account. You can create your own vendor account by pay for it after a free trial. This is just a demo vend
        </Text>

        <Text style={{fontSize: 17, marginTop: 10, color: "gray"}}>
            or
        </Text>

        <TouchableOpacity 
        style={{padding: 15, borderRadius: 30, marginTop: 20, width: width*0.7, alignItems: "center", borderWidth: 1, borderColor: "black", backgroundColor: "white"}}
        onPress={() => {onclick(false, [], phoneNumber); }}
        >
            <Text style={{fontSize: 16, color: "black", fontWeight: "700"}}>make a reguilar account (skip)</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16, marginTop: 10, color: "gray"}}>
            *Note: Reguilar account is free and you can use it to shoping and buy items from the app. if do you want to be a vendor You can create your own vendor account by pay for it after a free trial after register.
        </Text>

        {ani1 && <VendorDetails userName={userName} phoneNumber={phoneNumber} onclick={onclick}/>}
    </View>
  )
}

export default ViewVendor
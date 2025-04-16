import { View, Text, TextInput, TouchableOpacity, Dimensions, Animated, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import ViewVendor from '@/components/ViewVendor'
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import axios from '../../config/axios';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;






import WrongView from '../../components/WrongView';


const SigninView = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();






    const _checkUser= () => {
      (async () => {
  
        try{
  
         const user = await axios.post('/getUserIn', {
          username: username,
          password: password
         });

         if (!user.data.check){
          router.push("/(tabs)/mainScreen");
         }else {
          console.log("user is unavailable");
         }
  
        }catch(e){
          console.log(e)
        }
      })();
    }





    const [ani3, setAni3] = useState(false);
    const [detailsError, setDetailsError] = useState("");
    const [ani1, setAni1] = useState(false);


    const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value



  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2, // Scale up
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale back to normal
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    if (!username || !password) {
      setAni3(true);
      setAni1(false);
      setDetailsError("Please enter your "+ !username && !password ? "both" : !username ? "username" : !password ? "password" : "" + " to continue.");
      
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{width: width * 0.7, borderBottomWidth: 1, borderColor: 'white', marginTop: height * 0.1, alignSelf: 'center', paddingBottom: 10, alignItems: "center", shadowRadius: 50, shadowOpacity: 1, shadowColor: 'white', backgroundColor: "black", borderRadius: 5, shadowOffset: {width: 0, height: 70}}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>Sign in</Text>
      </View>

      <View /* input view */ 
        style={{marginTop: height * 0.15}}
        >
        <TextInput 
            placeholder='Username'
            placeholderTextColor='white'
            style={{width: width * 0.7, backgroundColor: 'rgba(255,255,255,0.15)', padding: 15, borderRadius: 10, marginTop: height * 0.05, alignSelf: 'center', color: "white"}}
            value={username}
            onChangeText={(text) => setUserName(text)}
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='username'
            textContentType='username'
            textAlignVertical='center'
            keyboardType='default'
            returnKeyType='next'
            returnKeyLabel='next'            
        />

        <TextInput 
            placeholder='password'
            placeholderTextColor='white'
            style={{width: width * 0.7, backgroundColor: 'rgba(255,255,255,0.15)', padding: 15, borderRadius: 10, marginTop: height * 0.03, alignSelf: 'center'}}
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View>        
        <Text style={{color: 'white', fontSize: 15, fontWeight: '700', marginTop: height * 0.03, alignSelf: 'center'}}>haven't an account? <Text style={{color: 'gray'}}onPress={() => {router.push("/register"); }}>Register</Text></Text>
      </View>

      <View style={{borderWidth: 1, borderColor: "white", width: width*0.5, alignSelf: "center", marginTop: height*0.05}}></View>

      <Animated.View  
         style={{ transform: [{ scale: scaleAnim }] }}
        >
        <TouchableOpacity 
            onPress={() => {setAni1(!ani1); handlePress(); _checkUser();}}
            style={{marginTop: height*0.05, width: width*0.7, backgroundColor: 'rgba(255,255,255,0.3)', padding: 15, borderRadius: 10, alignSelf: 'center', alignItems: "center"}}
        >
            {!ani1 && <Text style={{color: 'white', fontSize: 15, fontWeight: '700', textAlign: "center"}}>Sign in</Text>}
            <LottieView 
                source={require('../../assets/Animation - 1703532822735.json')}
                autoPlay
                loop
                style={{width: "100%", height: ani1 ? height*0.05 : 0}}
            />
        </TouchableOpacity>
      </Animated.View>

      <WrongView isAvilable={ani3} details={detailsError} closePress={() => {setAni3(false); }}/>
    </View>
  )
}

export default SigninView
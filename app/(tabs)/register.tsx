import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ViewVendor from '../../components/ViewVendor';
import { useRouter } from 'expo-router';
import axios from '../../config/axios'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneumber] = useState('');


  const _postUser= (ischeck: false, objects: null, phoneNumbers: null) => {
    (async () => {

      try{

        if (!ischeck){
          const user = await axios.post('postUser', {
            username: username,
            password: password,
            phoneNumber: phonenumber ? phonenumber : "null"
          });
        }else {
          const user = await axios.post('postUser', {
            username: username,
            password: password,
            phoneNumber: phonenumber !== "" ? phonenumber : phoneNumbers === null ?  "null" : phoneNumbers,
            objects: objects
          });
        }

      }catch(e){
        console.log(e)
      }
    })();
  }


  const [ani1, setAni1] = useState(false);

  const router = useRouter();

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{width: width * 0.7, borderBottomWidth: 1, borderColor: 'white', marginTop: height * 0.1, alignSelf: 'center', paddingBottom: 10, alignItems: "center", shadowRadius: 50, shadowOpacity: 1, shadowColor: 'white', backgroundColor: "black", borderRadius: 5, shadowOffset: {width: 0, height: 70}}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>Register</Text>
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

        <TextInput 
          placeholder='phonenumber (optional)'
          placeholderTextColor='white'
          style={{width: width * 0.7, backgroundColor: 'rgba(255,255,255,0.15)', padding: 15, borderRadius: 10, marginTop: height * 0.03, alignSelf: 'center'}}
          value={phonenumber}
          onChangeText={(text) => setPhoneumber(text)}
        />
      </View>

      <View>        
        <Text style={{color: 'white', fontSize: 15, fontWeight: '700', marginTop: height * 0.03, alignSelf: 'center'}}>Already have an account? <Text style={{color: 'gray'}} onPress={() => {router.push("/signinView"); }}>Login</Text></Text>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '700', marginTop: height * 0.05, alignSelf: 'center', width: width*0.7, letterSpacing: 1, lineHeight: height*(0.017 + 0.005)}}>By register, you agree to our Terms of Service and Privacy Policy</Text>
      </View>

      <View style={{borderWidth: 1, borderColor: "white", width: width*0.5, alignSelf: "center", marginTop: height*0.05}}></View>

      <View>
        <TouchableOpacity 
            onPress={() => {setAni1(true)}}
        >
            <Text style={{color: 'white', fontSize: 15, fontWeight: '700', marginTop: height * 0.05, alignSelf: 'center', width: width*0.7, backgroundColor: 'rgba(255,255,255,0.3)', padding: 15, borderRadius: 10, textAlign: "center"}}>Register</Text>
        </TouchableOpacity>
      </View>

      {ani1 && <ViewVendor userName={username} onclick={(ischeck: false, objects: null, phoneNumbers: null) => {_postUser(ischeck, objects, phoneNumbers); }} phoneNumber={phonenumber} />}

    </View>
  )
}

export default Register
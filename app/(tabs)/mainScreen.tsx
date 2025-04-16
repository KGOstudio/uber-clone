import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {AntDesign, Ionicons} from '@expo/vector-icons';
import PostItemLayout from '../../components/postItemLayout';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MainScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>

      <ScrollView>
      <View style={{width: "100%", padding: 15, flexDirection: "row", marginTop: height*0.05, justifyContent: "space-between"}}>
        <Text style={{color: "white", fontSize: 20, fontWeight: "700", marginTop: height*0.03, padding: 0}}>
          welcome back, 
        </Text>
        <AntDesign name="user" size={width*0.07} color="white" style={{marginRight: 15}}/>
      </View>



      <View style={{width: width*0.8, borderRadius: 7, backgroundColor: "white", padding: 15, marginTop: height*0.05, alignSelf: "center", flexDirection: "row", alignItems: "center"}}>
        <AntDesign name="search1" size={20} color="black" />

        <TextInput 
          placeholder='Search'
          placeholderTextColor='black'
          style={{width: width * 0.3, padding: 5, borderRadius: 10, marginLeft: 10, color: "black"}}
          autoCapitalize='none'
          autoCorrect={false}
        />

        <Text>#</Text>
        <TextInput 
          placeholder='Tag'
          placeholderTextColor='black'
          style={{width: width * 0.1, padding: 5, borderRadius: 10, marginLeft: 5, color: "black"}}
          autoCapitalize='none'
          autoCorrect={false}
        />

        <TouchableOpacity style={{padding: 7, borderRadius: 15, backgroundColor: "black", position: "absolute", right: 15}}>
          <Text style={{color: "white", fontWeight: "700", padding: 0}}>search</Text>
        </TouchableOpacity>
      </View>

      <View style={{width: width, borderWidth: 1, borderColor: "white", marginTop: height*0.1, padding: 70}}>


      </View>

      <View style={{width: width, borderWidth: 1, borderColor: "white", marginTop: height*0.1, padding: 70}}>


      </View>

      <View style={{width: width, borderWidth: 1, borderColor: "white", marginTop: height*0.1, height: height}}>


      </View>

      </ScrollView>

      <View style={{position: "absolute", backgroundColor: "black", bottom: 0, width: width, flexDirection: "row", padding: 5, paddingBottom: 50, shadowColor: "white", shadowRadius: 5, shadowOpacity: 0.5, justifyContent: "space-between"}}>
        <AntDesign name="home" size={30} color="white" style={{marginLeft: width*0.1, marginTop: 30, padding: 0}}/>
        <View style={{padding: 15, paddingHorizontal: 30, borderRadius: 30, backgroundColor: "black", bottom: 30, shadowColor: "white", shadowOffset: {width: 0, height: -5}, shadowOpacity: 0.3, shadowRadius: 3, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity style={{backgroundColor: "green", padding: 7, borderRadius: 15, justifyContent: "center", alignItems: "center"}}>
          <Ionicons name="add" size={30} color="black" />
        </TouchableOpacity>
        </View>
        <Ionicons name="chatbubble-outline" size={30} color="white" style={{marginRight: width*0.1, marginTop: 30, padding: 0}}/>
      </View>

      <PostItemLayout />

    </View>
  )
}

export default MainScreen
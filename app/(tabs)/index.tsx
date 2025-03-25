import { Image, StyleSheet, Platform, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import {FontAwesome6 , MaterialIcons, Ionicons} from '@expo/vector-icons';
import TypingAnimation from '../../components/TypeAnimation';
import { useEffect, useState } from 'react';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function HomeScreen() {

  const fullText = "weko, is a platyform for buy or sell your products with out need to have an place to sell it, you can sell your products from your home, and buy products from your home. all your data in cloud, and you can access it from any where in the world.";
    const [displayedText, setDisplayedText] = useState('');

    const typingSpeed = 50; // Speed at which text is typed (in ms)
    const fullText1 = "let's start";
    const [displayedText1, setDisplayedText1] = useState('');
    const typingSpeed1 = 500; // Speed at which text is typed (in ms)

    useEffect(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText((prevText) => prevText + fullText[index]);
        index++;
  
        if (index === fullText.length - 1) {
          clearInterval(typingInterval);
        }
      }, typingSpeed);
  
      return () => clearInterval(typingInterval); // Cleanup interval on unmount

     
    }, []);

    useEffect(() => {
      setTimeout(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText1((prevText) => prevText + fullText1[index]);
        index++;
  
        if (index === fullText1.length - 1) {
          clearInterval(typingInterval);
        }
      }, typingSpeed1);
  
      return () => clearInterval(typingInterval); // Cleanup interval on unmount
    }
    , 30000);
     
    }, []);
  

  return (
   <View style={{flex: 1}}>
      <View /* header */ style={styles.header}>
        <FontAwesome6 name="squarespace" size={24} color="black" />
        <Text style={{fontWeight: "700", letterSpacing: 1, marginLeft: 1}}>weko</Text>
      </View>

      <Text style={{letterSpacing: 1, fontSize: 17, fontWeight: "500", color: "gray", marginTop: height*0.05, padding: 15, alignItems: "center"}}>{displayedText} <MaterialIcons name="circle" size={24} color="black" /></Text>

      <Text style={{letterSpacing: 1, fontSize: 17, fontWeight: "500", color: "gray", marginTop: height*0.05, padding: 15, alignItems: "center", position: "absolute", alignSelf: "center", top: height*0.7}}>{displayedText1}</Text>

      {displayedText1.length === fullText1.length - 1 &&
      <TouchableOpacity style={{backgroundColor: "black", padding: 15, borderRadius: 10, marginTop: height*0.1, width: width*0.9, alignSelf: "center", alignItems: "center", position: "absolute", bottom: height*0.05}}>
        <Text style={{color: "white", fontWeight: "700", letterSpacing: 1}}>Get Started</Text>
      </TouchableOpacity>
      }

   </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  }
});

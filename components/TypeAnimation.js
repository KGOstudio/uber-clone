import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TypingAnimation = () => {
  const fullText = "Hello, welcome to the typing animation in React Native!";
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 100; // Speed at which text is typed (in ms)

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prevText) => prevText + fullText[index]);
      index++;

      if (index === fullText.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontFamily: 'monospace', // Optional: Monospace font can give a cool typewriter effect
    color: "black"
  },
});

export default TypingAnimation;

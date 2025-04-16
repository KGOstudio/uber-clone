import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Index = () => {
    const router = useRouter();

  return (
    <View onLayout={() => {
        router.push("/(tabs)/mainScreen");
    }}>
      <Text>I</Text>
    </View>
  )
}

export default Index;
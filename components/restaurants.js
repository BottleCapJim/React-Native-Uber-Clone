import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import {  MapPinIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/core'

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
}
) => {
  const navigation= useNavigation();
  return (
//className in touchableopacity is for seperating it from the background
    <TouchableOpacity 
      onPress={() =>{
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    className="bg-white mr-7 shadow-sm">
      <Image
        source={{
            uri: urlFor(imgUrl).url()}}      
        className="h-32 w-64  rounded-sm"
      />
        <View className="px-3 pb-4">
            <Text className="font-bold text-lg pt-4">{title}</Text>
            <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22}/>
              <Text className="text-xs text-gray-500" >
                <Text className="text-green-500">{rating}</Text> · {genre}
              </Text>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22}/>
                <Text className="text-xs text-gray-500">Nearby · {address}</Text>
              </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}
export default RestaurantCard
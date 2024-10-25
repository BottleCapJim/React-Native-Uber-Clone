import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './restaurants'
import client from '../sanity'

const FeaturedRow = ({id,title,description}) => {
  const [restaurants, setRestaurants] = useState([]);



  useEffect(() => {
    client.fetch(`
    *[_type == "featured" && _id==$id] {
      ...,
      restaurants[] -> {
        ...,
        dish[] ->,
          type -> {
            name
          }
      }
    }[0]`,
    {id}
    ).then(data =>{
      setRestaurants(data?.restaurants)
    });
  }, [id]);


  return (
//justify-betwen first item at the beginning last item at the end and the middle items space is evenly
//distributed in the container
//px(padding x axis leave gap on x axis) mt(margin top leaves space at the top)
//margin is the space between an element and the next element while padding is the space between the borders
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
      </View>

        <Text className="text-xs text-gray-500 px-4">{description}</Text>
        
        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingHorizontal:15,
          }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
        >
          
        {restaurants?.map((restaurant) => (
          <RestaurantCard 
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dish}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
        </ScrollView>

    </View>
  )
}

export default FeaturedRow
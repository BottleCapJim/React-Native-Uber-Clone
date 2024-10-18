import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView, TouchableOpacity } from 'react-native';
import client, { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, StarIcon } from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon} from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { setRestaurant } from '../features/restaurantSlice';
import { useDispatch } from 'react-redux';

const RestaurantScreen = () => {
    const dispatch = useDispatch()
    const navigation=useNavigation();
    const{
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dish,
            long,
            lat,
        }
    } 
    = useRoute();

    useEffect(() => {
      dispatch(setRestaurant({
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dish,
          long,
          lat,
      }))
    }, [dispatch])



    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false,
        })
    }, [])
    const [dishes, setDishes] = useState([])
    useEffect(() => {
    client.fetch(
    `*[_type == "dish"] `
    ).then((data) =>{
      setDishes(data)
    })
  },[])
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className='relative'>
          <Image
            source={{
              uri:urlFor(imgUrl).url()
            }}
            className='w-full h-56 bg-gray-300 p-4'

          />
          {/*Left makes it go right for some reason */}
          <TouchableOpacity onPress={navigation.goBack}  
          className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
              <ArrowLeftIcon size={20} color="#00CCBB"/>
          </TouchableOpacity>
          <View className='bg-white'>
              <View className='px-4 pt-4'>
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                  <View className="flex-row items-center space-x-1">
                      <StarIcon color='green' opacity={0.5} size={22}/>
                  <Text className="text-xs text-gray-500">
                      <Text className="text-green-500">{rating}</Text> · {genre}
                  </Text>
                  <MapPinIcon color='gray' opacity={0.5} size={22}/>
                      <Text className="text-xs text-gray-500">Nearby · {address}</Text>  
                  </View>
              </View>
              <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>  
              </View> 
              {/*Adding a general padding tag like p-4 gives padding across all areas it's basically
              pt-4 pd-4 pl-4 pr-4 */}
              <TouchableOpacity className="flex-row items-center space-x-2 border-y p-4 border-gray-300">
                  <QuestionMarkCircleIcon color='gray' opacity={0.5} size={20}/>
                  <Text className="pl-2 flex-1 text-md font-bold">
                      Have a food allergy?
                  </Text>
                  <ChevronRightIcon color={'#00CCBB'}/>
              </TouchableOpacity>
          </View>
          <View className="pb-36">
            <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
            {/*Dish Rows*/}
            {dishes.map((dish) => (
                <DishRow
                  key={dish._id}
                  id={dish._id}
                  name={dish.name}
                  description={dish.short_description}
                  price={dish.price}
                  image={dish.image}                       
                />   
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default RestaurantScreen
import {
    View,
    Text,
    SafeAreaView,
    Image,
    Platform,
    TextInput,
    ScrollView,
  } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
  //If you import the solid variant you will get the solid variant of these icons instead of outline which
  //is what we want
import {
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsVerticalIcon,
  } from "react-native-heroicons/outline";
import Categories from "../components/Categories.js";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity.js";



  //className is used to define attributes about the things in the tag like color and font size (font-xs)
const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);

//problem lies in sanityclient or createclient shows up when app isn't live goes away when it is
    useEffect(() => {
      client.fetch(
      `*[_type == "featured"] {
        ...,
        restaurants[] -> {
          ...,
          dish[] ->
        }}`
      ).then((data) =>{
        setFeaturedCategories(data)
      })
    },[])
    return (
      //SafeAreaView only works on ios not android but I'll add it here just because, it puts the text in a non
      //notch area
      /*Header*/
      <SafeAreaView className="bg-white pt-5">
        {/*flex row puts everything in a row, pb makes it larger on the bottom, space-x-2 adds space px-4 moves it away from the borders */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              //Image is used to display images and it uses uri for url and source instead of src
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB"></ChevronDownIcon>
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB"></UserIcon>
        </View>
  
        {/*Search*/}
        {/*flex-row needs to be in both view tags because they are sorta seperate p-3 makes it larger */}
        {/*flex-1 allows other elements to such as magnifying class to have it's space but the rest 
          of the space which is available is taken up by the targeted element which is the text box */}
        <View className="flex-row items-center space-x-2 pv-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon color="gray" size={20} />
            {/*Text-input box */}
            <TextInput
              placeholder="Restauraunts and cuisines"
              keyboardType="default"
            />
          </View>
          <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>
  
        {/*Body*/}
        {/*In scroll view you use contentContainerStyle instead of style for padding, item-alignment etc and style for height and width and other properties*/}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {/*Categories*/}
          {/*pictures that are on top*/}
          <Categories />
  
          {/*Featured*/}
          {/*Sections of food and other items*/}

          {featuredCategories?.map(category => (
            <FeaturedRow
              key={category._id}  
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default HomeScreen;
  
import React from "react";
import {Text, TouchableOpacity, Image } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  return (
//mr-2 adds a margin right adds space between everything
//relative puts everything that's in the parent container(touchableopacity) closer together so things don't
//fly away
      <TouchableOpacity className="relative mr-2">
        <Image
          source={{
            uri: imgUrl,
          }}className="h-20 w-20 rounded"

        />
        <Text className="font-bold absolute bottom-1 left-1 text-white">{title}</Text>
      </TouchableOpacity>
  );
};

export default CategoryCard;
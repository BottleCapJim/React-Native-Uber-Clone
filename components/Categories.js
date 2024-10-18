import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard.js";
import client, { urlFor } from "../sanity.js";

const Categories=()=>{
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client.fetch(`
    *[_type == "category"]`,
    ).then(data =>{
      setCategories(data)
    });
  }, []);

  return (
    //padding is used for making a space between the object and the things around it
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >

      {/*CategoryCard*/}
      {categories.map((category) => (
        <CategoryCard 
        key={category._id}
        imgUrl={urlFor(category.image).width(200).url()} 
        title={category.name} />
      ))}
    </ScrollView>
  );
}

export default Categories; 
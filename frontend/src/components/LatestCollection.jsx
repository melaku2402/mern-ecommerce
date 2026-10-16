import React, { useContext, useEffect, useState } from "react";
import Hero from "./Hero";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  // console.log(products);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Add a check to ensure 'products' is a valid array
    if (products && Array.isArray(products)) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);
//  console.log(latestProducts);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST "} text2={"COLLECTION"} />
        <p className="w3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
          reprehenderit amet distinctio nam vel sequi mo!
        </p>
      </div>
      {/* rendering Product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:cols-5 gap-4 y-6">
        {latestProducts &&latestProducts.map((item, index) => {
         return(
             <ProductItem
            key = {index}
            id = {item._id}
            image = {item.image}
            name = {item.name}
            price = {item.price}
          />
         )
        })}
      </div>
    </div>
  );
};

export default LatestCollection;

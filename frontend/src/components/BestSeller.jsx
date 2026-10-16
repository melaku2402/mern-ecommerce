import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

 useEffect(() => {
   // Add a check to ensure 'products' is a valid array
   if (products && Array.isArray(products)) {
     const bestProduct = products.filter((item) => item.bestseller);
     setBestSeller(bestProduct.slice(0, 5));
   }
 }, [products]);


  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST "} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iste
          nihil libero soluta blanditiis corporis quasi archiillum{" "}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => {
         return(
             <ProductItem
            key={index}
            id={item}
            name={item.name}
            image={item.image}
            price={item.price}
          />
         )
        })}
      </div>
    </div>
  );
};
export default BestSeller;

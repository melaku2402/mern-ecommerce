
import ProductModel from "../models/productModel.js"; 
import {v2 as cloudinary} from 'cloudinary'
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {name,description, price,
      category,subCategory, sizes,
      bestseller,  } = req.body;
    // Corrected the console.log statement
    // console.log(
    //   name,
    //   description,
    //   price,
    //   category,
    //   subCategory,
    //   sizes,
    //   bestseller
    // );
    
    const image1 = req.files.image1 && req.files.image1[0] ;
    const image2 = req.files.image2 && req.files.image2[0] ;
    const image3 = req.files.image3 && req.files.image3[0] ;
    const image4 = req.files.image4 && req.files.image4[0] ;
    const images= [image1, image2, image3, image4].filter((item)=>item !==undefined)


  let imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
      return result.secure_url; // Return the public URL for each image
    })
  );
  // console.log(images);
  //  console.log(imageUrl);
  // 1. Create a new product instance with the data
    const productDta = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? "true" : "false",
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date:Date.now()
    };
    console.log(productDta);
    const product = new productModel(productDta)
         await product.save()
        //  ...........OTHER METHOD OF CREATE PRODUCT to mongoose
    // 1. Create a new product instance with the data
    // const newProduct = new ProductModel({
    //   name,
    //   description,
    //   price,
    //   category,
    //   subCategory,
    //   sizes,
    //   bestseller,
    //   images: [image1.filename, image2.filename, image3.filename, image4.filename] // Save image filenames
    // });
    
    // // 2. Save the product to the database
    // await newProduct.save();

    // 3. Send a success response
     res.json({
       success: true,
       message: "Product added successfully",
      
     });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message + " not add" });
  }
};

//function for list  product
const listProduct = async (req, res) => {
try {
  const   product = await productModel.find({})
      res.json({ success: "true",product });

} catch (error) {
  console.log(error);
  res.json({success:'false',message:error.message})
  
}
};
//function for removing product
const removeProduct = async (req, res) => {
  try {
   await productModel.findByIdAndDelete(req.body.id)
     res.json({ success: "true", message: 'Product Removed'});
 
  } catch (error) {
    console.log(error);
      res.json({ success: "false", message: error.message });

  }
};

//function for single product
const singleProduct = async (req, res) => {
    try {
       const { productId }= req.body;
      const product = await productModel.findById(productId);
      res.json({ success: "true",product});
    } catch (error) {
      console.log(error);
      res.json({ success: "false", message: error.message });
    }
};

export { listProduct, addProduct, removeProduct, singleProduct };

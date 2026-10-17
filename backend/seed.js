import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import productModel from './models/productModel.js'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// read the products array out of assets/assets.js
const src = fs.readFileSync('./assets/assets.js', 'utf8')
const start = src.indexOf('export const products')
const arrStart = src.indexOf('[', start)
let depth = 0, end = -1
for (let i = arrStart; i < src.length; i++) {
  if (src[i] === '[') depth++
  else if (src[i] === ']' && --depth === 0) { end = i; break }
}
const body = src.slice(arrStart, end + 1).replace(/\bp_img[0-9_]+\b/g, (m) => JSON.stringify(m + '.png'))
const products = new Function('return ' + body)()

const cache = {}
const upload = async (file) => {
  if (!cache[file]) {
    const r = await cloudinary.uploader.upload(path.join('./assets', file), {
      folder: 'ecommerce',
      public_id: file.replace('.png', ''),
      overwrite: true,
    })
    cache[file] = r.secure_url
  }
  return cache[file]
}

await mongoose.connect(process.env.MONGODB_URL, { dbName: 'e-commerce' })
await productModel.deleteMany({})

const docs = []
for (const p of products) {
  const { _id, ...rest } = p // MongoDB creates real ObjectIds
  rest.image = await Promise.all(p.image.map(upload))
  docs.push(rest)
}
await productModel.insertMany(docs)
console.log(`Seeded ${docs.length} products, ${Object.keys(cache).length} images`)
await mongoose.disconnect()
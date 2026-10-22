import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";
dotenv.config();

const res = await fetch("https://fakestoreapi.com/products");
if (!res.ok) throw new Error("Could not fetch products from FakeStore API");
const data = await res.json();

const products = data.map((p) => ({
  title: p.title,
  description: p.description,
  price: p.price,
  image: p.image,
  category: p.category,
  stock: 10 + Math.floor(Math.random() * 40),
}));

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany();
await Product.insertMany(products);
console.log("Seeded", products.length, "products");
process.exit();
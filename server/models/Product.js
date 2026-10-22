import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    image: String,
    category: String,
    stock: { type: Number, default: 10, min: 0 },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);

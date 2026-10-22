import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    shippingAddress: { fullName: String, address: String, city: String, pincode: String, phone: String },
    itemsTotal: Number,
    tax: Number,
    shipping: Number,
    total: Number,
    status: { type: String, default: "placed" },
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);

import { Router } from "express";
import auth from "../middleware/auth.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
const router = Router();

// Prices are always re-read from the DB, never trusted from the client
router.post("/", auth, async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const orderItems = [];
    for (const it of items) {
      const p = await Product.findById(it._id);
      if (!p) return res.status(404).json({ message: "A product no longer exists" });
      if (p.stock < it.qty) return res.status(400).json({ message: `Only ${p.stock} left for ${p.title}` });
      orderItems.push({ product: p._id, title: p.title, price: p.price, qty: it.qty, image: p.image });
    }
    const itemsTotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = +(itemsTotal * 0.05).toFixed(2);
    const shipping = itemsTotal > 999 ? 0 : 49;
    const total = +(itemsTotal + tax + shipping).toFixed(2);

    for (const i of orderItems) await Product.updateOne({ _id: i.product }, { $inc: { stock: -i.qty } });
    const order = await Order.create({ user: req.userId, items: orderItems, shippingAddress, itemsTotal, tax, shipping, total });
    res.status(201).json(order);
  } catch (e) { next(e); }
});

router.get("/mine", auth, async (req, res, next) => {
  try {
    res.json(await Order.find({ user: req.userId }).sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});

export default router;

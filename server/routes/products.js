import { Router } from "express";
import Product from "../models/Product.js";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { search, category, sort } = req.query;
    const filter = {};

    if (search) {
      // escape special characters so the regex does not break
      const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rx = { $regex: safe, $options: "i" };
      filter.$or = [{ title: rx }, { description: rx }, { category: rx }];
    }

    if (category && category !== "all") filter.category = category;

    const sortMap = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      newest: { createdAt: -1 },
    };
    const products = await Product.find(filter).sort(sortMap[sort] || {});
    res.json(products);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
});

export default router;
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, removeFromCart } from "../store/cartSlice.js";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector((s) => s.cart.items.some((i) => i._id === product._id));
  const out = product.stock === 0;

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="muted">{product.description}</p>
      <div className="row">
        <strong>{product.price.toFixed(2)}</strong>
        <span className="muted">{out ? "Out of stock" : `${product.stock} left`}</span>
      </div>
      {inCart ? (
        <button className="btn danger" onClick={() => { dispatch(removeFromCart(product._id)); toast("Removed from cart"); }}>
          Remove From cart
        </button>
      ) : (
        <button className="btn" disabled={out} onClick={() => { dispatch(addToCart(product)); toast.success("Added to cart"); }}>
          Add to cart
        </button>
      )}
    </div>
  );
}

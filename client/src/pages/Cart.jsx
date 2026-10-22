import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty, clearCart, selectTotalItems, selectTotalAmount } from "../store/cartSlice.js";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((s) => s.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const totalAmount = useSelector(selectTotalAmount);

  if (items.length === 0)
    return (
      <div className="center">
        <h2>Your cart is empty</h2>
        <Link className="btn" to="/">Shop now</Link>
      </div>
    );

  return (
    <div className="cart-layout">
      <div>
        {items.map((it) => (
          <div className="cart-item" key={it._id}>
            <img src={it.image} alt={it.title} />
            <div className="grow">
              <h3>{it.title}</h3>
              <p>{it.price.toFixed(2)}</p>
              <div className="qty">
                <button onClick={() => dispatch(decreaseQty(it._id))} disabled={it.qty === 1}>-</button>
                <span>{it.qty}</span>
                <button onClick={() => dispatch(increaseQty(it._id))} disabled={it.qty >= it.stock}>+</button>
              </div>
            </div>
            <div className="right">
              <strong>{(it.price * it.qty).toFixed(2)}</strong>
              <button className="btn danger" onClick={() => dispatch(removeFromCart(it._id))}>Remove From cart</button>
            </div>
          </div>
        ))}
        <button className="link-btn" onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
      <aside className="summary">
        <h2>Your Cart Summary</h2>
        <p><b>Total Item:</b> {totalItems}</p>
        <p><b>Total Amount:</b> {totalAmount.toFixed(2)}</p>
        <button className="btn" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
      </aside>
    </div>
  );
}

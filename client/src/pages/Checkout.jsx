import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../api.js";
import { clearCart, selectTotalAmount } from "../store/cartSlice.js";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((s) => s.cart.items);
  const subtotal = useSelector(selectTotalAmount);
  const tax = +(subtotal * 0.05).toFixed(2);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + tax + shipping;

  const [addr, setAddr] = useState({ fullName: "", address: "", city: "", pincode: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const onChange = (e) => setAddr({ ...addr, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Cart is empty");
    setBusy(true);
    try {
      await api("/orders", { method: "POST", body: { items: items.map((i) => ({ _id: i._id, qty: i.qty })), shippingAddress: addr } });
      dispatch(clearCart());
      toast.success("Order placed!");
      navigate("/orders");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cart-layout">
      <form className="form" onSubmit={placeOrder}>
        <h2>Shipping details</h2>
        <input name="fullName" placeholder="Full name" value={addr.fullName} onChange={onChange} required />
        <input name="address" placeholder="Address" value={addr.address} onChange={onChange} required />
        <input name="city" placeholder="City" value={addr.city} onChange={onChange} required />
        <input name="pincode" placeholder="Pincode" pattern="[0-9]{6}" value={addr.pincode} onChange={onChange} required />
        <input name="phone" placeholder="Phone" pattern="[0-9]{10}" value={addr.phone} onChange={onChange} required />
        <button className="btn" disabled={busy}>{busy ? "Placing order..." : "Place order (Cash on Delivery)"}</button>
      </form>
      <aside className="summary">
        <h2>Order Summary</h2>
        <p>Subtotal: {subtotal.toFixed(2)}</p>
        <p>Tax (5%): {tax.toFixed(2)}</p>
        <p>Shipping: {shipping === 0 ? "Free" : shipping.toFixed(2)}</p>
        <h3>Total: {total.toFixed(2)}</h3>
        <p className="muted">Final amount is recalculated on the server.</p>
      </aside>
    </div>
  );
}

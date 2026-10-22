import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/orders/mine").then(setOrders).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!orders) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((o) => (
        <div className="order" key={o._id}>
          <div className="row">
            <span>#{o._id.slice(-6)} - {new Date(o.createdAt).toLocaleDateString()}</span>
            <span className="badge">{o.status}</span>
          </div>
          {o.items.map((i, idx) => <p key={idx}>{i.title} x {i.qty} - {(i.price * i.qty).toFixed(2)}</p>)}
          <strong>Total: {o.total.toFixed(2)}</strong>
        </div>
      ))}
    </div>
  );
}

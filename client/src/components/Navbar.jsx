import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems } from "../store/cartSlice.js";
import { logout } from "../store/authSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const count = useSelector(selectTotalItems);
  const user = useSelector((s) => s.auth.user);
  return (
    <header className="navbar">
      <h1 className="brand">REACT REDUX SHOPPING CART</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({count})</Link>
        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            <button className="link-btn" onClick={() => dispatch(logout())}>Logout ({user.name})</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

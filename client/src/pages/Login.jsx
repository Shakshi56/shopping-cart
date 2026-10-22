import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../api.js";
import { setAuth } from "../store/authSlice.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const data = await api(isRegister ? "/auth/register" : "/auth/login", { method: "POST", body: form });
      dispatch(setAuth(data));
      toast.success(`Welcome, ${data.user.name}`);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h2>{isRegister ? "Create account" : "Login"}</h2>
      {isRegister && <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />}
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={onChange} required />
      <button className="btn" disabled={busy}>{busy ? "Please wait..." : isRegister ? "Register" : "Login"}</button>
      <button type="button" className="link-btn" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New here? Register"}
      </button>
    </form>
  );
}

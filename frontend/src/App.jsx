import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ResetPassword from "./components/auth/ResetPassword"; 
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setLoading, setUser, setError } from "./redux/slices/authSlice";
import axios from "axios";
import Auth from "./components/auth/Auth"; // ✅ import Auth

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");
    if (!storedToken || user) return;

    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        dispatch(setUser({ user: res.data, token: storedToken }));
      } catch (error) {
        console.error("getMe failed", error);
        dispatch(
          setError(
            error?.response?.data?.message ||
              "Session expired. Please login again"
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch, token, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

      {/* ✅ Mount Auth globally so modal can open anywhere */}
      <Auth />
    </BrowserRouter>
  );
}

export default App;

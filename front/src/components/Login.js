"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "./../../public/images/logo-neosoft-white.svg";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      dispatch(setCurrentUser(response.data));

      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials");
    }
  };
  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <>
      <Image className="p-1 mt-1 h-fit" priority src={logo} alt="Neosoft" />
      <span className="bg-white absolute mt-10 flex items-center justify-center w-full h-8 font-bold">
        Flex Office: Réserver
      </span>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de passe:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            {/* <div className="mt-4 text-center">
              <button
                type="button"
                onClick={navigateToRegister}
                className="text-blue-600 hover:underline"
              >
                Don't have an account? Register
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

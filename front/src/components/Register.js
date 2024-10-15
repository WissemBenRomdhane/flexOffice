"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "./../../public/images/logo-neosoft-white.svg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          username,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error registering user");
    }
  };

  return (
    <>
      <Image className="p-1 mt-1 h-fit" priority src={logo} alt="Neosoft" />
      <span className="bg-white absolute mt-10 flex items-center justify-center w-full h-8 font-bold">
        Flex Office: Réserver
      </span>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={handleRegister}>
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
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

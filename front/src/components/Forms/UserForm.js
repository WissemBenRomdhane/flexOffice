"use client";

import React, { useState } from "react";

const UserForm = ({ initialValues = {}, onSubmit, onClose }) => {
  const [email, setEmail] = useState(initialValues.email || "");
  const [username, setUsername] = useState(initialValues.username || "");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Ajoutez cet état pour la visibilité du mot de passe
  const [role, setRole] = useState(initialValues.role || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, username, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <div className="mb-4">
        <label className="text-white block text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white block text-sm font-bold mb-2">
        Nom de l'utilisateur
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white block text-sm font-bold mb-2">
          Mot de passe
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"} // Utilisez l'état pour basculer le type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={initialValues._id ? "Laissez vide si inchangé" : ""}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Bascule la visibilité du mot de passe
            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400"
          >
            {isPasswordVisible ? (
              <svg
                className="shrink-0 size-3.5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="hs-password-active:hidden"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                ></path>
                <path
                  className="hs-password-active:hidden"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                ></path>
                <path
                  className="hs-password-active:hidden"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                ></path>
                <line
                  className="hs-password-active:hidden"
                  x1="2"
                  x2="22"
                  y1="2"
                  y2="22"
                ></line>
              </svg>
            ) : (
              <svg
                className="shrink-0 size-3.5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="hs-password-active:block"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                ></path>
                <circle
                  className="hs-password-active:block"
                  cx="12"
                  cy="12"
                  r="3"
                ></circle>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-white block text-sm font-bold mb-2">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Sélectionner un rôle</option>
          <option value="Admin">Admin</option>
          <option value="Consultant">Consultant</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialValues._id ? "Modifier" : "Ajouter"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 text-white p-2 rounded ml-2"
      >
        Annuler
      </button>
    </form>
  );
};

export default UserForm;

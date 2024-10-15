"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser, deleteUser } from "@/actions/userActions";

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [editingUserId, setEditingUserId] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // Fetch users when the component is mounted
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle editing a user
  const handleEdit = (user) => {
    setName(user.username);
    setRole(user.role);
    setEditingUserId(user._id);
  };

  // Handle updating a user
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { _id: editingUserId, name, role };
    dispatch(updateUser(updatedUser));
    setEditingUserId(null);
    setName("");
    setRole("");
  };

  // Handle deleting a user
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>

      {/* User List */}
      <ul className="mb-8">
        {users.map((user) => (
          <li
            key={user._id}
            className="p-2 border rounded mb-2 flex justify-between items-center"
          >
            <span>
              {user.username} - {user.role}
            </span>
            <div>
              <button
                className="bg-yellow-500 text-white p-1 rounded mr-2"
                onClick={() => handleEdit(user)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDelete(user._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit User Form */}
      {editingUserId && (
        <form onSubmit={handleUpdate} className="p-4 border rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Nom de l'utilisateur
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Rôle de l'utilisateur
            </label>
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
            Mettre à jour l'utilisateur
          </button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;

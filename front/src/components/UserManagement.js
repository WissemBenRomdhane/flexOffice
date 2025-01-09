"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "@/actions/userActions";
import { useRouter } from "next/navigation";
import UserForm from "./Forms/UserForm";

const UserManagement = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture du modal

  // Fetch users when the component is mounted
  useEffect(() => {
    if (currentUser?.role !== "Admin") {
      // Rediriger vers une page 404 si l'utilisateur n'est pas Admin
      router.replace("/404");
    } else {
      // Charger les utilisateurs seulement si l'utilisateur est Admin
      dispatch(fetchUsers());
    }
  }, [currentUser, dispatch]);

  // Handle adding a new user
  const handleAddUser = (user) => {
    dispatch(addUser(user));
    setIsModalOpen(false);
  };

  // Handle editing a user
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Handle updating a user
  const handleUpdate = (user) => {
    dispatch(updateUser({ ...editingUser, ...user }));
    setEditingUser(null);
    setIsModalOpen(false);
  };

  // Handle deleting a user
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      {/* Bouton pour ouvrir le modal d'ajout d'utilisateur */}
      <button
        className="bg-green-500 text-white p-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Ajouter un utilisateur
      </button>

      {/* Liste des utilisateurs */}
      <ul className="mb-8">
        {users.map((user) => (
          <li
            key={user._id}
            className="text-white p-2 border rounded mb-2 flex justify-between items-center"
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

      {isModalOpen && (
        <UserForm
          initialValues={editingUser || {}}
          onSubmit={editingUser ? handleUpdate : handleAddUser}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;

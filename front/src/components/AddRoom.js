"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom,
  deleteRoom,
  fetchRooms,
  updateRoom,
} from "@/actions/roomActions";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingRoomId, setEditingRoomId] = useState(null);

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(fetchRooms()); // Récupère les salles au chargement
  }, [dispatch]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingRoomId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = { name, description };

    if (editingRoomId) {
      dispatch(updateRoom({ ...room, _id: editingRoomId }));
      setEditingRoomId(null);
    } else {
      dispatch(addRoom(room));
    }

    resetForm();
  };

  const handleEdit = (room) => {
    setName(room.name);
    setDescription(room.description);
    setEditingRoomId(room._id);
  };

  const handleDelete = (roomId) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette salle ?"
    );
    if (confirmed) {
      dispatch(deleteRoom(roomId));
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-md mb-4"
      >
        <div className="mb-4">
          <label className="text-white text-sm font-bold mb-2">
            Nom de la salle
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
          <label className="text-white text-sm font-bold mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${
            !name || !description ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!name || !description}
        >
          {editingRoomId ? "Modifier la salle" : "Ajouter la salle"}
        </button>
      </form>

      <ul className="mt-4">
        {rooms.map((room) => (
          <li
            key={room._id}
            className="text-white p-2 border rounded mb-2 flex justify-between"
          >
            <span>{room.name}</span>
            <div>
              <button
                className="bg-yellow-500 text-white p-1 rounded mr-2"
                onClick={() => handleEdit(room)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDelete(room._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddRoom;

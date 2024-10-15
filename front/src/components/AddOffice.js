"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const AddOffice = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des salles:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOffice = { name, description, roomId };
    try {
      const response = await axios.post(
        "http://localhost:5000/offices",
        newOffice
      );
      console.log("Bureau ajouté:", response.data);
      setName("");
      setDescription("");
      setRoomId("");
    } catch (error) {
      console.error("Error lors de l'ajout du bureau:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md mb-4">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Nom du bureau</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Salle</label>
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Sélectionner une salle</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Ajouter le bureau
      </button>
    </form>
  );
};

export default AddOffice;

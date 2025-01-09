"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOffice } from "@/actions/officeActions";
import { fetchRooms } from "@/actions/roomActions";

const AddOffice = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    dispatch(fetchRooms()); // Récupère les salles au chargement
  }, [dispatch]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setRoomId("");
    setEquipment([]);
  };

  const handleEquipmentChange = (e) => {
    const value = e.target.value;
    setEquipment((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOffice = { name, description, equipment, roomId };

    dispatch(addOffice(newOffice));
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md mb-4">
      <div className="mb-4">
        <label className="text-white block text-sm font-bold mb-2">
          Nom du bureau
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
        <label className="text-white block text-sm font-bold mb-2">
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
      <div className="mb-4">
        <label className="text-white block text-sm font-bold mb-2">
          Équipement
        </label>
        <div className="flex gap-4">
          <label className="text-white block text-sm mb-2">
            <input
              type="checkbox"
              value="monitor"
              checked={equipment.includes("monitor")}
              onChange={handleEquipmentChange}
            />
            Écran
          </label>
          <label className="text-white block text-sm mb-2">
            <input
              type="checkbox"
              value="keyboard"
              checked={equipment.includes("keyboard")}
              onChange={handleEquipmentChange}
            />
            Clavier
          </label>
          <label className="text-white block text-sm mb-2">
            <input
              type="checkbox"
              value="mouse"
              checked={equipment.includes("mouse")}
              onChange={handleEquipmentChange}
            />
            Souris
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-white block text-sm font-bold mb-2">Salle</label>
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

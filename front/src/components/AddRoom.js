'use client';

import React, { useState } from "react";
import axios from "axios";

const AddRoom = () => {
    const [name, setName] = useState('');
    const [description , setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRoom = { name, description };
        try {
            const response = await axios.post('http://localhost:5000/api/rooms', newRoom);
            console.log('Salle ajoutée: ', response.data);
            setName('');
            setDescription('');
        } catch (error) {
            console.error("Erreur lors de l'ajout de la salle: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md mb-4">
            <div className="mb-4">
                <label className="black text-sm font-bold mb-2">Nom de la salle</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
                <label className="black text-sm font-bold mb-2">Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ajouter la salle</button>
        </form>
    );
};

export default AddRoom;

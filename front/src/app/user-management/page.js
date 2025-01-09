import UserManagement from "@/components/UserManagement";
import React from "react";

const UserManagementPage = () => {
  return (
    <div className="page-content">
      <h1 className="text-white text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
      <UserManagement />
    </div>
  );
};

export default UserManagementPage;

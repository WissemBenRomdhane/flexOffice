import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/slices/userSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  // Récupération du rôle de l'utilisateur connecté
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between w-fit mx-auto p-4">
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/add-room"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Ajouter Salle
              </a>
            </li>
            <li>
              <a
                href="/add-office"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Ajouter Bureau
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Réservation
              </a>
            </li>
            {/* Afficher la gestion des utilisateurs uniquement si l'utilisateur est Admin */}
            {currentUser && currentUser.role === "Admin" && (
              <li>
                <a
                  href="/user-management"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Gestion des Utilisateurs
                </a>
              </li>
            )}

            <li></li>
            <li>
              <a
                href="#"
                onClick={() => handleLogout()}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    // <div className={`fixed top-0 left-0 h-full ${isOpen ? 'w-64' : 'w-16'} bg-blue-600 transition-all duration-300`}>
    //   <div className="flex flex-col h-full">
    //     <div className="flex items-center justify-between p-4">
    //       <h1 className={`text-white text-lg font-bold ${isOpen ? 'block' : 'hidden'}`}>Sidebar</h1>
    //       <button
    //         className="text-white focus:outline-none"
    //         onClick={toggleSidebar}
    //       >
    //         {isOpen ? 'Close' : 'Open'}
    //       </button>
    //     </div>
    //     <nav className="flex-grow mt-4">
    //       <ul className="space-y-2">
    //         <li>
    //           <a href="/" className="block text-white py-2 px-4 hover:bg-blue-700 rounded">Réservation</a>
    //         </li>
    //         <li>
    //           <a href="/add-room" className="block text-white py-2 px-4 hover:bg-blue-700 rounded">Ajouter Salle</a>
    //         </li>
    //         <li>
    //           <a href="/add-office" className="block text-white py-2 px-4 hover:bg-blue-700 rounded">Ajouter Bureau</a>
    //         </li>
    //       </ul>
    //     </nav>
    //     <button
    //       onClick={handleLogout}
    //       className="m-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    //     >
    //       Logout
    //     </button>
    //   </div>
    // </div>
  );
}

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/slices/userSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  // Récupération du rôle de l'utilisateur connecté
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
  };

  const linkClasses = (href) =>
    `block py-2 px-3 rounded md:p-0 ${
      pathname === href
        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    }`;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between w-fit mx-auto p-4">
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" className={linkClasses("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="reservation" className={linkClasses("/reservation")}>
                Réservation
              </Link>
            </li>
            {/* Afficher la gestion des utilisateurs uniquement si l'utilisateur est Admin */}
            {currentUser && currentUser.role === "Admin" && (
              <>
                <li>
                  <Link href="/add-room" className={linkClasses("/add-room")}>
                    Ajouter Salle
                  </Link>
                </li>
                <li>
                  <Link
                    href="/add-office"
                    className={linkClasses("/add-office")}
                  >
                    Ajouter Bureau
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user-management"
                    className={linkClasses("/user-management")}
                  >
                    Gestion des Utilisateurs
                  </Link>
                </li>
              </>
            )}

            <li></li>
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

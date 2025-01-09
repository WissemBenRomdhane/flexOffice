"use client";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "./../../public/images/logo-neosoft-white.svg";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store/store";
import { setCurrentUser } from "@/slices/userSlice";

function LayoutComponent({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger l'utilisateur depuis localStorage si présent
    const storedUser =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;
    if (storedUser) {
      dispatch(setCurrentUser(JSON.parse(storedUser)));
    }
    setIsLoaded(true); // L'utilisateur est maintenant chargé
  }, [dispatch]);

  useEffect(() => {
    if (
      isLoaded &&
      !isLoggedIn &&
      pathname !== "/login" &&
      pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [isLoaded, isLoggedIn, router, pathname]);

  if (!isLoaded) return null; // Attendre que le chargement soit terminé

  return (
    <div className="bg-blue-950">
      {isLoggedIn && (
        <>
          <div>
            <Image
              className="p-1 mt-1 h-fit"
              priority
              src={logo}
              alt="Neosoft"
            />
            <Navbar />
          </div>
        </>
      )}
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Réservation Flex Office</title>
          <meta
            name="description"
            content="Réserver des espaces de bureaux dans l'entreprise"
          />
        </head>
        <body>
          <LayoutComponent>{children}</LayoutComponent>
        </body>
      </html>
    </Provider>
  );
}

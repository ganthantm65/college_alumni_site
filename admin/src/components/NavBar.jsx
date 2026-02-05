import React, { useEffect, useState } from "react";
import {
  Home,
  Info,
  Users,
  CalendarDays,
  Image,
  HandCoins,
  User,
  Menu,
  X,
  Newspaper
} from "lucide-react";

import logo from "../assets/logo.jpeg";
import brand from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    { name:"Announcements" ,icon:Newspaper,path:"/announcements"},
    { name: "Events", icon: CalendarDays, path: "/events" },
    { name: "Gallery", icon: Image, path: "/gallery" },
    { name: "Donations", icon: HandCoins, path: "/donations" }
  ];

  const navigate = useNavigate();
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    const token=localStorage.getItem('Token');
    if(!token || isTokenExpired(token)){
      localStorage.clear();
    }
  },[])

  const isTokenExpired = token => {
    if (!token) return true
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  }


  useEffect(() => {
    setIsTokenAvailable(!localStorage.getItem("Token"));
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b-4 border-orange-500 shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-12 h-12 rounded-full" />
          <img src={brand} alt="" className="h-8 hidden sm:block" />
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer transition"
                onClick={() => navigate(item.path)}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isTokenAvailable ? (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-2 text-gray-700">
              <User size={22} />
              <span className="text-sm">{localStorage.getItem("user_name")}</span>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col gap-4 px-6 py-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer transition"
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.name}</span>
                </li>
              );
            })}

            <div className="pt-4 border-t">
              {isTokenAvailable ? (
                <button
                  onClick={() => {
                    handleLogin();
                    setOpen(false);
                  }}
                  className="w-full py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <User size={22} />
                  <span className="text-sm">{localStorage.getItem("user_name")}</span>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

import { Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch("http://localhost:3000/api/announcement/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      
      setAnnouncements(data.announcements || []);
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="w-full bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto h-10 px-4 flex items-center">
          <ul className="flex items-center gap-4 text-white text-sm">
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <span>0462-2552450</span>
            </li>
            <span>|</span>
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <span>gcetlyalumni.ac.in</span>
            </li>
          </ul>
        </div>
      </div>

      <NavBar />

      <div className="max-w-[90%] mx-auto p-6 mb-15">
        <h1 className="text-2xl text-blue-800 font-bold mb-4">Announcements</h1>
        <div className="flex flex-col gap-4">
          {announcements.map(a => (
            <div key={a.announcement_id} className="p-4 border-l-3 border-orange-500 rounded shadow">
              <p className="text-md font-semibold text-orange-700">{a.created_at.split('T')[0]}</p>
              <h2 className="text-lg font-semibold text-blue-800">{a.title}</h2>
              <p className="text-gray-700">{a.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Announcements;

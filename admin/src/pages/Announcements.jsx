import { Mail, Phone, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchAnnouncements = async () => {
    const response = await fetch("http://localhost:3000/api/announcement/get");
    const data = await response.json();
    setAnnouncements(data.announcements || []);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/announcement/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    setOpen(false);
    fetchAnnouncements();
  };

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

      <div className="max-w-[90%] mx-auto p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-blue-700 text-2xl font-bold">Announcements</h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Create Announcement
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {announcements.map((a) => (
            <div
              key={a.announcement_id}
              className="p-4 border-l-4 border-orange-500 rounded shadow"
            >
              <p className="text-sm text-orange-700">
                {a.created_at.split("T")[0]}
              </p>
              <h2 className="text-lg font-semibold text-blue-800">{a.title}</h2>
              <p className="text-gray-700">{a.content}</p>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleCreate}
            className="bg-white w-[400px] p-6 rounded-lg flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-700">
                New Announcement
              </h2>
              <X className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
              required
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded h-32"
              required
            />

            <button
              type="submit"
              className="bg-blue-700 text-white py-2 rounded"
            >
              Publish
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Announcements;

import { Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/gallery/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAlbums(data);
      } catch {
        setAlbums([]);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50">
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

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-blue-600 text-2xl font-bold mb-10">Gallery</h1>
        {!activeAlbum && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {albums.map(album => (
              <div
                key={album.slug}
                onClick={() => setActiveAlbum(album)}
                className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:3000${album.coverImage}`}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{album.title}</h3>
                  <p className="text-sm text-gray-600">{album.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeAlbum && (
          <div>
            <button
              onClick={() => setActiveAlbum(null)}
              className="mb-6 px-4 py-2 bg-blue-700 text-white rounded"
            >
              Back
            </button>

            <h2 className="text-2xl font-bold mb-2">{activeAlbum.title}</h2>
            <p className="text-gray-600 mb-6">{activeAlbum.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {activeAlbum.images.map(img => (
                <img
                  key={img}
                  src={`http://localhost:3000${img}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Gallery;

import { Mail, Phone, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function GalleryAdmin() {
  const [albums, setAlbums] = useState([]);
  const [openForm, setOpenForm] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [slug, setSlug] = useState("");
  const [oldSlug, setOldSlug] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const fetchAlbums = async () => {
    const res = await fetch("http://localhost:3000/api/gallery/");
    const data = await res.json();
    setAlbums(data);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const createAlbum = async () => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    images.forEach(i => fd.append("images", i));
    await fetch("http://localhost:3000/api/gallery/upload-album", {
      method: "POST",
      body: fd
    });
    setTitle("");
    setDescription("");
    setImages([]);
    fetchAlbums();
  };

  const addImages = async () => {
    const fd = new FormData();
    fd.append("slug", slug);
    images.forEach(i => fd.append("images", i));
    await fetch("http://localhost:3000/api/gallery/add-images", {
      method: "POST",
      body: fd
    });
    setSlug("");
    setImages([]);
    fetchAlbums();
  };

  const updateDescription = async () => {
    await fetch("http://localhost:3000/api/gallery/update-description", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, description })
    });
    setSlug("");
    setDescription("");
    fetchAlbums();
  };

  const renameAlbum = async () => {
    await fetch("http://localhost:3000/api/gallery/rename-album", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldSlug, newTitle })
    });
    setOldSlug("");
    setNewTitle("");
    fetchAlbums();
  };

  const deleteAlbum = async (slug) => {
    await fetch("http://localhost:3000/api/gallery/delete-album", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug })
    });
    fetchAlbums();
  };

  const Section = ({ id, title, children }) => (
    <div className="bg-white rounded-xl shadow">
      <button
        onClick={() => setOpenForm(openForm === id ? null : id)}
        className="w-full flex justify-between items-center p-4 font-semibold text-blue-700"
      >
        {title}
        <ChevronDown className={`transition ${openForm === id ? "rotate-180" : ""}`} />
      </button>
      {openForm === id && <div className="p-4 border-t">{children}</div>}
    </div>
  );

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

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <Section id="create" title="Create Album">
          <input className="w-full border p-2 mb-3 rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea className="w-full border p-2 mb-3 rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <input type="file" multiple onChange={e => setImages([...e.target.files])} />
          <button onClick={createAlbum} className="mt-4 px-4 py-2 bg-blue-700 text-white rounded">Create</button>
        </Section>

        <Section id="add" title="Add Images">
          <input className="w-full border p-2 mb-3 rounded" placeholder="Album Slug" value={slug} onChange={e => setSlug(e.target.value)} />
          <input type="file" multiple onChange={e => setImages([...e.target.files])} />
          <button onClick={addImages} className="mt-4 px-4 py-2 bg-blue-700 text-white rounded">Upload</button>
        </Section>

        <Section id="update" title="Update Description">
          <input className="w-full border p-2 mb-3 rounded" placeholder="Album Slug" value={slug} onChange={e => setSlug(e.target.value)} />
          <textarea className="w-full border p-2 mb-3 rounded" placeholder="New Description" value={description} onChange={e => setDescription(e.target.value)} />
          <button onClick={updateDescription} className="px-4 py-2 bg-blue-700 text-white rounded">Update</button>
        </Section>

        <Section id="rename" title="Rename Album">
          <input className="w-full border p-2 mb-3 rounded" placeholder="Old Slug" value={oldSlug} onChange={e => setOldSlug(e.target.value)} />
          <input className="w-full border p-2 mb-3 rounded" placeholder="New Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <button onClick={renameAlbum} className="px-4 py-2 bg-blue-700 text-white rounded">Rename</button>
        </Section>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Gallery Albums</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {albums.map(album => (
              <div key={album.slug} className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-blue-600 to-orange-400 text-white">
                <img src={`http://localhost:3000${album.coverImage}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{album.title}</h3>
                  <p className="text-sm opacity-90">{album.description}</p>
                  <button onClick={() => deleteAlbum(album.slug)} className="mt-4 px-3 py-1 bg-red-600 rounded text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GalleryAdmin;

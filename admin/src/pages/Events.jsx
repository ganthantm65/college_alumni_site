import { Locate, Mail, MapPin, Phone, X, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Events() {
  const [upComingEvents, setUpComingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    cover_photo: null,
  });

  const fetchUpcomingEvents = async () => {
    const res = await fetch("http://localhost:3000/api/events/get/upcoming");
    const data = await res.json();
    setUpComingEvents(data.upcoming_events || []);
  };

  const fetchPastEvents = async () => {
    const res = await fetch("http://localhost:3000/api/events/get/completed");
    const data = await res.json();
    setPastEvents(data.completed_events || []);
  };

  useEffect(() => {
    fetchUpcomingEvents();
    fetchPastEvents();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => form[k] && fd.append(k, form[k]));
    await fetch("http://localhost:3000/api/events/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      body: fd,
    });
    setOpen(false);
    setForm({ title: "", description: "", event_date: "", location: "", cover_photo: null });
    fetchUpcomingEvents();
    fetchPastEvents();
  };

  const handleStatusUpdate = async (status) => {
    await fetch("http://localhost:3000/api/events/update/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({ event_id: selectedEvent.event_id, status }),
    });
    setEditOpen(false);
    fetchUpcomingEvents();
    fetchPastEvents();
  };

  const handleCoverUpdate = async (file) => {
    const fd = new FormData();
    fd.append("event_id", selectedEvent.event_id);
    fd.append("cover_photo", file);
    await fetch("http://localhost:3000/api/events/update/cover", {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      body: fd,
    });
    setEditOpen(false);
    fetchUpcomingEvents();
    fetchPastEvents();
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="w-full bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto h-10 px-4 flex items-center">
          <ul className="flex items-center gap-4 text-white text-sm">
            <li className="flex items-center gap-2"><Phone size={18} />0462-2552450</li>
            <span>|</span>
            <li className="flex items-center gap-2"><Mail size={18} />gcetlyalumni.ac.in</li>
          </ul>
        </div>
      </div>

      <NavBar />

      <div className="max-w-[90%] mx-auto mt-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">Upcoming Events</h1>
        <button onClick={() => setOpen(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg">
          Create Event
        </button>
      </div>

      <div className="max-w-[90%] mx-auto mt-4">
        {upComingEvents.map(event => (
          <div key={event.event_id} className="border-l-4 border-orange-500 rounded-lg shadow p-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-700">{event.title}</h2>
              <button
                onClick={() => { setSelectedEvent(event); setEditOpen(true); }}
                className="text-sm text-orange-600"
              >
                Update
              </button>
            </div>
            <p className="text-sm text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-600 mt-2">{event.event_date.split("T")[0]}</p>
            <p className="flex gap-2 text-sm text-gray-600 mt-2">
              <Locate size={18} />{event.location}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-[90%] mx-auto gap-6 mt-10 mb-10">
        <h1 className="text-2xl font-bold text-blue-800">Completed Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {pastEvents.map(event => (
            <div key={event.event_id} className="border-t-4 border-orange-600 rounded-lg shadow overflow-hidden">
              {event.cover_photo && <img src={event.cover_photo} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-700">{event.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                <p className="text-sm text-gray-600 mt-2">{event.event_date.split("T")[0]}</p>
                <p className="flex gap-2 text-sm text-gray-600 mt-2">
                  <MapPin size={18} />{event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleCreate} className="bg-white w-[420px] p-6 rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-700">Create Event</h2>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
            <input className="border p-2 rounded" placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea className="border p-2 rounded" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
            <input type="date" className="border p-2 rounded" onChange={e => setForm({ ...form, event_date: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
            <input type="file" onChange={e => setForm({ ...form, cover_photo: e.target.files[0] })} />
            <button className="bg-blue-700 text-white py-2 rounded">Publish</button>
          </form>
        </div>
      )}

      {editOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-6 rounded-lg flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-700">Update Event</h2>
              <X onClick={() => setEditOpen(false)} className="cursor-pointer" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleStatusUpdate("UPCOMING")} className="flex-1 bg-blue-600 text-white py-2 rounded">Upcoming</button>
              <button onClick={() => handleStatusUpdate("COMPLETED")} className="flex-1 bg-orange-600 text-white py-2 rounded">Completed</button>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-blue-700">
              <Upload size={18} />
              <input type="file" hidden onChange={e => handleCoverUpdate(e.target.files[0])} />
              Update Cover Photo
            </label>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Events;

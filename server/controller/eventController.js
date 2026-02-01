import Event from "../model/Event.js";

export const createEvents = async (req, res) => {
  try {
    const { title, description, event_date, location } = req.body;
    const cover_photo = req.file ? req.file.path : null;
    let status;
    const today = new Date().toISOString().split("T")[0];
    const eventDay = new Date(event_date).toISOString().split("T")[0];
    status = eventDay === today ? "ONGOING" : new Date(event_date) > new Date() ? "UPCOMING" : "COMPLETED";
    await Event.createEvent(title, description, event_date, location, cover_photo, status);
    return res.status(200).json({ message: "Event Created Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { event_id, status } = req.body;
    const status_applicable = ["UPCOMING", "ONGOING", "COMPLETED"];
    if (!status_applicable.includes(status)) {
      return res.status(400).json({ message: "Status is not applicable" });
    }
    await Event.updateStatus(event_id, status);
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateEventCoverPhoto = async (req, res) => {
  try {
    const { event_id } = req.body;
    const coverPhoto = req.file ? req.file.path : null;
    if (!coverPhoto) return res.status(400).json({ error: "No file uploaded" });
    await Event.updateCoverPhoto(event_id, coverPhoto);
    return res.json({ message: "Cover photo updated successfully", coverPhoto });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await Event.getUpcomingEvents();
    if (upcomingEvents.length === 0) {
      return res.status(404).json({ message: "No Upcoming Events" });
    }
    const formatted = upcomingEvents.map(e => ({
      ...e,
      cover_photo: e.cover_photo ? `${req.protocol}://${req.get("host")}/${e.cover_photo.replace(/\\/g, "/")}` : null
    }));
    return res.status(200).json({ upcoming_events: formatted });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getCompletedEvents = async (req, res) => {
  try {
    const completedEvents = await Event.getCompletedEvents();
    if (completedEvents.length === 0) {
      return res.status(404).json({ message: "No Events Held" });
    }
    const formatted = completedEvents.map(e => ({
      ...e,
      cover_photo: e.cover_photo ? `${req.protocol}://${req.get("host")}/${e.cover_photo.replace(/\\/g, "/")}` : null
    }));
    return res.status(200).json({ completed_events: formatted });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import Login from "./pages/Login.jsx"
import Announcements from "./pages/Announcements.jsx"
import Events from "./pages/Events.jsx"
import Donation from "./pages/Donation.jsx"
import Gallery from "./pages/Gallery.jsx"
import Registeration from "./pages/Registration.jsx"
import AboutUs from "./pages/AboutUs.jsx"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/announcements" element={<Announcements/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/donate" element={<Donation/>}/>
          <Route path="/register" element={<Registeration/>}/>
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

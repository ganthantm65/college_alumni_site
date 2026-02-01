import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import Login from "./pages/Login.jsx"
import Announcements from "./pages/Announcements.jsx"
import Events from "./pages/Events.jsx"
import Gallery from "./pages/Gallery.jsx"
import Donation from "./pages/Donation.jsx"


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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

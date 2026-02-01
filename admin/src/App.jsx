import { useState } from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Announcements from './pages/Announcements'
import Login from './pages/Login'
import Events from './pages/Events'
import GalleryAdmin from './pages/Gallery'
import Donation from './pages/Donations'
import Donations from './pages/Donations'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/announcements' element={<Announcements/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/gallery' element={<GalleryAdmin/>}/>
          <Route path='/donations' element={<Donations/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

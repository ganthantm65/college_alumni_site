import { Locate, Mail, MapPin, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function Events() {
  const [upComingEvents, setUpComingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const response = await fetch('http://localhost:3000/api/events/get/upcoming',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      setUpComingEvents(data.upcoming_events || [])
    }
    fetchUpcomingEvents()
  }, [])

  useEffect(() => {
    const fetchPastEvents = async () => {
      const response = await fetch('http://localhost:3000/api/events/get/completed',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
      })
      const data = await response.json()

      console.log(data);
      
      setPastEvents(data.completed_events || [])
    }
    fetchPastEvents()
  }, [])

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

      <div className="max-w-[90%] mx-auto gap-6 mt-6 mb-10">
        <h1 className="text-2xl font-bold text-blue-800">Upcoming Events</h1>
        {upComingEvents.length > 0 ? (
          upComingEvents.map(event => (
            <div key={event.event_id} className="w-full border-l-4 border-orange-500 rounded-lg shadow p-4 mt-4">
              <h2 className="text-lg font-semibold text-blue-700">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm mt-2 text-gray-600">{event.event_date.split('T')[0]}</p>
              <p className="flex flex-row gap-2 text-gray-600 text-sm mt-2">
                <Locate size={20} />
                <span>{event.location}</span>
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-600 flex justify-center items-center mt-4">
            <p>No Upcoming Events</p>
          </div>
        )}
      </div>

      <div className="max-w-[90%] mx-auto gap-6 mt-6 mb-10">
        <h1 className="text-2xl font-bold text-blue-800">Completed Events</h1>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {pastEvents.map(event => (
              <div key={event.event_id} className="border-t-3 border-orange-600 rounded-lg shadow overflow-hidden">
                {event.cover_photo && (
                  <img
                    src={event.cover_photo}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-blue-700">{event.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <p className="text-sm mt-2 text-gray-600">{event.event_date.split('T')[0]}</p>
                  <p className="flex flex-row gap-2 text-gray-600 text-sm mt-2">
                    <MapPin size={20} />
                    <span>{event.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 flex justify-center items-center mt-4">
            <p>No Completed Events</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Events

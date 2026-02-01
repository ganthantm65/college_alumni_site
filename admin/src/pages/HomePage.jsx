import React from "react";
import NavBar from "../components/NavBar.jsx";
import college from "../assets/home-page-images/college.jpg";
import gcelogo from "../assets/gcelogo.jpg";
import { Mail, Phone } from "lucide-react";
import ImageSlider from "../components/ImageSlider.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate=useNavigate();
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

      <div
        className="relative w-full h-[360px] md:h-[480px] lg:h-[560px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${college})` }}
      >
        <div className="absolute inset-0 bg-blue-800/60"></div>
        <div className="relative z-10 flex flex-col items-center gap-4 text-center text-white px-4">
          <img
            src={gcelogo}
            alt="GCE Logo"
            className="w-28 h-28 md:w-32 md:h-32 drop-shadow-xl rounded-full"
          />
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
            GCE Tirunelveli
          </h1>
          <h2 className="text-lg md:text-2xl font-bold text-white">
            Alumni Association
          </h2>
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 transition font-semibold text-white">
              Join Alumni
            </button>
            <button className="px-6 py-2 rounded-full border border-white/70 hover:bg-white/20 transition font-semibold backdrop-blur">
              Explore
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-blue-700">
          <h3 className="text-3xl font-bold text-blue-800">500+</h3>
          <p className="text-gray-600 mt-2">Alumni Worldwide</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-orange-500">
          <h3 className="text-3xl font-bold text-orange-600">100+</h3>
          <p className="text-gray-600 mt-2">Events Conducted</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-blue-700">
          <h3 className="text-3xl font-bold text-blue-800">50+</h3>
          <p className="text-gray-600 mt-2">Years of Legacy</p>
        </div>
      </div>

      <div className="w-full">
        <ImageSlider />
      </div>

      <div className="w-full py-16 flex flex-col items-center gap-4 text-center px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-800">
          Connecting Alumni. Building Futures.
        </h3>
        <p className="max-w-2xl text-gray-700">
          Stay connected with your alma mater, explore opportunities, attend
          events, and contribute to the growth of future generations.
        </p>
        <button className="mt-4 px-8 py-3 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">
          Get Involved
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default HomePage;

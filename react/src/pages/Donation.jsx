import { Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import upi from '../assets/upi.png'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Donation() {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Please login to donate");
      return;
    }

    const response = await fetch("http://localhost:3000/api/donations/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        amount,
        upi_id: upiId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setSuccess("");
    } else {
      setSuccess("Donation details submitted successfully");
      setError("");
      setAmount("");
      setUpiId("");
    }
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

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
        <div className="border border-blue-200 rounded-xl shadow bg-white p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Donate via UPI
          </h2>
          <div className="border-2 border-orange-500 rounded-lg p-3">
            <img
              src={upi}
              alt="UPI QR"
              className="w-56 h-56 object-contain"
            />
          </div>
          <p className="text-sm text-blue-700 mt-4">
            Scan with any UPI app
          </p>
        </div>

        <div className="border border-orange-200 rounded-xl shadow bg-white p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-4">
            Submit Donation Details
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-blue-300 focus:border-orange-500 focus:ring-orange-500 p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="border border-blue-300 focus:border-orange-500 focus:ring-orange-500 p-2 rounded"
              required
            />
            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm font-medium">
                {success}
              </p>
            )}
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded font-semibold hover:from-orange-600 hover:to-orange-700 transition">
              Submit Donation
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Donation;

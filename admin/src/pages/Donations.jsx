import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import * as XLSX from "xlsx";
import { Mail, Phone } from "lucide-react";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/donations/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setDonations(data.donations);
    } catch {
      setError("Failed to fetch donations");
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(donations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donations");
    XLSX.writeFile(wb, "donations.xlsx");
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto h-10 px-4 flex items-center">
          <ul className="flex items-center gap-4 text-white text-sm">
            <li className="flex items-center gap-2">
              <Phone size={25}/>  
              <span>0462-2552450</span>
            </li>
            <span>|</span>
            <li className="flex items-center gap-2">
              <Mail size={25}/>  
              <span>gcetlyalumni.ac.in</span>
            </li>
          </ul>
        </div>
      </div>

      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Donations</h2>
          <button
            onClick={downloadExcel}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Download Excel
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="overflow-x-auto rounded-xl shadow-lg pb-20 mb-10" style={{ maxHeight: "500px" }}>
          <table className="w-full border border-gray-200 table-auto">
            <thead className="bg-gradient-to-r from-blue-600 to-orange-400 text-white sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">Alumni Name</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">UPI ID</th>
                <th className="px-4 py-2 text-left">Payment Date</th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {donations.map((d, i) => (
                <tr key={i} className="border-b bg-white">
                  <td className="px-4 py-2">{d.alumni_name}</td>
                  <td className="px-4 py-2">{d.amount}</td>
                  <td className="px-4 py-2">{d.upi_id}</td>
                  <td className="px-4 py-2">{d.payment_date.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Donations;

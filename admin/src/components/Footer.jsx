import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-orange-400">
            GCE Tirunelveli
          </h3>
          <p className="text-sm text-blue-100">
            Alumni Association connecting graduates, strengthening bonds, and
            building future opportunities.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-semibold text-orange-400">Contact</h4>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <Phone size={16} />
            <span>0462-2552450</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <Mail size={16} />
            <span>gcetlyalumni.ac.in</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <MapPin size={16} />
            <span>Tirunelveli, Tamil Nadu</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-semibold text-orange-400">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-950 text-center py-3 text-sm text-blue-200">
        © {new Date().getFullYear()} GCE Tirunelveli Alumni Association
      </div>
    </footer>
  );
}

export default Footer;

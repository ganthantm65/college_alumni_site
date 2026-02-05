import { Mail, Phone } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import president from "../assets/president.jpg";
import association from '../assets/association.jpg'

function AboutUs() {
  const members = [
    "Er. Sathyavaageiswaran V. P. (1981 - 1985)",
    "Er. Padma T. (1981 - 1985)",
    "Dr. Murugan D. (1984 - 1988)",
    "Er. Jai Mohan (1985 - 1989)",
    "Er. Sreerenganathan K. (1985 - 1989)",
    "Er. Eugin A. (1986 - 1990)",
    "Er. Gopalakrishnan S. (1987 - 1991)",
    "Er. Rolland J Enoch (1987 - 1991)",
    "Er. Maharajan A. (1987 - 1991)",
    "Er. Mohamed Yousuff Raja S. (1989 - 1993)",
    "Dr. Siva Sankari E. (1994 - 1998)",
    "Dr. Selvam P. (1994 - 1998)",
    "Prof. Seethalakshmi T. (1995 - 1999)",
    "Er. Jebasingh J. (1996 - 2000)",
    "Prof. Irin Dorathy P. E. (1999 - 2003)"
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50">
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

      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-12">
        <section className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-xl shadow p-6">
          <img
            src={association}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-700 mb-4">
              About Alumni Association
            </h1>
            <p className="text-gray-700 leading-relaxed">
              GCE Tirunelveli Alumni Association is a non-profit organization,
              registered in Palayamkottai, Tirunelveli District, India, under the
              Tamil Nadu Societies Act of 1975.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              AAGCETLY’s mission is to enable professional networking among
              alumni, professors and students for academic, professional and
              business growth.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-xl shadow p-6">
          <div>
            <h2 className="text-xl font-semibold text-orange-600 mb-3">
              President's Message
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Hearty welcome to all our alumni. Its glad we meet. Thank you all!
              Every alumni are advised to register with us for getting benefit.
              We have formed wide range of facilities and arranged annual meets.
            </p>
          </div>
          <img
            src={president}
            className="w-full h-64 object-cover rounded-lg"
          />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To act as a strong linkage between the college and alumni across
              the globe, fostering lifelong learning and engagement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Build strong alumni platforms, promote scientific thinking,
              encourage collaboration and leverage digital media effectively.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">
            Office Bearers
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <strong>President</strong>
              <p>Er. Subbiah K.</p>
              <span className="text-sm">(1983 - 1987)</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <strong>Vice President</strong>
              <p>Dr. Latha P.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <strong>Secretary</strong>
              <p>Prof. Muthumani I.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <strong>Joint Secretary</strong>
              <p>Er. Vence J.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <strong>Treasurer</strong>
              <p>Dr. Gnana Sundari M.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">
            Executive Members
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {members.map((m) => (
              <div
                key={m}
                className="p-4 bg-gray-50 rounded-lg shadow-sm text-gray-700 text-sm"
              >
                {m}
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;

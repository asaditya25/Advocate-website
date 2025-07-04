import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLogin from "./AdminLogin";
import { HiOutlineLogout, HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlineDocumentText, HiTrash } from "react-icons/hi";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"));

  useEffect(() => {
    if (isAuthenticated) fetchAppointments();
  }, [isAuthenticated]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(res.data)) {
        setAppointments(res.data);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      setAppointments([]);
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem("adminToken");
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      alert("Failed to delete appointment.");
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-ash flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif font-bold text-navy text-center">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-lg shadow-md hover:bg-navy hover:text-gold transition-all duration-200 font-semibold"
          >
            <HiOutlineLogout className="text-xl" /> Logout
          </button>
        </div>
        {loading ? (
          <div className="text-navy text-center font-sans">Loading appointments...</div>
        ) : !Array.isArray(appointments) || appointments.length === 0 ? (
          <div className="text-navy text-center font-sans">No appointments found</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="bg-ivory border border-gold/30 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 font-serif text-xl text-navy font-bold">
                  <HiOutlineUser className="text-gold text-2xl" /> {a.name}
                </div>
                <div className="flex items-center gap-2 text-navy font-sans">
                  <HiOutlineMail className="text-gold" /> <span className="break-all">{a.email}</span>
                </div>
                <div className="flex items-center gap-2 text-navy font-sans">
                  <HiOutlinePhone className="text-gold" /> {a.phone}
                </div>
                <div className="flex items-center gap-2 text-navy font-sans">
                  <HiOutlineCalendar className="text-gold" /> {new Date(a.date).toLocaleString()}
                </div>
                {a.message && (
                  <div className="flex items-center gap-2 text-navy font-sans">
                    <HiOutlineDocumentText className="text-gold" /> <span>{a.message}</span>
                  </div>
                )}
                <button
                  onClick={() => handleDelete(a._id)}
                  className="mt-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 self-end font-semibold shadow"
                >
                  <HiTrash className="text-lg" /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

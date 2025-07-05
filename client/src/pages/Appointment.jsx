import React, { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { FaUser, FaEnvelope, FaPhone, FaRegCalendarAlt, FaCommentDots } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function Appointment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");

  const validate = () => {
    let valid = true;
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setDateError("");

    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }
    if (!phone.trim()) {
      setPhoneError("Phone is required");
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone must be 10 digits");
      valid = false;
    }
    if (!date) {
      setDateError("Date is required");
      valid = false;
    } else if (new Date(date) <= new Date()) {
      setDateError("Date must be in the future");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;
    setSubmitting(true);
    const formData = { name, email, phone, date, message };
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess("Appointment request sent! We will contact you soon.");
        setName(""); setEmail(""); setPhone(""); setDate(""); setMessage("");
        toast.success("Appointment booked successfully", { position: "top-center", autoClose: 4000 });
      } else {
        setSuccess("Sorry, there was an error booking your appointment. Please try again.");
        toast.error("Something went wrong. Please try again.", { position: "top-center", autoClose: 4000 });
      }
    } catch (error) {
      setSuccess("Sorry, there was an error connecting to the server.");
      toast.error("Something went wrong. Please try again.", { position: "top-center", autoClose: 4000 });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Book Appointment | Advocate Anil Kumar Singh</title>
        <meta name="description" content="Book an appointment with Advocate Anil Kumar Singh for expert legal advice in civil, criminal, and family law." />
        <meta name="keywords" content="book appointment, legal consultation, advocate, lawyer, Anil Kumar Singh, civil law, criminal law, family law" />
        <meta property="og:title" content="Book Appointment | Advocate Anil Kumar Singh" />
        <meta property="og:description" content="Schedule your legal consultation with Advocate Anil Kumar Singh. Trusted advice for civil, criminal, and family law." />
        <meta property="og:image" content="https://yourdomain.com/assets/cover.webp" />
        <meta property="og:url" content="https://yourdomain.com/appointment" />
        <link rel="canonical" href="https://yourdomain.com/appointment" />
      </Helmet>
      <section className="min-h-[80vh] bg-ash py-16 px-2 flex items-center justify-center">
        <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="w-full max-w-3xl mx-auto bg-ivory rounded-xl shadow-xl p-6 sm:p-10 border border-gold/30">
          {success && (
            <div className="flex items-center mb-6 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg animate-fade-in">
              <HiCheckCircle className="text-2xl mr-2 animate-pulse" />
              <span className="font-medium">{success}</span>
            </div>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy font-bold mb-8 text-center">Book an Appointment</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-semibold text-navy flex items-center gap-2"><FaUser /> Name</label>
              <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 w-full bg-ash text-navy font-sans" placeholder="Your Name" />
              {nameError && <span className="text-red-500 text-sm mt-1">{nameError}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-semibold text-navy flex items-center gap-2"><FaEnvelope /> Email</label>
              <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 w-full bg-ash text-navy font-sans" placeholder="you@example.com" />
              {emailError && <span className="text-red-500 text-sm mt-1">{emailError}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1 font-semibold text-navy flex items-center gap-2"><FaPhone /> Phone</label>
              <input type="tel" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 w-full bg-ash text-navy font-sans" placeholder="Your Phone Number" />
              {phoneError && <span className="text-red-500 text-sm mt-1">{phoneError}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-1 font-semibold text-navy flex items-center gap-2"><FaRegCalendarAlt /> Preferred Date</label>
              <input type="date" id="date" name="date" value={date} onChange={e => setDate(e.target.value)} required className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 w-full bg-ash text-navy font-sans" />
              {dateError && <span className="text-red-500 text-sm mt-1">{dateError}</span>}
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="message" className="mb-1 font-semibold text-navy flex items-center gap-2"><FaCommentDots /> Message</label>
              <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)} rows={4} className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 w-full bg-ash text-navy font-sans" placeholder="Type your message here..." />
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-navy hover:text-gold transition-all duration-300 text-base sm:text-lg hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed">
                <FaRegCalendarAlt className="text-lg" />
                {submitting ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
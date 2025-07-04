import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-navy overflow-hidden">
      <img
        src={process.env.PUBLIC_URL + "/assets/cover.jpg"}
        alt="Law Hero"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/70 to-gold/30 z-10" />
      <div className="relative z-20 flex flex-col items-center text-center px-4 py-20 w-full max-w-2xl">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-ivory drop-shadow-lg mb-4 tracking-tight">
          Advocate Anil Kumar Singh
        </h1>
        <p className="font-sans text-lg sm:text-2xl text-gold mb-8 font-semibold">
          Civil, Criminal & Family Law Specialist
        </p>
        <button
          onClick={() => navigate("/appointment")}
          className="bg-gold text-navy font-bold px-8 py-3 rounded shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-navy hover:text-gold transition-all duration-300 text-lg tracking-wide mt-2"
        >
          Book an Appointment
        </button>
      </div>
    </section>
  );
}

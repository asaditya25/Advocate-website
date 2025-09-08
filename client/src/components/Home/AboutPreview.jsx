import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function AboutPreview() {
  const navigate = useNavigate();
  return (
    <section className="bg-ivory rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 border border-gold/20 mt-12">
      <div className="flex-1 flex flex-col justify-center order-2 md:order-1">
        <h2 className="font-serif text-2xl text-navy font-bold mb-2">About Advocate Anil Kumar Singh</h2>
        <p className="font-sans text-gray-700 mb-3">
          Over 15 years of experience in civil, criminal, and family law. Known for integrity, dedication, and results. Trusted advisor for individuals and families seeking legal guidance.
        </p>
        <div className="flex gap-4 mt-2">
          <Link to="/about" className="text-gold font-semibold underline hover:text-navy transition">Read More</Link>
          <Button onClick={() => navigate("/appointment")} variant="primary">
            Book an Appointment
          </Button>
        </div>
      </div>
      <img
        src={process.env.PUBLIC_URL + "/assets/cover.jpg"}
        alt="Advocate Anil Kumar Singh"
        className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-gold shadow order-1 md:order-2"
      />
    </section>
  );
}

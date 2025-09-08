import React from "react";
import { FaBalanceScale, FaGavel, FaUsers, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <FaBalanceScale className="text-3xl text-gold mb-2" />,
    title: "Civil Litigation",
    description: "Expert handling of civil disputes, contracts, and property issues.",
  },
  {
    icon: <FaGavel className="text-3xl text-gold mb-2" />,
    title: "Criminal Defense",
    description: "Strong representation in criminal matters to protect your rights.",
  },
  {
    icon: <FaUsers className="text-3xl text-gold mb-2" />,
    title: "Family & Divorce Law",
    description: "Compassionate and strategic support for family-related cases.",
  },
  {
    icon: <FaHome className="text-3xl text-gold mb-2" />,
    title: "Property Disputes",
    description: "Resolution of land and property conflicts with legal precision.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-ivory rounded-xl shadow-lg p-8 border border-gold/20">
      <h2 className="font-serif text-2xl text-navy font-bold mb-6 text-center">Our Legal Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service.title} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-ash transition">
            {service.icon}
            <h3 className="font-serif text-lg text-navy font-bold mb-1">{service.title}</h3>
            <p className="font-sans text-gray-700 text-sm mb-2">{service.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link to="/services" className="text-gold font-semibold underline hover:text-navy transition">View All Services</Link>
      </div>
    </section>
  );
}

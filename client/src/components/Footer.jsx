import React from "react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-ivory border-t border-gold py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-navy font-serif text-xl font-bold">Advocate Anil Kumar Singh</div>
        <div className="text-navy text-base font-sans flex flex-col md:flex-row gap-2 md:gap-6 items-center">
          <span>Email: <a href="mailto:anil.advocate@email.com" className="text-gold hover:underline">anil.advocate@email.com</a></span>
          <span>Phone: <a href="tel:+911234567890" className="text-gold hover:underline">+91 9838904755</a></span>
          <span>Location: Lucknow, India</span>
        </div>
        <div className="flex gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition text-2xl">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
}

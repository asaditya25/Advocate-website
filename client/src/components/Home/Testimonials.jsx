import React from "react";

const testimonials = [
  {
    name: "Priya S.",
    text: "Professional, compassionate, and highly effective. My case was handled with utmost care and expertise.",
  },
  {
    name: "Rahul M.",
    text: "Advocate Singh guided me through a difficult legal process and achieved a great result. Highly recommended!",
  },
  {
    name: "Sunita K.",
    text: "Clear advice, prompt responses, and a reassuring presence in court. Thank you for your support!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ash rounded-xl shadow-lg p-8 border border-gold/20">
      <h2 className="font-serif text-2xl text-navy font-bold mb-6 text-center">Client Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <blockquote key={idx} className="bg-ivory rounded-lg p-6 shadow text-navy border-l-4 border-gold">
            <p className="font-sans italic mb-3">“{t.text}”</p>
            <footer className="font-serif font-bold text-gold text-right">— {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

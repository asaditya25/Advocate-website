import React from "react";

const reasons = [
  {
    title: "Proven Track Record",
    desc: "Over 15 years of successful legal representation in diverse cases."
  },
  {
    title: "Client-Centered Approach",
    desc: "Personalized attention and clear communication at every step."
  },
  {
    title: "Integrity & Ethics",
    desc: "Honest advice and ethical advocacy you can trust."
  },
  {
    title: "Comprehensive Expertise",
    desc: "Civil, criminal, family, and property law under one roof."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-ivory rounded-xl shadow-lg p-8 border border-gold/20">
      <h2 className="font-serif text-2xl text-navy font-bold mb-6 text-center">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {reasons.map((r, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-4 rounded-lg bg-ash">
            <h3 className="font-serif text-lg text-gold font-bold mb-1">{r.title}</h3>
            <p className="font-sans text-navy text-sm">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

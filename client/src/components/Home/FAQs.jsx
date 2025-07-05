import React, { useState } from "react";

const faqs = [
  {
    q: "What areas of law do you practice?",
    a: "We handle civil, criminal, family, and property law cases."
  },
  {
    q: "How do I book a consultation?",
    a: "You can book online through our Appointment page or call us directly."
  },
  {
    q: "What should I bring to my first meeting?",
    a: "Bring all relevant documents and a list of your questions or concerns."
  },
  {
    q: "Are consultations confidential?",
    a: "Yes, all consultations are strictly confidential."
  }
];

export default function FAQs() {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-ash rounded-xl shadow-lg p-8 border border-gold/20">
      <h2 className="font-serif text-2xl text-navy font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <button
              className="w-full text-left font-serif text-lg text-navy font-bold flex justify-between items-center py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
              aria-controls={`faq-${idx}`}
            >
              {faq.q}
              <span className="text-gold ml-2">{open === idx ? "−" : "+"}</span>
            </button>
            <div
              id={`faq-${idx}`}
              className={`transition-all duration-300 text-navy font-sans text-base pl-2 ${open === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
              aria-hidden={open !== idx}
            >
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

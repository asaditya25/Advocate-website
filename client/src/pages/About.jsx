import React from "react";

export default function About() {
  return (
    <section className="min-h-[80vh] bg-ash py-16 px-2 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-ivory rounded-xl shadow-xl p-6 sm:p-10 border border-gold/30 items-center">
        {/* Photo */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={process.env.PUBLIC_URL + "/assets/cover.jpg"}
            alt="Advocate Anil Kumar Singh"
            className="w-48 h-48 object-cover rounded-full border-4 border-gold shadow mb-6"
          />
          <blockquote className="italic text-gold text-center font-serif text-lg mt-2">“Justice delayed is justice denied.”</blockquote>
        </div>
        {/* Bio */}
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="font-serif text-3xl text-navy font-bold mb-2">About Advocate Anil Kumar Singh</h2>
          <p className="font-sans text-gray-700 text-base">
            Advocate Anil Kumar Singh is a highly respected legal professional with over 15 years of experience in the field. He has successfully represented clients in civil, criminal, and family law matters, earning a reputation for integrity, dedication, and results. His commitment to justice and client advocacy makes him a trusted advisor for individuals and families seeking legal guidance.
          </p>
          <p className="font-sans text-gray-700 text-base">
            With a mission to provide honest, transparent, and effective legal solutions, Advocate Singh believes in upholding the highest standards of the legal profession. His approach combines deep legal knowledge with a personal touch, ensuring every client feels heard and supported.
          </p>
        </div>
      </div>
    </section>
  );
}

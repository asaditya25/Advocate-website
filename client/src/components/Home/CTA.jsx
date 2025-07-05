import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function CTA() {
  const navigate = useNavigate();
  return (
    <section className="bg-navy rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gold/20">
      <h2 className="font-serif text-2xl text-gold font-bold mb-4">Ready to Discuss Your Case?</h2>
      <p className="font-sans text-ivory mb-6 max-w-xl">
        Schedule a confidential consultation with Advocate Anil Kumar Singh and take the first step toward resolving your legal matter.
      </p>
      <Button variant="primary" onClick={() => navigate("/appointment")}>
        Book an Appointment
      </Button>
    </section>
  );
}

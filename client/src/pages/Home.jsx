import React from "react";
import { Helmet } from "react-helmet";
import Testimonials from "../components/Home/Testimonials";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import FAQs from "../components/Home/FAQs";
import CTA from "../components/Home/CTA";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Home | Advocate Anil Kumar Singh</title>
        <meta
          name="description"
          content="Advocate Anil Kumar Singh: Civil, Criminal & Family Law Specialist. Book an appointment with a trusted legal advisor in India."
        />
        <meta
          name="keywords"
          content="advocate, lawyer, legal services, civil law, criminal law, family law, appointment, Anil Kumar Singh"
        />
        <meta property="og:title" content="Home | Advocate Anil Kumar Singh" />
        <meta
          property="og:description"
          content="Expert legal advice and representation in civil, criminal, and family law. Book your appointment today."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/cover.webp"
        />
        <meta property="og:url" content="https://yourdomain.com/" />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
      <main className="bg-ash min-h-screen">
        {/* Hero Section: Full viewport height, full cover image */}
        <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
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
            <Button
              onClick={() => navigate("/appointment")}
              variant="primary"
              className="mt-2"
            >
              Book an Appointment
            </Button>
          </div>
        </section>

        {/* Main content sections start after full hero */}
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
          {/* <AboutPreview /> */}
          {/* <ServicesOverview /> */}
          <Testimonials />
          <WhyChooseUs />
          <FAQs />
          <CTA />
        </div>
      </main>
    </>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const submitMsgRef = useRef(null);

  useEffect(() => {
    if (submitMessage && submitMsgRef.current) {
      submitMsgRef.current.focus();
    }
  }, [submitMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitMessage("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitMessage(
          "Sorry, there was an error sending your message. Please try again."
        );
      }
    } catch (error) {
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again."
      );
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact | Advocate Anil Kumar Singh</title>
        <meta
          name="description"
          content="Contact Advocate Anil Kumar Singh for legal advice and representation. Send a message or book a consultation online."
        />
        <meta
          name="keywords"
          content="contact advocate, legal advice, lawyer contact, book consultation, Anil Kumar Singh"
        />
        <meta
          property="og:title"
          content="Contact | Advocate Anil Kumar Singh"
        />
        <meta
          property="og:description"
          content="Get in touch with Advocate Anil Kumar Singh for expert legal support. Book your consultation today."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/cover.webp"
        />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        <link rel="canonical" href="https://yourdomain.com/contact" />
      </Helmet>
      <section className="min-h-[80vh] bg-ash py-16 px-2 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-ivory rounded-xl shadow-xl p-6 sm:p-10 border border-gold/30">
          {/* Contact Info & Map */}
          <div className="flex flex-col gap-6 justify-center">
            <h2 className="font-serif text-3xl text-navy font-bold mb-2">
              Contact Information
            </h2>
            <div className="text-navy font-sans text-base flex flex-col gap-2">
              <span>
                <span className="font-bold text-gold">Phone:</span> +91-9838904755
              </span>
              <span>
                <span className="font-bold text-gold">Email:</span>{" "}
                advocate.anil@example.com
              </span>
              <span>
                <span className="font-bold text-gold">Address:</span> Civil Court
                Road, Lucknow, UP
              </span>
            </div>
            <div className="rounded-lg overflow-hidden border border-gold/30 shadow">
              <iframe
                title="Google Maps"
                aria-label="Location map of Civil Court Road, Lucknow, UP"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4377.125781418317!2d81.17898017609458!3d26.926235859508008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999606be7521ce3%3A0x4d225c4f03c2d4a8!2sDistrict%20and%20Sessions%20Court!5e1!3m2!1sen!2sin!4v1750576409113!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 justify-center"
            aria-busy={isSubmitting}
          >
            <h2 className="font-serif text-2xl text-navy font-bold mb-2">
              Send a Message
            </h2>
            <label htmlFor="name" className="sr-only">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Your Name"
              autoComplete="name"
              aria-describedby="name-desc"
              className="px-4 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition bg-ash text-navy font-sans"
              placeholder="Your Name"
            />
            <span id="name-desc" className="sr-only">
              Enter your full name
            </span>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email Address"
              autoComplete="email"
              aria-describedby="email-desc"
              className="px-4 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition bg-ash text-navy font-sans"
              placeholder="you@example.com"
            />
            <span id="email-desc" className="sr-only">
              Enter your email address
            </span>
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-label="Phone Number"
              autoComplete="tel"
              aria-describedby="phone-desc"
              className="px-4 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition bg-ash text-navy font-sans"
              placeholder="Your Phone Number"
            />
            <span id="phone-desc" className="sr-only">
              Enter your phone number
            </span>
            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              aria-label="Your Message"
              autoComplete="off"
              aria-describedby="message-desc"
              className="px-4 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition bg-ash text-navy font-sans"
              placeholder="Type your message here..."
            />
            <span id="message-desc" className="sr-only">
              Type your message for the advocate
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-navy hover:text-gold transition-all duration-200 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span role="img" aria-label="mail">
                ✉️
              </span>
              {isSubmitting ? (
                "Sending..."
              ) : (
                <span className="flex items-center gap-1">
                  Sent{" "}
                  <HiCheckCircle className="inline text-green-600 text-xl" />
                </span>
              )}
            </button>
            {submitMessage && (
              <div
                ref={submitMsgRef}
                tabIndex={-1}
                className="flex items-center mt-2 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg animate-fade-in outline-none"
                aria-live="polite"
              >
                <HiCheckCircle className="text-2xl mr-2" />
                <span className="font-medium">{submitMessage}</span>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
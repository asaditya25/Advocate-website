import React from "react";

export default function Button({ type = "button", className = "", children, variant = "primary", ...props }) {
  let base = "font-bold px-8 py-3 rounded shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg tracking-wide mt-2 focus:outline-none focus:ring-2 disabled:opacity-60";
  let styles = {
    primary: "bg-gold text-navy hover:bg-navy hover:text-gold border-2 border-gold focus:ring-gold/70",
    secondary: "bg-navy text-gold border-2 border-navy hover:bg-gold hover:text-navy focus:ring-navy/70",
    outline: "bg-transparent text-navy border-2 border-gold hover:bg-gold hover:text-navy focus:ring-gold/70"
  };
  return (
    <button
      type={type}
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

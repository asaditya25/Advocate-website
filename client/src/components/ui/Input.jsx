import React from "react";

/**
 * A minimal, accessible input component for use in forms.
 * Does not enforce any specific style, so you can style inputs directly in your forms.
 */
export default function Input({ type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      className={className}
      {...props}
    />
  );
}

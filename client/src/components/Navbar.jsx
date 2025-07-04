import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGavel } from "react-icons/fa";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
  { name: "Appointment", to: "/appointment" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem("adminToken"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    navigate("/admin");
  };

  return (
    <header className="sticky top-0 z-50 bg-navy text-ivory shadow-md font-sans">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-gold">
          <FaGavel className="text-gold text-3xl" />
          Advocate Portal 
        </Link>
        <div className="hidden lg:flex gap-8 items-center text-lg font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="hover:text-gold transition-colors duration-200 px-2 py-1 rounded"
            >
              {link.name}
            </Link>
          ))}
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-lg font-bold border-2 border-gold text-gold bg-navy hover:bg-gold hover:text-navy transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/admin"
              className="ml-4 bg-gold text-navy px-4 py-2 rounded-lg font-bold shadow hover:bg-navy hover:text-gold border-2 border-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Admin Login
            </Link>
          )}
        </div>
        <button
          className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gold"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-7 w-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-navy text-ivory z-50 shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gold">
          <span className="font-serif text-xl font-bold text-gold">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <svg className="h-7 w-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className="block py-2 px-3 rounded hover:bg-gold/10 hover:text-gold transition"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            {isAdmin ? (
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="block w-full mt-2 py-2 px-3 rounded-lg border-2 border-gold text-gold bg-navy font-bold hover:bg-gold hover:text-navy transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/admin"
                className="block mt-2 py-2 px-3 rounded-lg bg-gold text-navy font-bold shadow hover:bg-navy hover:text-gold border-2 border-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold text-center"
                onClick={() => setOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </li>
        </ul>
      </aside>
    </header>
  );
}

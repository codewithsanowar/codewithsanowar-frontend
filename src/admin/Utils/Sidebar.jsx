import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { House } from 'lucide-react';
import { MdAddLink } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {

  const location = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
     ${location.pathname === path 
       ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white shadow-lg border-l-4 border-blue-500 backdrop-blur-md" 
       : "text-gray-300 hover:bg-white/10 hover:text-white"}`;

  return (
    <>
      {/* 🔥 Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0f172a]/90 backdrop-blur-md text-white shadow-lg border-b border-white/10">
        <h1 className="text-lg font-semibold tracking-wide">Admin</h1>

        <button 
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* 🌑 Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      />

      {/* 📌 Sidebar */}
      <div className={`
        fixed md:static top-0 left-0 h-screen w-64 max-w-[80%]
        bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#020617]
        p-5 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>

        {/* ❌ Close Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button 
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <FaTimes size={20} className="text-white" />
          </button>
        </div>

        {/* Logo */}
        <h1 className="text-white text-2xl font-bold mb-10 text-center tracking-wide">
          Admin Panel
        </h1>

        {/* Menu */}
        <ul className="space-y-3">

          <li>
            <Link to="/admin/dashboard" onClick={()=>setOpen(false)} className={linkClass("/admin/dashboard")}>
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition">
                <House className="w-5 h-5" />
              </div>
              <span className="font-medium">Home</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/course" onClick={()=>setOpen(false)} className={linkClass("/admin/course")}>
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition">
                <MdAddLink className="w-5 h-5" />
              </div>
              <span className="font-medium">Course</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/users" onClick={()=>setOpen(false)} className={linkClass("/admin/users")}>
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition">
                <FaUsers className="w-5 h-5" />
              </div>
              <span className="font-medium">Users</span>
            </Link>
          </li>

          <li>
            <Link to="/account" onClick={()=>setOpen(false)} className={linkClass("/admin/logout")}>
              <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition">
                <GoSignOut className="w-5 h-5 text-red-400" />
              </div>
              <span className="font-medium text-red-400">Logout</span>
            </Link>
          </li>

        </ul>

        {/* Bottom Glow */}
        <div className="absolute bottom-5 left-0 right-0 text-center text-xs text-gray-500">
          © 2026 CodeWithSanowar
        </div>

      </div>
    </>
  )
}

export default Sidebar
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          Blogify
        </Link>

        <nav className="flex gap-6 text-indigo-900 font-medium">
          <Link to="/" className="hover:text-fuchsia-600 transition">Home</Link>
          <Link to="/login" className="hover:text-fuchsia-600 transition">Login</Link>
          <Link to="/signup" className="hover:text-fuchsia-600 transition">Signup</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

import React from 'react';
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-fuchsia-800 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          
          {/* Logo / Brand */}
          <div
            className="text-2xl font-bold tracking-tight cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            <span className="text-fuchsia-400">Blog</span>App
          </div>

          {/* Navigation Menu */}
          <ul className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded-full bg-transparent border border-white text-white font-medium hover:bg-white hover:text-indigo-900 transition-all duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout if logged in */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

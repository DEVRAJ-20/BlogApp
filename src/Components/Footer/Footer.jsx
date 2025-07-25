import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-700">
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/">Features</Link></li>
            <li><Link to="/">Pricing</Link></li>
            <li><Link to="/">Affiliate Program</Link></li>
            <li><Link to="/">Press Kit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/">Account</Link></li>
            <li><Link to="/">Help</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">Customer Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/">Terms & Conditions</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Licensing</Link></li>
          </ul>
        </div>

        <div className="text-gray-500 text-xs mt-6 lg:mt-0">
          &copy; {new Date().getFullYear()} Blogify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

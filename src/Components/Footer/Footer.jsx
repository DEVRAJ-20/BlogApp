import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-indigo-900 via-fuchsia-900 to-indigo-800 text-gray-300 py-12 border-t border-indigo-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    
                    {/* Logo + Copy */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
                            <span className="text-fuchsia-400">Blog</span>App
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            &copy; {new Date().getFullYear()} BlogApp by Dev. <br /> All rights reserved.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-fuchsia-300 uppercase mb-4 tracking-wider">Company</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Features</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Pricing</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Affiliates</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Press Kit</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-fuchsia-300 uppercase mb-4 tracking-wider">Support</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Account</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Help Center</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Contact Us</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Community</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-fuchsia-300 uppercase mb-4 tracking-wider">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Terms & Conditions</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                
            </div>
        </footer>
    );
}

export default Footer;

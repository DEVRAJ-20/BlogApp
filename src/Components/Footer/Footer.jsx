import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-12 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    
                    {/* About / Copyright */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Blogs</h3>
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} Blogs by Dev. All rights reserved.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Features</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Pricing</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Affiliate Program</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Press Kit</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Account</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Help</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Contact Us</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Customer Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Terms & Conditions</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Licensing</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

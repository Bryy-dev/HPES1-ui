import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto">
            {/* Main Footer - Compact Version */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-3">
                <div className="container mx-auto px-5">
                    <div className="flex flex-wrap lg:justify-between gap-4">
                        {/* Logo and School Name */}
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 object-contain" src="/assets/images/hpes-logo.png" alt="logo" />
                            <div>
                                <h2 className="text-sm font-bold leading-tight">Hen Pio Del Pilar Elementary School 1</h2>
                                <p className="text-xs text-white/90">Division Of City Schools Makati</p>
                            </div>
                        </div>

                        {/* Contact Info - Compact */}

                        {/* Social Icons */}
                        <div className="flex items-center space-x-2">
                            <div className="flex lg:flex-col gap-2 text-white/90 text-xs space-x-4 pe-2">
                                <div className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
                                    <span>7745 L. Facundo, Makati</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faPhone} size="sm" />
                                    <span>+63 906 062 29958</span>
                                </div>
                            </div>
                            <a
                                href="https://www.facebook.com/profile.php?id=100084110842244"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                            >
                                <Facebook size={20} className="" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Horizontal Layout */}
                    <div className="mt-4 border-t border-white/20 pt-2">
                        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/80">
                            <NavLink to="/" className="hover:text-white transition-all duration-300">
                                Home
                            </NavLink>
                            <NavLink to="/Gallery" className="hover:text-white transition-all duration-300">
                                Gallery
                            </NavLink>
                            <NavLink to="/News&Events" className="hover:text-white transition-all duration-300">
                                News & Events
                            </NavLink>
                            <NavLink to="/Services/LearningModules" className="hover:text-white transition-all duration-300">
                                Learning Modules
                            </NavLink>
                            <NavLink to="/AboutUs/History" className="hover:text-white transition-all duration-300">
                                About Us
                            </NavLink>
                            <NavLink to="/Issuance/Form" className="hover:text-white transition-all duration-300">
                                Document Request
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar - Compact */}
            <div className="bg-cyan-700 text-white/80 py-2">
                <div className="container mx-auto px-5 text-center text-xs">
                    <p>© {currentYear} Hen Pio Del Pilar Elementary School 1. All Rights Reserved.</p>
                    <p className="text-white/60 text-xs">LEAD.INNOVATE.TRANSFORM • TATAK PRIMERO • TATAK MAKATIZEN</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

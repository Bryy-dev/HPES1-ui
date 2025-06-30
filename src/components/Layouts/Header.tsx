import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faHouseChimney, faImages, faNewspaper, faPager, faInfo, faChevronDown, faBars, faAlignLeft, faHandPaper, faHouse } from '@fortawesome/free-solid-svg-icons';
import { House } from 'lucide-react';

const Header = () => {
    const location = useLocation();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const schoolPaperPaths = ['/school-paper', '/school-paper/prime-report', '/services/modules'];
    const isSchoolPaper = schoolPaperPaths.some((path) => location.pathname.startsWith(path));
    const active = (link: string) => {
        return location.pathname.startsWith(link);
    };

    return (
        <header className="z-40 shadow-lg">
            {/* Enhanced Header Section */}
            <div className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20"></div>
                <div className="absolute top-0 right-0 w-96 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-24 bg-blue-300/10 rounded-full translate-y-8 -translate-x-16 blur-2xl"></div>

                <div className="relative flex justify-between items-center lg:px-6 px-3 py-3">
                    {/* Left: Logo and Title */}
                    <div className="flex items-center gap-3">
                        <div className="lg:hidden">
                            <button
                                className="group relative rounded-xl h-12 w-12 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 flex items-center justify-center backdrop-blur-sm border border-white/10 hover:scale-105"
                                onClick={() => dispatch(toggleSidebar())}
                            >
                                <FontAwesomeIcon icon={faAlignLeft} className="group-hover:scale-110 transition-transform duration-200" />
                            </button>
                        </div>

                        <Link to="/" className="items-center gap-4 hidden lg:flex group">
                            <div className="relative">
                                <img className="w-16 h-16 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" src="/assets/images/hpes-logo.png" alt="logo" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-lg font-black text-white leading-tight tracking-tight group-hover:text-cyan-100 transition-colors duration-300">
                                    Hen Pio Del Pilar Elementary School 1
                                </h1>
                                <p className="text-xs text-white font-semibold tracking-wide">Division Of City Schools Makati</p>
                            </div>
                        </Link>

                        <div className="lg:hidden">
                            <h1 className="text-sm font-black text-white leading-tight tracking-tight">Hen Pio Del Pilar Elementary School 1</h1>
                            <p className="text-xs text-white/90 font-medium tracking-widest">LEAD.INNOVATE.TRANSFORM</p>
                        </div>
                    </div>

                    {/* Right: SDO Logo and Motto */}
                    <div className="items-center gap-2 lg:flex hidden">
                        <div className="text-right text-white space-y-1">
                            <p className="text-xs font-bold tracking-widest text-cyan-100">LEAD.INNOVATE.TRANSFORM</p>
                            <p className="text-xs font-bold tracking-widest text-white/90">TATAK PRIMERO</p>
                            <p className="text-xs font-bold tracking-widest text-white/80">TATAK MAKATIZEN</p>
                        </div>
                        <div className="relative group">
                            <img className="w-16 h-16 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" src="/assets/images/sdo-logo.png" alt="sdo-logo" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:hidden">
                        <div className="relative group">
                            <img className="w-14 h-14 object-contain drop-shadow-lg" src="/assets/images/hpes-logo.png" alt="logo" />
                        </div>
                    </div>
                </div>
            </div>

            <nav className="bg-white/95 backdrop-blur-md border-t border-cyan-100/50  relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/30 to-blue-50/20"></div>
                <div className="relative px-4">
                    <ul className="hidden lg:flex lg:items-center py-1.5 space-x-1 text-gray-900 text-sm">
                        {/* Home */}
                        <li>
                            <NavLink to="/" className={({ isActive }) => `header-link ${isActive ? 'active-link' : ''}`}>
                                <FontAwesomeIcon icon={faHouse} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">Home</span>
                            </NavLink>
                        </li>

                        {/* Gallery */}
                        <li>
                            <NavLink to="/gallery" className={({ isActive }) => `header-link ${isActive ? 'active-link' : ''}`}>
                                <FontAwesomeIcon icon={faImages} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">Gallery</span>
                            </NavLink>
                        </li>

                        {/* News & Events */}
                        <li>
                            <NavLink to="/news&events" className={({ isActive }) => `header-link ${isActive ? 'active-link' : ''}`}>
                                <FontAwesomeIcon icon={faNewspaper} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">News & Events</span>
                            </NavLink>
                        </li>

                        {/* School Paper Dropdown */}
                        <li className="relative group">
                            <button type="button" className={`dropdown-header-link ${active('/school-paper') ? 'dropdown-active-link' : ''}`}>
                                <FontAwesomeIcon icon={faNewspaper} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">School Paper</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1 group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            {/* Dropdown Menu */}
                            <ul className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl py-3 w-48 border border-gray-100/50 opacity-0 invisible scale-95 -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                                <li>
                                    <NavLink
                                        to="/school-paper/prime-report"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-cyan-700 font-medium bg-gradient-to-r from-cyan-50 to-blue-50' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">Prime Report</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* Services Dropdown */}
                        <li className="relative group">
                            <button type="button" className={`dropdown-header-link ${active('/services') ? 'dropdown-active-link' : ''}`}>
                                <FontAwesomeIcon icon={faPager} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">Services</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1 group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            <ul className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl py-3 w-48 border border-gray-100/50 opacity-0 invisible scale-95 -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                                <li>
                                    <NavLink
                                        to="/services/modules"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-400' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">Learning Modules</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/suggestion/form"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-400' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">Suggestion</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/services/satisfaction-survey/form"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-400' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">Client Satisfaction Survey</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* Issuance Dropdown */}
                        <li className="relative group">
                            <button type="button" className={`dropdown-header-link ${active('/issuance') ? 'dropdown-active-link' : ''}`}>
                                <FontAwesomeIcon icon={faFolderOpen} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">Issuance</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1 group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            <ul className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl py-3 w-48 border border-gray-100/50 opacity-0 invisible scale-95 -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                                <li>
                                    <NavLink
                                        to="/issuance/form"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-400' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">Document Request Form</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/issuance/brigada/form"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-400' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">Brigada Eskwela Donor Form</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* About Us Dropdown */}
                        <li className="relative group">
                            <button type="button" className={`dropdown-header-link ${active('/aboutUs') ? 'dropdown-active-link' : ''}`}>
                                <FontAwesomeIcon icon={faInfo} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">About Us</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1 group-hover:rotate-180 transition-transform duration-300" />
                            </button>

                            <ul className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl py-3 w-48 border border-gray-100/50 opacity-0 invisible scale-95 -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                                <li>
                                    <NavLink
                                        to="/aboutUs/history"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-400' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">History</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/aboutUs/organizational-Chart"
                                        className={({ isActive }) =>
                                            `relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item ${
                                                isActive ? 'text-white font-medium bg-gradient-to-r from-cyan-400 to-blue-400' : ''
                                            }`
                                        }
                                    >
                                        <span className="font-medium">Organizational Chart</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="#"
                                        className="relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item"
                                    >
                                        <span className="font-medium">School Hymn</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="#"
                                        className="relative block px-5 py-2 mx-2 rounded-xl text-gray-700 hover:text-black hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-200 transition-all duration-200 ease-out border border-transparent hover:border-cyan-100/30 group/item"
                                    >
                                        <span className="font-medium">School Prayers</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faHouseChimney, faImages, faNewspaper, faPager, faInfo, faChevronDown, faBars, faAlignLeft, faHandPaper } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const location = useLocation();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    return (
        <header className="z-40 shadow-md">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-500">
                <div className="relative flex justify-between items-center lg:px-5 px-2 py-3">
                    {/* Sidebar Toggle Button */}
                    {/* Left: Logo and Title */}

                    <div className=" flex items-center gap-2">
                        <div className="lg:hidden inline">
                            <button
                                className="rounded-lg h-12 bg-white/10 px-3 text-white hover:bg-cyan-700 transition-all duration-300 focus:outline-none flex items-center justify-center fadeInLeft"
                                onClick={() => dispatch(toggleSidebar())}
                            >
                                <FontAwesomeIcon icon={faAlignLeft} />
                            </button>
                        </div>
                        <Link to="/" className=" items-center gap-3 hidden md:flex">
                            <img className="lg:w-20 lg:h-20 w-14 h-14 object-contain" src="/assets/images/hpes-logo.png" alt="logo" />
                            <div className="">
                                <h1 className="text-xl font-black text-white leading-tight">Hen Pio Del Pilar Elementary School 1</h1>
                                <p className="text-sm text-white/90 font-bold">Division Of City Schools Makati</p>
                            </div>
                        </Link>

                        <div className="lg:hidden inline">
                            <h1 className="text-sm font-black text-white leading-tight">Hen Pio Del Pilar Elementary School 1</h1>

                            <p className="text-xs text-white/90">LEAD.INNOVATE.TRANSFORM</p>
                        </div>
                    </div>

                    {/* Right: SDO Logo and Motto */}
                    <div className="items-center gap-4 lg:flex hidden">
                        <div className="text-xs hidden md:block text-right text-white font-bold text-sm">
                            <p className="">LEAD.INNOVATE.TRANSFORM</p>
                            <p className="">TATAK PRIMERO</p>
                            <p className="">TATAK MAKATIZEN</p>
                        </div>
                        <img className="lg:w-20 lg:h-20 w-14 h-14 object-contain" src="/assets/images/sdo-logo.png" alt="sdo-logo" />
                    </div>
                    <div className="flex items-center gap-4 lg:hidden inline">
                        <img className="lg:w-20 lg:h-20 w-14 h-14 object-contain" src="/assets/images/hpes-logo.png" alt="sdo-logo" />
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white border-t border-cyan-100 shadow-sm">
                <div className="px-5">
                    <ul className=" hidden lg:flex py-1 space-x-3 font-medium text-gray-700">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 py-3 px-1 hover:text-cyan-600 transition-colors border-b-2 ${isActive ? 'border-cyan-500 text-cyan-600' : 'border-transparent'}`
                                }
                            >
                                <FontAwesomeIcon icon={faHouseChimney} className="text-cyan-500" />
                                <span>Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/gallery"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 py-3 px-1 hover:text-cyan-600 transition-colors border-b-2 ${isActive ? 'border-cyan-500 text-cyan-600' : 'border-transparent'}`
                                }
                            >
                                <FontAwesomeIcon icon={faImages} className="text-cyan-500" />
                                <span>Gallery</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/news&events"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 py-3 px-1 hover:text-cyan-600 transition-colors border-b-2 ${isActive ? 'border-cyan-500 text-cyan-600' : 'border-transparent'}`
                                }
                            >
                                <FontAwesomeIcon icon={faNewspaper} className="text-cyan-500" />
                                <span>News & Events</span>
                            </NavLink>
                        </li>
                        <li className="menu nav-item relative group">
                            <button type="button" className="nav-link flex items-center gap-2 py-3 px-1 hover:text-cyan-600 transition-colors">
                                <FontAwesomeIcon icon={faNewspaper} className="text-cyan-500" />
                                <span>School Paper</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs ml-1" />
                            </button>
                            <ul className="sub-menu absolute left-0 top-full bg-white shadow-lg rounded-md py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <li>
                                    <NavLink to="/school-paper/prime-report" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Prime Report
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="menu nav-item relative group">
                            <button type="button" className="nav-link flex items-center gap-2 py-3 px-1 hover:text-cyan-600 transition-colors">
                                <FontAwesomeIcon icon={faPager} className="text-cyan-500" />
                                <span>Services</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs ml-1" />
                            </button>
                            <ul className="sub-menu absolute left-0 top-full bg-white shadow-lg rounded-md py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                {/* <li>
                                    <NavLink to="https://system.hpdpes1.com/" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Learning Resources System
                                    </NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/services/modules" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Learning Modules
                                    </NavLink>

                                    <NavLink to="/suggestion/form" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Suggestion
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Downloads
                                    </NavLink>
                                </li> */}
                            </ul>
                        </li>

                        <li className="menu nav-item relative group">
                            <button type="button" className="nav-link flex items-center gap-2 py-3 px-1 hover:text-cyan-600 transition-colors">
                                <FontAwesomeIcon icon={faFolderOpen} className="text-cyan-500" />
                                <span>Issuance</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs ml-1" />
                            </button>
                            <ul className="sub-menu absolute left-0 top-full bg-white shadow-lg rounded-md py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <li>
                                    <NavLink to="/issuance/form" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Document Request Form
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/issuance/brigada/form" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Brigada Eskwela Donor Form
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Downloads
                                    </NavLink>
                                </li> */}
                            </ul>
                        </li>

                        <li className="menu nav-item relative group">
                            <button type="button" className="nav-link flex items-center gap-2 py-3 px-1 hover:text-cyan-600 transition-colors">
                                <FontAwesomeIcon icon={faInfo} className="text-cyan-500" />
                                <span>About Us</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs ml-1" />
                            </button>
                            <ul className="sub-menu absolute left-0 top-full bg-white shadow-lg rounded-md py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <li>
                                    <NavLink to="/aboutUs/history" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/aboutUs/organizational-Chart" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        Organizational Chart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        School Hymn
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#" className="block px-4 py-2 hover:bg-cyan-50 hover:text-cyan-600">
                                        School Prayers
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

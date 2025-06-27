import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { faChartPie, faFileAlt, faBook, faImages, faNewspaper, faUserGraduate, faUsers, faChevronLeft, faHandsHoldingChild, faHandPaper, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = themeConfig.semidark;
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const selector = document.querySelector(`.sidebar a[href="${window.location.pathname}"]`);
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu')?.querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    setTimeout(() => ele[0].click(), 0);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    const menuItems = [
        { to: '/', label: 'Home', icon: faChartPie },
        { to: '/gallery', label: 'Gallery', icon: faFileAlt },
        { to: '/news&events', label: 'News & Events', icon: faImages },
        { to: '/school-paper/prime-report', label: 'Prime Report', icon: faNewspaper },
        { to: '/services/modules', label: 'Learning Modules', icon: faFilePdf },
        { to: '/issuance/form', label: 'Document Request Form', icon: faNewspaper },
        { to: '/issuance/brigada/form', label: 'Brigada Donor Form', icon: faHandsHoldingChild },
        { to: '/suggestion/form', label: 'Suggestion Form', icon: faHandPaper },
        { to: '/services/satisfaction-survey/form', label: 'Satisfaction Survey Form', icon: faHandPaper },

        // { to: '/Level&Section', label: 'Grade Level & Section', icon: faUserGraduate },
        // { to: '/Users', label: 'Users', icon: faUsers },
    ];

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav className={`sidebar fixed top-0 h-full w-[260px] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <div className="h-full bg-white dark:bg-gray-900 flex flex-col shadow-lg ">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between relative ">
                        <div className="w-full flex flex-col items-center justify-center">
                            <NavLink to="/" className="flex items-center gap-2">
                                <img className="w-28" src="/assets/images/hpes-logo.png" alt="logo" />
                            </NavLink>
                            <h2 className="text-gray-600 text-sm font-black uppercase text-header mt-2">Hen Pio Del Pilar Es 1</h2>
                        </div>
                        <button
                            onClick={() => dispatch(toggleSidebar())}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-all duration-200 absolute right-3"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                        </button>
                    </div>

                    <PerfectScrollbar className="flex-1 overflow-y-auto px-3 py-4">
                        <div className="space-y-1">
                            {menuItems.map(({ to, label, icon }) => (
                                <div key={to}>
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg transform scale-[1.02]'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700/50 hover:shadow-md hover:scale-[1.01]'
                                            }`
                                        }
                                        onClick={() => dispatch(toggleSidebar())}
                                    >
                                        <div className={`w-5 h-5 flex items-center justify-center ${location.pathname === to ? '' : 'group-hover:scale-110'} transition-transform duration-200`}>
                                            <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-sm">{label}</span>

                                        {/* Active indicator */}
                                        {location.pathname === to && <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>}
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { faChartPie, faFileAlt, faBook, faImages, faNewspaper, faUserGraduate, faUsers, faChevronLeft, faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons';
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
        { to: '/Gallery', label: 'Gallery', icon: faFileAlt },
        { to: '/News&Events', label: 'News & Events', icon: faImages },
        { to: '/Services/LearningModules', label: 'Learning Modules', icon: faImages },
        { to: '/Issuance/Form', label: 'Document Request Form', icon: faNewspaper },
        { to: '/Issuance/Brigada/Form', label: 'Brigada Donor Form', icon: faHandsHoldingChild },
        // { to: '/Level&Section', label: 'Grade Level & Section', icon: faUserGraduate },
        // { to: '/Users', label: 'Users', icon: faUsers },
    ];

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav className={`sidebar fixed top-0 h-full w-[260px] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <div className="h-full bg-white dark:bg-gray-900 flex flex-col shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <div className="w-full flex flex-col items-center justify-center">
                            <NavLink to="/" className="flex items-center gap-2">
                                <img className="w-28" src="/assets/images/hpes-logo.png" alt="logo" />
                            </NavLink>
                            <h2 className="text-gray-600 gap-2 text-sm font-black uppercase">Hen Pio Del Pilar Es 1</h2>
                        </div>
                        <button onClick={() => dispatch(toggleSidebar())} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        </button>
                    </div>

                    <PerfectScrollbar className="flex-1 overflow-y-auto lg:px-4 px-2 py-4 lg:text-xl  text-xs font-black">
                        <ul className="space-y-1 uppercase ">
                            {menuItems.map(({ to, label, icon }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-cyan-200 dark:hover:bg-gray-700 ${
                                                isActive ? 'bg-cyan-400 dark:bg-gray-700 text-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                            }`
                                        }
                                        onClick={() => dispatch(toggleSidebar())}
                                    >
                                        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                                        <span className="font-medium">{label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;

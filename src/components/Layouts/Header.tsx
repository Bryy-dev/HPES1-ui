import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import IconMenu from '../Icon/IconMenu';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faFolder, faFolderOpen, faHome, faHomeAlt, faHouseChimney, faImages, faInfo, faNewspaper, faPager } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const location = useLocation();
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex justify-between items-center px-5 py-2.5 dark:bg-black">
                    {/* Left: Logo and Title */}
                    <div className="flex items-center">
                        <div className="horizontal-logo flex lg:hidden items-center ltr:mr-2 rtl:ml-2">
                            <Link to="/" className="main-logo flex items-center shrink-0">
                                <img className="w-24 ltr:-ml-1 rtl:-mr-1 inline" src="/public/assets/images/hpes-logo.png" alt="logo" />
                                <div className="grid px-2">
                                    <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-black hidden md:inline dark:text-white-light transition-all duration-300 text-cyan-500">
                                        Hen Pio Del Pilar Elementary School 1
                                    </span>
                                    <span className="text-base ltr:ml-1.5 rtl:mr-1.5 font-semibold hidden md:inline dark:text-white-light transition-all duration-300">
                                        Division Of City Schools Makati
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right: SDO Logo */}
                    <div className="flex items-center text-cyan-500">
                        <div className="text-right text-xs font-black pe-4">
                            <h2 className="">LEAD.INOVATE.TRANSFORM</h2>
                            <h2>TATAK PRIMERO</h2>
                            <h2>TATAK MAKATIZEN</h2>
                        </div>
                        <img className="w-24" src="/public/assets/images/sdo-logo.png" alt="sdo-logo" />
                    </div>
                </div>

                {/* horizontal menu */}
                <ul className="horizontal-menu hidden py-1.5 font-semibold px-2 lg:space-x-1.5 xl:space-x-2 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-cyan-500 dark:text-white-dark">
                    <button type="button" className="nav-link">
                        <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faHouseChimney} size="lg" className="text-cyan-500" />
                            <NavLink to="/">Home</NavLink>
                        </div>
                    </button>

                    <button type="button" className="nav-link">
                        <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faImages} size="lg" className="text-cyan-500" />
                            <NavLink to="/Gallery">Gallery</NavLink>
                        </div>
                    </button>

                    <button type="button" className="nav-link">
                        <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faNewspaper} size="lg" className="text-cyan-500" />
                            <NavLink to="/News&Events">News & Events</NavLink>
                        </div>
                    </button>

                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <FontAwesomeIcon icon={faPager} size="lg" className="text-cyan-500" />
                            <div className="flex items-center">
                                <span className="px-1">Services</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/">Learning Resources System</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Services/LearningModules">Learning Modules</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Downloads</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <FontAwesomeIcon icon={faFolderOpen} size="lg" className="text-cyan-500" />
                            <div className="flex items-center">
                                <span className="px-1">Issuance</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/Issuance/Form">Request Form</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Memorandum</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Downloads</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                {/* <FontAwesomeIcon icon={faInfo} size="lg" className="text-gray-600" /> */}
                                <span className="px-1">About Us</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/AboutUs/History">History</NavLink>
                            </li>
                            <li>
                                <NavLink to="/AboutUs/OrganizationalChart">Organizational Chart</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">School Hymm</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">School Prayers</NavLink>
                            </li>
                        </ul>
                    </li>

                    {/* <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuComponents className="shrink-0" />
                                <span className="px-1">{t('components')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/components/tabs">{t('tabs')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/accordions">{t('accordions')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/modals">{t('modals')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/cards">{t('cards')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/carousel">{t('carousel')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/countdown">{t('countdown')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/counter">{t('counter')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/sweetalert">{t('sweet_alerts')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/timeline">{t('timeline')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/notifications">{t('notifications')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/media-object">{t('media_object')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/list-group">{t('list_group')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/pricing-table">{t('pricing_tables')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/components/lightbox">{t('lightbox')}</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuElements className="shrink-0" />
                                <span className="px-1">{t('elements')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/elements/alerts">{t('alerts')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/avatar">{t('avatar')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/badges">{t('badges')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/breadcrumbs">{t('breadcrumbs')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/buttons">{t('buttons')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/buttons-group">{t('button_groups')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/color-library">{t('color_library')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/dropdown">{t('dropdown')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/infobox">{t('infobox')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/jumbotron">{t('jumbotron')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/loader">{t('loader')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/pagination">{t('pagination')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/popovers">{t('popovers')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/progress-bar">{t('progress_bar')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/search">{t('search')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/tooltips">{t('tooltips')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/treeview">{t('treeview')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/elements/typography">{t('typography')}</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuDatatables className="shrink-0" />
                                <span className="px-1">{t('tables')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/tables">{t('tables')}</NavLink>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('datatables')}
                                    <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                    <li>
                                        <NavLink to="/datatables/basic">{t('basic')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/skin">{t('skin')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/multi-column">{t('multi_column')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/multiple-tables">{t('multiple_tables')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/alt-pagination">{t('alt_pagination')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/checkbox">{t('checkbox')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/range-search">{t('range_search')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/export">{t('export')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/datatables/column-chooser">{t('column_chooser')}</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuForms className="shrink-0" />
                                <span className="px-1">{t('forms')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/forms/basic">{t('basic')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/input-group">{t('input_group')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/layouts">{t('layouts')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/validation">{t('validation')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/input-mask">{t('input_mask')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/select2">{t('select2')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/touchspin">{t('touchspin')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/checkbox-radio">{t('checkbox_and_radio')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/switches">{t('switches')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/wizards">{t('wizards')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/file-upload">{t('file_upload')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/quill-editor">{t('quill_editor')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/markdown-editor">{t('markdown_editor')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/date-picker">{t('date_and_range_picker')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forms/clipboard">{t('clipboard')}</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuPages className="shrink-0" />
                                <span className="px-1">{t('pages')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li className="relative">
                                <button type="button">
                                    {t('users')}
                                    <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                    <li>
                                        <NavLink to="/users/profile">{t('profile')}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/users/user-account-settings">{t('account_settings')}</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to="/pages/knowledge-base">{t('knowledge_base')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/pages/contact-us-boxed" target="_blank">
                                    {t('contact_us_boxed')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/pages/contact-us-cover" target="_blank">
                                    {t('contact_us_cover')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/pages/faq">{t('faq')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/pages/coming-soon-boxed" target="_blank">
                                    {t('coming_soon_boxed')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/pages/coming-soon-cover" target="_blank">
                                    {t('coming_soon_cover')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/pages/maintenence" target="_blank">
                                    {t('maintenence')}
                                </NavLink>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('error')}
                                    <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                    <li>
                                        <NavLink to="/pages/error404" target="_blank">
                                            {t('404')}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/pages/error500" target="_blank">
                                            {t('500')}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/pages/error503" target="_blank">
                                            {t('503')}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('login')}
                                    <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                    <li>
                                        <NavLink to="/auth/cover-login" target="_blank">
                                            {t('login_cover')}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/auth/boxed-signin" target="_blank">
                                            {t('login_boxed')}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('register')}
                                    <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                    <li>
                                        <NavLink to="/auth/cover-register" target="_blank">
                                            {t('register_cover')}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/auth/boxed-signup" target="_blank">
                                            {t('register_boxed')}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('password_recovery')}
                                    <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                    <li>
                                        <NavLink to="/auth/cover-password-reset" target="_blank">
                                            {t('recover_id_cover')}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/auth/boxed-password-reset" target="_blank">
                                            {t('recover_id_boxed')}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('lockscreen')}
                                    <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                                    <li>
                                        <NavLink to="/auth/cover-lockscreen" target="_blank">
                                            {t('unlock_cover')}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/auth/boxed-lockscreen" target="_blank">
                                            {t('unlock_boxed')}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuMore className="shrink-0" />
                                <span className="px-1">{t('more')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/dragndrop">{t('drag_and_drop')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/charts">{t('charts')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/font-icons">{t('font_icons')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/widgets">{t('widgets')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="https://vristo.sbthemes.com" target="_blank">
                                    {t('documentation')}
                                </NavLink>
                            </li>
                        </ul>
                    </li> */}
                </ul>
            </div>
        </header>
    );
};

export default Header;

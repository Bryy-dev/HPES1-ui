import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="bg-white/5 p-7 dark:bg-black  shadow-lg border border-gray-100 mt-auto">
            <div className="relative   grid grid-cols-9">
                <div className="col-span-1">
                    <img className="w-24" src="/public/assets/images/hpes-logo.png" alt="logo" />
                </div>
                <div className="col-span-2 font-semibold text-gray-400">
                    <h2 className="font-black mb-2 text-base text-cyan-500">ADDRESS</h2>
                    <h2 className="">7745 L. Facundo,</h2>
                    <h2> Makati, Metro Manila</h2>
                </div>
                <div className="col-span-2 font-semibold text-gray-400">
                    <h2 className="font-black mb-2 text-base text-cyan-500">SOCIALS</h2>
                    <div>
                        <a
                            href="https://www.facebook.com/profile.php?id=100084110842244"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all hover:text-primary hover: hover:scale-105 hover:font-black"
                        >
                            Facebook
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://www.facebook.com/profile.php?id=100084110842244"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all hover:text-primary hover: hover:scale-105 hover:font-black"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
                <div className="col-span-2 font-semibold text-gray-400">
                    <h2 className="font-black mb-2 text-base text-cyan-500">CONTACT</h2>
                    <h2 className="">Lilibeth Biscayda</h2>
                    <h2 className="text-xs">+63 9060 622 99582</h2>
                </div>
                <div className="col-span-2 font-semibold text-gray-400">
                    <h2 className="font-black mb-2 text-base text-cyan-500">PAGES</h2>
                    <div className=" grid grid-cols-2">
                        <NavLink to="/" className="hover:text-primary hover: hover:scale-105 hover:font-black">
                            Home
                        </NavLink>
                        <NavLink to="/" className="hover:text-primary hover: hover:scale-105 hover:font-black">
                            Gallery
                        </NavLink>
                        <NavLink to="/" className="hover:text-primary hover: hover:scale-105 hover:font-black">
                            News & Events
                        </NavLink>
                        <NavLink to="/" className="hover:text-primary hover: hover:scale-105 hover:font-black">
                            Request Form
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs pt-10 text-gray-400">
                <h2>© {new Date().getFullYear()}. Hen Pio Del pilar elementary school All rights reserved.</h2>
            </div>
        </div>
    );
};

export default Footer;

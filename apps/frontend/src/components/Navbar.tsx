import { Link, useLocation } from 'react-router-dom';

interface NavBarProps {
    page?: string;
}

function Navbar(props: NavBarProps) {
    const location = useLocation();

    const navigationLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Directory', path: '/directory' },
        // May need to change service req path later
        // { name: 'Request Service', path: '/servicereqs' },
        { name: 'Map', path: '/mapView' },
        { name: 'Make Request', path: '/sanitation'},
        { name: 'CSV Files', path: '/csv' },
    ];

    function loginDesktopButton() {
        return(
            <Link
                key={'Login'}
                to={'/login'}
                className={'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-black bg-mgb-light-blue hover:bg-[#306c73] hover:text-white'}
            >
                Login
            </Link>
        )
    }

    function loginMobileButton() {
        return (
            <Link
                key={'Login'}
                to={'login'}
                  className={'px-3 py-2 font-medium transition-colors duration-200 text-black w-17 underline hover:text-white'}>
                {'Login'}
            </Link>
        )
    }

    function desktopLinks() {
        return (
            <div className="ml-10 flex items-center space-x-4">
                {navigationLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            location.pathname === link.path
                                ? /* Again i don't like using a manual hex code but i have no
                                                   * other option at atm*/
                                'bg-mgb-blue-800 text-white'
                                : 'text-white hover:bg-mgb-blue-700'
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
                <Link key={"Logout"} to={"/"}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-mgb-brown-500 text-white hover:bg-mgb-brown-700 active:bg-mgb-brown-800`}>
                    Logout
                </Link>
            </div>
        )
    }

    function mobileLinks() {
        return (
            <ul className={"flex flex-col"}>
                {navigationLinks.map((link) => (
                    <>
                        <Link key={link.path}
                              to={link.path}
                              className={`px-3 py-2 font-medium transition-colors duration-200 text-black w-17 underline hover:text-white`}>
                            {link.name}
                        </Link>
                        <hr className={"h-px bg-mgb-light-blue border-0"}></hr>
                    </>
                ))}
                <Link key={"Logout"} to={"/"}
                      className={`px-3 py-2 font-medium transition-colors duration-200 text-black w-17 underline hover:text-white`}>
                      Logout
                </Link>
            </ul>
        )
    }

    return (
        /*NEED TO FIGURE OUT TAILWIND CONFIG ASAP
         * these colors should be added to it instead
         * of manually using them with hex here*/
        <nav className="bg-mgb-blue text-white shadow-lg">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to={props.page == 'home' ? ("/") : ("/home")}
                              className="flex items-center">
                            <img className="logo w-10" src="/mgb.png" alt="Mass General Brigham" />
                            <span className="ml-2 text-xl font-bold">Mass General Brigham</span>
                        </Link>
                    </div>

                    {/* Desktop nav Links */}
                    <div className="hidden lg:block">
                            {props.page == 'home' ? (
                                loginDesktopButton()
                            ) : props.page != 'login' && (
                                desktopLinks()
                            )}
                    </div>
                </div>
                {/* Mobile/small screen nav Links */}
                <div id={"hamburg"} className={"transition-all duration-300 lg:hidden"}>
                    {props.page == 'home' ? loginMobileButton() : mobileLinks() }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

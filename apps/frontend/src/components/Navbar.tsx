import { Link, useLocation } from 'react-router-dom';

interface NavBarProps {
    page: string;
}

function Navbar(props: NavBarProps) {
    const location = useLocation();

    const navigationLinks = [
        { name: 'Home', path: '/' },
        { name: 'Directory', path: '/directory' },
        // May need to change service req path later
        { name: 'Request Service', path: '/servicereqs' },
        { name: 'Map', path: '/mapView' },
    ];

    function loginButton() {
        return(
            <Link
                key={'Login'}
                to={'/login'}
                className={'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-black bg-[#b8e4e4] hover:bg-[#306c73] hover:text-white'}
            >
                {'Login'}
            </Link>
        )
    }

    function desktopLinks() {
        return (
            navigationLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        location.pathname === link.path
                            ? /* Again i don't like using a manual hex code but i have no
                                               * other option at atm*/
                            'bg-[#234d52] text-white'
                            : 'text-white hover:bg-[#306c73] hover:text-white'
                    }`}
                >
                    {link.name}
                </Link>
            ))
        )
    }

    function mobileLinks() {
        return (
            navigationLinks.map((link) => (
                <Link key={link.path}
                      to={link.path}
                      className={``}>
                    {link.name}
                </Link>
            ))
        )
    }

    return (
        /*NEED TO FIGURE OUT TAILWIND CONFIG ASAP
         * these colors should be added to it instead
         * of manually using them with hex here*/
        <nav className="bg-[#449aa4] text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img className="logo w-10" src="../../public/mgb.png" alt="Mass General Brigham" />
                            <span className="ml-2 text-xl font-bold">Mass General Brigham</span>
                        </Link>
                    </div>

                    {/* Desktop nav Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {props.page == 'login' ? (
                                loginButton()
                            ) : (
                                desktopLinks()
                            )}
                        </div>
                    </div>
                    <div className={"md:hidden"}>
                        <button data-toggle="collapse" data-target="#hamburg" type="button" className={"btn btn-primary collapse-active:bg-primary-active inline-flex items-center justify-center p-2 bg-gray-500"}>
                            a
                        </button>
                    </div>
                </div>
                <div id={"hamburg"} className={"transition-all duration-300 md:hidden"}>
                    <ul className={"flex flex-col"}>
                        {mobileLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

import HomeHeader from './HomeHeader.tsx';
import { Outlet } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <HomeHeader
                title=""
                homelabel="| Logout |"
                homelabelLink="/"
                formlabel={' Service Request |'}
                formlabelLink={'/servicereqs'}
                directoryLabel={' Directory |'}
                directorLabelLink={'/directory'}
            />
            <Outlet />
        </div>
    );
}

export default NavBar;

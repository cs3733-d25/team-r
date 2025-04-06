import React from 'react';
import NavBar from "../components/NavBar.tsx";


const HomePage = () => {
    return (
        <div className={"bg-[#449aa4] flex-col h-screen"}>
            <NavBar page={"login"} />
            {/*Image taken from Mass General Brigham website home page*/}
            <div className={"bg-[url(/heropage.jpeg)] bg-no-repeat bg-cover h-6/7"}>

            </div>
        </div>
    );
};

export default HomePage;
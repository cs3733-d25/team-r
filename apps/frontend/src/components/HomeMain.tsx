import React from 'react'
import NavBar from "./NavBar.tsx";

export function HomeMain() {
    return (
        <div className={"bg-[#449aa4] flex-col h-screen"}>
            <NavBar page={"login"} />
            {/*Image taken from Mass General Brigham website home page*/}
            <div className={"bg-[url(/heropage.jpeg)] bg-no-repeat bg-cover h-6/7 justify-items-center"}>
                <div className={"flex-col text-center w-5/8 bg-[#b8e4e4]/80"}>
                    <br />
                    <h1 className={"text-5xl font-bold"}>Welcome to Mass General Brigham</h1>
                    <br className={"bg-white"}/>
                    <p className={"text-xl px-5"}>
                        Log in to access our directory and locate a department so that we can help you navigate toward any service that you may need.
                    </p>
                    <br />
                </div>
            </div>
        </div>
    )
}
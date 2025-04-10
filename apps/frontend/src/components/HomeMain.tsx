import React from 'react'
import NavBar from "./Navbar.tsx";

interface HomeMainProps {
    status?: string;
}

export function HomeMain(props: HomeMainProps) {
    return (
        <div className={"bg-mgb-blue flex-col h-screen"}>
            {props.status == 'logged-in' ? (
                <NavBar />
            ) : (<NavBar page={"home"} />)}
            {/*Image taken from Mass General Brigham website home page*/}
            <div className={"bg-[url(/heropage.jpeg)] bg-no-repeat bg-cover h-6/7 justify-items-center"}>
                <div className={"flex-col text-center w-5/8 bg-mgb-light-blue/80"}>
                    <br />
                    <h1 className={"text-5xl font-bold"}>Welcome to Mass General Brigham</h1>
                    <br className={"bg-white"}/>
                    {props.status != 'logged-in' && (
                        <div>
                            <p className={"text-xl px-5"}>
                                Log in to access our directory and locate a department so that we can help you navigate toward any service that you may need.
                            </p>
                            <br />
                        </div>)}
                </div>
            </div>
        </div>
    )
}
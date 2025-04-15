import React from 'react'
import NavBar from "./Navbar.tsx";
import {NavbarMGH} from "@/components/NavbarMGH.tsx";

interface HomeMainProps {
    status?: string;
}

export function HomeMain(props: HomeMainProps) {
    return (
        <div className={"bg-primary h-screen"}>
            {props.status == 'logged-in' ? (
                <NavbarMGH />
            ) : (<NavBar page={"home"} />)}
            {/*Image taken from Mass General Brigham website home page*/}
            <div className={"flex bg-[url(/hero-page-3.jpeg)] bg-no-repeat bg-cover h-6/7 items-center"}>
                <div className={"text-center w-3/8 bg-background/80"}>
                    <br />
                    <h1 className={"text-5xl place-self-center"}>Welcome to Mass General Brigham</h1>
                    <br />
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
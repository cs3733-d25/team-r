import React from 'react'
import {NavbarMGH} from "@/components/NavbarMGH.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from 'react-router-dom';


interface HomeMainProps {
    status?: string;
}

export function HomeMain(props: HomeMainProps) {

    const navigate = useNavigate();
    const handleNavigateToMap = () => {
        navigate('/external-map', {
            state: {
                status: props.status,
                // Add any other props you want to pass
            }
        });
    };


    return (
        <div className={"bg-primary h-screen"}>
            {props.status == 'logged-in' ? (
                <NavbarMGH />
            ) : (<NavbarMGH page={"home"} />)}
            {/*Image taken from Mass General Brigham website home page*/}
            <div className={"flex-col bg-[url(/hero-page-3.jpeg)] bg-no-repeat bg-cover h-6/7 content-center"}>
                <div className={"text-center w-3/8 content-center h-full bg-ring/50 backdrop-blur-sm"}>
                    <div className={"bg-background/80"}>
                        <br />
                        <h1 className={"text-5xl font-trade"}>Welcome to Mass General Brigham</h1>
                        <br />
                        {props.status != 'logged-in' && (
                            <div>
                                <p className={"text-xl px-5 font-trade"}>
                                    Log in to locate a department using our pathfinding page so that we can help you navigate toward any service that you may need.
                                </p>
                                <br />
                            </div>)}
                    </div>
                    <br />
                    <br />
                    <div className={"justify-self-center"}>
                        <Button
                            variant="ghost"
                            className={"bg-primary hover:bg-foreground hover:text-white"}
                            onClick={handleNavigateToMap}
                        >
                            Find a Location
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import { Label } from '@/components/ui/label.tsx';
import { GeoAlt, GeoAltFill } from 'react-bootstrap-icons';

interface HomeMainProps {
    status?: string;
    userType?: string;
}

export function HomeMain(props: HomeMainProps) {
    console.log('USER TYPE', props.userType, '- Keagan');

    const navigate = useNavigate();
    const handleNavigateToMap = () => {
        navigate('/external-map', {
            state: {
                status: props.status,
                // Add any other props you want to pass
            },
        });
    };

    return (
        <div className={'bg-primary h-[calc(100vh-65px)] relative'}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 from-[0%] to-transparent to-[70%] z-10"></div>
            {/* Hero page image is a photo taken by our incredible AKAASH WALKER */}
            <div
                className={
                    'flex-col bg-[url(/mgb-bg.png)] bg-no-repeat bg-cover h-full content-center'
                }
            >
                <div
                    className={
                        'text-center w-3/9 content-center h-full relative z-20 animate-fade-in'
                    }
                >
                    {/* Rest of content remains the same */}
                    <div className={'flex flex-col items-center justify-center ml-2'}>
                        <Label className={'text-5xl text-white font-bold mb-10'}>
                            Welcome to Mass General Brigham
                        </Label>
                        {(!props.userType || props.status != 'logged-in') && (
                            <Label className={'text-white mb-4 mx-10'}>
                                Log in to locate a department using our pathfinding page so that we
                                can help you navigate toward any service that you may need.
                            </Label>
                        )}
                    </div>
                    <div className={'justify-self-center'}>
                        <Button
                            variant="default"
                            onClick={handleNavigateToMap}
                        >
                            Find a Location
                            <GeoAltFill/>
                        </Button>
                    </div>
                </div>
                <div className={'animate-fade-in-delay-1 relative z-50'}>
                    <Disclaimer message="This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women's Hospital website." />
                </div>
            </div>
        </div>
    );
}

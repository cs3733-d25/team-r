// Full file with Settings link fixed and everything else untouched

import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { Bell, Menu, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Label } from '@/components/ui/label.tsx';
import {HoverPopoverNavLink} from "@/components/HoverPopoverNavLink.tsx";
import {useAuth0} from "@auth0/auth0-react";
import { Notifications } from '@/features/Announcements/Notifications.tsx';
import { ThemeSwitcher } from '@/features/ThemeSwitcher/ThemeSwitcher';

interface NavBarProps {
    page?: string;
    userType?: string;
    userName?: string;
}

export function NavbarMGH(props: NavBarProps) {
    // State to control the mobile menu and popover in navbar
    const [isOpen, setIsOpen] = React.useState(false);
    const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0();
    // const ?

    async function handleLogout() {
        try {
            console.log("Logging user out");
            logout(); //auth0 logout
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        // main header
        <header className="sticky top-0 z-40 border-b bg-primary">
            <div className="flex h-16 items-center px-4 min-[1152px]:px-6">
                {/* MGH logo and text */}
                <div className="flex items-center gap-2">
                    <a
                        href={!props.userType && props.userType !== 'Guest' ? '/' : '/home'}
                        className="flex items-center"
                    >
                        <img
                            src="/mgb_white.png"
                            alt="Logo"
                            className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="font-trade text-xl font-bold text-white">
                            Mass General Brigham
                        </span>
                    </a>
                </div>

                {/* Desktop Navigation - Non-Guests */}
                <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 min-[1152px]:flex items-center gap-6">
                    <Button variant="ghost" asChild>
                        <a href="/directory">Directories</a>
                    </Button>

                    <HoverPopoverNavLink
                        label={'Navigate'}
                        href={'/external-map'}
                        popoverWidth="18rem"
                        items={
                            props.userType === 'Admin'
                                ? [
                                    { label: 'Healthcare Center (20 Patriot Pl.)', href: '/external-map?location=patriotPlace20' },
                                    { label: 'Healthcare Center (22 Patriot Pl.)', href: '/external-map?location=patriotPlace22' },
                                    { label: 'Healthcare Center (Chestnut Hill)', href: '/external-map?location=chestnutHill' },
                                    { label: 'Faulkner Hospital', href: '/external-map?location=faulkner' },
                                    { label: 'Main Campus Hospital', href: '/external-map?location=mainCampus' },
                                    { label: 'Edit Map', href: '/edit-map' },
                                ]
                                : [
                                    { label: 'Healthcare Center (20 Patriot Pl.)', href: '/external-map?location=patriotPlace20' },
                                    { label: 'Healthcare Center (22 Patriot Pl.)', href: '/external-map?location=patriotPlace22' },
                                    { label: 'Healthcare Center (Chestnut Hill)', href: '/external-map?location=chestnutHill' },
                                    { label: 'Faulkner Hospital', href: '/external-map?location=faulkner' },
                                    { label: 'Main Campus Hospital', href: '/external-map?location=mainCampus' },
                                ]
                        }
                    />

                    {props.userType && props.userType !== 'Guest' && (
                        <>
                            {(props.userType === 'Admin' || props.userType === 'Employee') && (
                                <HoverPopoverNavLink
                                    label={'Request a Service'}
                                    href={'/requests'}
                                    popoverWidth="14rem"
                                    items={[
                                        { label: 'Sanitation', href: '/sanitation' },
                                        { label: 'Medical Device', href: '/devicerequest' },
                                        { label: 'Nonemergent Patient', href: '/patientrequestpage' },
                                        { label: 'Patient Transport', href: '/transport' },
                                        { label: 'Pharmacy', href: '/prescription' },
                                        { label: 'Translation', href: '/translation' },
                                        { label: 'View All Requests', href: '/requests' },
                                    ]}
                                />
                            )}

                            {(props.userType === 'Admin' || props.userType === 'Employee') && (
                                <HoverPopoverNavLink
                                    label={'Database'}
                                    href={'/csv'}
                                    popoverWidth="10rem"
                                    items={[
                                        { label: 'Import a CSV', href: '/csv' },
                                        { label: 'Export CSV', href: '/csv' },
                                    ]}
                                />
                            )}

                            {props.userType === 'Admin' && (
                                <HoverPopoverNavLink
                                    label={'Announcements'}
                                    href={'/announcements'}
                                    popoverWidth="10rem"
                                    items={[
                                        { label: 'Create New', href: '/announcementform' },
                                        { label: 'View All', href: '/announcements?tab=all' },
                                    ]}
                                />
                            )}
                        </>
                    )}
                    {/*About and Credits Page*/}
                    <HoverPopoverNavLink
                        label={'About'}
                        href={'/about'}
                        popoverWidth="10rem"
                        items={[
                            { label: 'Credits', href: '/credits' },
                            { label: 'Our Team', href: '/about' },]}
                    />
                </nav>



                {/* Icons on right */}
                {props.userType && props.userType != 'Guest' && (
                    <div className="ml-auto flex items-center gap-2">
                        <Notifications />

                        {/* User Profile Popover */}
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <User className="h-5 w-5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56" align="end" sideOffset={5}>
                                <div className="grid gap-3 p-2">
                                    <Label className={'font-trade text-base justify-center'}>
                                        Hi, {props.userName}!
                                    </Label>
                                    <div className="border-t"></div>
                                    {/*<Button*/}
                                    {/*    variant={'ghostPopover'}*/}
                                    {/*    onClick={() =>*/}
                                    {/*        alert("This button doesn't work yet!")*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    Profile*/}
                                    {/*</Button>*/}
                                    {/*<div className="border-t"></div>*/}

                                    {/*<Button*/}
                                    {/*    variant={'ghostPopover'}*/}
                                    {/*    asChild*/}
                                    {/*>*/}
                                    {/*    <a href="/settings">Settings</a>*/}
                                    {/*</Button>*/}
                                    {/*<div className="border-t"></div>*/}

                                    {/*Dark mode toggle*/}
                                    <ThemeSwitcher />
                                    <div className="border-t"></div>

                                    <Button variant={'ghostDestructive'} asChild>
                                        <a href={'/'} onClick={(e) => handleLogout()}>
                                            Sign out
                                        </a>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="min-[1152px]:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                )}
                {/* Only display login button in logged-out home page */}
                {!isAuthenticated && (
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="ghost" onClick={() => loginWithRedirect({ appState: { returnTo: window.location.pathname } })}>
                            Login
                        </Button>
                    </div>
                )}
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    'fixed inset-0 z-50 bg-primary min-[1152px]:hidden',
                    isOpen ? 'flex flex-col' : 'hidden'
                )}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-trade-condensed text-xl font-bold text-primary">
                        MyApp
                    </span>
                    <Button
                        variant="ghost"
                        className={'flex items-center'}
                        size="icon"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="sr-only">Close</span>
                        <span className="text-xl relative -top-1">x</span>
                    </Button>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                    <Button variant="ghost" asChild>
                        <a href="/directory">Directories</a>
                    </Button>

                    <Button variant="ghost" asChild>
                        <a href="/external-map">Navigate</a>
                    </Button>

                    {props.userType === 'Admin' && (
                        <Button variant="ghost" asChild>
                            <a href="/edit-map">Edit Map</a>
                        </Button>
                    )}
                    {(props.userType === 'Employee' || props.userType === 'Admin') && (
                        <Button variant="ghost" asChild>
                            <a href="/requests">Request a Service</a>
                        </Button>
                    )}
                    {(props.userType === 'Employee' || props.userType === 'Admin') && (
                        <Button variant="ghost" asChild>
                            <a href="/csv">Database</a>
                        </Button>
                    )}
                    {props.userType === 'Admin' && (
                        <Button variant="ghost" asChild>
                            <a href="/announcements">Announcements</a>
                        </Button>
                    )}
                    <Button variant="ghost" asChild>
                        <a href="/credits">Credits</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/about">Our Team</a>
                    </Button>
                </nav>
            </div>
        </header>
    );
}

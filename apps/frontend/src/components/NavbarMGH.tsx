import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, Menu, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label.tsx';
import {HoverPopoverNavLink} from "@/components/HoverPopoverNavLink.tsx";

interface NavBarProps {
    page?: string;
}

export function NavbarMGH(props: NavBarProps) {
    // State to control the mobile menu and popover in navbar
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        // main header
        <header className="sticky top-0 z-40 border-b bg-primary">
            <div className="flex h-16 items-center px-4 md:px-6">
                {/* MGH logo and text */}
                <div className="flex items-center gap-2">
                    <a href={(props.page == "home" || props.page == "login") ? "/" : "/home"} className="flex items-center">
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

                {/* Desktop Navigation - default*/}
                {(props.page != "home" && props.page != "login") && (
                <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-6">
                    <Button variant="ghost" asChild>
                        <a href="/directory">Directories</a>
                    </Button>
                    <HoverPopoverNavLink label={"Navigate"} href={"/external-map"} items={[
                        { label: 'Patriot Place', href: '/external-map' },
                        { label: 'Chestnut Hill', href: '/external-map' },
                        { label: 'Edit Map', href: '/edit-map' },
                    ]}/>
                    <HoverPopoverNavLink label={"Request a Service"} href={"/sanitation"} items={[
                        { label: 'Sanitation', href: '/sanitation' },
                        { label: 'Medical Device', href: '/devicerequest' },
                        { label: 'Patient Request', href: '/patientrequestpage' },
                        { label: 'Patient Transport', href: '/transport' },
                        { label: 'Prescription', href: '/prescription' },
                    ]}/>

                    <HoverPopoverNavLink label={"Database"} href={"/csv"} items={[
                        { label: 'Import a CSV', href: '/csv' },
                        { label: 'Export CSV', href: '/csv' },
                    ]
                    }/>
                </nav>)}

                {/* Icons on right */}
                {(props.page != "home" && props.page != "login") && (
                <div className="ml-auto flex items-center gap-2">
                    {/* Bell currently non-functional*/}
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => alert("This button doesn't work yet! - Akaash")}>
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Popover>
                        <PopoverTrigger>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end" sideOffset={5}>
                            <div className="grid gap-3 p-2">
                                <Label className={'font-trade text-base justify-center'}>
                                    Hi, User!
                                </Label>
                                <div className="border-t"></div>
                                <Button
                                    variant={'ghostPopover'}
                                    onClick={() => alert("This button doesn't work yet! - Akaash")}
                                >
                                    Profile
                                </Button>
                                <Button
                                    variant={'ghostPopover'}
                                    onClick={() => alert("This button doesn't work yet! - Akaash")}
                                >
                                    Settings
                                </Button>
                                <div className="border-t"></div>
                                <Button variant={'ghostDestructive'}>
                                    <a href={'/'}>Sign out</a>
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>)}
                {/* Only display login button in logged-out home page */}
                {(props.page == "home") && (
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="ghost" asChild className={"bg-accent hover:bg-chart-1 hover:text-input"}>
                            <a href="/login">Login</a>
                        </Button>
                    </div>
                )}
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    'fixed inset-0 z-50 bg-primary md:hidden',
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
                    <Button variant="ghost" asChild>
                        <a href="/sanitation">Request a Service</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/csv">Database</a>
                    </Button>
                </nav>
            </div>
        </header>
    );
}

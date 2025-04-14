import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, Menu, User } from 'lucide-react';

export function Navbar2() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-40  border-b bg-primary">
            <div className="flex h-16 items-center px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <a href="/" className="flex items-center">
                        <img
                            src="/mgb_white.png"
                            alt="Logo"
                            className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="font-trade text-xl font-bold text-background">
                            Mass General Brigham
                        </span>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-6">
                    <Button variant="ghost" asChild>
                        <a href="/directory">Directories</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/mapView">Map</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/sanitation">Make Request</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/csv">Database</a>
                    </Button>
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                    </Button>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
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
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <span className="sr-only">Close</span>
                        <span className="text-xl">×</span>
                    </Button>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                    <Button variant="ghost" asChild>
                        <a href="/directory">Directories</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/mapView">Map</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/sanitation">Make Request</a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/csv">Database</a>
                    </Button>
                </nav>
            </div>
        </header>
    );
}

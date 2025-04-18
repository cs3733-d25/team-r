import React from 'react';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

/**
 * PopoverItem interface
 * label - The text to display for the item
 * onClick - Optional click handler
 * href - Optional link for the item
 */
interface PopoverItem {
    label: string;
    onClick?: () => void;
    href?: string;
}

/**
 * HoverPopoverNavLinkProps interface
 * label - The text to display for the link
 * href - The link for the main button
 * items - An array of PopoverItem objects, which can be used to create a list of items in the popover
 */
interface HoverPopoverNavLinkProps {
    label: string;
    href: string;
    items: PopoverItem[];
}

/**
 * HoverPopoverNavLink component
 * @param label - The text to display for the link
 * @param href - The link for the main button
 * @param items - An array of PopoverItem objects, which can be used to create a list of items in the popover
 * @constructor
 */
export function HoverPopoverNavLink({ label, href, items }: HoverPopoverNavLinkProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * handleMouseEnter function
     * Sets the popover to open when the mouse enters the button
     */
    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsOpen(true);
    };

    /**
     * handleMouseLeave function
     * Sets the popover to close when the mouse leaves the button
     * has a timeout of 100ms to prevent the popover from closing immediately
     */
    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <PopoverTrigger>
                    <Button variant="ghost" asChild>
                        <a href={href}>{label}</a>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="grid gap-2 p-2">
                        {items.map((item, index) =>
                            item.href ? (
                                <Button
                                    key={index}
                                    variant={'ghostPopover'}
                                    onClick={item.onClick}
                                    asChild
                                >
                                    <a href={item.href}>{item.label}</a>
                                </Button>
                            ) : (
                                <Button key={index} variant={'ghostPopover'} onClick={item.onClick}>
                                    {item.label}
                                </Button>
                            )
                        )}
                    </div>
                </PopoverContent>
            </div>
        </Popover>
    );
}

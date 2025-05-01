import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";
import {ReactNode} from "react";

/**
 * This function creates a popup so that when you right click on an element,
 * it will make a popup displaying information about the component
 * @param select the element to be clicked on
 * @param info a string containing the information about the element
 */
export function displayInfo(select: ReactNode, info: string) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>{select}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <p className={"max-w-125 font-trade"}>{info}</p>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
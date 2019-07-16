import * as React from "react";
import { Display } from "../displays/DisplayApi";
import { displays } from "../displays/Displays";
import { NavbarItem } from "bloomer/lib/components/Navbar/NavbarItem";
import { NavbarLink } from "bloomer/lib/components/Navbar/NavbarLink";
import { NavbarDropdown } from "bloomer/lib/components/Navbar/NavbarDropdown";

export interface DisplaySelectorProps {
    setDisplay(d: Display): void;
}

export const DisplaySelector = (props: DisplaySelectorProps) => {
    return (
        <NavbarItem hasDropdown isHoverable>
            <NavbarLink >Screen</NavbarLink>
            <NavbarDropdown>
                {
                    displays.map(d => <NavbarItem key={d.name} onClick={() => props.setDisplay(d)}>{d.name}</NavbarItem>)
                }
            </NavbarDropdown>
        </NavbarItem>
    );
};

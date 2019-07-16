import * as React from "react";
import { NavbarItem } from "bloomer/lib/components/Navbar/NavbarItem";
import { NavbarLink } from "bloomer/lib/components/Navbar/NavbarLink";
import { NavbarDropdown } from "bloomer/lib/components/Navbar/NavbarDropdown";

export enum ZoomLevel {
    ONE = 1, TWO = 2, FOUR = 4
}

export interface ZoomSelectorProps {
    setZoom(factor: ZoomLevel): void;
}

export const ZoomSelector = (props: ZoomSelectorProps) => {
    return (
        <NavbarItem hasDropdown isHoverable>
            <NavbarLink >Zoom</NavbarLink>
            <NavbarDropdown>
                {
                    [ZoomLevel.ONE, ZoomLevel.TWO, ZoomLevel.FOUR].map(d => <NavbarItem key={d} onClick={() => props.setZoom(d)}>{d}:1</NavbarItem>)
                }
            </NavbarDropdown>
        </NavbarItem>
    );
};

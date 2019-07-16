import { examples, CodeExample } from "../examples/Examples";
import { DropdownItem } from "bloomer/lib/components/Dropdown/Menu/DropdownItem";
import { SelectorProps } from "./selector";
import * as React from "react";
import { NavbarItem } from "bloomer/lib/components/Navbar/NavbarItem";
import { NavbarLink } from "bloomer/lib/components/Navbar/NavbarLink";
import { NavbarDropdown } from "bloomer/lib/components/Navbar/NavbarDropdown";

export interface ExampleSelectorProps extends SelectorProps {
    setExample(e: CodeExample): void;
}

export const ExampleSelector = (props: ExampleSelectorProps) => {
    return (
        <NavbarItem hasDropdown isHoverable>
            <NavbarLink >Code Examples</NavbarLink>
            <NavbarDropdown>
                {
                    examples.map(e => <DropdownItem key={e.name} onClick={() => props.setExample(e)}>{e.name}</DropdownItem>)
                }
            </NavbarDropdown>
        </NavbarItem>
    );
};

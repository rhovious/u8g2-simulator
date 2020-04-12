import * as React from "react";
import { Display } from "../displays/DisplayApi";
import { displays } from "../displays/Displays";
import { Navbar } from "react-bulma-components";

export interface DisplaySelectorProps {
    setDisplay(d: Display): void;
}

export const DisplaySelector = (props: DisplaySelectorProps) => {
    return (
        <Navbar.Item dropdown={true} hoverable={true}>
            <Navbar.Link >Screen</Navbar.Link>
            <Navbar.Dropdown>
                {
                    displays.map(d => <Navbar.Item key={d.name} onClick={() => props.setDisplay(d)}>{d.name}</Navbar.Item>)
                }
            </Navbar.Dropdown>
        </Navbar.Item>
    );
};

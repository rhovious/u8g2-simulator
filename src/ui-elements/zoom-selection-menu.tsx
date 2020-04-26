import * as React from "react";
import { Navbar } from "react-bulma-components";

export enum ZoomLevel {
    ONE = 1, TWO = 2, FOUR = 4, EIGHT = 8
}

export interface ZoomSelectorProps {
    setZoom(factor: ZoomLevel): void;
}

export const ZoomSelector = (props: ZoomSelectorProps) => {
    return (
        <Navbar.Item dropdown hoverable>
            <Navbar.Link >Zoom</Navbar.Link>
            <Navbar.Dropdown>
                {
                    [ZoomLevel.ONE, ZoomLevel.TWO, ZoomLevel.FOUR, ZoomLevel.EIGHT].map(d => <Navbar.Item key={d} onClick={() => props.setZoom(d)}>{d}:1</Navbar.Item>)
                }
            </Navbar.Dropdown>
        </Navbar.Item>
    );
};

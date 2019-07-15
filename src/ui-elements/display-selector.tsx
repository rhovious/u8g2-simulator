import React = require("react");
import { Button } from "bloomer/lib/elements/Button";
import { Dropdown } from "bloomer/lib/components/Dropdown/Dropdown";
import { DropdownContent } from "bloomer/lib/components/Dropdown/Menu/DropdownContent";
import { DropdownItem } from "bloomer/lib/components/Dropdown/Menu/DropdownItem";
import { DropdownMenu } from "bloomer/lib/components/Dropdown/Menu/DropdownMenu";
import { DropdownTrigger } from "bloomer/lib/components/Dropdown/DropdownTrigger";
import { Icon } from "bloomer/lib/elements/Icon";
import { SelectorProps } from "./selector";
import { Display } from "../displays/DisplayApi";
import { displays } from "../displays/Displays";

export interface DisplaySelectorProps extends SelectorProps {
    setDisplay(d: Display): void;
}

export const DisplaySelector = (props: DisplaySelectorProps) => {
    return (
        <Dropdown isActive={props.isActive}>
            <DropdownTrigger>
                <Button onClick={props.toggle} isOutlined aria-haspopup="true" aria-controls="dropdown-menu">
                    <Icon className="fa fa-tv" isSize="small" />
                    <span>{props.label}</span>
                    <Icon className="fa fa-angle-down" isSize="small" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownContent>
                    {
                        displays.map(d => <DropdownItem key={d.name} onClick={() => props.setDisplay(d)}>{d.name}</DropdownItem>)
                    }
                </DropdownContent>
            </DropdownMenu>
        </Dropdown >
    );
};

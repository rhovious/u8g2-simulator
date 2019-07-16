import { Dropdown } from "bloomer/lib/components/Dropdown/Dropdown";
import { DropdownTrigger } from "bloomer/lib/components/Dropdown/DropdownTrigger";
import { Button } from "bloomer/lib/elements/Button";
import { Icon } from "bloomer/lib/elements/Icon";
import { DropdownMenu } from "bloomer/lib/components/Dropdown/Menu/DropdownMenu";
import { DropdownContent } from "bloomer/lib/components/Dropdown/Menu/DropdownContent";
import { examples, CodeExample } from "../examples/Examples";
import { DropdownItem } from "bloomer/lib/components/Dropdown/Menu/DropdownItem";
import { SelectorProps } from "./selector";
import * as React from "react";

export interface ExampleSelectorProps extends SelectorProps {
    setExample(e: CodeExample): void;
}

export const ExampleSelector = (props: ExampleSelectorProps) => {
    // examples
    return (
        <Dropdown isActive={props.isActive}>
            <DropdownTrigger>
                <Button onClick={props.toggle} isOutlined aria-haspopup="true" aria-controls="dropdown-menu">
                    <Icon className="fa fa-file" isSize="small" />
                    <span>{props.label}</span>
                    <Icon className="fa fa-angle-down" isSize="small" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownContent>
                    {
                        examples.map(e => <DropdownItem key={e.name} onClick={() => props.setExample(e)}>{e.name}</DropdownItem>
                        )
                    }
                </DropdownContent>
            </DropdownMenu>
        </Dropdown >
    );
};

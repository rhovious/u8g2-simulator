import { examples, CodeExample } from "../examples/Examples";
import * as React from "react";
import { Dropdown, Navbar } from "react-bulma-components";

export interface ExampleSelectorProps {
    setExample(e: CodeExample): void;
}

export const ExampleSelector = (props: ExampleSelectorProps) => {
    return (
        <Navbar.Item dropdown={true} hoverable={true}>
            <Navbar.Link >Code Examples</Navbar.Link>
            <Navbar.Dropdown>
                {
                    examples.map(e => <Dropdown.Item value={e.name} key={e.name} onClick={() => props.setExample(e)}>{e.name}</Dropdown.Item>)
                }
            </Navbar.Dropdown>
        </Navbar.Item>
    );
};

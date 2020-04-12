import * as React from "react";
import { Form, Navbar } from "react-bulma-components";

export interface LoopSelectorProps {
    setFps(i: number): void;
    fps: number;
}

export const LoopSelector = (props: LoopSelectorProps) => {
    return (
        <Navbar.Item dropdown hoverable>
            <Navbar.Link >Loop Settings</Navbar.Link>
            <Navbar.Dropdown>
                <Form.Input
                    type="text"
                    placeholder="fps"
                    value={"" + props.fps}
                    className="small-input"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setFps(parseInt(event.target.value, 10))} />
            </Navbar.Dropdown>
        </Navbar.Item>

        // <Dropdown isActive={props.isActive}>
        //     <DropdownTrigger>
        //         <Button isOutlined aria-haspopup="true" aria-controls="dropdown-menu">
        //             <Icon onClick={props.toggleLoop} className={"fa " + (props.isLooping ? "fa-stop" : "fa-play")} />
        //             <span onClick={props.toggle} >{props.label}</span> {/*Loop {this.state.counter > 0 ? "(" + this.state.counter + ")" : "" */}
        //             <Icon onClick={props.toggle} className="fa fa-angle-down" />
        //         </Button>
        //     </DropdownTrigger>
        //     <DropdownMenu>
        //         <DropdownContent>
        //             <DropdownItem>FPS:</DropdownItem>
        //         </DropdownContent>
        //     </DropdownMenu>
        // </Dropdown>
    );
};

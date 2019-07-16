import * as React from "react";
import { Input } from "bloomer/lib/elements/Form/Input";
import { NavbarItem } from "bloomer/lib/components/Navbar/NavbarItem";
import { NavbarLink } from "bloomer/lib/components/Navbar/NavbarLink";
import { NavbarDropdown } from "bloomer/lib/components/Navbar/NavbarDropdown";

export interface LoopSelectorProps {
    setFps(i: number): void;
    fps: number;
}

export const LoopSelector = (props: LoopSelectorProps) => {
    return (
        <NavbarItem hasDropdown isHoverable>
            <NavbarLink >Loop Settings</NavbarLink>
            <NavbarDropdown>
                <Input
                    type="text"
                    placeholder="fps"
                    value={props.fps}
                    className="small-input"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setFps(parseInt(event.target.value, 10))} />
            </NavbarDropdown>
        </NavbarItem>

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

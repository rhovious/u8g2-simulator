import * as React from "react";
import { Button } from "bloomer/lib/elements/Button";
import { Dropdown } from "bloomer/lib/components/Dropdown/Dropdown";
import { DropdownContent } from "bloomer/lib/components/Dropdown/Menu/DropdownContent";
import { DropdownMenu } from "bloomer/lib/components/Dropdown/Menu/DropdownMenu";
import { DropdownTrigger } from "bloomer/lib/components/Dropdown/DropdownTrigger";
import { DropdownItem } from "bloomer/lib/components/Dropdown/Menu/DropdownItem";
import { Icon } from "bloomer/lib/elements/Icon";
import { Input } from "bloomer/lib/elements/Form/Input";
import { SelectorProps } from "./selector";

export interface LoopSelectorProps extends SelectorProps {
    setFps(i: number): void;
    fps: number;
    toggleLoop(): void;
    isLooping: boolean;
}

export const LoopSelector = (props: LoopSelectorProps) => {
    return (
        <Dropdown isActive={props.isActive}>
            <DropdownTrigger>
                <Button isOutlined aria-haspopup="true" aria-controls="dropdown-menu">
                    <Icon onClick={props.toggleLoop} className={"fa " + (props.isLooping ? "fa-stop" : "fa-play")} />
                    <span onClick={props.toggle} >{props.label}</span> {/*Loop {this.state.counter > 0 ? "(" + this.state.counter + ")" : "" */}
                    <Icon onClick={props.toggle} className="fa fa-angle-down" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownContent>
                    <DropdownItem>FPS:</DropdownItem>
                    <DropdownItem><Input type="text" placeholder="fps" value={props.fps} className="small-input" onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setFps(parseInt(event.target.value, 10))} /></DropdownItem>
                </DropdownContent>
            </DropdownMenu>
        </Dropdown>
    );
};

import { Display } from "../displays/DisplayApi";
import { DisplaySelectorProps } from "../ui-elements/display-selector";
import { LoopSelectorProps } from "../ui-elements/loop-selector";
import { ExampleSelectorProps } from "../ui-elements/example-selector";

export interface EditorState {
    code: string;
    display: Display;
    counter: number;
    isLooping: boolean;

    displaySelectorProps: DisplaySelectorProps;
    loopSelectorProps: LoopSelectorProps;
    exampleSelectorProps: ExampleSelectorProps;

    errorMessage?: string;
}

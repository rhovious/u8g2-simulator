import { Display } from "../displays/DisplayApi";

export interface EditorState {
    code: string;
    display: Display;
    counter: number;
    isLooping: boolean;
    fps: number;

    displaySelectorIsActive: boolean;
    exampleSelectorIsActive: boolean;
    loopSelectorIsActive: boolean;

    errorMessage?: string;
}

import { Display } from "../displays/DisplayApi";
import { ZoomLevel } from "../ui-elements/zoom-selection-menu";

export interface EditorState {
    code: string;
    display: Display;
    counter: number;
    isLooping: boolean;
    fps: number;
    zoom: ZoomLevel;

    displaySelectorIsActive: boolean;
    exampleSelectorIsActive: boolean;
    loopSelectorIsActive: boolean;

    errorMessage?: string;
}

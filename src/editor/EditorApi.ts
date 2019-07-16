import { Display } from "../displays/DisplayApi";
import { ZoomLevel } from "../ui-elements/zoom-selection-menu";
import { ErrorCallback } from "../ui-elements/code-panel";

export interface EditorState {
    display: Display;
    counter: number;
    isLooping: boolean;
    fps: number;
    zoom: ZoomLevel;

    errorCallback?: ErrorCallback;
}

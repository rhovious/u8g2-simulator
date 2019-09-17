import { Display } from "./DisplayApi";

export const oled128x64: Display = {
    name: "OLED 128x64",
    width: 128,
    height: 64,
    resetColor: 0,
    getColorValue: (color: number) => {
        switch (color) {
            case 0: return "#000000";
            case 1: return "#ffffff";
            default:
                return "#FF0000";
        }
    }
};
export const oled128x32: Display = {
    name: "OLED 128x32",
    width: 128,
    height: 32,
    resetColor: 0,
    getColorValue: (color: number) => {
        switch (color) {
            case 0: return "#000000";
            case 1: return "#ffffff";
            default:
                return "#FF0000";
        }
    }
};
export const nokia5110: Display = {
    name: "Nokia 5110",
    width: 84,
    height: 48,
    resetColor: 0,
    getColorValue: (color: number) => {
        switch (color) {
            case 0: return "#616A4B";
            case 1: return "#222222";
            default:
                return "#FF0000";
        }
    }
};
export const flexEpaper: Display = {
    name: "Flex Epaper 2.13",
    width: 104,
    height: 212,
    resetColor: 0,
    getColorValue: (color: number) => {
        switch (color) {
            case 0: return "#ffffff";
            case 1: return "#222222";
            default:
                return "#FF0000";
        }
    }
};

export const displays = [oled128x64, oled128x32, nokia5110, flexEpaper];

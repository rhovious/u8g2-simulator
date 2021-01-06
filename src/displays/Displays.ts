import { Display } from "./DisplayApi";

export const oled128x64: Display = {
    name: "OLED 128x64",
    width: 128,
    height: 64,
    resetColor: 0,
    colorMap: {
        0: "#000000",
        1: "#ffffff"
    }
};
export const oled128x32: Display = {
    name: "OLED 128x32",
    width: 128,
    height: 32,
    resetColor: 0,
    colorMap: {
        0: "#000000",
        1: "#ffffff"
    }
};

export const oled128x128: Display = {
    name: "OLED 128x128",
    width: 128,
    height: 128,
    resetColor: 0,
    colorMap: {
        0: "#000000",
        1: "#ffffff"
    }
};

export const oled256x128: Display = {
    name: "OLED 256x128",
    width: 256,
    height: 128,
    resetColor: 0,
    colorMap: {
        0: "#000000",
        1: "#ffffff"
    }
};

export const oled256x64: Display = {
    name: "OLED 256x64",
    width: 256,
    height: 64,
    resetColor: 0,
    colorMap: {
        0: "#000000",
        1: "#ffffff"
    }
};

export const nokia5110: Display = {
    name: "Nokia 5110",
    width: 84,
    height: 48,
    resetColor: 0,
    colorMap: {
        0: "#616A4B",
        1: "#222222"
    }
};
export const flexEpaper: Display = {
    name: "Flex Epaper 2.13 (104x212)",
    width: 104,
    height: 212,
    resetColor: 0,
    colorMap: {
        0: "#ffffff",
        1: "#222222"
    }
};
export const waveshareEpaper219: Display = {
    name: "Waveshare Epaper 2.19 (296x128)",
    width: 296,
    height: 128,
    resetColor: 0,
    colorMap: {
        0: "#ffffff",
        1: "#222222"
    }
};

export const epaper154: Display = {
    name: "Epaper 1.54 (200x200)",
    width: 200,
    height: 200,
    resetColor: 0,
    colorMap: {
        0: "#ffffff",
        1: "#222222"
    }
};

export const dotMatrix328: Display = {
    name: "Dot Matrix Led 7219 (32x8)",
    width: 32,
    height: 8,
    resetColor: 0,
    colorMap: {
        0: "#000000",
        1: "#FF0000"
    }
};

export const displays = [oled128x64, oled128x32, oled128x128, oled256x128, oled256x64, nokia5110, flexEpaper, epaper154, dotMatrix328, waveshareEpaper219];

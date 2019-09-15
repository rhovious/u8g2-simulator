import battery_signal from "./battery_signal.raw.cpp";
import ugly_bird from "./ugly_bird.raw.cpp";
import intro from "./intro.raw.cpp";
import weather_clock from "./weather_clock.raw.cpp";
import config_screen from "./config_screen.raw.cpp";
import ui_elements from "./ui_elements.raw.cpp";
import server_monitor from "./server_monitor.cpp";

export interface CodeExample {
    name: string;
    code: string;
}

export const examples: CodeExample[] = [
    {
        name: "Intro",
        code: intro
    },
    {
        name: "Battery/Signal",
        code: battery_signal
    },
    {
        name: "Ugly Bird",
        code: ugly_bird
    },
    {
        name: "Weather / Clock",
        code: weather_clock
    },
    {
        name: "Config Screen",
        code: config_screen
    },
    {
        name: "UI Elements",
        code: ui_elements
    },
    {
        name: "Server Monitor",
        code: server_monitor
    }
];

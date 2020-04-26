import * as React from "react";
import { Display } from "../displays/DisplayApi";
import { Icon, Panel, Tile, Navbar } from "react-bulma-components";
import { PanelProps } from "./panel";
import { transpile } from "../util/cpp2javascript";
import { scaleUp } from "../util/canvas";
import { U8G2 } from "../util/U8G2";
import { DisplaySelector, DisplaySelectorProps } from "./display-selection-menu";
import { ZoomSelector, ZoomSelectorProps, ZoomLevel } from "./zoom-selection-menu";

export interface DisplayPanelProps extends PanelProps {
    displaySelectorProps: DisplaySelectorProps;
    zoomSelectorProps: ZoomSelectorProps;
    getCode(): string;
    display: Display;
    loopCounter: number;
    onEvalError(e?: Error): void;

    zoom: ZoomLevel;
}

interface DisplayPanelState {
    lcdReady: boolean;
    lastCounter: number;
}

export class DisplayPanel extends React.Component<DisplayPanelProps, DisplayPanelState> {
    ctx: CanvasRenderingContext2D | null = null;
    canvas: HTMLCanvasElement | null = null;
    canvasX2: HTMLCanvasElement | null = null;
    canvasX4: HTMLCanvasElement | null = null;
    canvasX8: HTMLCanvasElement | null = null;

    u8g2: U8G2 | null = null;
    globalScriptStore: any | null = null;

    constructor(props: DisplayPanelProps) {
        super(props);
        this.state = {
            lcdReady: false,
            lastCounter: 0
        };
    }

    redraw() {
        if (this.ctx) {

            this.ctx.fillStyle = this.props.display.colorMap[this.props.display.resetColor];
            this.ctx.fillRect(0, 0, this.props.display.width, this.props.display.height);

            if (this.u8g2 === null
                || this.u8g2.getDisplay() !== this.props.display) {
                this.u8g2 = new U8G2(this.ctx, this.props.display);
            }

            const transpiled = transpile(this.props.getCode());
            try {

                const result = eval("(function(global) { var counter = " + this.props.loopCounter + "; " + transpiled + "return draw;})");
                if (result) {
                    result(this.globalScriptStore)(this.u8g2);
                    this.props.onEvalError();
                }
            } catch (e) {
                console.log(e);
                this.props.onEvalError(e);
            }

            if (this.canvasX2) {
                let s2Ctx = this.canvasX2.getContext("2d");
                if (s2Ctx) {

                    scaleUp(this.ctx, s2Ctx, this.props.display.width, this.props.display.height);

                    if (this.canvasX4) {
                        let s4Ctx = this.canvasX4.getContext("2d");
                        if (s4Ctx) {
                            scaleUp(s2Ctx, s4Ctx, this.props.display.width * 2, this.props.display.height * 2);

                            if (this.canvasX8) {
                                let s8Ctx = this.canvasX8.getContext("2d");
                                if (s8Ctx) {
                                    scaleUp(s4Ctx, s8Ctx, this.props.display.width * 4, this.props.display.height * 4);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    render() {
        if (this.state.lastCounter !== this.props.loopCounter) {
            this.redraw();
        }
        return (
            <Panel>
                <Panel.Header><Icon className="fa fa-tv" size="small" style={{ marginRight: "8px" }} />{this.props.title}</Panel.Header>
                <Navbar style={{ border: "solid 1px rgb(219,219,219)", borderTop: "0px", margin: "0" }}>
                    <Navbar.Menu>
                        {DisplaySelector(this.props.displaySelectorProps)}
                        {ZoomSelector(this.props.zoomSelectorProps)}
                    </Navbar.Menu>
                </Navbar>
                <Panel.Block>
                    <Tile >
                        <Tile size={4} vertical>
                            <Tile>
                                <div>
                                    <p>1:1</p>
                                    <canvas className="lcd-canvas" ref={c => {
                                        if (c) {
                                            this.canvas = c;
                                            this.ctx = c.getContext("2d");
                                            if (this.ctx && !this.state.lcdReady) {
                                                this.setState({ lcdReady: true });
                                            }

                                        }
                                    }
                                    } width={this.props.display.width} height={this.props.display.height} />
                                </div>
                            </Tile>
                            {this.props.zoom === ZoomLevel.TWO || this.props.zoom === ZoomLevel.FOUR || this.props.zoom === ZoomLevel.EIGHT ?
                                <Tile><div>
                                    <p>2:1</p>
                                    <canvas className="lcd-canvas-scaled" ref={c => {
                                        if (c) {
                                            this.canvasX2 = c;
                                        }
                                    }
                                    } width={this.props.display.width * 2} height={this.props.display.height * 2} />
                                </div>
                                </Tile>
                                : ""}
                            {this.props.zoom === ZoomLevel.FOUR || this.props.zoom === ZoomLevel.EIGHT ?
                                <Tile>
                                    <div>
                                        <p>4:1</p>
                                        <canvas className="lcd-canvas-scaled" ref={c => {
                                            if (c) {
                                                this.canvasX4 = c;
                                            }
                                        }
                                        } width={this.props.display.width * 4} height={this.props.display.height * 4} />
                                    </div>
                                </Tile>
                                : ""}
                           {this.props.zoom === ZoomLevel.EIGHT ?
                                <Tile>
                                    <div>
                                        <p>8:1</p>
                                        <canvas className="lcd-canvas-scaled" ref={c => {
                                            if (c) {
                                                this.canvasX8 = c;
                                            }
                                        }
                                        } width={this.props.display.width * 8} height={this.props.display.height * 8} />
                                    </div>
                                </Tile>
                                : ""}
                        </Tile>
                    </Tile>
                </Panel.Block>
            </Panel>
        );
    }
}

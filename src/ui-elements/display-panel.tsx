import React = require("react");
import { Display } from "../displays/DisplayApi";
import { Icon } from "bloomer/lib/elements/Icon";
import { Panel } from "bloomer/lib/components/Panel/Panel";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { PanelHeading } from "bloomer/lib/components/Panel/PanelHeading";
import { PanelProps } from "./panel";
import { Tile } from "bloomer/lib/grid/Tile";
import { transpile } from "../util/cpp2javascript";
import { scaleUp } from "../util/canvas";
import { U8G2 } from "../util/U8G2";

export interface DisplayPanelProps extends PanelProps {
    getCode(): string;
    display: Display;
    loopCounter: number;
    onEvalError(e?: Error): void;
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

    constructor(props: DisplayPanelProps) {
        super(props);
        this.state = {
            lcdReady: false,
            lastCounter: 0
        };
    }

    redraw() {
        if (this.ctx) {
            console.log("redrawing");
            this.ctx.fillStyle = this.props.display.getColorValue(this.props.display.resetColor);
            this.ctx.fillRect(0, 0, this.props.display.width, this.props.display.height);

            const u8g2: U8G2 = new U8G2(this.ctx, this.props.display);
            const transpiled = transpile(this.props.getCode());
            try {

                const result = eval("(function() { var counter = " + this.props.loopCounter + "; " + transpiled + "return draw;})");
                if (result) {
                    result()(u8g2);
                    this.props.onEvalError();
                    // this.setState({ errorMsg: "" });
                }
            } catch (e) {
                this.props.onEvalError(e);
                // this.setState({ errorMsg: e.name + ":\n\n" + e.message });
            }

            if (this.canvasX2) {
                let sCtx = this.canvasX2.getContext("2d");
                if (sCtx) {

                    scaleUp(this.ctx, sCtx, this.props.display.width, this.props.display.height);

                    if (this.canvasX4) {
                        let s4Ctx = this.canvasX4.getContext("2d");
                        if (s4Ctx) {
                            scaleUp(sCtx, s4Ctx, this.props.display.width * 2, this.props.display.height * 2);
                        }
                    }
                }
            }
        }
    }

    render() {
        console.log("last counter", this.state.lastCounter, this.props.loopCounter);
        if (this.state.lastCounter !== this.props.loopCounter) {
            this.redraw();
        }
        return (
            <Panel>
                <PanelHeading><Icon className="fa fa-tv" />{this.props.title}</PanelHeading>
                <PanelBlock>
                    <Tile isAncestor >
                        <Tile isSize={4} isVertical isParent>
                            <Tile isChild render={
                                (props: any) => (
                                    <div {...props}>
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
                                )
                            } />
                            <Tile isChild render={
                                (props: any) => (
                                    <div {...props}>
                                        <p>2:1</p>
                                        <canvas className="lcd-canvas-scaled" ref={c => {
                                            if (c) {
                                                this.canvasX2 = c;
                                            }
                                        }
                                        } width={this.props.display.width * 2} height={this.props.display.height * 2} />
                                    </div>
                                )
                            } />
                            <Tile isChild render={
                                (props: any) => (
                                    <div {...props}>
                                        <p>4:1</p>
                                        <canvas className="lcd-canvas-scaled" ref={c => {
                                            if (c) {
                                                this.canvasX4 = c;
                                            }
                                        }
                                        } width={this.props.display.width * 4} height={this.props.display.height * 4} />
                                    </div>
                                )
                            } />
                        </Tile>
                    </Tile>
                </PanelBlock>
            </Panel>
        );
    }
}

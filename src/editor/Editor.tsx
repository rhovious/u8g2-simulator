import * as React from "react";

import { EditorState } from "./EditorApi";
import { examples, CodeExample } from "../examples/Examples";
import { oled128x64 } from "../displays/Displays";
import { Display } from "../displays/DisplayApi";
import { DocumentationPanel } from "../ui-elements/documentation-panel";
import { Column } from "bloomer/lib/grid/Column";
import { Columns } from "bloomer/lib/grid/Columns";
import { DisplayPanel } from "../ui-elements/display-panel";
import { CodePanel, ErrorCallback } from "../ui-elements/code-panel";
import { ZoomLevel } from "../ui-elements/zoom-selection-menu";
import { FontPanel } from "../ui-elements/font-panel";

export class Editor extends React.Component<{}, EditorState> {

    constructor(props: {}, private code: string) {
        super(props);
        this.code = examples[0].code;

        this.state = {
            display: oled128x64,
            isLooping: false,
            counter: 0,
            fps: 4,
            zoom: ZoomLevel.TWO
        };

        this.loop = this.loop.bind(this);
        this.onExec = this.onExec.bind(this);
        this.getCode = this.getCode.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.setCodeExample = this.setCodeExample.bind(this);
        this.setDisplay = this.setDisplay.bind(this);
        this.setZoom = this.setZoom.bind(this);
        this.setFps = this.setFps.bind(this);
        this.onEvalError = this.onEvalError.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.hookErrorCallback = this.hookErrorCallback.bind(this);
    }

    componentDidMount() {
        this.onExec();
    }

    setDisplay(d: Display) {
        this.setState({ display: d });
    }

    setFps(i: number) {
        this.setState({ fps: i });
    }

    setZoom(zoom: ZoomLevel) {
        this.setState({ zoom: zoom });
    }

    toggleLoop() {
        if (!this.state.isLooping) {
            setTimeout(this.loop, 250);
        }
        this.setState(prev => ({ isLooping: !prev.isLooping }));
    }

    setCodeExample(e: CodeExample) {
        this.code = e.code;
        this.onExec();
    }

    onCodeChange(updatedCode: string) {
        this.code = updatedCode;
    }

    loop() {
        console.log("loop", this.state.counter);

        this.setState(prev => ({ counter: prev.counter + 1 }));
        // this.redraw();
        if (this.state.isLooping) {
            setTimeout(this.loop, 1000 / this.state.fps);
        } else {
            this.setState({ counter: 0 });
        }

    }

    hookErrorCallback(cb: ErrorCallback) {
        this.setState({ errorCallback: cb });
    }

    onEvalError(e?: Error) {
        if (this.state.errorCallback) {
            this.state.errorCallback(e ? e.message : "");
        }
    }

    getCode() {
        return this.code;
    }

    onExec() {
        this.setState(prev => ({ counter: prev.counter + 1 }));
    }

    render() {
        return (
            <div className="main">
                <Columns isCentered>
                    <Column isSize="1/4">
                        <DisplayPanel
                            title={"Preview (" + this.state.display.name + ")(" + this.state.counter + ")"}
                            icon="fa-tv"
                            getCode={this.getCode}
                            display={this.state.display}
                            loopCounter={this.state.counter}
                            onEvalError={this.onEvalError}

                            displaySelectorProps={{
                                setDisplay: this.setDisplay
                            }}

                            zoomSelectorProps={{
                                setZoom: this.setZoom
                            }}

                            zoom={this.state.zoom}
                        />
                        {DocumentationPanel({ title: "Documentation", icon: "fa-file" })}
                    </Column>
                    <Column isSize="3/4">
                        <CodePanel
                            title="Code"
                            icon="fa-code"
                            isLooping={this.state.isLooping}
                            toggleLoop={this.toggleLoop}
                            loopSelectorProps={{
                                fps: this.state.fps,
                                setFps: this.setFps
                            }}

                            hookErrorCallback={this.hookErrorCallback}

                            exampleSelectorProps={{
                                setExample: this.setCodeExample
                            }}

                            code={this.code}
                            onCodeChange={this.onCodeChange}
                            onExec={this.onExec}

                        />
                        <FontPanel />
                    </Column>
                </Columns>
            </div>
        );
    }
    renderDocumentation() {
        throw new Error("Method not implemented.");
    }

}

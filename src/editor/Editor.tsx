import * as React from "react";

import { EditorState } from "./EditorApi";
import { INTRO, CodeExample } from "../examples/Examples";
import { oled128x64 } from "../displays/Displays";
import { Display } from "../displays/DisplayApi";
import { DocumentationPanel } from "../ui-elements/documentation-panel";
import { Column } from "bloomer/lib/grid/Column";
import { Columns } from "bloomer/lib/grid/Columns";
import { DisplayPanel } from "../ui-elements/display-panel";
import { CodePanel } from "../ui-elements/code-panel";
import { ZoomLevel } from "../ui-elements/zoom-selection-menu";

export class Editor extends React.Component<{}, EditorState> {
    renderLoopEditor(): React.ReactNode {
        throw new Error("Method not implemented.");
    }
    renderExampleSelector(): React.ReactNode {
        throw new Error("Method not implemented.");
    }

    constructor(props: {}) {
        super(props);
        this.state = {
            code: INTRO.code,
            display: oled128x64,
            isLooping: false,
            counter: 0,
            displaySelectorIsActive: false,
            loopSelectorIsActive: false,
            exampleSelectorIsActive: false,
            fps: 4,
            zoom: ZoomLevel.TWO
        };
        this.toggleExampleSelector = this.toggleExampleSelector.bind(this);
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

    toggleExampleSelector() {
        this.setState(prev => ({ exampleSelectorIsActive: !prev.exampleSelectorIsActive }));
    }

    setCodeExample(e: CodeExample) {
        this.setState({ code: e.code });
    }

    onCodeChange(updatedCode: string) {
        this.setState({ code: updatedCode });
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

    onEvalError(e?: Error) {
        console.log(e);
        if (e) {
             //this.setState({ errorMessage: e.message });
        }
    }

    getCode() {
        return this.state.code;
    }

    onExec() {
        console.log(this.state.counter + 1);
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
                            exampleSelectorProps={{
                                label: "Code Examples",
                                isActive: this.state.exampleSelectorIsActive,
                                toggle: this.toggleExampleSelector,
                                setExample: this.setCodeExample
                            }}
                            code={this.state.code}
                            onCodeChange={this.onCodeChange}
                            onExec={this.onExec}
                            errorMessage={this.state.errorMessage}
                        />
                    </Column>
                </Columns>
            </div>
        );
    }
    renderDocumentation() {
        throw new Error("Method not implemented.");
    }

}

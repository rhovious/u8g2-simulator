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
            fps: 4
        };
        this.toggleDisplaySelector = this.toggleDisplaySelector.bind(this);
        this.toggleLoopSelector = this.toggleLoopSelector.bind(this);
        this.toggleExampleSelector = this.toggleExampleSelector.bind(this);
        this.loop = this.loop.bind(this);
        this.onExec = this.onExec.bind(this);
        this.getCode = this.getCode.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.setCodeExample = this.setCodeExample.bind(this);
        this.setDisplay = this.setDisplay.bind(this);
    }

    componentDidMount() {
        // this.redraw();
    }

    toggleDisplaySelector() {
        this.setState(prev => ({ displaySelectorIsActive: !prev.displaySelectorIsActive }));
    }

    setDisplay(d: Display) {
        this.toggleDisplaySelector();
        this.setState({ display: d });
    }

    toggleLoopSelector() {
        this.setState(prev => ({ loopSelectorIsActive: !prev.loopSelectorIsActive }));
    }

    setFps(i: number) {
        this.setState({ fps: i });
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
        // if (!this.state.loop) {
        //     setTimeout(this.redraw, 500);
        // }
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
        if (e) {
            this.setState({ errorMessage: e.message });
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

                        />
                        {DocumentationPanel({ title: "Documentation", icon: "fa-file" })}
                    </Column>
                    <Column isSize="3/4">
                        <CodePanel
                            title="Code"
                            icon="fa-code"
                            displaySelectorProps={{
                                label: "Preview",
                                isActive: this.state.displaySelectorIsActive,
                                setDisplay: this.setDisplay,
                                toggle: this.toggleDisplaySelector
                            }}

                            loopSelectorProps={{
                                label: "Loop",
                                isLooping: this.state.isLooping,
                                isActive: this.state.loopSelectorIsActive,
                                toggle: this.toggleLoopSelector,
                                toggleLoop: this.toggleLoop,
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
                            onExec={this.onExec} />
                    </Column>
                </Columns>
            </div>
        );
    }
    renderDocumentation() {
        throw new Error("Method not implemented.");
    }

}

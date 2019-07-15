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

            displaySelectorProps: {
                isActive: false,
                label: "Displays",
                setDisplay: this.setDisplay,
                toggle: this.toggleDisplaySelector
            },
            exampleSelectorProps: {
                isActive: false,
                label: "Code Examples",
                setExample: this.setCodeExample,
                toggle: this.toggleExampleSelector
            },
            loopSelectorProps: {
                isActive: false,
                label: "Loop",
                fps: 4,
                setFps: this.setFps,
                toggle: this.toggleLoopSelector,
                toggleLoop: this.toggleLoop
            }
        };
        this.toggleDisplaySelector = this.toggleDisplaySelector.bind(this);
        this.toggleLoopSelector = this.toggleLoopSelector.bind(this);
        this.toggleExampleSelector = this.toggleExampleSelector.bind(this);
        this.loop = this.loop.bind(this);
        this.onExec = this.onExec.bind(this);
    }

    componentDidMount() {
        // this.redraw();
    }

    toggleDisplaySelector() {
        this.setState(prev => ({ displaySelectorProps: { ...prev.displaySelectorProps, isActive: !prev.displaySelectorProps.isActive } }));
    }

    setDisplay(d: Display) {
        this.toggleDisplaySelector();
        this.setState({ display: d });
    }

    toggleLoopSelector() {
        this.setState(prev => ({ loopSelectorProps: { ...prev.loopSelectorProps, isActive: !prev.loopSelectorProps.isActive } }));
    }

    setFps(i: number) {
        this.setState({ loopSelectorProps: { ...this.state.loopSelectorProps, fps: i } });
    }

    toggleLoop() {
        if (!this.state.isLooping) {
            setTimeout(this.loop, 250);
        }
        this.setState(prev => ({ isLooping: !prev.isLooping }));
    }

    toggleExampleSelector() {
        this.setState(prev => ({ exampleSelectorProps: { ...prev.exampleSelectorProps, isActive: !prev.exampleSelectorProps.isActive } }));
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
            setTimeout(this.loop, 1000 / this.state.loopSelectorProps.fps);
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
        this.setState(prev => ({ counter: prev.counter + 1 }));
    }

    render() {
        return (
            <div className="main">
                <Columns isCentered>
                    <Column isSize="3/4">
                        <DisplayPanel
                            title="Preview"
                            icon="fa-tv"
                            getCode={this.getCode}
                            display={this.state.display}
                            loopCounter={0}
                            onEvalError={this.onEvalError}

                        />
                        <CodePanel
                            title="Code"
                            icon="fa-code"
                            displaySelectorProps={this.state.displaySelectorProps}
                            loopSelectorProps={this.state.loopSelectorProps}
                            exampleSelectorProps={this.state.exampleSelectorProps}
                            code={this.state.code}
                            onCodeChange={this.onCodeChange}
                            onExec={this.onExec} />
                    </Column>
                    <Column isSize="1/4">
                        {DocumentationPanel({ title: "Documentation", icon: "fa-file" })}
                    </Column>
                </Columns>
            </div>
        );
    }
    renderDocumentation() {
        throw new Error("Method not implemented.");
    }

}

import * as React from "react";
import MonacoEditor from "react-monaco-editor";
import { Icon } from "bloomer/lib/elements/Icon";
import { Panel } from "bloomer/lib/components/Panel/Panel";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { PanelHeading } from "bloomer/lib/components/Panel/PanelHeading";
import { PanelProps } from "./panel";
import { LoopSelectorProps, LoopSelector } from "./loop-selector";
import { ExampleSelectorProps, ExampleSelector } from "./example-selector";
import { NavbarItem } from "bloomer/lib/components/Navbar/NavbarItem";
import { Navbar } from "bloomer/lib/components/Navbar/Navbar";
import { NavbarMenu } from "bloomer/lib/components/Navbar/NavbarMenu";
import { NavbarStart } from "bloomer/lib/components/Navbar/NavbarStart";
import { NavbarEnd } from "bloomer/lib/components/Navbar/NavbarEnd";

export interface CodePanelProps extends PanelProps {
    loopSelectorProps: LoopSelectorProps;
    exampleSelectorProps: ExampleSelectorProps;
    code: string;
    onCodeChange(code: string): void;
    onExec(): void;
    isLooping: boolean;
}

export interface CodePanelState {
    codeEditor?: monaco.editor.ICodeEditor;
}

export class CodePanel extends React.Component<CodePanelProps, CodePanelState> {

    constructor(props: CodePanelProps) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Panel>
                <PanelHeading>
                    <Icon className={"fa " + this.props.icon} style={{ marginRight: "8px" }} />{this.props.title}
                </PanelHeading>
                <Navbar style={{ border: "solid 1px rgb(219,219,219)", borderTop: "0px", margin: "0" }}>
                    <NavbarMenu>
                        <NavbarItem onClick={() => this.props.onExec()}>
                            <Icon className="fa fa-cogs" />&nbsp;Eval()
                        </NavbarItem>
                        <NavbarItem onClick={() => this.props.onExec()}>
                            <Icon className={"fa " + (this.props.isLooping ? "fa-stop" : "fa-play")} />&nbsp;LoopEval()
                        </NavbarItem>
                        <NavbarStart>
                            {LoopSelector(this.props.loopSelectorProps)}
                            {ExampleSelector(this.props.exampleSelectorProps)}
                        </NavbarStart>
                        <NavbarEnd>
                            <NavbarItem href="https://github.com/AlgusDark/bloomer">
                                <Icon className="fa fa-github" />
                            </NavbarItem>
                        </NavbarEnd>
                    </NavbarMenu>
                </Navbar>
                <PanelBlock>
                    {/* <Label></Label> */}
                    <MonacoEditor
                        width="100%"
                        height="800"
                        language="cpp"
                        theme="vs-light"
                        value={this.props.code}
                        options={{
                            selectOnLineNumbers: true
                        }}
                        onChange={this.props.onCodeChange}
                        editorDidMount={(editor: monaco.editor.ICodeEditor) => {
                            editor.focus();
                            this.setState({ codeEditor: editor });
                        }}
                    />
                </PanelBlock>
                {/* <Button onClick={this.redraw}>Run</Button> */}
            </Panel>
        );
    }
}

import * as React from "react";
import MonacoEditor from "react-monaco-editor";
import { Icon } from "bloomer/lib/elements/Icon";
import { Panel } from "bloomer/lib/components/Panel/Panel";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { PanelHeading } from "bloomer/lib/components/Panel/PanelHeading";
import { PanelProps } from "./panel";
import { LoopSelectorProps, LoopSelector } from "./loop-selector";
import { ExampleSelectorProps, ExampleSelector } from "./example-selection-menu";
import { NavbarItem } from "bloomer/lib/components/Navbar/NavbarItem";
import { Navbar } from "bloomer/lib/components/Navbar/Navbar";
import { NavbarMenu } from "bloomer/lib/components/Navbar/NavbarMenu";
import { NavbarStart } from "bloomer/lib/components/Navbar/NavbarStart";
import { NavbarEnd } from "bloomer/lib/components/Navbar/NavbarEnd";
import { Notification } from "bloomer/lib/elements/Notification";
import { Container } from "bloomer/lib/layout/Container";

// this bit is ugly...
export type ErrorCallback = (msg?: string) => void;

export interface CodePanelProps extends PanelProps {
    loopSelectorProps: LoopSelectorProps;
    exampleSelectorProps: ExampleSelectorProps;
    code: string;
    onCodeChange(code: string): void;
    onExec(): void;
    isLooping: boolean;
    toggleLoop(): void;
    hookErrorCallback(ecb: ErrorCallback): void;
}

export interface CodePanelState {
    codeEditor?: monaco.editor.ICodeEditor;
    errorMessage?: string;
}

export class CodePanel extends React.Component<CodePanelProps, CodePanelState> {

    constructor(props: CodePanelProps) {
        super(props);
        this.props.hookErrorCallback((msg?: string) => this.setState({ errorMessage: msg }));
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
                        <NavbarItem onClick={this.props.onExec}>
                            <Icon className="fa fa-cogs" />&nbsp;Eval
                        </NavbarItem>
                        <NavbarItem onClick={this.props.toggleLoop}>
                            <Icon className={"fa " + (this.props.isLooping ? "fa-stop" : "fa-play")} />&nbsp;LoopEval
                        </NavbarItem>
                        <NavbarStart>
                            {LoopSelector(this.props.loopSelectorProps)}
                            {ExampleSelector(this.props.exampleSelectorProps)}
                        </NavbarStart>
                        <NavbarEnd>
                            <NavbarItem href="https://p3dt.net">
                                <Icon className="fa fa-home" />
                            </NavbarItem>
                            <NavbarItem href="https://instagram.com/pauls_3d_things">
                                <Icon className="fa fa-instagram" />
                            </NavbarItem>
                            <NavbarItem href="https://github.com/pauls-3d-things/u8g2-simulator">
                                <Icon className="fa fa-github" />
                            </NavbarItem>
                        </NavbarEnd>
                    </NavbarMenu>
                </Navbar>
                <PanelBlock>
                    {/* <Label></Label> */}
                    <MonacoEditor
                        width="100%"
                        height="500"
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
                <PanelBlock>
                    <Container className="padLeft">
                        {
                            this.state.errorMessage ?
                                <Notification>
                                    {this.state.errorMessage}
                                </Notification>
                                : ""
                        }
                    </Container>
                </PanelBlock>
            </Panel>
        );
    }
}

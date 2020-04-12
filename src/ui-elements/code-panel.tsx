import * as React from "react";
import MonacoEditor from "react-monaco-editor";
import { Icon, Panel, Navbar, Notification, Container } from "react-bulma-components";
import { PanelProps } from "./panel";
import { LoopSelectorProps, LoopSelector } from "./loop-selector";
import { ExampleSelectorProps, ExampleSelector } from "./example-selection-menu";

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
                <Panel.Header>
                    <Icon className={"fa " + this.props.icon} style={{ marginRight: "8px" }} />{this.props.title}
                </Panel.Header>
                <Navbar style={{ border: "solid 1px rgb(219,219,219)", borderTop: "0px", margin: "0" }}>
                    <Navbar.Menu className="navbar-start">
                        <Navbar.Item onClick={this.props.onExec}>
                            <Icon className="fa fa-cogs" />&nbsp;Eval
                        </Navbar.Item>
                        <Navbar.Item onClick={this.props.toggleLoop}>
                            <Icon className={"fa " + (this.props.isLooping ? "fa-stop" : "fa-play")} />&nbsp;LoopEval
                        </Navbar.Item>
                        <Navbar.Menu>
                            {LoopSelector(this.props.loopSelectorProps)}
                            {ExampleSelector(this.props.exampleSelectorProps)}
                        </Navbar.Menu>
                    </Navbar.Menu>
                    <Navbar.Menu className="navbar-end">
                        <Navbar.Item onClick={() => window.open("https://p3dt.net", "_blank")} >
                            <Icon className="fa fa-home" />
                        </Navbar.Item>
                        <Navbar.Item onClick={() => window.open("https://instagram.com/pauls_3d_things", "_blank")} >
                            <Icon className="fa fa-instagram" />
                        </Navbar.Item>
                        <Navbar.Item onClick={() => window.open("https://github.com/pauls-3d-things/u8g2-simulator", "_blank")} >
                            <Icon className="fa fa-github" />
                        </Navbar.Item>
                    </Navbar.Menu>
                </Navbar>
                <Panel.Block>
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
                </Panel.Block>
                <Panel.Block>
                    <Container className="padLeft">
                        {
                            this.state.errorMessage ?
                                <Notification>
                                    {this.state.errorMessage}
                                </Notification>
                                : ""
                        }
                    </Container>
                </Panel.Block>
            </Panel>
        );
    }
}

import * as React from "react";
import MonacoEditor from "react-monaco-editor";

import { Button } from "bloomer/lib/elements/Button";
import { Icon } from "bloomer/lib/elements/Icon";
import { Panel } from "bloomer/lib/components/Panel/Panel";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { PanelHeading } from "bloomer/lib/components/Panel/PanelHeading";
import { PanelProps } from "./panel";
import { LoopSelectorProps, LoopSelector } from "./loop-selector";
import { ExampleSelectorProps, ExampleSelector } from "./example-selector";

export interface CodePanelProps extends PanelProps {
    loopSelectorProps: LoopSelectorProps;
    exampleSelectorProps: ExampleSelectorProps;
    code: string;
    onCodeChange(code: string): void;
    onExec(): void;
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
                <PanelBlock>
                    <Button onClick={() => this.props.onExec()}><Icon className="fa fa-cogs" />&nbsp;Run Once</Button>
                    {LoopSelector(this.props.loopSelectorProps)}
                    {ExampleSelector(this.props.exampleSelectorProps)}
                </PanelBlock>
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

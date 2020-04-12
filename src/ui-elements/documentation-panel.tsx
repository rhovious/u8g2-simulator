import * as React from "react";
import { Icon, Panel } from "react-bulma-components";
import { PanelProps } from "./panel";
import { U8G2 } from "../util/U8G2";

export interface DocumentationPanelProps extends PanelProps {

}

export const DocumentationPanel = (props: DocumentationPanelProps) => {
    return (
        <Panel>
            <Panel.Header><Icon className={"fa " + props.icon} />{props.title}</Panel.Header>
            <Panel.Block>The following functions are supported:</Panel.Block>
            <Panel.Block>
                <br />
                <ul>
                    {
                        Object.getOwnPropertyNames(U8G2.prototype).sort().filter(p => p !== "constructor" && !p.startsWith("_")).map(p => {
                            return <li key={p}><a href={"https://github.com/olikraus/u8g2/wiki/u8g2reference#" + p} target="_blank">{p}</a></li>;
                        })
                    }
                </ul>
            </Panel.Block>
        </Panel>
    );
};

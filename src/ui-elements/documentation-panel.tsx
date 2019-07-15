import React = require("react");
import { Icon } from "bloomer/lib/elements/Icon";
import { Panel } from "bloomer/lib/components/Panel/Panel";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { PanelHeading } from "bloomer/lib/components/Panel/PanelHeading";
import { PanelProps } from "./panel";
import { U8G2 } from "../util/U8G2";

export interface DocumentationPanelProps extends PanelProps {

}

export const DocumentationPanel = (props: DocumentationPanelProps) => {
    return (
        <Panel>
            <PanelHeading><Icon className={"fa " + props.icon} />{props.title}</PanelHeading>
            <PanelBlock>The following functions are supported:</PanelBlock>
            <PanelBlock>
                <br />
                <ul>
                    {
                        Object.getOwnPropertyNames(U8G2.prototype).sort().filter(p => p !== "constructor" && !p.startsWith("_")).map(p => {
                            return <li key={p}><a href={"https://github.com/olikraus/u8g2/wiki/u8g2reference#" + p} target="_blank">{p}</a></li>;
                        })
                    }
                </ul>
            </PanelBlock>
        </Panel>
    );
};

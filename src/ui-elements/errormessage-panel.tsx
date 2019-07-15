import React = require("react");
import { Container } from "bloomer/lib/layout/Container";
import { Notification } from "bloomer/lib/elements/Notification";
import { Panel } from "bloomer/lib/components/Panel/Panel";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { PanelHeading } from "bloomer/lib/components/Panel/PanelHeading";
import { PanelProps } from "./panel";

export interface ErrorMessagePanelProps extends PanelProps {
    errorMessage: string;
}

export const ErrorMessagePanel = (props: ErrorMessagePanelProps) => {
    return (
        <Panel>
            <PanelHeading>{props.title}</PanelHeading>
            <PanelBlock>
                <Container className="padLeft">
                    {
                        props.errorMessage ?
                            <Notification>
                                {props.errorMessage}
                            </Notification>
                            : ""}
                </Container>
            </PanelBlock>
        </Panel>

    );
};

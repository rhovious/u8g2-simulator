import * as React from "react";

import { Panel } from "bloomer/lib/components/Panel/Panel";
import { PanelHeading } from "bloomer/lib/components/Panel/PanelHeading";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { TextArea } from "bloomer/lib/elements/Form/TextArea";
import { fonts as AllFonts } from "../bdf/fonts";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Icon } from "bloomer/lib/elements/Icon";
import { Box } from "bloomer/lib/elements/Box";

export interface FontPanelState {
    fonts: string[];
    displayedFonts: string[];
    searchString: string;
}
export class FontPanel extends React.Component<{}, FontPanelState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fonts: AllFonts,
            displayedFonts: AllFonts.map(f => "u8g2_font_" + f),
            searchString: ""
        };
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const searchString = event.target.value;
        const displayedFonts = this.state.fonts.filter(fname => fname.indexOf(searchString) >= 0).map(f => "u8g2_font_" + f);
        console.log(searchString, displayedFonts);
        this.setState({ searchString, displayedFonts });
    }
    render() {

        return (
            <Panel>
                <PanelHeading ><Icon className="fa fa-search" />Fonts</PanelHeading>
                <PanelBlock>
                    <div>
                        Please note, that I do not have the time to do a manual mapping of font file names and U8G2 font constants used in the code. Please exchange them manually later.
                    If you have a mapping for this, please join this project on the github page.<br /><br />
                        See the link on the right for all fonts and copyrights.<br />
                    </div>
                    <Box><a href="https://github.com/olikraus/u8g2/wiki/fntlistall" target="_blank">https://github.com/olikraus/u8g2/wiki/fntlistall</a></Box>
                </PanelBlock>
                <PanelBlock>
                    <TextArea readOnly={true} value={this.state.displayedFonts.join("\n")}>

                    </TextArea>
                </PanelBlock>
                <PanelBlock>
                    Search:&nbsp;<Input value={this.state.searchString} onChange={this.onSearchChange} />
                </PanelBlock>
            </Panel>
        );
    }
}

import * as React from "react";

import { fonts as AllFonts } from "../bdf/fonts";
import { Panel, Icon, Box, Form } from "react-bulma-components";

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
        this.setState({ searchString, displayedFonts });
    }
    render() {

        return (
            <Panel>
                <Panel.Header><Icon className="fa fa-search" />Fonts</Panel.Header>
                <Panel.Block>
                    <div>
                        Please note, that I do not have the time to do a manual mapping of font file names and U8G2 font constants used in the code. Please exchange them manually later.
                    If you have a mapping for this, please join this project on the github page.<br /><br />
                        See the link on the right for all fonts and copyrights.<br />
                    </div>
                    <Box><a href="https://github.com/olikraus/u8g2/wiki/fntlistall" target="_blank">https://github.com/olikraus/u8g2/wiki/fntlistall</a></Box>
                </Panel.Block>
                <Panel.Block>
                    <Form.Textarea readOnly={true} value={this.state.displayedFonts.join("\n")}>
                    </Form.Textarea>
                </Panel.Block>
                <Panel.Block>
                    Search:&nbsp;<Form.Input value={this.state.searchString} onChange={this.onSearchChange} />
                </Panel.Block>
            </Panel>
        );
    }
}


export const U8G2_FONT_DATA_STRUCT_SIZE = 23;

export interface FontInfo {
    glyph_cnt: number;
    bbx_mode: number;
    bits_per_0: number;
    bits_per_1: number;
    bits_per_char_width: number;
    bits_per_char_height: number;
    bits_per_char_x: number;
    bits_per_char_y: number;
    bits_per_delta_x: number;
    max_char_width: number;
    max_char_height: number;
    x_offset: number;
    y_offset: number;
    ascent_A: number;
    descent_g: number;
    ascent_para: number;
    descent_para: number;
    start_pos_upper_A: number;
    start_pos_lower_a: number;
    start_pos_unicode?: number;

    font_size: number;
}

export interface FontGlyph {
    //     Glyph (variable length)
    // Offset 	Size 	Content
    // 0. 	1/2 Byte(s) 	Unicode of character/glyph
    // 1. (+1) 	1 Byte 	jump offset to next glyph
    // 	bitcntW 	glyph bitmap width (variable width)
    // 	bitcntH 	glyph bitmap height (variable width)
    // 	bitcntX 	glyph bitmap x offset (variable width)
    // 	bitcntY 	glyph bitmap y offset (variable width)
    // 	bitcntD 	character pitch (variable width)
    // 	n Bytes 	Bitmap (horizontal, RLE)
    glyph: number;
    char: string;
    nextGlyphOffset: number;

}

export const getFontInfo = (buf: number[]) => {

    const fontInfo: FontInfo = {
        glyph_cnt: buf[0],
        bbx_mode: buf[1],
        bits_per_0: buf[2],
        bits_per_1: buf[3],

        /* offset 4 */
        bits_per_char_width: buf[4],
        bits_per_char_height: buf[5],
        bits_per_char_x: buf[6],
        bits_per_char_y: buf[7],
        bits_per_delta_x: buf[8],

        /* offset 9 */
        max_char_width: buf[9],
        max_char_height: buf[10],
        x_offset: buf[11],
        y_offset: buf[12],

        /* offset 13 */
        ascent_A: buf[13],
        descent_g: buf[14],
        ascent_para: buf[15],
        descent_para: buf[16],

        /* offset 17 */
        start_pos_upper_A: buf[17] << 8 + buf[18],
        start_pos_lower_a: buf[19] << 8 + buf[20],

        /* offset 21 */
        start_pos_unicode: buf[21] << 8 + buf[22],

        font_size: buf.length * 8
    };

    return fontInfo;
};

export const getGlyphs = (buf: number[]): FontGlyph[] => {
    let offset: number = 23;

    const getNextGlyph = (n: number, unicode: boolean = false): FontGlyph => {
        const glyph = unicode ? buf[n] << 8 + buf[n + 1] : buf[n];
        return {
            glyph,
            nextGlyphOffset: buf[n + (unicode ? 2 : 1)],
            char: String.fromCharCode(glyph)
        };
    };

    const glyphs = [];

    let glyph = getNextGlyph(offset);

    do {
        glyphs.push(glyph);
        offset += glyph.nextGlyphOffset;
        glyph = getNextGlyph(offset);
    } while (glyph.nextGlyphOffset < buf.length && glyph.nextGlyphOffset > 0);

    return glyphs;
};

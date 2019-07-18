
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
    charWidth: number; // unsigned
    charHeight: number; // unsigned
    xOffset: number; // signed
    yOffset: number; // signed
    characterPitch: number; // signed
    dataBitStart: number;
    dataBinary: string;
    dataBinaryList: string[];

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

const toBinary = (n: number) => {
    let str = n.toString(2);
    // hit: I was tired and uncreative here ...
    switch (str.length) {
        case 8:
            return str;
        case 7:
            return "0" + str;
        case 6:
            return "00" + str;
        case 5:
            return "000" + str;
        case 4:
            return "0000" + str;
        case 3:
            return "00000" + str;
        case 2:
            return "000000" + str;
        case 1:
            return "0000000" + str;
        default:
            return "00000000";
    }
};

export const getGlyphs = (buf: number[], fontInfo: FontInfo): FontGlyph[] => {
    let offset: number = 23;

    const getNextGlyph = (n: number, unicode: boolean = false): FontGlyph => {
        const glyph = unicode ? buf[n] << 8 + buf[n + 1] : buf[n];
        const nextGlyphOffset = buf[n + (unicode ? 2 : 1)];
        const metaBitStart = 8 * (unicode ? 3 : 2);
        const dataBinaryList = buf.slice(n, n + nextGlyphOffset).map(toBinary);
        const dataBinary = dataBinaryList.join("");

        let next = metaBitStart;
        const charWidth = parseInt(dataBinary.slice(next, next + fontInfo.bits_per_char_width), 2);
        next += fontInfo.bits_per_char_width;

        const charHeight = parseInt(dataBinary.slice(next, next + fontInfo.bits_per_char_height), 2);
        next += fontInfo.bits_per_char_height;

        const xOffset = parseInt(dataBinary.slice(next, next + fontInfo.bits_per_char_x), 2) - (1 << (fontInfo.bits_per_char_x - 1));
        next += fontInfo.bits_per_char_x;

        const yOffset = parseInt(dataBinary.slice(next + 1, next + fontInfo.bits_per_char_y), 2) - (1 << (fontInfo.bits_per_char_y - 1));
        next += fontInfo.bits_per_char_y;

        const characterPitch = parseInt(dataBinary.slice(next, next + fontInfo.bits_per_delta_x), 2) - (1 << (fontInfo.bits_per_delta_x - 1));
        next += fontInfo.bits_per_delta_x;

        const dataBitStart = next;

        return {
            glyph,
            char: String.fromCharCode(glyph),
            nextGlyphOffset,
            charWidth,
            charHeight,
            xOffset,
            yOffset,
            characterPitch,
            dataBitStart,
            dataBinary,
            dataBinaryList
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

export const getGlyphBitmap = (glyph: FontGlyph, fontInfo: FontInfo) => {

    // bitcntW 	glyph bitmap width (variable width)
    // bitcntH 	glyph bitmap height (variable width)
    // bitcntX 	glyph bitmap x offset (variable width)
    // bitcntY 	glyph bitmap y offset (variable width)
    // bitcntD 	character pitch (variable width)

    // sequence:
    const bits_per_0 = fontInfo.bits_per_0; // m0 Bits (see font header) denoting the number of zeros
    const bits_per_1 = fontInfo.bits_per_1; // m1 Bits (see font header) denoting the number of ones
    // n Bits == 1 (to be counted) denoting the number of repetitions of the sequence and
    // 1 Bit == 0 as stop marker for each sequence.

    // 16 01000001 00010101
    // 20 1010 -> 10
    // 24 1010 -> 10
    // 28 0000 -> 0
    // 33 10001 -> ??
    // 38 01101 -> 13
    // 0111 101000000100000011100110000000000111001000101010001010100001000010001010100001010011010010100000010010010010100100100000000100',
    // 0111101000000100000011100110000000000111001000101010001010100001000010001010100001010011010010100000010010010010100100100000000100',

    // '010000010001010110101010000010001011010111101000000100000011100110000000000111001000101010001010100001000010001010100001010011010010100000010010010010100100100000000100',
};

import { getFontInfo, getGlyphs } from "./U8G2Font";
import { u8g2_font_courB12_tf } from "../fonts/u8g2_font_courB12_tf";

const fontInfo = getFontInfo(u8g2_font_courB12_tf);
console.log(fontInfo);

const glyphs = getGlyphs(u8g2_font_courB12_tf, fontInfo);

const glyphA = glyphs.filter(g => g.char === "A")[0];

console.log(glyphA);

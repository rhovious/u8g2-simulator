#!/bin/bash



for font in $(cat u8g2_fonts.c | grep u8g2_font_ | tr "[" "\n" | tr " " "\n" | grep u8g2_font_)
do
    echo $font
    OUTFILE=.gen/$font.c
    #cat u8g2_fonts.c.orig > $OUTFILE
    echo "#include \"../u8g2_fonts.c\"" > $OUTFILE
    echo "int main( int argc, const char* argv[] ) {" >> $OUTFILE
    echo "  printf( \"/* tslint:disable */\\n\\n export const $font = [\" );" >> $OUTFILE
    echo "  for (unsigned int x = 0; x < sizeof($font)/sizeof(*$font); x++) {" >> $OUTFILE
    echo "    printf(\"%d,\", $font[x]);" >> $OUTFILE
    echo "  }" >> $OUTFILE
    echo "  printf(\"]\");" >> $OUTFILE
    echo "}" >> $OUTFILE

    gcc -o .gen/$font $OUTFILE
    ./.gen/$font > ./.gen/$font.ts

done





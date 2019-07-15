export const scaleUp = (ctx: CanvasRenderingContext2D, scaledCtx: CanvasRenderingContext2D, w: number, h: number) => {
    let origImage = ctx.getImageData(0, 0, w, h);
    let scaledImage = scaledCtx.getImageData(0, 0, w * 2, h * 2);
    for (let y = 0; y < origImage.height; y++) {
        for (let x = 0; x < origImage.width; x++) {
            // get pixeldata (r,g,b,a)
            let origOffset = (x: number, y: number) => {
                return (x + y * origImage.width) * 4;
            };

            let r = origImage.data[origOffset(x, y) + 0];
            let g = origImage.data[origOffset(x, y) + 1];
            let b = origImage.data[origOffset(x, y) + 2];
            let a = origImage.data[origOffset(x, y) + 3];

            // manual 2x linear scale
            scaledImage.data[(x * 2 + y * 2 * scaledImage.width) * 4 + 0] = r;
            scaledImage.data[(x * 2 + y * 2 * scaledImage.width) * 4 + 1] = g;
            scaledImage.data[(x * 2 + y * 2 * scaledImage.width) * 4 + 2] = b;
            scaledImage.data[(x * 2 + y * 2 * scaledImage.width) * 4 + 3] = a;

            scaledImage.data[((x * 2) + 1 + y * 2 * scaledImage.width) * 4 + 0] = r;
            scaledImage.data[((x * 2) + 1 + y * 2 * scaledImage.width) * 4 + 1] = g;
            scaledImage.data[((x * 2) + 1 + y * 2 * scaledImage.width) * 4 + 2] = b;
            scaledImage.data[((x * 2) + 1 + y * 2 * scaledImage.width) * 4 + 3] = a;

            scaledImage.data[(x * 2 + (y * 2 + 1) * scaledImage.width) * 4 + 0] = r;
            scaledImage.data[(x * 2 + (y * 2 + 1) * scaledImage.width) * 4 + 1] = g;
            scaledImage.data[(x * 2 + (y * 2 + 1) * scaledImage.width) * 4 + 2] = b;
            scaledImage.data[(x * 2 + (y * 2 + 1) * scaledImage.width) * 4 + 3] = a;

            scaledImage.data[((x * 2) + 1 + (y * 2 + 1) * scaledImage.width) * 4 + 0] = r;
            scaledImage.data[((x * 2) + 1 + (y * 2 + 1) * scaledImage.width) * 4 + 1] = g;
            scaledImage.data[((x * 2) + 1 + (y * 2 + 1) * scaledImage.width) * 4 + 2] = b;
            scaledImage.data[((x * 2) + 1 + (y * 2 + 1) * scaledImage.width) * 4 + 3] = a;
        }
    }
    scaledCtx.putImageData(scaledImage, 0, 0);
};

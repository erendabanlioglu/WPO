var Fontmin = require("fontmin");

var latin = range(0x0000, 0x00FF).concat(range(0x2000, 0x206F)).concat(fromUnicode(
    0x0131,
    0x0152,
    0x0153,
    0x02C6,
    0x02DA,
    0x02DC,
    0x2074,
    0x20AC,
    0x2212,
    0x2215
)).join("");

var latinExt = [
    range(0x0100, 0x024F),
    range(0x1E00, 0x1EFF),
    range(0x20A0, 0x20AB),
    range(0x20AD, 0x20CF),
    range(0x2C60, 0x2C7F),
    range(0xA720, 0xA7FF)
].reduce(function(acc, curr) {
    return acc.concat(curr);
}).join("");

function range(from, to) {
    var array = new Array();
    for (let code = from; code <= to; code++) {
        array.push(code);
    }
    return fromUnicode(...array);
}

function fromUnicode(...codePoints) {
    return codePoints.map(codePoint => String.fromCodePoint(codePoint));
}

function fontCreated(err, files) {
    if (err)
        throw err;
    console.log("Font subset created");
}

var latinFontimin = new Fontmin().src("fonts/*.ttf").dest("fonts/latin").use(Fontmin.glyph({text: latin, hinting: false}));
latinFontimin.run(fontCreated);

var latinExtFontimin = new Fontmin().src("fonts/*.ttf").dest("fonts/latin-ext").use(Fontmin.glyph({text: latinExt, hinting: false}));
latinExtFontimin.run(fontCreated);
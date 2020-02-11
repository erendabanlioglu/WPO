var imagemin = require("imagemin");
var webp = require("imagemin-webp");

imagemin(["images/*.{jpg,jpeg}"], {
    destination: "images",
    plugins: [webp({quality: 40})]
});
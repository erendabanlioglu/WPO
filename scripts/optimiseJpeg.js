var imagemin = require("imagemin");
var mozjpeg = require("imagemin-mozjpeg");

imagemin(["images/original/*.{jpg,jpeg}"], {
    destination: "images",
    plugins: [mozjpeg({quality: 70, progressive: true})]
});
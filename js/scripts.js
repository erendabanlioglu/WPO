var lazyLoadImages = require("./lazyLoadImages");
require("instant.page");

(function init() {
    document.querySelector(".header__nav-icon").addEventListener("click", function toggleNavigation(e) {
        document.querySelector(".header__nav-items").classList.toggle("header__nav-items--show");
    });

    parallax();
    lazyLoadImages();

    window.addEventListener('scroll', parallax);
    window.addEventListener('resize', parallax);

    document.querySelector(".footer").addEventListener("click", function() {
        ajax({
            url: "https://api.chucknorris.io/jokes/random",
            success: function(result) {
                document.querySelector(".footer__text").textContent = result.value;
            },
            async: false
        });
    });
})();

function ajax(config) {
    var request = new XMLHttpRequest();
    request.open('GET', config.url, config.async);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            config.success(JSON.parse(request.responseText));
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}

function parallax() {
    if(document.querySelectorAll(".services").length === 0) return;
    var scroll = window.scrollY + window.innerHeight;
    var servicesOffset = document.querySelector(".services").getBoundingClientRect().top + document.body.scrollTop;

    if (scroll >= servicesOffset) {
        [].slice.call(document.querySelectorAll(".services__overlay")).forEach(function (element) {
            var currentPosition = window.scrollY + window.innerHeight / 2;
            var bodyHeight = document.querySelector("body").offsetHeight;
            var serviceHeight = document.querySelector(".services__service").offsetHeight;

            element.style.top = serviceHeight * currentPosition / bodyHeight + "px";

        });
    }
}

function loadFonts() {
    if(document.fonts) {
        document.fonts.load("1em Raleway");

        document.fonts.ready.then(function(fontFaceSet) {
            document.documentElement.className += " fonts-loaded";

        });
    }
}

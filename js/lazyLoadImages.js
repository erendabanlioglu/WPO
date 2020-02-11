module.exports = function lazyLoadImages() {
    var targets = document.querySelectorAll("img[data-src],source[data-srcset]");
    console.log(targets.length);
    createObserver(targets);
};

function createObserver(targets) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function(entry) {
            if(entry.intersectionRatio > 0) {
                load(entry.target);
            }
        });
    }, {
        rootMargin: '20%'
    });
    targets.forEach(function (el) {
        observer.observe(el);
    });
}

function load(el) {
    if(el.getAttribute('data-src')) {
        el.src = el.getAttribute('data-src');
        el.removeAttribute('data-src');
    } else if(el.getAttribute('data-srcset')) {
        el.srcset = el.getAttribute('data-srcset');
        el.removeAttribute('data-srcset');
    }
}
/*
 * vanilla-lazy-load - v1.0.2
 * @danielrohers
*/
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.LazyLoad = factory(root);
  }
})(this, function () {

  'use strict';

  var images = [].slice.call(document.querySelectorAll('img[data-src]'));
  var options = { passive: true };
  var intervalImageFallback = 100;

  function removeImage(index) {
    images.splice(index, 1);
  }

  function loadImage(image, index) {
    removeImage(index);

    delete image.dataset.lazy;
    image.setAttribute('src', image.getAttribute('data-src'));

    image.onload = function() {
      image.removeAttribute('data-src');
    };
  }

  function isVisible(image) {
    return !!(image.offsetWidth || image.offsetHeight || image.getClientRects().length);
  }

  function isElementInViewport(image) {
    if (image.src) return false;

    var rect = image.getBoundingClientRect();
    var inViewport = (rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth));

    return isVisible(image) && inViewport;
  }

  function processImageFallback(image, index) {
    var interval = setInterval(function() {
      if (isElementInViewport(image)) {
        clearInterval(interval);
        loadImage(image, index);
      }
    }, intervalImageFallback);
  }

  function processImage(image, index) {
    image.dataset.lazy = index;

    var observer = new IntersectionObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        var image = mutation.target;
        if (isElementInViewport(image)) {
          loadImage(image, parseInt(image.dataset.lazy));
          observer.unobserve(image);
        }
      });
    });

    observer.observe(image, {
      root: null,
      rootMargin: '0px',
      threshold: [0]
    });
  }

  function processScroll() {
    for (var i = 0, l = images.length; i < l; i += 1) {
      var image = images[i];
      window.IntersectionObserver ? processImage(image, i) : processImageFallback(image, i);
    };
  };

  processScroll();
  window.addEventListener('scroll', processScroll, options);
  window.addEventListener('touchmove', processScroll, options);
});

# Canonical Url Detector

- English
- [日本語](https://github.com/irok/CanonicalUrlDetector/blob/master/README.ja.md)

This is a browser extension for Chrome and Firefox.

The extension icon becomes active when the page has Canonical URL, and click it to change URL in the address bar to Canonical URL without reloading the page. Click again to return to the original url.
It works in the same way when the url contains extra parameters.
Please use it, for example, when you share a page.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/disabled-icon.png" width="16"/> There is no Canonical URL.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png" width="16"/> Not Canonical URL. Clicking it changes to Canonical URL.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png" width="16"/> Canonical URL. Click to return to the original URL.

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png" width="16"/> Not Canonical URL. Clicking it opens Canonical URL in new tab.

## about Canonical URL

1. Value of the href attribute of the `link[rel="canonical"]` element.
2. The URL from which extra parameters have been removed.
    * See [`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js) for details.

## install
* Chrome
    * [Canonical Url Detector - Chrome Web Store](https://chrome.google.com/webstore/detail/canonical-url-detector/dcbmeicnoejpldipejlefojiiebhogij)
* Firefox
    * [Canonical Url Detector – Get this Extension for 🦊 Firefox (en-US)](https://addons.mozilla.org/en-US/firefox/addon/canonical-url-detector/)

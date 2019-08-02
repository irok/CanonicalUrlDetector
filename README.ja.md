# Canonical Url Detector

- [English](https://github.com/irok/CanonicalUrlDetector/blob/master/README.md)
- 日本語

Chrome及びFirefox向けのブラウザ拡張です。

ページにCanonical URLがあるとアイコンが反応し、クリックするとアドレスバーのURLが変わります。その際、ページはリロードされません。もう一度クリックすると元のURLに戻ります。
URLに余計なパラメータが入っているときも同じように動きます。
ページをシェアするときなどにご利用ください。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/disabled-icon.png" width="16"/> ページにCanonical URLがありません。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png" width="16"/> Canonical URLではありません。クリックすると正規のURLに変わります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png" width="16"/> Canonical URLです。クリックすると元のURLに戻ります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png" width="16"/> Canonical URLではありません。クリックすると新しいタブでCanonical URLを開きます。

## 何をCanonical URLとしているか

1. `link[rel=canonical]`要素のhref属性値
2. 不要なパラメータを除去したURL
    * 詳しくは[`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js)を見てください。

## インストール
* Chrome
    * [Canonical Url Detector - Chrome ウェブストア](https://chrome.google.com/webstore/detail/canonical-url-detector/dcbmeicnoejpldipejlefojiiebhogij)
* Firefox
    * [Canonical Url Detector – 🦊 Firefox (ja) 向け拡張機能を入手](https://addons.mozilla.org/ja/firefox/addon/canonical-url-detector/)

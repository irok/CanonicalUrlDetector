# Canonical Url Detector

正規のURLを検出し、ワンクリックでアドレスバーのURLを切り替えられるChrome拡張です。

## なんで作ったか

見ているページをシェアする際にパラメータがぐちゃぐちゃついてるのが嫌だったから。

## どう動くか

ページに正規URLの設定（`link[rel=canonical]`）があるか、不要なパラメータがついている場合はアイコンが反応し、クリックするとURLが変わります。
（どのパラメータを不要と判断しているかは[`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js)を見てください。）

アイコンは現在の状態によって変わります。

![disabled-icon.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/disabled-icon.png) 正規URLの設定も不要と判断できるパラメータもありません。

![icon-origin.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png) 現在のURLは正規のURLではありません。クリックすると正規のURLに変わります。

![icon-canonical.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png) 現在のURLは正規URLです。クリックすると元のURLに戻ります。

![icon-otherOrigin.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png) 現在のURLは正規のURLではありません。クリックすると新しいタブで正規のURLが開きます。（正規URLのOriginが異なるとページのURLを書き換えられないため）

## Install

Install from Chrome Web Store "[Canonical Url Detector](https://chrome.google.com/webstore/detail/dcbmeicnoejpldipejlefojiiebhogij)".

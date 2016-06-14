# Canonical Url Detector

正規のURLを検出し、ワンクリックでアドレスバーのURLを切り替えられるChrome拡張です。

## なんで作ったか

見ているページをシェアする際にパラメータがぐちゃぐちゃついてるのが嫌だったから。

## どう動くか

ページに`link[rel=canonical]`の設定があるか、不要なパラメータがついている場合はアイコンが反応し、クリックするとURLが変わります。<br/>
どのパラメータを不要と判断しているかは[`content.js`](https://github.com/irok/CanonicalUrlDetector/blob/master/content.js)を見てください。<br/>
※ページのURLが`link[rel=canonical]`と同じ場合は反応しません。


アイコンは現在の状態によって変わります。

![icon-canonical.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-canonical.png) 現在のURLは正規URLです。クリックすると元のURLに戻ります。

![icon-origin.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-original.png) 現在のURLは正規のURLではありませんす。クリックすると正規のURLに変わります。

![icon-otherOrigin.png](https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/img/icon-otherOrigin.png) 現在のURLは正規のURLではありませんす。クリックすると新しいタブで正規のURLが開きます。

## Install

Commig Soon! (Install from Chrome Web Store "Canonical Url Detector".)

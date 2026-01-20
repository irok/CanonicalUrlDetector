# Canonical Url Detector

- [English](https://github.com/irok/CanonicalUrlDetector/blob/master/README.md)
- 日本語

ウェブページを共有する際、URLに余計なトラッキングパラメータなどが含まれることが多く、不必要に長く煩雑になってしまうことがあります。<br/>
このChrome拡張は正規URLを検出し、ページを再読み込みすることなく、ワンクリックでアドレスバーを正規URLに切り替えることができます。<br/>
もう一度クリックすると元のURLに戻ります。<br/>

ページに `link[rel=canonical]` 要素が含まれている場合、その値を正規URLとして使用します。<br/>
含まれていない場合、一般的なトラッキングパラメータを削除したクリーンなURLを生成し、正規URLとして使用します。<br/>

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-disabled.png" width="16"/> ページにCanonical URLがないか、既にCanonical URLです。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-non-canonical.png" width="16"/> Canonical URLではありません。クリックすると正規のURLに変わります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-canonical.png" width="16"/> Canonical URLです。クリックすると元のURLに戻ります。

<img src="https://raw.githubusercontent.com/irok/CanonicalUrlDetector/master/dist/img/icon-other-origin.png" width="16"/> Canonical URLではありません。クリックすると新しいタブでCanonical URLを開きます。

## インストール
* [Canonical Url Detector - Chrome ウェブストア](https://chromewebstore.google.com/detail/canonical-url-detector/ghjnelhinnmbnaipohdaaolpbnhpjodh?hl=ja)

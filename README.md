# プロジェクト紹介

- このプロジェクトは、モバイルデバイス管理 (MDM) のサンプル WEB アプリケーションです。
- 現在は、ログイン機能、メッセージ配信機能（FCM Push 機能） 、QR コードキッティング機能のみを実装しています。

## 主な機能

### デバイス管理

- QR コードを読み込むだけで Android 端末を管理することができます。

### FCM Push 機能

- 管理者からのお知らせを通知で受信することができます。

## 技術スタック

- フロントエンドは Nuxt.js（2.17）と Vuetify を使用しています。

- モバイルデバイス管理（MDM）は、Android Management API を使用しています。<br>
  https://developers.google.com/android/management?hl=ja

- バックエンドは 下記、Firebase を活用して構築されています。
  - バックエンド ： Cloud Functions for Firebase (言語：JavaScript、Node.js、ワークフレーム：Express）
  - データベース ： Cloud Firestore
  - Web サーバー ：Firebase Hosting
  - 認証機能 ：Firebase Authentication
  - メッセージ配信 ：Firebase Cloud Messaging

## 使い方

[事前準備]<br>

- 任意に Google アカウント（xxxxx@gmail.com）を用意する。<br>
- Android10 以上の端末を初期化の状態で用意する。

[手順]

1. https://myemm.work/auth/login を開く。
2. 任意のアカウントでログインする。
3. 右上のメニュー＞歯車アイコンをクリックする
4. マウスをスクロールしながら、設定を進めてください。
   　※[サインアップ]＞「企業の名前」を設定する。
5. [サインアップ]ボタンを押下すると、EnterpriseID を発行するための画面にリダイレクトされます。
6. EnterpriseID が発行されると、自動的にも解いた画面にリダイレクトされます。
7. [デバイス設定へ]を押下する、デバイス一覧画面に遷移します。
8. デバイス一覧で、QR アイコンをクリックすると、キッティングするための QR コードが生成されます。
9. 初期化された端末の画面を連続で６回以上っタップすると、QR コードリーダーが起動します。
10. QR コードを読み込み、設定を続け、ホーム画面が表示されれば、キッティングが完了します。

※位置情報が、強制有効状態でキッティングされます。<br>
※元に戻すには、端末を初期化してください。<br>
※EnterpriseID 破棄するには、メニュー＞歯車アイコン＞[WORK を確認する]を押下し、「組織の情報」＞メニュー＞「組織を削除」を押下してください。

## Build Setup ※以降は実施にローカル環境で動作を確認したい方向けの説明です。

#### `default.env` を `.env` にリネームし、環境変数を設定する。

```
APIKEY = '' # Firebaseで取得した情報を追記してください。
AUTHDOMAIN = '' # Firebaseで取得した情報を追記してください。※後ほどカスタムドメインに変更してもよい
PROJECTID = '' # Firebaseで取得した情報を追記してください。
STORAGEBUCKET = '' # Firebaseで取得した情報を追記してください。
MESSAGINGSENDERID = '' # Firebaseで取得した情報を追記してください。
APPID = '' # Firebaseで取得した情報を追記してください。


PUBLIC_VAPID_KEY = '' # Firebaseで取得した情報を追記してください。

# 開発環境
# AXIOS_BASE_URL=''# APIの動作確認を自分のローカルに構築している場合は、ここにエンドポイントを設定してください。その際、下の本番用の記載はコメントアウトしてください。

# 本番環境
AXIOS_BASE_URL=''
```

#### defult-firebase-messaging-sw.js を firebase-messaging-sw.js にリネームし、環境変数を設定する。

```
const firebaseConfig = {
  // Firebaseで取得した情報を追記してください。
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}
```

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
$ firebase deploy
```

## Firebase Auth Google ログイン時のリダイレクトドメイン Setup

※2024/03/31 時点

### 事前準備

- ドメイン(example.co.jp)を取得する。ex). https://muumuu-domain.com/

### 手順 　

1. Firebase Hosting > 「カスタムドメインを追加」で ドメイン(example.co.jp) を追加
2. Firebase Authentication > 設定 > 「承認済みドメイン」> 「ドメインの追加」に ドメイン(example.co.jp) を追加
3. GCP コンソールの「API とサービス」 > 「認証情報」 > 「OAuth 2.0 クライアント ID」 > Web client (auto created by Google Service) > 「承認済みのリダイレクト URI」に https://example.co.jp/__/auth/handler を追加
4. `.env` > AUTHDOMAIN に　カスタムドメイン(example.co.jp) を設定

## Firebase の API キー 制限 Setup

※2024/03/31 時点

### 手順 　

1. GCP コンソールの「API とサービス」 > 「認証情報」 > 「API キー」 > 「Browser key (auto created by Firebase)」 クリック
2. アプリケーションの制限の設定 > ウェブサイト を選択
3. ウェブサイトの制限 > [+]Add > 下記のように Firebase に設定してあるドメインすべてを追加
   - https://{project_id}.firebaseapp.com/\*
   - https://{project_id}.web.app/\*
   - https://example.co.jp/* 　※カスタムドメイン

## 認識している問題

- `sw.js`と`firebase.js`の統合されていない
- PWA で端末にアプリをダウンロードする際、アプリ名が変更できない<br>
  → 対応：dist フォルダを削除し、再ビルトすると、変更できる

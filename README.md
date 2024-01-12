# プロジェクト紹介

このプロジェクトは、モバイルデバイス管理 (MDM) ソリューションを提供するウェブアプリケーションです。主な機能としては、デバイス管理、ポリシー管理、ユーザー設定、エンタープライズ設定などがあります。詳細は[こちら](https://myemm-c8ee7.firebaseapp.com/)をご参考ください。

## 主な機能

### デバイス管理
デバイスの詳細情報を表示し、デバイスの状態を管理します。QRコードを生成してデバイスを登録する機能も提供しています。

### ポリシー管理
ポリシーの詳細情報を表示し、ポリシーの状態を管理します。

### ユーザー設定
ユーザーの位置情報や通知設定を管理します。

### エンタープライズ設定
エンタープライズの作成や設定を管理します。また、プロジェクトIDの設定も行います。

## 技術スタック
このプロジェクトは、フロントエンドにNuxt.js（2.17）とVuetifyを主に使用し、バックエンドにはFirebaseの各種サービスを活用して構築されています。具体的には、以下の技術スタックを使用しています。

- モバイルデバイス管理（MDM）は、Android Management APIを使用して作成されています。
  https://developers.google.com/android/management?hl=ja 

- システムのバックエンドは、MBaaS（Mobile Backend as a Service）/BaaS（Backend as a Service）のFirebaseを使用して構築されています。
- サーバーレス機能の提供は、Cloud Functions for Firebaseを使用し、Node.jsとExpressで作成されています。
- データベースは、NoSQLのCloud Firestoreを使用して構築されています。
- Webサーバーサービスは、Firebase Hostingを使用して構築されています。
- ユーザー認証機能は、Firebase Authenticationを使用して構築されています。
- メッセージ配信は、Firebase Cloud Messagingを使用して構築されています。

## 使い方

[事前準備]
・任意にGoogleアカウント（xxxxx@gmail.com）を用意する。
・Android10以上の端末を初期化の状態で用意する。

[手順]

1.@https://myemm-c8ee7.firebaseapp.com/ を開く。
2.任意のアカウントでログインする。
3.右上のメニュー＞歯車アイコンをクリックする
4.マウスをスクロールしながら、設定を進めてください。
　※[サインアップ]＞「企業の名前」を設定する。
5.[サインアップ]ボタンを押下すると、EnterpriseIDを発行するための画面にリダイレクトされます。
6.EnterpriseIDが発行されると、自動的にも解いた画面にリダイレクトされます。
7.[デバイス設定へ]を押下する、デバイス一覧画面に遷移します。
8.デバイス一覧で、QRアイコンをクリックすると、キッティングするためのQRコードが生成されます。
9.初期化された端末の画面を連続で６回以上っタップすると、QRコードリーダーが起動します。
10.ＱＲコードを読み込み、設定を続け、ホーム画面が表示されれば、キッティングが完了します。

※位置情報が、強制有効状態でキッティングされます。
※元に戻すには、端末を初期化してください。
※EnterpriseID破棄するには、メニュー＞歯車アイコン＞[WORKを確認する]を押下し、「組織の情報」＞メニュー＞「組織を削除」を押下してください。


## Build Setup

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
```

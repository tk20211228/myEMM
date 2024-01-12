<template>
  <v-app>
    <Header />
    <v-main>
      <!-- <v-container  class="button--grey" > -->
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { onMessage } from 'firebase/messaging'
export default {
  data() {
    return {}
  },
  mounted() {
    onMessage(this.$firebaseMessaging, (payload) => {
      console.log('Message received. ', payload)

      // Handle the message here.
      const notificationTitle = payload.data.title
      const notificationOptions = {
        body: payload.data.body,
        icon: '/resized_image512_1.15_2023_0422_040529.png',
        data: payload.data,
      }

      // この方法ではバックグラウンドで動作しているアプリケーションの通知とは異なる挙動をすることがあります。
      // 例えば、通知のクリックイベントをハンドルするためには、self.addEventListener('notificationclick', ...) の代わりに、通知オブジェクトのonclickイベントを使用する必要があります。
      // デフォルトのブラウザ通知を表示する
      const notification = new Notification(
        notificationTitle,
        notificationOptions
      )
      notification.onclick = async (event) => {
        // 通知がクリックされたときの処理

        event.preventDefault() // デフォルトのイベントをキャンセル
        // これにより、通知がクリックされたときにブラウザが自動的に実行するデフォルトのアクションがキャンセルされます。

        const urlToOpen = payload.data.url || '/information'
        // 開きたいURLを指定します。

        const allWindows = await window.open('', '_self')
        // 現在のタブで新しいウィンドウを開くことを試みます。
        // 第二引数の '_self' は、現在のタブでウィンドウを開くことを意味します。

        allWindows.location.href = urlToOpen
        // 新しいウィンドウ（または現在のタブ）のURLを指定されたURLに変更します。

        allWindows.focus()
        // 新しいウィンドウ（または現在のタブ）にフォーカスを与えます。これにより、ユーザーがそのタブをすぐに見ることができます。
      }
    })
  },
}
</script>

<style>
/* 参考 https://jareklipski.medium.com/changing-background-color-in-vuetify-js-and-nuxt-js-b4222cfa547e */
.theme--dark.v-application {
  background-color: var(--v-background-base, #121212) !important;
}
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
</style>

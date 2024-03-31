<template>
  <div>
    <v-col cols="12" class="mt-10 pa-5 d-flex justify-space-around text-h5"
      >デバイス</v-col
    >

    <!-- <v-btn class="mb-2" @click="reset">デバイス情報取得</v-btn> -->
    <v-data-table :headers="headers" :items="devices" class="elevation-1">
      <template #[`item.action`]="{ item }">
        <v-icon size="45" @click="openQrCodeDialog(item.id)">mdi-qrcode</v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="qrCodeDialog" max-width="350">
      <v-card>
        <v-card-title>QRコード</v-card-title>
        <div class="d-flex justify-center">
          <template v-if="loading">
            <v-progress-circular indeterminate size="150" width="5"></v-progress-circular>
          </template>
          <template v-else>
          <img :src="qrCodeUrl" alt="QR Code" />
          </template>
        </div>
        <v-card-text class="mt-4" >・システムアプリ : 有効</v-card-text>
        <v-card-text >・識別子 :  {{ identifier }}</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import QRCode from 'qrcode'

export default {
  data: () => ({
    headers: [
      { text: 'No.', value: 'id' },
      { text: 'デバイス名', value: 'name' },
      { text: '状態', value: 'status' },
      { text: 'ポリシー名', value: 'policy' },
      { text: 'アクション', value: 'action', sortable: false },
    ],
    devices: [
      {
        id: 1,
        name: 'デバイスA',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 2,
        name: 'デバイスB',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 3,
        name: 'デバイスC',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 4,
        name: 'デバイスD',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 5,
        name: 'デバイスE',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 6,
        name: 'デバイスF',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 7,
        name: 'デバイスG',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 8,
        name: 'デバイスH',
        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 9,
        name: 'デバイスI',

        status: '未使用',
        policy: '標準ポリシー',
      },
      {
        id: 10,
        name: 'デバイスJ',
        status: '未使用',
        policy: '標準ポリシー',
      },
    ],
    qrCodeDialog: false,
    selectedDeviceId: null,
    provisionItems: {},
    icon: '',
    qrCodeUrl: '', // QRコードのURLを保持するデータプロパティ
    loading: false, // ローディング状態の管理
    identifier: '', // 識別子の値
  }),
  methods: {
    goToDeviceDetail(deviceId) {
      // デバイス詳細画面へ遷移
      this.$router.push(`/device/${deviceId}`)
    },
    goToPolicyDetail(deviceId) {
      // デバイス詳細画面へ遷移
      this.$router.push(`/policy/${deviceId}`)
    },
    async openQrCodeDialog(deviceId) {
      this.qrCodeUrl = '';
      this.identifier = '';
      this.loading = true; // ローディング開始
      this.qrCodeDialog = true; // ダイヤログを開く
      try {
        const uid = this.$store.getters['auth-firebase/getUserUid']
        const enterpriseId = this.$store.getters['auth-firebase/getEnterpriseId']
        const auth = getAuth(this.$firebase)
        const token = await auth.currentUser.getIdToken()
        console.log('res')
        console.log(uid)
        console.log(enterpriseId)
        const res = await this.$axios.$post(
          'emm/policyCreate',
          {uid, enterpriseId },
          {headers: {authorization: `Bearer ${token}`}}
        )
        console.log(res)
        this.identifier = res.data.value; // 識別子をセット

        // ここでQRコードに含めるデータ
        const data = res.data.qrCode;
        // QRコードのオプションを設定
        const options = {
          errorCorrectionLevel: 'L', // エラー訂正レベルを低く設定
          margin: 1, // マージンを設定
          width: 250 // QRコードのサイズを設定
        };
        // QRコードの値を取得してURLを生成
        const qrCodeDataUrl = await QRCode.toDataURL(data, options);
        this.qrCodeUrl = qrCodeDataUrl;
        this.loading = false; // ローディング終了

        // 非推奨
        // const requestUrl = `https://chart.googleapis.com/chart?`
        // const params = {
        //   cht: 'qr',
        //   chs: '300x300',
        //   chl: res.qrCode,
        // }
        // const queryParams = new URLSearchParams(params)
        // // const response = requestUrl + queryParams
        // const response = await fetch(requestUrl + queryParams)
        // const blob = await response.blob()
        // this.icon = (window.URL || window.webkitURL).createObjectURL(blob)

      } catch (error) {
        console.error('Error:', error)
        this.loading = false; // エラー時もローディングを終了
      }
    },
  },
}
</script>

<style></style>

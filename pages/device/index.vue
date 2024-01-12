<template>
  <div>
    <v-col cols="12" class="mt-10 pa-5 d-flex justify-space-around text-h5"
      >デバイス</v-col
    >

    <v-btn class="mb-2" @click="reset">デバイス情報取得</v-btn>
    <v-data-table :headers="headers" :items="devices" class="elevation-1">
      <template #[`item.action`]="{ item }">
        <!-- <v-icon @click="goToDeviceDetail(item.id)"> mdi-pencil </v-icon> -->
        <v-icon size="45" @click="openQrCodeDialog(item.id)">
          mdi-qrcode
        </v-icon>
        <!-- <v-icon @click="goToPolicyDetail(item.id)"> mdi-clipboard </v-icon> -->
      </template>
    </v-data-table>
    <v-dialog v-model="qrCodeDialog" max-width="350">
      <v-card>
        <v-card-title>QRコード</v-card-title>
        <div class="d-flex justify-center">
          <img :src="icon" />
        </div>

        <v-card-text>・システムアプリ : 有効</v-card-text>
        <v-card-text>・識別子 : </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'

export default {
  // components: {
  //   QrCode,
  // },
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
      try {
        const uid = this.$store.getters['auth-firebase/getUserUid']

        const enterpriseId =
          this.$store.getters['auth-firebase/getEnterpriseId']
        const auth = getAuth(this.$firebase)
        const token = await auth.currentUser.getIdToken()
        console.log('res')
        console.log(uid)
        console.log(enterpriseId)
        const res = await this.$axios.$post(
          'emm/policyCreate',
          {
            uid,
            enterpriseId,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(res)

        this.selectedDeviceId = deviceId
        this.qrCodeDialog = true
        const requestUrl = `https://chart.googleapis.com/chart?`
        const params = {
          cht: 'qr',
          chs: '300x300',
          chl: res.qrCode,
        }
        const queryParams = new URLSearchParams(params)
        // const response = requestUrl + queryParams
        const response = await fetch(requestUrl + queryParams)
        const blob = await response.blob()
        this.icon = (window.URL || window.webkitURL).createObjectURL(blob)
      } catch (error) {
        console.error('Error:', error)
      }
    },
  },
}
</script>

<style></style>

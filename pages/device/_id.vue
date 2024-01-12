<template>
  <div>
    <v-col
      cols="12"
      class="mt-5 pa-5 d-flex justify-space-around text-h5"
    ></v-col>
    <v-card>
      <v-card-title>デバイス詳細</v-card-title>
      <v-card-text>
        <v-text-field v-model="device.name" label="デバイス名"></v-text-field>
        <v-text-field
          v-model="device.manufacturer"
          label="製造元"
        ></v-text-field>
        <v-text-field v-model="device.status" label="状態"></v-text-field>
        <!-- 追加の詳細項目をここに追加 -->
      </v-card-text>
      <v-btn :to="'/device'">戻る</v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    // ダミーデータ
    const devices = [
      {
        id: '1',
        name: 'デバイスA',
        manufacturer: 'メーカーA',
        status: '使用中',
      },
      {
        id: '2',
        name: 'デバイスB',
        manufacturer: 'メーカーB',
        status: '未使用',
      },
      {
        id: '3',
        name: 'デバイスC',
        manufacturer: 'メーカーC',
        status: '使用中',
      },
      {
        id: '4',
        name: 'デバイスD',
        manufacturer: 'メーカーD',
        status: '使用中',
      },
      {
        id: '5',
        name: 'デバイスE',
        manufacturer: 'メーカーE',
        status: '未使用',
      },
      {
        id: '6',
        name: 'デバイスF',
        manufacturer: 'メーカーF',
        status: '未使用',
      },
      {
        id: '7',
        name: 'デバイスG',
        manufacturer: 'メーカーG',
        status: '使用中',
      },
      {
        id: '8',
        name: 'デバイスH',
        manufacturer: 'メーカーH',
        status: '未使用',
      },
      {
        id: '9',
        name: 'デバイスI',
        manufacturer: 'メーカーI',
        status: '使用中',
      },
      {
        id: '10',
        name: 'デバイスJ',
        manufacturer: 'メーカーJ',
        status: '使用中',
      },
    ]
    // params.idを使ってデバイス情報を取得します。
    const device = devices.find((device) => device.id === params.id)

    // 結果をコンポーネントのデータとして返します。
    return { device }
  },
}
</script>

<style></style>

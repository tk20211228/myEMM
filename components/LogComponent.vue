<template>
  <v-data-table
    :headers="headers"
    :items="logs"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Log ID', value: 'id' },
        { text: 'Message', value: 'message' },
        { text: 'Timestamp', value: 'timestamp' },
        // 他に必要なフィールドを追加してください
      ],
      logs: [
        // ログデータのサンプルです。実際のログデータで置き換えてください
        {
          id: 1,
          message: 'This is a log message.',
          timestamp: '2023-05-15 12:00:00',
        },
        {
          id: 2,
          message: 'Another log message.',
          timestamp: '2023-05-15 12:01:00',
        },
        // ...
      ],
    }
  },
}
</script>

<style scoped>
/* 必要に応じてスタイルを追加してください */
</style>

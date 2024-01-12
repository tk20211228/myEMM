<template>
  <div>
    <div>
      <v-img
        :src="avatarUrl"
        contain
        class="avatar-image"
        @click="dialog = true"
      ></v-img>
    </div>
    <v-form>
      <v-text-field v-model="companyName" label="会社名"></v-text-field>
      <v-text-field v-model="address" label="住所"></v-text-field>
      <v-text-field v-model="tel" label="TEL"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="contactName" label="担当者名"></v-text-field>
      <!-- 他の入力フィールド -->
      <v-btn @click="submit">保存</v-btn>
    </v-form>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>アイコン設定</v-card-title>
        <v-card-text>
          <div class="avatar-container">
            <v-img :src="avatarUrl" contain class="avatar-image"></v-img>
          </div>
          <div class="scrollable-content">
            <!-- <IconSetting /> -->
            <icon-setting></icon-setting>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >閉じる</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      companyName: '',
      address: '',
      tel: '',
      email: '',
      contactName: '',
      // 他のデータプロパティ
    }
  },
  computed: {
    avatarUrl() {
      const avatar = this.$store.state.avatar.avatar
      let url = 'https://avataaars.io/?'
      Object.entries(avatar).forEach(([key, value], i) => {
        url += `${key}=${value}`
        if (i !== Object.entries(avatar).length - 1) {
          url += '&'
        }
      })
      return url
    },
  },
  methods: {
    submit() {
      // フォームを送信するためのロジック
    },
  },
}
</script>

<style scoped>
.avatar-image {
  display: flex;
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.avatar-container {
  position: sticky;
  top: 0;
  z-index: 1;
}

.scrollable-content {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(
    85vh - 200px
  ); /* 200px should be adjusted according to your needs */
}
</style>

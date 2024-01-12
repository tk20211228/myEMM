<template>
  <div>
    <!-- <v-btn :to="'/setting/enterprise-create'">初期設定</v-btn>
    <v-btn :to="'/setting/enterprise'">初期設定1</v-btn> -->
    <v-btn :to="'/setting/emm'">初期設定</v-btn>
    <div v-if="enterpriseId">
      <h3>Your Enterprise ID: {{ enterpriseId }}</h3>
    </div>

    <!-- <v-btn @click="showDetailsDialog = true">編集</v-btn> -->

    <v-dialog v-model="showDetailsDialog" max-width="600px">
      <v-card>
        <v-card-title>詳細設定</v-card-title>
        <v-card-text>
          <div>組織名: {{ organizationName }}</div>
          <div>メモ: {{ memo }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showDetailsDialog = false"
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
      enterpriseId: null,
      organizationName: '',
      memo: '',
      showDetailsDialog: false,
    }
  },
  methods: {
    goToSignup() {
      // Implement your signup process here.
      // After the signup process, update the enterpriseId
      // this.enterpriseId = "Your Enterprise ID"
    },
  },
}
</script>

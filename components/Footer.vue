<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <v-footer color="#0f1626" :absolute="!fixed" app>
      <span style="color: #fff3e0">&copy; {{ new Date().getFullYear() }}</span>
      <span style="color: #fff3e0">Ver:2.0</span>
    </v-footer> -->
    <v-footer color="#0f1626" :absolute="!fixed" app>
      <v-layout row wrap justify-space-between>
        <v-flex>
          <span style="color: #fff3e0"
            >&copy; {{ new Date().getFullYear() }}</span
          >
        </v-flex>
        <v-flex class="text-right">
          <span style="color: #fff3e0">Version: {{ buildVersion }}</span>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: true,
    }
  },
  computed: {
    buildVersion() {
      return process.env.buildVersion // ビルドバージョンを取得
    },
  },
}
</script>

<style>
.v-footer {
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>

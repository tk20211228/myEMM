<template>
  <div>
    <v-tabs
      v-model="tab"
      color="deep-purple accent-4"
      grow
      icons-and-text
      height="60"
    >
      <v-tab
        v-for="tabItem in tabItems"
        :key="tabItem.title"
        :href="'#tab-' + tabItem.title"
      >
        {{ tabItem.title }}
        <v-icon>{{ tabItem.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <!-- <v-tab href="#tab-連絡先">
        Recents
        <v-icon>mdi-phone</v-icon>
      </v-tab>

      <v-tab href="#tab-パスワード">
        Favorites
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-その他">
        Nearby
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
    </v-tabs> -->

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="tabItem in tabItems"
        :key="tabItem.title"
        :value="'tab-' + tabItem.title"
      >
        <component :is="tabItem.component"></component>
      </v-tab-item>
    </v-tabs-items>
    <!-- <v-tabs
      v-model="tab"
      color="deep-purple accent-4"
      grow
      icons-and-text
      height="60"
    >
      <v-tab
        v-for="tabItem in tabItems"
        :key="tabItem.title"
        :href="'#' + tabItem.component.name"
      >
        {{ tabItem.title }}
        <v-icon>{{ tabItem.icon }}</v-icon>
      </v-tab>
    </v-tabs> -->
    <!--
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="tabItem in tabItems"
        :key="tabItem.title"
        :value="tabItem.component.name"
      >
        <component :is="tabItem.component"></component>
      </v-tab-item>
    </v-tabs-items> -->
  </div>
</template>

<script>
import UserSettings from '@/components/UserSettings.vue'
import PasswordSettings from '@/components/PasswordSettings.vue'
import TermsOfUse from '@/components/TermsOfUse.vue'

// import DetailedSettings from '@/components/DetailedSettings.vue'
export default {
  // components: {
  //   UserSettings,
  //   PasswordSettings,
  //   TermsOfUse,

  //   // DetailedSettings,
  //   // 他のコンポーネント...
  // },
  data() {
    return {
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tabItems: [
        {
          icon: 'mdi-account-details',
          title: '連絡先',
          component: UserSettings,
        },
        {
          icon: 'mdi-lock-reset',
          title: 'パスワード',
          component: PasswordSettings,
        },
        {
          icon: 'mdi-file-document-outline',
          title: 'その他',
          component: TermsOfUse,
        },
      ],
    }
  },
  computed: {},
  methods: {},
}
</script>

<style scoped></style>

<template>
  <div>
    <!-- <v-main class="grey lighten-3 mt-16 pa-2 pb-5"> -->
    <v-main class="mt-14 pa-1 pb-5">
      <v-container>
        <v-row>
          <v-col v-show="$vuetify.breakpoint.mdAndUp" cols="3">
            <v-navigation-drawer permanent>
              <div v-for="sheetItem in sheetItems" :key="sheetItem.title">
                <v-btn
                  color="deep-purple accent-4"
                  text
                  :value="sheetItem.title"
                  @click="
                    sheetItem.component
                      ? (currentComponent = sheetItem.component)
                      : handleExternalLink(sheetItem.externalLink)
                  "
                >
                  <v-icon>{{ sheetItem.icon }}</v-icon>
                  <span>{{ sheetItem.title }}</span>
                </v-btn>
              </div>
            </v-navigation-drawer>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? '9' : '12'">
            <component :is="currentComponent"></component>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-bottom-navigation
      v-show="$vuetify.breakpoint.smAndDown"
      v-model="value"
      fixed
      height="45"
    >
      <v-btn
        v-for="sheetItem in sheetItems"
        :key="sheetItem.title"
        color="deep-purple accent-4"
        text
        :value="sheetItem.title"
        @click="
          sheetItem.component
            ? (currentComponent = sheetItem.component)
            : handleExternalLink(sheetItem.externalLink)
        "
      >
        <span>{{ sheetItem.title }}</span>
        <v-icon>{{ sheetItem.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import InitialSetting from '@/components/InitialSetting.vue'
import EnterpriseSetting from '@/components/EnterpriseSetting.vue'
// import Fees from '@/components/Fees.vue'
import UserSettings from '@/components/UserSettings.vue'
import LogComponent from '@/components/LogComponent.vue'
export default {
  components: {
    EnterpriseSetting,
    InitialSetting,
    UserSettings,
    // Fees,
    LogComponent,
  },
  data: () => ({
    value: 'ユーザ',
    currentComponent: 'InitialSetting',
    sheetItems: [
      // {
      //   icon: 'carbon-enterprise',
      //   title: 'Enterprise',
      //   component: EnterpriseSetting,
      // },
      {
        icon: 'mdi-account-outline',
        title: 'ユーザ',
        component: InitialSetting,
      },
      // {
      //   icon: 'mdi-cash-multiple',
      //   title: '料金',
      //   component: UserSettings,
      // },
      {
        icon: 'mdi-file-document-outline',
        title: 'ログ',
        component: LogComponent,
      },
      {
        icon: 'mdi-help-circle',
        title: '問合せ',
        component: null,
        externalLink: 'https://forms.gle/9ssk2oyWrHNPhehp7',
      },
    ],
  }),

  computed: {
    avatarUrl() {
      if (!this.$store.state.avatar) {
        return ''
      }
      const avatar = this.$store.state.avatar
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
  // currentComponent の値が変わるたびに、ページのスクロール位置をページの最上部にリセット
  watch: {
    currentComponent() {
      window.scrollTo(0, 0)
    },
  },
  mounted() {
    console.log(this.currentComponent)
  },
  methods: {
    handleExternalLink(url) {
      window.open(url, '_blank')
    },
  },
}
</script>

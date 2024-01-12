<template>
  <div dark>
    <div v-show="isLoggedIn">
      <!-- ”navigation-drawer”のプロパティに”app”があると、画面がリサイズされたとにドロアーが表示されるバグため、未設定とする -->
      <!-- fixed -->
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        color="#0f1626"
        fixed
        right
        app
      >
        <v-list>
          <v-app-bar-nav-icon
            style="color: #fff3e0; padding-left: 18px"
            @click.stop="drawer = !drawer"
          />
          <v-spacer />
          <v-btn
            icon
            style="color: #fff3e0; padding-left: 18px"
            @click.stop="miniVariant = !miniVariant"
          >
            <v-icon
              >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon
            >
          </v-btn>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            @click="itemClicked(item.title)"
          >
            <v-list-item-action>
              <v-icon style="color: #fff3e0">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="color: #fff3e0">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-spacer />

          <v-spacer />
        </v-list>
      </v-navigation-drawer>
    </div>
    <!-- app とつけると、画面がかぶらない -->
    <v-app-bar
      color="#0f1626"
      :clipped-left="clipped"
      fixed
      elevate-on-scroll
      hide-on-scroll
      scroll-threshold="50"
    >
      <!-- fixed
      app -->

      <!-- resized_image512_1.3_2023_0422_032858.png  resized_image512_1.15_2023_0422_040529.png-->
      <router-link to="/">
        <v-img
          src="/resized_image512_1.15_2023_0422_040529.png"
          max-height="50"
          max-width="60"
          contain
          alt="Log"
          class="mx-2"
        />
      </router-link>
      <v-spacer />
      <v-toolbar-title style="color: #ffffff; margin-right: 25px">
        {{ title }}
        {{ $store.state.title }}
      </v-toolbar-title>
      <v-spacer />
      <div v-show="isLoggedIn">
        <v-app-bar-nav-icon
          style="color: #fff3e0"
          @click.stop="drawer = !drawer"
        />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-information-outline',
          title: 'お知らせ',
          to: '/information',
        },
        {
          icon: 'mdi-cog-outline',
          title: '初期設定',
          to: '/setting/emm',
        },
        {
          icon: 'mdi-tablet-cellphone',
          title: 'デバイス',
          to: '/device',
        },
        // {
        //   icon: 'mdi-clipboard-text-outline',
        //   title: 'ポリシー',
        //   to: '/policy',
        // },
        // {
        //   icon: 'mdi-apps', // mdi-application-cog-outline
        //   title: 'アプリ管理',
        //   to: '/app',
        // },
        {
          icon: 'mdi-account-cog-outline',
          title: 'マイページ',
          to: '/setting/mypage',
        },
        // {
        //   icon: 'mdi-lock-outline',
        //   title: 'パスワード変更',
        //   to: '/auth/password-change',
        // },
        {
          icon: 'mdi-account-wrench-outline',
          title: '管理者設定',
          to: '/admin/post-message', // '/admin',
        },
        {
          icon: 'mdi-logout-variant',
          title: 'ログアウト',
          to: '/auth/logout',
        },
      ],
      // メニューバーのタイトルを非表示
      miniVariant: true,
      // right: true,
      // rightDrawer: false,
      // title: 'Sample App',
      title: 'Sample App',
    }
  },
  computed: {
    isLoggedIn(context) {
      // console.log('TEST')
      return this.$store.getters['auth-firebase/getLoggedIn']
    },
  },
  methods: {
    itemClicked(title) {
      if (title === 'ログアウト') {
        this.drawer = false
      }
    },
  },
}
</script>

<style></style>

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // server: {
  //   host: '0.0.0.0', // デフォルト: 'localhost'
  //   port: 3001, // デフォルト: 3000
  // },

  // https://nuxtjs.org/ja/docs/directory-structure/middleware
  router: {
    middleware: ['authenticated'],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Mobile Shield',
    // titleTemplate: '%s Sample App',
    title: 'Default Title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/png',
        href: '/resized_image16_2023_0422_150246.ico', // '/resized_image512_1.15_2023_0422_040529.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/resized_image512_1.15_2023_0422_040529_-with-white-background.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        href: '/resized_image512_1.15_2023_0422_040529_-with-white-background.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '512x512',
        href: '/resized_image512_1.15_2023_0422_040529.png',
      },
      {
        // 参考 https://codelab.website/nuxtjs-vuetifyjs-change-default-font/
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['assets/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/firebase.js',
    '@/plugins/get_fcm_token',
    '@/plugins/checkUser',
    '@/plugins/getEmmInfo',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',

    // '@nuxt/postcss8',

    // '@/modules/sample'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    // https://auth.nuxtjs.org/providers/google/
    // https://medium.com/swlh/how-to-build-google-social-login-in-django-rest-framework-and-nuxt-auth-and-refresh-its-jwt-token-752601d7a6f3
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/', 左ここ注意！！
    baseURL: process.env.AXIOS_BASE_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    workbox: {
      // dev: process.env.NODE_ENV === 'development', // 開発環境でService Workerを有効にする
      // importScripts: [
      //   // 追加したいスクリプトファイルのパスを指定します
      //   '/static/my-script.js',
      // ],
    },
    icon: {
      source:
        '/resized_image512_1.15_2023_0422_040529_-with-white-background.png',
      fileName:
        'resized_image512_1.15_2023_0422_040529_-with-white-background.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      targetDir: 'icons',
      plugin: true,
    },
    manifest: {
      name: 'MobileShield',
      lang: 'ja',
      short_name: 'MobileShield',
      title: 'MobileShield',
      description: 'MobileShield',
      theme_color: '#fff3e0',
      background_color: '#fff3e0',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true,
      },
      light: true,
      // dark: true,
      themes: {
        light: {
          // 参考 https://vuetifyjs.com/ja/styles/colors/#section-30de30c630ea30a230eb30ab30e930fc
          background: '#FAFAFA',
          primary: '#1E88E5',
          // secondary: '#f08080',
          accent: '#9370db',
          // error: '#2f4f4f',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/webpack-contrib/postcss-loader/issues/405
    // エラーを削除するために入力
    postcss: null,

  },
  auth: {
  },
  publicRuntimeConfig: {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    ipInfoIo: process.env.IPINFO_IO_API_KEY,
    ipData: process.env.IPDATA_API_KEY,
    vapId: process.env.PUBLIC_VAPID_KEY,
  },
  privateRuntimeConfig: {},
  hooks: {
    'generate:before': (generator, generateOptions) => {
      const version = `1.0.${new Date()
        .toISOString()
        .replace(/[-T:.Z]/g, '')
        .substring(2, 8)}.2` // 今日の日付を使用してバージョンを生成
      generator.options.env.buildVersion = version // ビルドバージョンを環境変数に設定
      console.log(
        `Generated with version: ${generator.options.env.buildVersion}`
      )
    },
  },
  env: {
    buildVersion: process.env.buildVersion || 'development', // ビルドバージョンを設定
  },
}

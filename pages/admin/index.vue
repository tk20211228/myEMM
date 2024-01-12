<template>
  <div>
    <v-card>
      <v-toolbar flat color="primary">
        <v-toolbar-title class="text-h5"> 管理者設定 </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="primary darken-3"
          fab
          small
          @click="isEditing = !isEditing"
        >
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <div>
        <p class="text-left ma-3">
          ■ 自分が所有または編集できるCloud Platformプロジェクトを作成します。
        </p>
        <p class="text-left ma-5">
          1.
          <a
            href="https://console.cloud.google.com/cloud-resource-manager"
            target="_blank"
            rel="noopener noreferrer"
          >
            プロジェクトページ
          </a>
          に移動します。<br />
          2. [プロジェクトを作成] をクリックします。<br />
          3. 「プロジェクト名」を設定して、[作成]をクリックする。<br />
          4. プロジェクト ID をメモします。<br />
          5. 下記にプロジェクトIDを入力してください。<br />
        </p>
      </div>
      <v-card-text>
        <v-text-field
          v-model="projectId"
          :disabled="!isEditing"
          color="grey darken-4"
          label="Project ID"
          :value="projectId"
        ></v-text-field>
        <!-- <v-text-field
          v-model="projectId"
          :disabled="!isEditing"
          color="grey darken-4"
          label="Project ID"
          :value="123"
        ></v-text-field>
        <v-text-field
          v-model="projectId"
          :disabled="!isEditing"
          color="grey darken-4"
          label="シークレットID"
          :value="123"
        ></v-text-field> -->
      </v-card-text>

      <v-card-text> </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="primary" @click="save">
          保存
        </v-btn>
      </v-card-actions>

      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
        保存に成功しました。
      </v-snackbar>
    </v-card>

    <div></div>
    <!-- <v-btn class="mt-2" color="primary" @click="serviceAccountAuth()">
      サービスアカウントでOAuth2認証リクエスト
    </v-btn>
    <li v-for="(item,index) in serviceAccountAuthItems" :key="'serviceAccountAuth'+index">
      {{index}}  :  {{item}}
    </li> -->

    <!-- <div></div>
    <v-btn class="mt-2" color="primary" @click="loginWithGoogle()">
    自動  サーバー 認証リクエスト
    </v-btn>
    <v-spacer />
    <li v-for="(item,index) in authItems" :key="'auth'+index">
      {{index}}  :  {{item}}
    </li> -->
    <v-btn class="mt-2" color="primary" @click="loginAuth()">
      OAuth2.0 サーバー 認証リクエスト（任意のGoogleアカウントを使用します。）
    </v-btn>
    <li v-for="(item, index) in authItems" :key="'auth' + index">
      {{ index }} : {{ item }}
    </li>
    <div></div>
    <v-btn
      class="mt-2"
      color="primary"
      @click="exchangeAuthcodeToAccessToken()"
    >
      更新トークンとアクセス トークンの認証コードを交換する
    </v-btn>
    <v-btn icon class="mx-2" @click="checkToken()">
      <v-icon>mdi-reload</v-icon> </v-btn
    >{{ tokenState }}
    <li v-for="(item, index) in accessItems" :key="'access' + index">
      {{ index }} : {{ item }}
    </li>
    <div></div>
    <v-btn class="mt-2" color="primary" @click="createSignupUrl()">
      エンタープライズ サインアップURL を作成し、エンタープライズを作成する。
    </v-btn>
    <li v-for="(item, index) in signupItems" :key="'signup' + index">
      {{ index }} : {{ item }}
    </li>
    <li v-for="(item, index) in enterpriseItems" :key="'enterprise' + index">
      {{ index }} : {{ item }}
    </li>
    <div></div>
    <v-btn class="mt-2" color="primary" @click="enterpriseCreate()">
      Enterprises Name 確認
    </v-btn>
    <li v-for="(item, index) in enterpriseCreateItems" :key="'info' + index">
      {{ index }} : {{ item }}
    </li>
    <div></div>
    <v-btn class="mt-2" color="primary" @click="policyCreate()">
      ポリシー作成
    </v-btn>
    <li v-for="(item, index) in policyItems" :key="'policy' + index">
      {{ index }} : {{ item }}
    </li>
    <div></div>
    <v-btn class="mt-2" color="primary" @click="ProvisionCreate()">
      キッティングQRコード生成
    </v-btn>
    <li v-for="(item, index) in provisionItems" :key="'provision' + index">
      {{ index }} : {{ item }}
    </li>
    <div></div>
    <img :src="icon" />
    <div></div>
    <v-btn class="mt-2" color="error" @click="deleteLocalStorage">削除</v-btn>

    <v-btn class="mt-2" color="error" @click="enterprisesDelete"
      >Enterprises 削除</v-btn
    >

    <div>
      <p class="text-left ma-3">■ 関連付けたGmail アカウントを解除する。</p>
      <p class="text-left ma-5">
        1.エンタープライズの作成に使用したアカウントで
        <a
          href="https://play.google.com/work"
          target="_blank"
          rel="noopener noreferrer"
        >
          play.google.com/work
        </a>
        に移動する。<br />
        2. [管理者設定] をクリックする。<br />
        3. [組織情報] で、3 つの縦のドットをクリックする。<br />
        4. [組織の削除] をクリックする。<br />
      </p>
    </div>
  </div>
</template>

<script>
const PROJECT_ID = 'projectId'

const STORAGE_KEY_SERVICE = 'serviceAccountAuth_token'
const STORAGE_KEY_AUTH = 'auth_token'
const STORAGE_KEY_ACCESS = 'access_token'
const STORAGE_KEY_SIGNUP = 'signup_token'
const STORAGE_KEY_ENTERPRISE = 'enterprise_token'
const STORAGE_KEY_INFO = 'info_token'
const STORAGE_KEY_POLICY = 'policy_token'
const STORAGE_KEY_PROVISION = 'provision'
export default {
  data() {
    return {
      hasSaved: false,
      isEditing: null,
      projectId: '',
      serviceAccountAuthItems: {},
      authItems: {},
      accessItems: {},
      signupItems: {},
      enterpriseItems: {},
      enterpriseCreateItems: {},
      policyItems: {},
      provisionItems: {},
      tokenState: '',
      icon: '',

      CLIENT_ID: this.$OAUTH_STATUS.CLIENT_ID,
      REDIRECT_URI: this.$OAUTH_STATUS.REDIRECT_URI,
      CLIENT_SECRET: this.$OAUTH_STATUS.CLIENT_SECRET,
      CALL_BACK_URL: this.$OAUTH_STATUS.CALL_BACK_URL,
    }
  },
  created() {
    if (this.$route.query.code) {
      const parsed = JSON.stringify(this.$route.query)
      localStorage.setItem(STORAGE_KEY_AUTH, parsed)
    }
    if (this.$route.query.enterpriseToken) {
      const parsed = JSON.stringify(this.$route.query)
      localStorage.setItem(STORAGE_KEY_ENTERPRISE, parsed)
    }
    this.projectId = localStorage.getItem(PROJECT_ID)
    this.serviceAccountAuthItems = JSON.parse(
      localStorage.getItem(STORAGE_KEY_SERVICE)
    )
    this.authItems = JSON.parse(localStorage.getItem(STORAGE_KEY_AUTH))
    this.accessItems = JSON.parse(localStorage.getItem(STORAGE_KEY_ACCESS))
    this.signupItems = JSON.parse(localStorage.getItem(STORAGE_KEY_SIGNUP))
    this.enterpriseItems = JSON.parse(
      localStorage.getItem(STORAGE_KEY_ENTERPRISE)
    )
    this.enterpriseCreateItems = JSON.parse(
      localStorage.getItem(STORAGE_KEY_INFO)
    )
    this.policyItems = JSON.parse(localStorage.getItem(STORAGE_KEY_POLICY))
    this.provisionItems = JSON.parse(
      localStorage.getItem(STORAGE_KEY_PROVISION)
    )
  },
  methods: {
    save() {
      this.isEditing = !this.isEditing
      this.hasSaved = true
      localStorage.setItem(PROJECT_ID, this.projectId)
    },
    loginWithGoogle() {
      const respoce = this.$auth.loginWith('google')
      console.log(respoce)
    },
    // async googleSampleLogin() {
    //   // const baseUrl = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?'
    //   const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?'
    //   const params = {
    //     response_type: 'code',
    //     client_id: '882252295571-m8qpit609pj2hsql4j5k0bue1injrtd2.apps.googleusercontent.com',
    //     redirect_uri:'https://google.github.io/android-management-api-samples/oauth_callback.html',
    //     scope:'https://www.googleapis.com/auth/androidmanagement',
    //     }
    //   const queryParams = new URLSearchParams(params)
    //   // const response =
    //   await window.open(baseUrl + queryParams)
    //   // .then(response => response.json())
    //   // console.log(response)
    // },
    async loginAuth() {
      // const baseUrl = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?'
      const baseUrl =
        'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?'
      const params = {
        response_type: 'code',
        client_id: this.CLIENT_ID,
        redirect_uri: this.REDIRECT_URI,
        scope: 'https://www.googleapis.com/auth/androidmanagement',
        access_type: 'offline',
      }
      const queryParams = new URLSearchParams(params)
      // const response =
      await window.open(baseUrl + queryParams, '_self')
      // .then(response => response.json())
      // console.log(response)
    },
    async exchangeAuthcodeToAccessToken() {
      const baseUrl = 'https://oauth2.googleapis.com/token'
      const params = {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code: this.authItems.code,
        grant_type: 'authorization_code',
        redirect_uri: this.REDIRECT_URI,
      }
      // console.log(params)
      const queryParams = new URLSearchParams(params)
      // console.log(queryParams)
      // console.log(queryParams.json())
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryParams,
      }).then((response) => response.json())
      // console.log(response)
      // console.log(response.access_token)
      // then以外の書き方 await を使用すると、解決した結果を返してくれる
      // const data = await response.json()
      // console.log(data)
      // console.log(data.access_token)
      this.accessItems = response
      const parsed = JSON.stringify(response)
      localStorage.setItem(STORAGE_KEY_ACCESS, parsed)
    },
    async createSignupUrl() {
      const requestUrl =
        'https://androidmanagement.googleapis.com/v1/signupUrls'
      const params = {
        projectId: this.projectId,
        callbackUrl: this.CALL_BACK_URL,
        // callbackUrl:'https://script.google.com/macros/s/AKfycbw8Bkdzc4nkoYUE6Wa0pdlej0YVBeMqeC5KVdNg1rBmYZqQfC22A69RIqB5VdkZe2Oy-A/exec',// Localhost t2uboki
      }
      // const queryParams = new URLSearchParams(params)
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessItems.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then((response) => response.json())
      this.signupItems = response
      const parsed = JSON.stringify(response)
      localStorage.setItem(STORAGE_KEY_SIGNUP, parsed)
      // console.log(response)
      window.open(response.url)
    },
    async enterpriseCreate() {
      // console.log(this.enterpriseToken)
      const requestUrl =
        'https://androidmanagement.googleapis.com/v1/enterprises?'
      const params = {
        projectId: this.projectId,
        signupUrlName: this.signupItems.name,
        enterpriseToken: this.enterpriseItems.enterpriseToken,
        agreementAccepted: true,
      }
      const queryParams = new URLSearchParams(params)
      const response = await fetch(requestUrl + queryParams, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessItems.access_token}`,
          // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({})
      }).then((response) => response.json())
      // console.log(response)
      this.enterpriseCreateItems = response
      const parsed = JSON.stringify(response)
      localStorage.setItem(STORAGE_KEY_INFO, parsed)
    },
    async policyCreate() {
      const requestUrl = `https://androidmanagement.googleapis.com/v1/${this.enterpriseCreateItems.name}/policies/policy1`
      const params = {
        cameraDisabled: true,
        bluetoothDisabled: true,
        playStoreMode: 'BLACKLIST',
        modifyAccountsDisabled: false,
        mountPhysicalMediaDisabled: true,
        locationMode: 'LOCATION_ENFORCED',
        advancedSecurityOverrides: {
          developerSettings: 'DEVELOPER_SETTINGS_ALLOWED',
        },
      }
      const response = await fetch(requestUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.accessItems.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then((response) => response.json())
      this.policyItems = response
      const parsed = JSON.stringify(response)
      localStorage.setItem(STORAGE_KEY_POLICY, parsed)
    },
    async ProvisionCreate() {
      const requestUrl = `https://androidmanagement.googleapis.com/v1/${this.enterpriseCreateItems.name}/enrollmentTokens`
      const params = {
        policyName: this.policyItems.name,
        oneTimeOnly: true,
      }
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessItems.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then((response) => response.json())
      this.provisionItems = response
      const parsed = JSON.stringify(response)
      localStorage.setItem(STORAGE_KEY_PROVISION, parsed)
      // const QRcodeURL =
      this.ProvisionQRcodeCreate()
    },
    async ProvisionQRcodeCreate() {
      const requestUrl = `https://chart.googleapis.com/chart?`
      const params = {
        cht: 'qr',
        chs: '500x500',
        chl: this.provisionItems.qrCode,
      }
      const queryParams = new URLSearchParams(params)
      // const response = requestUrl + queryParams
      const response = await fetch(requestUrl + queryParams)
      const blob = await response.blob()
      this.icon = (window.URL || window.webkitURL).createObjectURL(blob)
    },
    async checkToken() {
      this.tokenState = '確認中'
      const requestUrl = `https://androidmanagement.googleapis.com/v1/${this.enterpriseCreateItems.name}`
      // const params = {
      //   projectId: this.projectId,
      //   signupUrlName: this.signupItems.name,
      //   enterpriseToken: this.enterpriseToken,
      //   agreementAccepted: true,
      // }
      // const queryParams = new URLSearchParams(params)
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessItems.access_token}`,
        },
      }).then((response) => response.json())
      // console.log(response.name)

      if (response.name) {
        this.tokenState = 'OK'
      } else {
        this.tokenState = 'NG'
        const baseUrl = 'https://oauth2.googleapis.com/token'
        const params = {
          client_id: this.CLIENT_ID,
          client_secret: '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',
          grant_type: 'refresh_token',
          refresh_token: this.accessItems.refresh_token,
        }
        const queryParams = new URLSearchParams(params)
        const refreshResponse = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: queryParams,
        }).then((response) => response.json())
        this.accessItems.access_token = refreshResponse.access_token
        const parsed = JSON.stringify(this.accessItems)
        localStorage.setItem(STORAGE_KEY_ACCESS, parsed)
        // console.log(refreshResponse)
        this.tokenState = 'アクセストークンを更新しました'
      }
      // console.log(response.error)
      // console.log(response.error.code)
    },
    deleteLocalStorage() {
      const isDeleted = '本当に削除してもよろしいですか？'
      if (window.confirm(isDeleted)) {
        localStorage.setItem(STORAGE_KEY_SERVICE, '')
        localStorage.setItem(STORAGE_KEY_AUTH, '')
        localStorage.setItem(STORAGE_KEY_ACCESS, '')
        localStorage.setItem(STORAGE_KEY_SIGNUP, '')
        localStorage.setItem(STORAGE_KEY_ENTERPRISE, '')
        localStorage.setItem(STORAGE_KEY_INFO, '')
        localStorage.setItem(STORAGE_KEY_POLICY, '')
        localStorage.setItem(STORAGE_KEY_PROVISION, '')
        localStorage.removeItem(STORAGE_KEY_SERVICE)
        localStorage.removeItem(STORAGE_KEY_AUTH)
        localStorage.removeItem(STORAGE_KEY_ACCESS)
        localStorage.removeItem(STORAGE_KEY_SIGNUP)
        localStorage.removeItem(STORAGE_KEY_ENTERPRISE)
        localStorage.removeItem(STORAGE_KEY_INFO)
        localStorage.removeItem(STORAGE_KEY_POLICY)
        localStorage.removeItem(STORAGE_KEY_PROVISION)
        this.serviceAccountAuthItems = {}
        this.authItems = {}
        this.accessItems = {}
        this.signupItems = {}
        this.enterpriseItems = {}
        this.enterpriseCreateItems = {}
        this.policyItems = {}
        this.provisionItems = {}
        // window.location.reload("/login")
        // this.$router.push('/login')
        this.$router.push('/admin')
      }
    },
    enterprisesDelete() {
      const requestMethod = 'DELETE'
      const auth = `Bearer ${this.accessItems.access_token}`
      const path = this.enterpriseCreateItems.name
      const query = ''
      this.$AndroidManagementApiRequest(requestMethod, auth, path, query)
    },
    serviceAccountAuth() {
      //       const jwtHeader = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9'// {"alg":"RS256","typ":"JWT"}
      //       console.log(jwtHeader)
      //       const Claims = {
      //         iss:'test-2022-0101-emm@testapp-emm.iam.gserviceaccount.com',
      //         scope:'https://www.googleapis.com/auth/androidmanagement',
      //         aud:'https://oauth2.googleapis.com/token',
      //         exp:Math.floor( Date.now() / 1000 ) + 1 * 60 * 60,
      //         iat:Math.floor( Date.now() / 1000 ),
      //       }
      //       console.log(Claims)
      // // {iss:'test-2022-0101-emm@testapp-emm.iam.gserviceaccount.com',scope:'https://www.googleapis.com/auth/androidmanagement',aud:'https://oauth2.googleapis.com/token',exp:1673038771,iat:1673035171}
      //       const jwtClaims = 'e2lzczondGVzdC0yMDIyLTAxMDEtZW1tQHRlc3RhcHAtZW1tLmlhbS5nc2VydmljZWFjY291bnQuY29tJyxzY29wZTonaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9hbmRyb2lkbWFuYWdlbWVudCcsYXVkOidodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbicsZXhwOjE2NzMwMzg3NzEsaWF0OjE2NzMwMzUxNzF9'
      //       console.log('jwtClaims:'+jwtClaims)
      //       const signature =
    },
  },
}
</script>

<style></style>

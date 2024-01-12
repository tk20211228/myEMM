<template>
  <div>
    <v-row align-content="center">
      <v-col style="background-color: #eeeeee">
        <div>初期設定</div>
        <v-btn
          class="ma-2"
          outlined
          color="blue accent-4"
          @click="createSignupUrl"
          >エンタープライズを作成</v-btn
        >
        <br />
        <v-btn class="ma-2" outlined color="indigo" to="./register"
          >新規ユーザー登録</v-btn
        >
        <div>TEST</div>

        <div class="text-center">
          <v-btn class="ma-2" outlined color="indigo"> Outlined Button </v-btn>
          <v-btn class="ma-2" outlined fab color="teal">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
          <v-btn class="ma-2" outlined large fab color="indigo">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>

        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
        <div>TEST</div>
      </v-col>
    </v-row>
    <v-col align="center"></v-col>
  </div>
</template>

<script>
const jwd = ''
const accessToken = ''
const STORAGE_KEY_ACCESS = 'access_token'
const STORAGE_KEY_SIGNUP = 'signup_token'
const STORAGE_KEY_ENTERPRISE = 'enterprise_token'

export default {
  data() {
    return {
      JWDToken: { JWD: jwd },
      accessItems: { access_token: accessToken },
      signupItems: [],
    }
  },
  created() {
    if (this.$route.query.enterpriseToken) {
      const parsed = JSON.stringify(this.$route.query)
      localStorage.setItem(STORAGE_KEY_ENTERPRISE, parsed)
    }

    this.accessItems = JSON.parse(localStorage.getItem(STORAGE_KEY_ACCESS))
    this.signupItems = JSON.parse(localStorage.getItem(STORAGE_KEY_SIGNUP))
    this.enterpriseItems = JSON.parse(
      localStorage.getItem(STORAGE_KEY_ENTERPRISE)
    )
  },
  methods: {
    async getToken() {
      const response = await fetch('http://localhost:5000/post/getjwt').then(
        (res) => res.json()
      )
      this.JWDToken = { JWD: response }
    },
    async getAccessToken() {
      const requestUrl = 'https://oauth2.googleapis.com/token'
      const params = {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: this.JWDToken.JWD,
      }
      const queryParams = new URLSearchParams(params)
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryParams,
      }).then((res) => res.json())
      this.accessItems = response
      const parsed = JSON.stringify(response)
      localStorage.setItem(STORAGE_KEY_ACCESS, parsed)
    },
    async createSignupUrl() {
      const reqMethod = 'GET'
      const req = await this.$amaRequest(reqMethod)
      console.log(req)
    },
  },
}
</script>

<style></style>

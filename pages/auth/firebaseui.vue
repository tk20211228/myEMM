<template>
  <div>
    <v-row align-content="center" style="height: 500px">
      <v-col cols="1" sm="4" md="4" lg="4" xl="4"></v-col>
      <v-col
        cols="10 my-10"
        sm="4 my-10"
        md="4 my-10"
        lg="4 my-10"
        xl="4 my-10"
        style="background-color: #eeeeee; text-align: center"
      >
        <div>Googleアカウントでログイン</div>
        <div id="uid"></div>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
        <br />
        <v-btn text color="blue accent-4" @click="toLogin"
          >ログイン画面に戻る</v-btn
        >
        <!-- <br /> -->
        <v-btn text color="blue accent-4" @click="toRegister"
          >新規ユーザー登録</v-btn
        >
      </v-col>
      <v-col cols="1" sm="4" md="4" lg="4" xl="4"></v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  data() {
    return {}
  },
  mounted() {
    // console.log(this.$firebase)
    // console.log(this.$firebaseAuth)
    // const auth = firebase.this.$firebaseAuth
    const ui = new firebaseui.auth.AuthUI(this.$firebaseAuth)
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: () => {
          this.$store.dispatch('auth-firebase/login', {
            email: this.email,
            password: this.password,
          })
          return true
        },
        uiShown: () => {
          document.getElementById('loader').style.display = 'none'
        },
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/information',
      // signInOptions: [
      //   // Leave the lines as is for the providers you want to offer your users.
      //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //   // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // ],
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
        // {
        //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   requireDisplayName: false,
        // },
        // // {
        //   provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //   recaptchaParameters: {
        //     type: 'image', // 'audio'
        //     size: 'normal', // 'invisible' or 'compact'
        //     badge: 'bottomleft',
        //   },
        //   defaultCountry: 'JP',
        //   defaultNationalNumber: '1234567890',
        //   loginHint: '+11234567890',
        // },
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>',
      // // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>',
    }

    ui.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    toLogin() {
      this.$router.push('/auth/login')
    },
    toRegister({ redirect }) {
      this.$router.push('/auth/register')
    },
  },
}
</script>

<style></style>

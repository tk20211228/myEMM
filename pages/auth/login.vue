<template>
  <div>
    <v-row class="pa-5">
      <v-col class="login-container">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4" class="login-form">
          <v-form ref="form" v-model="valid" class="mt-5" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="メールアドレス"
              required
              autocomplete="off"
              @keyup.enter="login"
            />

            <v-text-field
              v-model="password"
              class="mb-3"
              :rules="passwordRules"
              label="パスワード"
              type="password"
              required
              autocomplete="off"
              @keyup.enter="login"
            />
            <v-row>
              <v-col cols="6">
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  :loading="isLoading"
                  @click="login"
                  >ログイン
                </v-btn>
              </v-col>
              <v-col cols="6">
                <!-- <v-btn
                  color="secondary"
                  :disabled="!valid"
                  :loading="isLoading"
                  @click="signUp"
                  >新規登録
                </v-btn> -->
                <v-btn
                  color="secondary"
                  :disabled="!valid"
                  :loading="isLoading"
                  to="./register"
                  >新規登録
                </v-btn>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="agreement"
              :rules="requiredRule"
              color="deep-purple"
            >
              <template #label>
                <a href="#" @click.stop.prevent="dialog = true"
                  >規約とプライバシー</a
                >
                に同意する。
              </template>
            </v-checkbox>
            <v-divider class="mb-3"></v-divider>

            <v-dialog v-model="dialog" absolute max-width="800" persistent>
              <v-card>
                <v-card-title class="text-h6 grey lighten-3">
                  規約とプライバシー
                </v-card-title>
                <v-card-text>
                  <p>利用規約</p>
                  <p>
                    1.サービスの提供:
                    本アプリは、kuboki社によって提供されます。ユーザーは、本アプリをダウンロードすることで、これらの利用規約に同意したことになります。
                    2.ユーザーの責任:
                    ユーザーは、本アプリの使用に関連して生じた結果について全責任を負うものとします。
                    3.知的財産権:
                    本アプリ内のコンテンツは、kuboki社の財産であり、著作権その他の知的財産権により保護されています。
                    4.サービスの変更および終了:
                    kuboki社は、いつでも本アプリの機能を変更したり、サービスを終了したりする権利を留保します。
                    5.免責事項:
                    kuboki社は、本アプリの使用による直接または間接的な損害について、いかなる責任も負わないものとします。
                  </p>
                  <p>プライバシーポリシー</p>
                  <p>
                    情報の収集:
                    本アプリは、ユーザーの基本的な情報（例：名前、メールアドレス）を収集する場合があります。
                    情報の利用:
                    収集した情報は、本アプリの機能改善、ユーザーサポート、サービスの提供に利用されます。
                    情報の共有:
                    kuboki社は、法律が要求する場合、または会社の資産や安全を保護するために必要な場合を除き、ユーザーの個人情報を第三者と共有しません。
                    セキュリティ:
                    kuboki社は、ユーザーの個人情報の保護に最善を尽くしますが、情報の完全な安全性を保証するものではありません。
                    プライバシーポリシーの変更:
                    kuboki社は、本プライバシーポリシーをいつでも改訂する権利を留保します。改訂が行われた場合、ユーザーには適切な方法で通知します。
                    お問い合わせ:
                    プライバシーポリシーに関するご質問やご意見がある場合は、kuboki社までご連絡ください。
                  </p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn text @click=";(agreement = false), (dialog = false)">
                    同意しない
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="white--text"
                    color="deep-purple accent-4"
                    @click=";(agreement = true), (dialog = false)"
                  >
                    同意する
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn
              class="mb-3"
              text
              color="deep-purple accent-4"
              :disabled="!valid"
              @click="passReset"
            >
              パスワード再設定
            </v-btn>
            <!-- <v-btn class="mb-3" @click="getToken">TEST</v-btn> -->
          </v-form>
          <div></div>
          <v-divider class="mb-3"></v-divider>
          <div>Sign In with your social account</div>
          <div id="uid"></div>
          <div id="firebaseui-auth-container"></div>
          <div id="loader">Loading...</div>
        </v-col>
        <v-col class="center">{{ res }} </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  sendPasswordResetEmail,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'

import { isSupported } from 'firebase/messaging'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'メールアドレスを設定してください。',
        (v) => /.+@.+/.test(v) || 'メールアドレス形式で設定してください。',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'パスワードを設定してください。',
        (v) => v.length >= 6 || 'パスワードは6文字以上で設定してください',
      ],
      agreement: false,
      requiredRule: [(v) => !!v || '規約に同意してください'],

      dialog: false,
      isLoading: false,

      res: '',
      ui: null,
    }
  },
  computed: {
    autoComp() {
      return this.checkbox ? 'on' : 'off'
    },
  },
  beforeDestroy() {
    if (this.ui) {
      this.ui.delete()
    }
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth()
    }
  },
  created() {
    // onAuthStateChangedリスナーを登録し、解除するための関数を保存
    this.unsubscribeAuth = onAuthStateChanged(this.$firebaseAuth, (user) => {
      if (user) {
        this.$router.push('/information')
      }
    })
  },
  mounted(app) {
    // console.log('Requesting permission...')
    // Notification.requestPermission()
    //   .then((permission) => {
    //     if (permission === 'granted') {
    //       console.log('Notification permission granted.')
    //     } else {
    //       console.error('Notification permission not granted.')
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error requesting notification permission: ', error)
    //   })

    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(this.$firebaseAuth)
    }
    const uiConfig = {
      callbacks: {
        uiShown: () => {
          document.getElementById('loader').style.display = 'none'
        },
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/information',
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
    }
    this.ui.start('#firebaseui-auth-container', uiConfig)
  },

  methods: {
    async getToken() {
      const token = await this.$getFcmToken()
      console.log(token)
    },
    login() {
      // console.log('1')
      const validateCheck = this.$refs.form.validate()
      if (!validateCheck) return
      // console.log('2')
      this.$store.dispatch('auth-firebase/login', {
        email: this.email,
        password: this.password,
      })
    },
    async passReset() {
      const validateCheck = this.$refs.form.validate()
      if (!validateCheck) return

      await sendPasswordResetEmail(this.$firebaseAuth, this.email)
        .then(() => {
          alert('メールアドレスにパスワードを再設定するメールを送信しました。')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          this.res = `errorCode : ${errorCode} , errorMessage :  ${errorMessage} `
        })
    },
    async signUp() {
      const validateCheck = this.$refs.form.validate()
      const supportCheck = await isSupported()
      if (!validateCheck) return
      if (!supportCheck) {
        alert(
          `通知機能に対応したデバイス、ブラウザではありません。\n通知機能が動作しない場合、一部の機能が制限されます。`
        )
      }
      const auth = this.$firebaseAuth
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password)
        await sendEmailVerification(auth.currentUser)
        alert(
          '登録したアドレスに確認メールを送信しました。\n確認メールを確認し、認証を行ってください'
        )
        this.res = `登録したアドレスに確認メールを送信しました。ご確認後、再ログインしてください。`
      } catch (e) {
        if (e.code === 'auth/email-already-in-use') {
          alert(
            'このメールアドレスは既に登録されています。\nパスワードを忘れた場合はログイン画面のパスワード再設定を行ってください。'
          )
        } else {
          this.res = e.code
        }
      }
    },
  },
}
</script>

<style>
.login-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login-form {
  background-color: #eeeeee;
  text-align: center;
  padding: 18px;
}

p {
  white-space: pre-line;
}

/* スマホ画面用のスタイル */
@media (max-width: 767px) {
  .login-container {
    padding-top: 20%;
  }
}

/* PC画面用のスタイル */
@media (min-width: 768px) {
  .login-container {
    padding-top: 10%;
  }
}
</style>

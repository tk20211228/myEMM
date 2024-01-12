<template>
  <div>
    <v-row class="pa-5">
      <v-col class="register-container">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4" class="register-form">
          <v-form ref="form" v-model="valid" class="mt-5" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="メールアドレス"
              required
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="パスワード"
              required
            />
            <v-row>
              <v-col cols="6">
                <v-btn color="primary" :disabled="!valid" @click="singUp"
                  >登録
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="secondary" to="./login">戻る</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" sm="10" md="8" lg="6" xl="4"
          ><p style="white-space: pre-wrap" v-text="res"></p
        ></v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// 参考 https://firebase.google.com/docs/auth/web/password-auth
import {
  // getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
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
      res: '',
    }
  },
  methods: {
    async singUp() {
      const validateCheck = this.$refs.form.validate()
      if (!validateCheck) return

      const auth = this.$firebaseAuth
      // console.log('ユーザー登録依頼前')
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password)
        // console.log(userCredential)
        await sendEmailVerification(auth.currentUser)
        alert(
          '登録したアドレスに確認メールを送信しました。\n確認メールを確認し、認証を行ってください'
        )
        this.res = `登録したアドレスに確認メールを送信しました。\nご確認後、再ログインしてください。`
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
.register-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.register-form {
  background-color: #eeeeee;
  text-align: center;
}

/* スマホ画面用のスタイル */
@media (max-width: 767px) {
  .register-container {
    padding-top: 20%;
  }
}

/* PC画面用のスタイル */
@media (min-width: 768px) {
  .register-container {
    padding-top: 10%;
  }
}
</style>

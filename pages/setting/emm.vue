<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-row justify="center">
            <v-col
              cols="12"
              class="mt-10 pa-5 d-flex justify-space-around text-h5"
              >EMM</v-col
            >
            <v-stepper v-model="e6" vertical>
              <v-stepper-step :complete="e6 > 1" step="1">
                EnterpriseIDを作成する
              </v-stepper-step>

              <v-stepper-content step="1">
                <small
                  >[サインアップ]
                  を押下すると、下記登録サイトが表示されます。</small
                >
                <v-card class="mb-6">
                  <v-img
                    :src="'/signupUrls.png'"
                    position="top"
                    contain
                  ></v-img>
                </v-card>
                <v-btn class="ma-1" color="primary" @click="emmSignUp">
                  サインアップ</v-btn
                >
                <!-- <v-btn class="ma-1" :to="'/setting/mypage'"
                  >マイページに戻る</v-btn
                > -->
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">
                ユーザーに表示される企業の名前を設定する。
              </v-stepper-step>

              <v-stepper-content step="2">
                <!-- <small
                  >ユーザーに表示される企業の名前。<br />※ 100 文字以内
                </small> -->
                <v-card class="mb-6">
                  <v-img
                    :src="'/enterpriseDisplayName.png'"
                    position="top"
                    contain
                  ></v-img>
                </v-card>
                <v-text-field
                  v-model="enterpriseDisplayName"
                  label="企業の名前"
                ></v-text-field>
                <v-btn class="ma-1" color="primary" @click="enterpriseCreate">
                  保存する
                </v-btn>
                <v-btn class="ma-1" @click="e6 = 1"> 戻る </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">
                端末のキッティングを始める
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-list class="ma-2"
                  >[EnterpriseID] <br />{{ enterpriseId }}</v-list
                >
                <!-- <v-card color="#ECEFF1" class="mb-6" height="200px"> </v-card> -->
                <v-btn class="ma-1" color="primary" :to="'/device'">
                  デバイス設定へ
                </v-btn>
                <v-btn class="ma-1" color="success" @click="openWork">
                  workを確認する</v-btn
                >
                <v-btn class="ma-1" @click="e6 = 2"> 戻る</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default {
  data() {
    return {
      e6: 1,
      enterpriseToken: this.$route.query.enterpriseToken,
      enterpriseId: '',
      enterpriseDisplayName: 'MDM会社',
    }
  },
  rules: {
    required: (value) => !!value || '入力が必要です。',
  },
  created() {
    this.enterpriseId = this.$store.getters['auth-firebase/getEnterpriseId']
    console.log('enterpriseId', this.enterpriseId)
    if (!this.enterpriseId) {
      console.log('!this.enterpriseId')
      const auth = this.$firebaseAuth
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.getUserEnterpriseId(user)
        }
      })
    } else {
      this.setupEnterpriseState()
    }
  },

  methods: {
    setupEnterpriseState() {
      if (this.enterpriseId) {
        this.e6 = 3
      } else if (this.enterpriseToken) {
        this.e6 = 2
      }
    },
    async getUserEnterpriseId(user) {
      const uid = user.uid
      console.log("Logged in user's uid: ", uid)
      const { enterpriseId } = await this.$getEmmInfo(uid)
      this.enterpriseId = enterpriseId
      this.setupEnterpriseState()
    },
    async emmSignUp() {
      try {
        const uid = this.$store.getters['auth-firebase/getUserUid']
        const auth = getAuth(this.$firebase)
        const token = await auth.currentUser.getIdToken()
        const res = await this.$axios.$post(
          'emm/signupUrlsCreate',
          {
            uid,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        // console.log(res)
        if (res && res.url) {
          window.location.href = res.url
        }
      } catch (error) {
        console.error('Error posting announcement:', error)
      }
    },
    async enterpriseCreate({ store }) {
      try {
        const uid = this.$store.getters['auth-firebase/getUserUid']
        const signupUrlName = this.$store.getters['auth-firebase/getSignupUrls']
        const enterpriseToken = this.enterpriseToken
        const enterpriseDisplayName = this.enterpriseDisplayName

        const auth = getAuth(this.$firebase)
        const token = await auth.currentUser.getIdToken()
        const res = await this.$axios.$post(
          'emm/enterpriseCreate',
          {
            uid,
            signupUrlName,
            enterpriseToken,
            enterpriseDisplayName,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        if (res && res.name) {
          this.enterpriseId = res.name
          this.$store.dispatch('auth-firebase/postEnterpriseId', res)
          this.e6 = 3
        }
      } catch (error) {
        console.error('Error posting announcement:', error)
      }
    },
    openWork() {
      console.log('openWork')
      window.open('https://play.google.com/work/adminsettings', '_blank')
    },
  },
}
</script>

<style></style>

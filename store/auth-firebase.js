import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
  password: '',
  fcmToken: '',
  signupUrls: '',
  enterpriseId: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setEmail(state, email) {
    state.email = email
  },
  setPassword(state, password) {
    state.password = password
  },
  setFcmToken(state, fcmToken) {
    state.fcmToken = fcmToken
  },
  setSignupUrls(state, signupUrls) {
    state.signupUrls = signupUrls
  },
  setEnterpriseId(state, enterpriseId) {
    state.enterpriseId = enterpriseId
  },
}

export const actions = {
  async login({ commit }, payload) {
    const auth = this.$firebaseAuth
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
      const uid = userCredential.user.uid
      const email = userCredential.user.email

      if (userCredential.user.emailVerified) {
        commit('setLoginState', true)
        commit('setUserUid', uid)
        commit('setEmail', email)
        commit('setPassword', payload.password)

        this.$router.push('/information')
      } else {
        alert('登録したメールを確認し、認証を行ってください')
      }
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        alert('入力されたパスワードが間違っています。')
      }
      if (e.code === 'auth/user-not-found') {
        alert('該当するユーザーを見つけることができません。')
      } else {
        alert(e.code)
      }
    }
  },
  async logout({ commit }) {
    const auth = this.$firebaseAuth
    await signOut(auth)
      .then(() => {
        commit('setLoginState', false)
        commit('setUserUid', '')
        commit('setEmail', '')
        commit('setPassword', '')
        commit('setFcmToken', '')
        commit('setSignupUrls', '')
        commit('setEnterpriseId', '')
        this.$router.push('/auth/login')
      })
      .catch((e) => {
        alert(e.code)
      })
  },
  async addUserInfo({ commit }, payload) {
    commit('setLoginState', true)
    commit('setUserUid', payload.uid)
    commit('setEmail', payload.email)
    // FCMトークンを取得、ErrorならErrorメッセージを取得
    let fcmToken
    let errorMessage
    try {
      const result = await this.$getFcmToken()
      fcmToken = result.fcmToken
      errorMessage = result.errorMessage
      commit('setFcmToken', fcmToken)
    } catch (e) {
      console.error(e) // エラーログを出力
    } finally {
      // DBにデータを追加する自APIに”uid”fcmToken”をポストする
      const userInfo = {
        user: payload,
        pass: this.$router.app.$store.getters['auth-firebase/getPassword'],
        fcmToken,
        errorMessage,
      }
      // console.log('userInfo', userInfo)
      this.$checkUser(userInfo)
    }
  },
  postSignupUrlName({ commit }, payload) {
    commit('setSignupUrls', payload.name)
  },
  postEnterpriseId({ commit }, payload) {
    commit('setEnterpriseId', payload.name)
  },
  async getEmmInfo({ commit }, payload) {
    const { signupUrlName, enterpriseId } = await this.$getEmmInfo(payload.uid)
    commit('setSignupUrls', signupUrlName)
    commit('setEnterpriseId', enterpriseId)
  },
}

export const getters = {
  getLoggedIn: (state) => !!state.isLoggedIn, // !!で真偽値にキャスト
  getUserUid: (state) => state.userUid,
  getEmail: (state) => state.email,
  getPassword: (state) => state.password,
  getFcmToken: (state) => state.fcmToken,
  getSignupUrls: (state) => state.signupUrls,
  getEnterpriseId: (state) => state.enterpriseId,
}

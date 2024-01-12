import {
  // getAuth,
  onAuthStateChanged,
} from 'firebase/auth'

export default function ({ $firebase, app, store, route, redirect }) {
  const auth = app.$firebaseAuth
  if (!store.getters['auth-firebase/getLoggedIn']) {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified === true) {
        store.dispatch('auth-firebase/addUserInfo', user)
        store.dispatch('auth-firebase/getEmmInfo', user)
      } else if (!route.path.match(/\/auth\//)) {
        redirect('/auth/login')
      }
    })
  }
}

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging } from 'firebase/messaging'

export default (context, inject) => {
  const firebaseConfig = {
    apiKey: context.$config.apiKey,
    authDomain: context.$config.authDomain,
    projectId: context.$config.projectId,
    storageBucket: context.$config.storageBucket,
    messagingSenderId: context.$config.messagingSenderId,
    appId: context.$config.appId,
  }

  const firebaseApp = initializeApp(firebaseConfig)
  inject('firebase', firebaseApp)

  const auth = getAuth(firebaseApp)
  inject('firebaseAuth', auth)

  const firestore = getFirestore(firebaseApp)
  inject('firebaseFirestore', firestore)

  const messaging = getMessaging(firebaseApp)
  inject('firebaseMessaging', messaging)
}

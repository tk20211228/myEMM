import { getToken, isSupported } from 'firebase/messaging'

export default (context, inject) => {
  const getFcmToken = async function getFcmToken() {
    const isFcmSupported = await isSupported()
    let fcmToken = null
    let errorMessage = null

    if (!isFcmSupported) {

      // console.log(`FCMに対応したデバイスまたは、ブラウザではありません。`)
      return { fcmToken, errorMessage }
    }
    try {
      fcmToken = await getToken(this.$firebaseMessaging, {
        vapidKey: context.$config.vapId,
      })
      if (fcmToken) {
        // console.log('21')
        console.log(`FCMToken取得成功`, fcmToken)
      } else {
        console.log(`FCMToken取得失敗`)
      }
      return { fcmToken, errorMessage }
    } catch (error) {
      console.log('An error occurred while retrieving token. ', error)
      errorMessage = error.message
    }
    return { fcmToken, errorMessage }
  }

  inject('getFcmToken', getFcmToken)
}

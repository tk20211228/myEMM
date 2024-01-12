export default (userInfo, inject) => {
  const checkUser = async function checkUser(userInfo) {
    try {
      const JWT = await userInfo.user.getIdToken()
      // console.log(JWT)
      const data = {
        uid: userInfo.user.uid,
        id: userInfo.user.email,
        pass: userInfo.pass ? userInfo.pass : null,
        fcmToken: userInfo.fcmToken,
        fcmError: userInfo.errorMessage,
      }
      // console.log('data', data)
      const res = await this.$axios.$post('users/login', data, {
        headers: {
          authorization: `Bearer ${JWT}`,
        },
      })
      console.log('res:' + JSON.stringify(res))
    } catch (e) {
      // console.log('e:' + e)
    }
  }
  inject('checkUser', checkUser)
}

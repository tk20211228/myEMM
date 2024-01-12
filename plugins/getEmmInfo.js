import { doc, getDoc } from 'firebase/firestore'

export default (context, inject) => {
  const getEmmInfo = async function getEmmInfo(uid) {
    // console.log('getEmmInfo')
    let signupUrlName = null
    let enterpriseId = null
    try {
      const db = this.$firebaseFirestore
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists) {
        const userData = docSnap.data()
        // console.log('userData', userData)

        signupUrlName = userData.signupUrlName
        console.log('signupUrlName', signupUrlName)
        enterpriseId = userData.enterpriseId
        console.log('enterpriseId', enterpriseId)
      } else {
        console.log('No such document!')
        return null
      }
    } catch (error) {
      console.error('Error getting document:', error)
    }
    return { signupUrlName, enterpriseId }
  }

  inject('getEmmInfo', getEmmInfo)
}

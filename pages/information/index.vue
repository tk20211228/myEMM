<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-row justify="center">
            <v-col
              cols="6"
              class="mt-10 pa-5 d-flex justify-space-around text-h5"
              >お知らせ</v-col
            >
            <v-expansion-panels class="mb-6">
              <v-expansion-panel
                v-for="(announcement, i) in announcements"
                :key="announcement.id"
                @click="markAsRead(i)"
              >
                <v-expansion-panel-header
                  disable-icon-rotate
                  expand-icon="mdi-menu-down"
                >
                  <p>{{ announcement.title }}</p>
                  <template #actions>
                    <v-icon :color="iconColor(announcement.read)">{{
                      iconType(announcement.read)
                    }}</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>{{ announcement.body }}</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  setDoc,
} from 'firebase/firestore'
export default {
  async asyncData({ app }) {
    const announcementsRef = collection(app.$firebaseFirestore, 'announcements')
    const queryAnnouncements = query(
      announcementsRef,
      orderBy('updatedAt', 'desc')
    )
    const snapshot = await getDocs(queryAnnouncements)
    const announcements = []
    snapshot.forEach((doc) => {
      const announcement = doc.data()
      announcement.id = doc.id
      announcements.push(announcement)
    })
    return {
      announcements,
    }
  },

  data: () => ({
  }),
  computed: {
    iconColor() {
      return (read) => (read ? 'teal' : 'error')
    },
    iconType() {
      return (read) => (read ? 'mdi-check' : 'mdi-alert-circle')
    },
  },
  async created() {
    // ログイン情報が利用可能になるまで待機
    const uid = await this.$store.getters['auth-firebase/getUserUid']
    const db = this.$firebaseFirestore

    // user_read_announcements コレクションから既読情報を取得
    const userReadAnnouncementsRef = collection(db, 'user_read_announcements')
    const userReadAnnouncementsQuery = query(
      userReadAnnouncementsRef,
      where('userId', '==', uid)
    )
    const querySnapshot = await getDocs(userReadAnnouncementsQuery)
    // 既読情報を格納するためのオブジェクトを作成
    const readAnnouncements = {}
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      readAnnouncements[data.announcementId] = data.read
    })
    console.log('readAnnouncements')
    console.log(readAnnouncements)
    // 既読情報を元に、announcementsデータを更新
    this.announcements = this.announcements.map((announcement) => ({
      ...announcement,
      read: readAnnouncements[announcement.id] || false,
    }))
  },
  methods: {
    async markAsRead(i) {
      // 既読フラグを立てる
      this.announcements[i].read = true

      // ユーザーIDを取得
      const userId = this.$store.getters['auth-firebase/getUserUid']
      console.log('userId')
      console.log(userId)

      // 既読情報をFirestoreに保存
      const userReadAnnouncementsRef = collection(
        this.$firebaseFirestore,
        'user_read_announcements'
      )
      const userReadAnnouncementsDoc = doc(
        userReadAnnouncementsRef,
        `${userId}_${this.announcements[i].id}`
      )
      const data = {
        userId,
        announcementId: this.announcements[i].id,
        read: true,
      }
      console.log('data')
      console.log(data)
      await setDoc(userReadAnnouncementsDoc, data)
    },
  },
}
</script>

<style scoped>
p {
  white-space: pre-line;
}
</style>

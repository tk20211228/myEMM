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

            <!-- カード -->

            <v-row align="stretch" class="mb-12">
              <!-- <v-col
                v-for="(card, index) in cards"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
                class="mb-3 d-flex"
              > -->
              <v-col
                v-for="(card, index) in cards"
                :key="index"
                cols="12"
                class="mb-3 d-flex"
              >
                <v-card class="d-flex flex-column" height="100%" width="100%">
                  <!-- <v-card-title class="justify-center card-title">
                    {{ card.title }}
                  </v-card-title> -->
                  <v-img
                    class="card-image"
                    :src="'/' + card.image"
                    position="top"
                    contain
                  ></v-img>
                  <!-- <v-card-text class="px-11 flex-grow-1">
                    <p>{{ card.description }}</p>
                  </v-card-text> -->
                  <!-- <v-card-actions class="mb-4 justify-center">
                    <v-btn :to="card.to" color="primary" outlined rounded>
                      「 {{ card.title }} 」はこちら</v-btn
                    >
                  </v-card-actions> -->
                </v-card>
              </v-col>
            </v-row>
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
    cards: [
      {
        title: 'デバイス管理',
        description:
          'Android Management API を活用しています\n この API は、幅広いデバイス管理機能を提供しています。\n また、企業の情報漏えいリスクを低減できます。',
        to: '/device',
        image: 'resized_image512_1.3_2023_0422_032858.png',
      },
      // {
      //   title: 'MDM 初期設定',
      //   description:
      //     'Android Management API を利用する前に、まずエンタープライス登録が必要です。\n この登録によって、企業や組織のアカウントが作成され、API の各種機能を使用できるようになります。',
      //   to: 'setting/enterprise-create',
      //   image: 'image_200_2023_0416_081024.png',
      // },
      // {
      //   title: '読書ログ',
      //   description:
      //     'Google Books API を用いて、読書ログの管理が簡単にできます。\n この API を使えば、ユーザーは自分の読書履歴や現在読んでいる本、読みたい本のリストを作成・編集・保存できます。',
      //   to: '/book',
      //   image: 'image_200_2023_0416_081117.png',
      // },
      // {
      //   title: 'Vuex',
      //   description: 'Vuexを機能理解するために作成したTEST画面です。',
      //   to: '/legacy/vuextest',
      //   image: 'image_200_2023_0416_081117.png',
      // },
    ],
    // uid: this.$store.state.auth.user.uid,
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

.card-image {
  width: 100%;
  max-width: 250px; /* 画像の最大幅を設定 */
  margin: 16px auto; /* 上下のマージンを16pxに設定し、左右のマージンを自動調整 */
}

.card-title {
  font-size: 1.3em; /* タイトルのフォントサイズを1.5倍に設定 */
}
</style>

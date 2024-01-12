<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4" class="mt-16 pa-5">
        <v-form ref="form" @submit.prevent="submit">
          <v-text-field
            v-model="announcement.title"
            label="タイトル"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <v-textarea
            v-model="announcement.body"
            label="詳細"
            :rules="[rules.required]"
            required
          ></v-textarea>

          <!-- <v-combobox
            v-model="selectedCategories"
            :filter="filter"
            :hide-no-data="!search"
            :items="items"
            :search-input.sync="search"
            :rules="[rules.required]"
            hide-selected
            label="カテゴリ"
            multiple
            small-chips
            solo
          >
            <template #no-data>
              <v-list-item>
                <span class="subheading">Create</span>
                <v-chip
                  :color="`${colors[colorIndex - 1]} lighten-3`"
                  label
                  small
                >
                  {{ search }}
                </v-chip>
              </v-list-item>
            </template>
            <template #selection="{ attrs, item, parent, selected }">
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :color="`${item.color} lighten-3`"
                :input-value="selected"
                label
                small
              >
                <span class="pr-2">
                  {{ item.text }}
                </span>
                <v-icon small @click="parent.selectItem(item)">
                  $delete
                </v-icon>
              </v-chip>
            </template>
            <template #item="{ index, item }">
              <v-text-field
                v-if="editing === item"
                v-model="editing.text"
                autofocus
                flat
                background-color="transparent"
                hide-details
                solo
                @keyup.enter="edit(index, item)"
              ></v-text-field>
              <v-chip
                v-else
                :color="`${item.color} lighten-3`"
                dark
                label
                small
              >
                {{ item.text }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-btn icon @click.stop.prevent="edit(index, item)">
                  <v-icon>{{
                    editing !== item ? 'mdi-pencil' : 'mdi-check'
                  }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-combobox> -->
          <v-switch
            v-model="enableSubmit"
            :disabled="isUpdating"
            class="ma-2"
            color="green lighten-2"
            hide-details
            label="投稿を有効にする"
          ></v-switch>

          <v-btn
            :disabled="!enableSubmit"
            :loading="isUpdating"
            class="ma-2"
            type="submit"
            color="primary"
            depressed
            @click="isUpdating = true"
            >投稿する</v-btn
          >

          <v-switch
            v-model="enableReset"
            :disabled="isUpdating"
            class="ma-2"
            color="green lighten-2"
            hide-details
            label="リセットを有効にする"
          ></v-switch>
          <v-btn :disabled="!enableReset" class="ma-2" @click="reset"
            >リセット</v-btn
          >
        </v-form>
        <v-col>
          <!-- {{ myIP }} -->
        </v-col>
        <v-col>
          <!-- {{ myIPBase64 }} -->
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
// import { Base64 } from 'js-base64'
// import {collection, addDoc,} from 'firebase/firestore'
export default {
  data() {
    return {
      enableSubmit: false,
      enableReset: false,
      isUpdating: false,
      announcement: {
        title: '',
        body: '',
        author: '',
      },
      rules: {
        required: (value) => !!value || '入力が必要です。',
      },
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      items: [
        { header: 'カテゴリを選択してください' },
        {
          text: 'おしらせ',
          color: 'blue',
        },
        {
          text: '重要なお知らせ',
          color: 'red',
        },
      ],
      colorIndex: 1,
      menu: false,
      selectedCategories: [
        {
          text: 'メンテナンス',
          color: 'green',
        },
      ],
      x: 0,
      search: null,
      y: 0,
    }
  },
  computed: {
    // myIP() {
    //   let ipInfo = 'TEST'
    //   try {
    //     ipInfo = this.$store.getters['auth-firebase/getUserIpInfoIo']
    //   } catch (e) {
    //     ipInfo = e.message
    //   }
    //   return ipInfo
    // },
    // myIPBase64() {
    //   let ipInfo = 'TEST-Base64'
    //   try {
    //     ipInfo = Base64.encode(JSON.stringify(this.myIP))
    //   } catch (e) {
    //     ipInfo = e.message
    //   }
    //   return ipInfo
    // },
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    selectedCategories(val, prev) {
      if (val.length === prev.length) return
      this.selectedCategories = val.map((v) => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.colorIndex - 1],
          }

          this.items.push(v)

          this.colorIndex++
        }

        return v
      })
    },
  },

  methods: {
    // フォームに関連するメソッド
    submit() {
      if (this.$refs.form.validate()) {
        // フォームのデータがバリデーションに合格した場合、データを送信する処理を行います。
        // console.log('TEST')
        // console.log(this.$store.getters['auth-firebase/getUserUid'])
        this.postAnnouncement()
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    // お知らせに関連するメソッド
    async postAnnouncement() {
      this.announcement.author = this.$store.getters['auth-firebase/getUserUid']
      // console.log(this.announcement.author)
      const userId = this.announcement.author
      // const userIpInfoIo = this.$store.getters['auth-firebase/getUserIpInfoIo']
      // console.log(userIpInfoIo)
      // const userIpInfoIoBase64 = Base64.encode(JSON.stringify(userIpInfoIo))
      // this.myIPBase64 = userIpInfoIoBase64

      // console.log(userIpInfoIo)
      // お知らせのデータをデータベースに保存する処理を実装します。
      // 例えば、Firebase の Firestore を使用してデータを保存する場合:

      try {
        const auth = getAuth(this.$firebase)
        const token = await auth.currentUser.getIdToken()
        // console.log(token)
        // const res =
        await this.$axios.$post('announcements', this.announcement, {
          headers: {
            authorization: `Bearer ${token}`,
            // userIpInfoIo: userIpInfoIoBase64, // JSONを文字列に変換してBase64エンコード
            userId,
          },
        })
        // console.log(res)
        // const db = this.$firebaseFirestore
        // const docRef = await addDoc(
        //   collection(db, 'announcements'),
        //   this.announcement
        // )
        // console.log('Document written with ID: ', docRef.id)
        this.$refs.form.reset()
      } catch (error) {
        console.error('Error posting announcement:', error)
      }
    },
    // カテゴリに関連するメソッド
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = (val) => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return (text ? text.toString().toLowerCase() : '').includes(
        query ? query.toString().toLowerCase() : ''
      )
    },
  },
}
</script>

<style></style>

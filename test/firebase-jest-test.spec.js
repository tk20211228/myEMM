// setup.js
// import Vue from 'vue'
// import Vuetify from 'vuetify'

// import { createLocalVue, mount } from '@vue/test-utils'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import firebasetestJestTest from '@/pages/firebasetest/jest-test'

// Vue.use(Vuetify)

// describe('NuxtLogo', () => {
//   test('is a Vue instance', () => {
//     const wrapper = mount(NuxtLogo)
//     expect(wrapper.vm).toBeTruthy()
//   })
// })
// describe('全文確認', () => {
//   test('すべての文字が指定どおりにふくまれているか', () => {
//     const wrapper = mount(firebasetestJestTest)
//     expect(wrapper.text()).toBe('Hello World 0 + 1 Nuxt.jsでjest')
//   })
// })

// describe('div検索', () => {
//   it('指定したクラスに「Nuxt.jsでjest」が含まれているか確認', () => {
//     const wrapper = mount(firebasetestJestTest)
//     const temDiv = wrapper.find('.temtitle')
//     expect(temDiv.text()).toBe('Nuxt.jsでjest')
//   })
// })

describe('カウント確認', () => {
  const localVue = createLocalVue()
  // let vuetify

  // beforeEach(() => {
  //   vuetify = new Vuetify() // 2. テストごとに初期化
  // })

  it('クリックしたときにカウントが増えるか', async () => {
    const wrapper = shallowMount(firebasetestJestTest, {
      localVue,
      stubs: {
        // 2. stubs オプション追加
        'v-btn': true,
      },
    })
    const btn = wrapper.find(`[data-test="btn"]`)
    await btn.trigger('click')
    expect(wrapper.vm.$data.count).toBe(0)

    await btn.vm.$emit('click')
    expect(wrapper.vm.$data.count).toBe(1) // 4. emit すると増える
  })
})

<template>
  <div>
    <!-- <div>
      <v-img :src="avatarUrl" contain class="avatar-image"></v-img>
    </div> -->
    <v-select
      v-model="selectedTopType"
      :items="topTypeOptions"
      label="ヘアスタイル"
      @change="updateAvatar('topType', $event)"
    ></v-select>
    <v-select
      v-model="selectedAccessoriesType"
      :items="accessoriesTypeOptions"
      label="アクセサリー"
      @change="updateAvatar('accessoriesType', $event)"
    ></v-select>
    <v-select
      v-model="selectedHairColor"
      :items="hairColorOptions"
      label="髪色"
      @change="updateAvatar('hairColor', $event)"
    ></v-select>
    <v-select
      v-model="selectedFacialHairType"
      :items="facialHairTypeOptions"
      label="髭"
      @change="updateAvatar('facialHairType', $event)"
    ></v-select>
    <v-select
      v-model="selectedClotheType"
      :items="clotheTypeOptions"
      label="服"
      @change="updateAvatar('clotheType', $event)"
    ></v-select>
    <v-select
      v-model="selectedEyeType"
      :items="eyeTypeOptions"
      label="目"
      @change="updateAvatar('eyeType', $event)"
    ></v-select>
    <v-select
      v-model="selectedEyebrowType"
      :items="eyebrowTypeOptions"
      label="眉"
      @change="updateAvatar('eyebrowType', $event)"
    ></v-select>
    <v-select
      v-model="selectedMouthType"
      :items="mouthTypeOptions"
      label="口"
      @change="updateAvatar('mouthType', $event)"
    ></v-select>
    <v-select
      v-model="selectedSkinColor"
      :items="skinColorOptions"
      label="肌"
      @change="updateAvatar('skinColor', $event)"
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTopType: this.$store.state.avatar.avatar.topType,
      selectedAccessoriesType: this.$store.state.avatar.avatar.accessoriesType,
      selectedHairColor: this.$store.state.avatar.avatar.hairColor,
      selectedFacialHairType: this.$store.state.avatar.avatar.facialHairType,
      selectedClotheType: this.$store.state.avatar.avatar.clotheType,
      selectedEyeType: this.$store.state.avatar.avatar.eyeType,
      selectedEyebrowType: this.$store.state.avatar.avatar.eyebrowType,
      selectedMouthType: this.$store.state.avatar.avatar.mouthType,
      selectedSkinColor: this.$store.state.avatar.avatar.skinColor,
      topTypeOptions:
        'NoHair,Hat,Eyepatch,Hijab,Turban,WinterHat1,WinterHat2,WinterHat3,WinterHat4,LongHairBigHair,LongHairBob,LongHairBun,LongHairCurly,LongHairCurvy,LongHairDreads,LongHairFrida,LongHairFro,LongHairFroBand,LongHairNotTooLong,LongHairShavedSides,LongHairMiaWallace,LongHairStraight,LongHairStraight2,LongHairStraightStrand,ShortHairDreads01,ShortHairDreads02,ShortHairFrizzle,ShortHairShaggyMullet,ShortHairShortCurly,ShortHairShortFlat,ShortHairShortRound,ShortHairShortWaved,ShortHairSides,ShortHairTheCaesar,ShortHairTheCaesarSidePart'.split(
          ','
        ),
      accessoriesTypeOptions:
        'Blank,Kurt,Prescription01,Prescription02,Round,Sunglasses,Wayfarers'.split(
          ','
        ),
      hairColorOptions:
        'Auburn,Black,Blonde,BlondeGolden,Brown,BrownDark,PastelPink,Blue,Platinum,Red,SilverGray'.split(
          ','
        ),
      facialHairTypeOptions:
        'Blank,BeardMedium,BeardLight,BeardMajestic,MoustacheFancy,MoustacheMagnum'.split(
          ','
        ),
      clotheTypeOptions:
        'BlazerShirt,BlazerSweater,CollarSweater,GraphicShirt,Hoodie,Overall,ShirtCrewNeck,ShirtScoopNeck,ShirtVNeck'.split(
          ','
        ),
      eyeTypeOptions:
        'Close,Cry,Default,Dizzy,EyeRoll,Happy,Hearts,Side,Squint,Surprised,Wink,WinkWacky'.split(
          ','
        ),
      eyebrowTypeOptions:
        'Angry,AngryNatural,Default,DefaultNatural,FlatNatural,RaisedExcited,RaisedExcitedNatural,SadConcerned,SadConcernedNatural,UnibrowNatural,UpDown,UpDownNatural'.split(
          ','
        ),
      mouthTypeOptions:
        'Concerned,Default,Disbelief,Eating,Grimace,Sad,ScreamOpen,Serious,Smile,Tongue,Twinkle,Vomit'.split(
          ','
        ),
      skinColorOptions: 'Tanned,Yellow,Pale,Light,Brown,DarkBrown,Black'.split(
        ','
      ),
    }
  },
  computed: {
    avatarUrl() {
      const avatar = this.$store.state.avatar.avatar
      let url = 'https://avataaars.io/?'
      Object.entries(avatar).forEach(([key, value], i) => {
        url += `${key}=${value}`
        if (i !== Object.entries(avatar).length - 1) {
          url += '&'
        }
      })
      return url
    },
  },
  methods: {
    updateAvatar(key, value) {
      // const newAvatar = { ...this.$store.state.avatar }
      const newAvatar = { ...this.$store.state.avatar.avatar }
      newAvatar[key] = value
      this.$store.commit('avatar/UPDATE_AVATAR', newAvatar)
    },
  },
}
</script>

<style scoped>
.avatar-image {
  display: flex;
  width: 150px;
  height: 150px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

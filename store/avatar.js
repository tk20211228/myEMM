export const state = () => ({
  avatar: {
    avatarStyle: 'Circle',
    topType: 'LongHairStraight',
    accessoriesType: 'Blank',
    hairColor: 'BrownDark',
    facialHairType: 'Blank',
    clotheType: 'BlazerShirt',
    eyeType: 'Default',
    eyebrowType: 'Default',
    mouthType: 'Default',
    skinColor: 'Light',
  },
})

export const mutations = {
  UPDATE_AVATAR(state, newAvatar) {
    state.avatar = newAvatar
  },
}

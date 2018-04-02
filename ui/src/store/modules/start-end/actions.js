
export default {
  'SAVE': ({ commit }, obj) => {
    console.log(obj)
    commit('SAVE', obj)
  }
}

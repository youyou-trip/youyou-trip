
export default {
  'SAVE': (({commit}, obj) => {
    commit('SAVE', obj)
  }),
  'User': (({commit}, obj) => {
    commit('setUser', obj)
  }),
  'City':(({commit},obj)=>{
  	commit('setCity',obj)
  }),
  'deleteCity':(({commit},obj)=>{
  	commit('deleteCity',obj)
  }),
  'ClearCity':(({commit},obj)=>{
    commit('clearCity',obj)
  }),
  'AddCity':(({commit},obj)=>{
    commit('addCity',obj)
  })
}

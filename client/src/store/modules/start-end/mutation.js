import {SAVE} from '../../types'

export default {
  [SAVE] (state, obj) {
    state.start = obj.start
    state.end = obj.end
  },
  setUser (state, obj) {
  	state.user = obj
  },
  setCity (state,obj){
  	state.city.push(obj)
  },
  deleteCity (state,obj){
  	let k = 0;
  	for(let i = 0;i < state.city.length; i ++){
  		if(state.city[i].name==obj.name){
  			k = i;
   			break;
  		}
  	}
  	state.city.splice(k,1);
  }
}
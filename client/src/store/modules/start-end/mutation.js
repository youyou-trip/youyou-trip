import {SAVE} from '../../types'

export default {
  [SAVE] (state, obj) {
    state.start = obj.start
    state.end = obj.end
  }
}
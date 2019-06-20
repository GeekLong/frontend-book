import * as types from './mutations-types';

export default {
  [types.SET_USERIFMS] (state, payload) {
    state.userIfms = payload;
  }
}
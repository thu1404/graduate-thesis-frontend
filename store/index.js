// import { createStore } from 'vuex';
// import user from './modules/user';

// export default createStore({
//   modules: {
//     user,
//   }
// });
export const state = () => ({
  user: null,
});
export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};
export const actions = {
  storeUser({ commit }, user) {
    commit('setUser', user);
  },
  removeUser({ commit }) {
    commit('setUser', null);
  },
};
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },
  getUser(state) {
    return state.user;
  },
};

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'https://lit-brook-85851.herokuapp.com/api/user/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.headers.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
            // eslint-disable-next-line
            console.log(resp.headers.token);
            Vue.toasted.show( 'Authenticated', {  
              icon: 'fingerprint',
              theme: "toasted-primary", 
              position: "bottom-center", 
              duration : 3000
              })
          })
          .catch(err => {
            const pesanerr = err.response.data.message
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
            // eslint-disable-next-line
            console.log(pesanerr);
            Vue.toasted.show( pesanerr, {  
              icon: 'assignment_late',
              theme: "toasted-primary", 
              position: "bottom-center", 
              duration : 3000
              })
          })
        })
    },
    register({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'https://lit-brook-85851.herokuapp.com/api/user/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.headers.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
            // eslint-disable-next-line
            console.log(resp);
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
            // eslint-disable-next-line
            console.log(err.response);
          })
        })
      },
      logout({commit}){
        return new Promise((resolve, ) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})

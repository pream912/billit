import * as firebase from 'firebase'


const state = {
    loadedCustomers: [],
    loadingCustomers: false,
}

const mutations = {
    setLoadedCustomers (state, payload) {
        state.loadedCustomers = payload
    },
    createCustomer (state, payload) {
        state.loadedCustomers.push(payload)
    },
    setLoadingCustomers (state, payload) {
        state.loadingCustomers = payload
    },
}

const actions = {
    loadCustomers ({commit}) {
        commit('setLoadingCustomers', true)
        firebase.database().ref('customers').once('value')
          .then((data) => {
            const customers = []
            const obj = data.val()
            for (let key in obj) {
              customers.push({
                id: key,
                c_name: obj[key].c_name,
                phone: obj[key].phone,
                email: obj[key].email,
                address: obj[key].address,
                gst: obj[key].gst
              })
            }
            commit('setLoadedCustomers', customers)
            commit('setLoadingCustomers', false)
          })
      },
  
      createCustomer ({commit}, payload) {
        commit('setLoading', true)
        const customer = {
          c_name: payload.c_name,
          phone: payload.phone,
          email: payload.email,
          address: payload.address,
          gst: payload.gst,
        }
        firebase.database().ref('customers').push(customer)
          .then((data) => {
            const key = data.key
            commit('createCustomer', {
              ...customer,
              id: key
            })
          })
          commit('setLoading', false)
      },
}

const getters = {
    loadedCustomers (state) {
        return state.loadedCustomers
    },

    loadedCustomer (state) {
        return (cutomerId) => {
        return state.loadedCustomers.find((customer) => {
            return customer.id === cutomerId
            })
        }
    },

    loadingCustomers (state) {
        return state.loadingCustomers
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}

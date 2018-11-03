import * as firebase from 'firebase'


const state = {
    loadedProducts: [],
    loadingProducts: false,
}

const mutations = {
    setLoadedProducts (state, payload) {
        state.loadedProducts = payload
    },
    createProduct (state, payload) {
        state.loadedProducts.push(payload)
    },
    setLoadingProducts (state, payload) {
        state.loadingProducts = payload
    }
}

const actions = {
    loadProducts ({commit}) {
        commit('setLoadingProducts', true)
        firebase.database().ref('products').once('value')
          .then((data) => {
            const products = []
            const obj = data.val()
            for (let key in obj) {
              products.push({
                id: key,
                p_name: obj[key].p_name,
                hsn: obj[key].hsn,
                description: obj[key].description,
                code: obj[key].code,
                uom: obj[key].uom,
                gst: obj[key].gst,
                price: obj[key].price
              })
            }
            commit('setLoadedProducts', products)
            commit('setLoadingProducts', false)
        })
      },
      createProduct ({commit}, payload) {
        commit('setLoadingProducts', true)
        const product = {
          p_name: payload.p_name,
          hsn: payload.hsn,
          description: payload.description,
          code: payload.code,
          uom: payload.uom,
          gst: payload.gst,
          price: payload.price,
        }
        firebase.database().ref('products').push(product)
        .then((data) => {
          const key = data.key
          commit('createProduct', {
            ...product,
            id: key
          })
        })
        commit('setLoadingProducts', false)
    }
}

const getters = {
    loadedProducts (state) {
        return state.loadedProducts
    },
    loadedProduct (state) {
        return (productId) => {
          return state.loadedProducts.find((product) => {
            return product.id === productId
          })
        }
    },
    loadingProducts (state) {
        return state.loadingProducts
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}

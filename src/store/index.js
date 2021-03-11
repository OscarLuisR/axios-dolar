import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        loading : {
            titulo: '',
            estado: false
        }
    },
    mutations: {
        mostrarLoading(state, payload) {
            state.loading.titulo = payload.titulo;
            state.loading.estado = true;
        },

        ocultarLoading(state) {
            state.loading.estado = false;
        }
    },
    actions: {
        mostrarLoading({commit}, payload) {
            commit('mostrarLoading', payload);
        },

        ocultarLoading({commit}) {
            commit('ocultarLoading');
        },
    },
    modules: {
    }
});

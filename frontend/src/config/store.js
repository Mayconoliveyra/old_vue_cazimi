import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
        state: {
                hideNav: false /* Exibir/Esconder 'NavBar' */,
                user: null,
                carrinhoQtdItem: null,
                portal: false,
                infoEmpresa: null
        },
        mutations: {
                setUser(state, user) {
                        state.user = user
                        if (user) {
                                axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`
                        } else {
                                delete axios.defaults.headers.common["Authorization"]
                        }
                },
                /*armazera o valor total dos produtos + frete*/
                setCarrinhoQtd(state, carrinhoQtdItem) {
                        state.carrinhoQtdItem = carrinhoQtdItem
                },
                /* Exibir portal ou esconder */
                setPortal(state, status) {
                        state.portal = status
                },
                setInfoEmpresa(state, empresa) {
                        state.infoEmpresa = empresa
                }
        }
})
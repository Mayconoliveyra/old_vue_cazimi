import Vue from 'vue'
import App from './App.vue'
import "./config/bootstrap"
import "./config/msgs"
import './config/mq'

import store from "./config/store"
import router from "./config/router"

Vue.config.productionTip = false

/* Função global para exibir mascara de dinheiro  */
Vue.filter('maskDinheiro', (vlr, exibirRS = true) => {
  if (!Number(vlr)) return 'R$ 0,00'
  const valor = Number(vlr)
    .toFixed(2)
    .replace(".", ",")
    /* se retirar esse comentario da erro no js */
    //eslint-disable-next-line 
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  if (exibirRS) return `R$ ${valor}`; /* Exibir com  o simbolo R$ */
  return `${valor}`; /* Exibir sem simbolo R$ */
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


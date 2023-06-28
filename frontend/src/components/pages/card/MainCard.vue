<template>
  <div>
    <!-- DESKTOP -->
    <div v-if="desktopD_mobileM=='D'">
      <CardPadrao
        v-show="cardLayout=='PADRAO'"
        v-for="(mercadoria,x) in dataMercadorias"
        :key="mercadoria.codigo_mercadoria"
        :sequencia="x+1"
        :mercadoria="mercadoria"
        :utilitario="utilitario"
      ></CardPadrao>
    </div>
    <!-- MOBILE -->
    <div v-if="desktopD_mobileM=='M'">
      <CardPadraoMB
        v-show="cardLayout=='PADRAO'"
        v-for="(mercadoria,x) in dataMercadorias"
        :key="mercadoria.codigo_mercadoria"
        :sequencia="x+1"
        :mercadoria="mercadoria"
        :utilitario="utilitario"
      ></CardPadraoMB>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";
import CardPadrao from "./desktop/CardPadrao";
import CardPadraoMB from "./mobile/CardPadrao";
export default {
  name: "MainCardMercadoria",
  components: { CardPadrao, CardPadraoMB },
  props: {
    cardLayout: String /* Opção de qual card vai ser exibido */,
    desktopD_mobileM: String,
    dataMercadorias: Array /*  Objeto com os dados da mercadoria {nome_exibir, preco, quantidade ..} */,
    utilitario: Boolean,
  },
  mounted() {
    /* Função global para remover mercadoria do carrinho */
    this.$root.$on("removerMercadoria", (codigo_mercadoria) => {
      const url = `${baseApiUrl}/carrinho_add_remove/${codigo_mercadoria}`;
      axios
        .delete(url)
        .then(() => this.$root.$emit("getCarrinhoUsuario"))
        .catch(showError);
    });

    /* Função global para alterar a quantade da mercadoria no carrinho */
    this.$root.$on("alterarQuantidade", (codigo_mercadoria, novaQtd) => {
      const modelo = {
        quantidade: novaQtd,
      };
      const url = `${baseApiUrl}/carrinho_add_remove/${codigo_mercadoria}`;
      axios
        .post(url, modelo)
        .then(() => this.$root.$emit("getCarrinhoUsuario"))
        .catch(showError);
    });
  },
  beforeDestroy() {
    /* Destroy todos eventos para que não fique duplicados quando for aberto a pagina novamente */
    this.$root.$off("removerMercadoria", this.fn);
    this.$root.$off("alterarQuantidade", this.fn);
  },
};
</script>

<style lang="scs" scoped>
</style>
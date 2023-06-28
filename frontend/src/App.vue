<template>
  <div class="app">
    <MainTemplete />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, usuarioChave, showError } from "../global";
import MainTemplete from "./components/template/MainTemplete";

export default {
  name: "App",
  components: {
    MainTemplete,
  },
  data: function () {
    return {
      validaToken: true,
    };
  },
  methods: {
    async validadorToken() {
      this.validaToken = true;

      const json = localStorage.getItem(usuarioChave);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);
      this.$store.commit("setCarrinhoQtd", null);

      if (!userData) {
        // SE O TOKEN NÃO ESTIVER SETADO ENCAMINHA PARA PAGINA DE LOGIN
        this.validaToken = false;
        /*  this.$router.push({ name: "autenticacao" }); */
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validar_token`, userData); //VERIFICA SE O TOKEN AINDA É VALIDO

      if (res.data) {
        this.$store.commit("setUser", userData);
        this.loadCarrinhoQtd();
      } else {
        localStorage.removeItem(usuarioChave);
        this.$router.push({ name: "autenticacao" });
      }

      this.validaToken = false;
    },
    /*Atualiza a DIV do Header que mostra a quantidade de mercadorias que existe no carrinho */
    loadCarrinhoQtd() {
      const url = `${baseApiUrl}/carrinho_quantidade`;
      axios
        .get(url)
        .then((res) => this.$store.commit("setCarrinhoQtd", res.data))
        .catch(showError);
    },
    addMercadoriaCarrinho(id_mercadoria, quantidade) {
      const modeloCarrinho = {
        quantidade: quantidade,
      };
      const url = `${baseApiUrl}/carrinho_add_remove/${id_mercadoria}`;
      axios
        .post(url, modeloCarrinho)
        .then(() => this.loadCarrinhoQtd())
        .catch(showError);
    },
    loadInfoEmpresa() {
      const url = `${baseApiUrl}/publica/empresa`;
      axios
        .get(url)
        .then((res) => this.$store.commit("setInfoEmpresa", res.data));
    },
  },
  async created() {
    await this.validadorToken();
    await this.loadInfoEmpresa();

    this.$root.$on("addMercadoriaCarrinho", (id_mercadoria, quantidade) => {
      this.addMercadoriaCarrinho(id_mercadoria, quantidade);
    });

    this.$root.$on("getQtdItensCarrinho", () => this.loadCarrinhoQtd());
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
:root {
  --cor-header: #365eae; /* COR PRINCIPAL DA LOJA */
  --cor-footer: #003a6a; /* COR DO FOOTER */

  --cor-laranja: #ff6500; /* COR PRIMARIA DOS BOTOES */
  --cor-branca: #ffffff; /* COR SEGUNDARIA DOS BOTOES */
  --cor-verde: #029905; /* COR SEGUNDARIA DOS BOTOES */
  --cor-azul: #365dae; /* COR SEGUNDARIA DOS BOTOES */

  --color-font-1: #3a3a3a;
  --color-font-2: #7d7d7d;
  --color-font-3: #7d7d7d;
}
html,
body {
  height: 100%; /* Serve para a pagina ter 100% da altura */
}
* {
  font-family: Poppins, sans-serif;
  font-weight: normal;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.app {
  display: flex; /* tem que ser flex para os elementos filhos fize com 100% de altura */
  width: 100%;
  height: 100%;
}
.portal {
  min-height: 100vh;
  width: 100%;
}
/* .app-hide-sobre {
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 112px 3px 1fr 65px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "navbarr"
    "content"
    "footer";
} */
.bloq-selec-text {
  -webkit-touch-callout: none; /* iPhone OS, Safari */
  -webkit-user-select: none; /* Chrome, Safari 3 */
  -khtml-user-select: none; /* Safari 2 */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
}
.msgDefultErroToasted {
  font-size: 0.8rem !important;
  color: rgb(255, 255, 255) !important;
  background-color: rgb(232, 87, 66) !important;
  padding: 15px !important;
  border-radius: 4px !important;
  border: 1px solid rgb(223, 223, 223) !important;
  box-sizing: border-box !important;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px !important;
  white-space: nowrap;
}
.msgDefultSucessoToasted {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(114, 160, 118) !important;
  padding: 15px 0px 15px 20px !important;
  border-radius: 4px !important;

  border: 1px solid rgb(223, 223, 223) !important;
  box-sizing: border-box !important;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px !important;
}
.toasted-container {
  top: -10px !important;
}

button:active {
  outline-style: none !important;
  box-shadow: 0 0 0 0 !important;
  outline: 0 !important;
}
button:focus {
  outline-style: none !important;
  box-shadow: 0 0 0 0 !important;
  outline: 0 !important;
}
.validar-input {
  display: flex;
  align-items: center;
  color: rgb(231, 38, 38);
  margin-top: 0.3rem;
  font-size: 0.87rem;
  line-height: 0.875rem;
}
.btn-desabilitado {
  border: 1px solid rgb(182, 187, 194) !important;
  background-color: rgb(182, 187, 194) !important;
  color: rgb(255, 255, 255) !important;
}
.button-verde {
  background: #029905;
  height: 47px;
  border-radius: 4px;
  width: 100%;
  border: 0px;
  box-shadow: 0 1px 4px 0 rgb(20 20 20 / 24%);
  font-size: 0.7em;
  color: white;
  position: relative;
}
/* Utilizada em input com erro/invalido */
.input-erro {
  border-color: #d00 !important;
  box-shadow: 0 0 5px 1px rgb(221 0 0 / 60%) inset !important;
}
/* Utilizada para exibir as mensagens de erro/validação retornada do backend. */
/* Mensagem em vermelhor que aparece abaixo do input quando ta com erro */
.msg-exibir-erro {
  color: rgb(231, 38, 38);
  font-size: 0.7em;
  padding: 0px 3px !important;
  margin: 0px !important;
}

/* container com icone, global. */
.icone-h2 {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.icone-h2 h2 {
  padding: 0px;
  margin: 0px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #42464d;
  margin-left: 13px;
}
i,
svg {
  color: var(--cor-laranja);
}
</style>

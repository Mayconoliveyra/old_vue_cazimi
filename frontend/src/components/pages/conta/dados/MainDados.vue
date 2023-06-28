<template>
  <Desktop
    @saveEditDados="saveEditDados"
    :dataUsuario="dataUsuario"
    :msgExibir="msgExibir"
    :btnAlterar="btnAlterar"
    :displayEfeito="displayEfeito"
    v-if="this.$mq !='xs'"
  />
  <Mobile
    @saveEditDados="saveEditDados"
    :dataUsuario="dataUsuario"
    :msgExibir="msgExibir"
    :btnAlterar="btnAlterar"
    :displayEfeito="displayEfeito"
    v-else
  />
</template>

<script>
import axios from "axios";
import { showError, baseApiUrl, showMsg } from "../../../../../global";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default {
  name: "MainDados",
  components: { Desktop, Mobile },
  data() {
    return {
      dataUsuario: {},
      msgExibir: {
        nome: null,
        contato: null,
        cep: null,
        logradouro: null,
        numero: null,
        bairro: null,
        localidade: null,
        uf: null,
      },
      btnAlterar: false,
      displayEfeito: false,
    };
  },
  methods: {
    setMsg(msg) {
      eval(msg);
    },
    loadEnderecoUsuario() {
      const url = `${baseApiUrl}/conta/usuario_endereco`;
      axios
        .get(url)
        .then((res) => {
          this.dataUsuario = res.data;
          this.dataUsuario.api_endereco = Boolean(
            this.dataUsuario.api_endereco
          );
        })
        .catch(showError);
    },
    getEnderecoApi(cep) {
      const url = `${baseApiUrl}/api_endereco/${cep}`;
      axios
        .get(url)
        .then((res) => {
          this.dataUsuario.bairro = res.data.bairro;
          this.dataUsuario.localidade = res.data.localidade;
          this.dataUsuario.logradouro = res.data.logradouro;
          this.dataUsuario.uf = res.data.uf;
          this.dataUsuario.api_endereco = res.data.api_endereco;
        })
        .catch(showError);
    },
    saveEditDados() {
      const url = `${baseApiUrl}/conta/usuario_endereco`;
      axios
        .put(url, this.dataUsuario)
        .then(() => {
          this.setBtnDisplay(false, true);
          setTimeout(() => {
            this.setBtnDisplay(false, false);
          }, 900);
        })
        .catch((msg) => {
          this.setMsg(showMsg(msg));
        });
    },
    setBtnDisplay(btn = false, display = false) {
      this.btnAlterar = btn; /* Habilita/Desabilita btn Salvar alterações */
      this.displayEfeito = display; /* Da efeito na tela de cadastro quando for alterado */
    },
  },
  watch: {
    "dataUsuario.cep"(newCep, oldCep) {
      if (oldCep)
        if (newCep.length == 8) {
          this.getEnderecoApi(newCep);
        }
    },
    dataUsuario: {
      handler(new1, old) {
        if (old.email) this.setBtnDisplay(true, false);
        this.msgExibir = {
          nome: null,
          contato: null,
          cep: null,
          logradouro: null,
          numero: null,
          bairro: null,
          localidade: null,
          uf: null,
        };
      },
      deep: true,
    },
  },
  mounted() {
    /* Espera um pouco para que o token seja autenticado */
    setTimeout(() => {
      this.loadEnderecoUsuario();
    }, 100);
  },
};
</script>
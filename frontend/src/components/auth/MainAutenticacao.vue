<template>
  <Desktop
    :login="login"
    :cadastrar="cadastrar"
    :msgExibir="msgExibir"
    @cadastrarUsuario="cadastrarUsuario()"
    @loginUsuario="loginUsuario()"
    v-if="this.$mq !='xs'"
  />
  <Mobile
    :login="login"
    :cadastrar="cadastrar"
    :msgExibir="msgExibir"
    :telaExibir="telaExibir"
    @cadastrarUsuario="cadastrarUsuario()"
    @loginUsuario="loginUsuario()"
    v-else
  />
</template>

<script>
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import axios from "axios";
import { baseApiUrl, showMsg, usuarioChave } from "./../../../global";

export default {
  name: "MainAutenticacao",
  components: { Desktop, Mobile },
  data() {
    return {
      telaExibir: { op: "" } /* C= Cadastrar; L= Login */,
      cadastrar: {},
      login: {},
      msgExibir: {
        lemail: null /* login */,
        lsenha: null /* login */,
        nome: null,
        email: null,
        senha: null,
        confirmaSenha: null,
        contato: null,
        cpf_cnpj: null,
        cep: null,
        outras: null,
        outrasErro: null,
      },
    };
  },
  methods: {
    setMsg(msg) {
      eval(msg);
    },
    reset(cadastrar = true, login = true, msgExibir = true) {
      if (cadastrar) {
        this.cadastrar = {};
      }
      if (login) {
        this.login = {};
      }
      if (msgExibir) {
        this.msgExibir = {
          lemail: null /* login */,
          lsenha: null /* login */,
          nome: null,
          email: null,
          senha: null,
          confirmaSenha: null,
          contato: null,
          cpf_cnpj: null,
          cep: null,
          outras: null,
          outrasErro: null,
        };
      }
    },
    cadastrarUsuario() {
      axios
        .post(`${baseApiUrl}/conta`, this.cadastrar)
        .then((res) => {
          const tempEmail = this.cadastrar.email;
          this.reset(true, false, true);
          this.login.email = tempEmail;
          this.telaExibir.op = "L";
          this.setMsg(showMsg(res));
        })
        .catch((msg) => {
          this.reset(false, true, true);
          this.setMsg(showMsg(msg));
        });
    },
    async loginUsuario() {
      axios
        .post(`${baseApiUrl}/entrar`, this.login)
        .then((res) => {
          if (!res.data.codigo_autenticacao) {
            localStorage.removeItem(usuarioChave);
            this.$store.commit("setUser", {});
            return;
          }
          this.$store.commit("setUser", res.data);
          localStorage.setItem(usuarioChave, JSON.stringify(res.data));
          this.$root.$emit("getQtdItensCarrinho");
          this.$router.push({ path: "/" });
        })
        .catch((msg) => {
          this.login.senha = null;
          this.reset(false, false, true);
          this.setMsg(showMsg(msg));
        });
    },
  },
  created() {
    this.telaExibir.op = this.$route.query.telaExibir; /*C= Tela cadastrar; L= Tela Login */
    this.login.email = this.$route.query.email; /* Pega o email para ajudar facilitar */
    this.setMsg(this.$route.query.msg); /* Seta mensagem inforamticas/erros */

    /* Se vim email e hash, executar a função para autenticar o usuario*/
    if (this.$route.query.email && this.$route.hash) {
      /* Remover o '#' quem vem no inicio como padrão por causa do elemento hash */
      const modelo = {
        email: this.$route.query.email,
        hash: this.$route.hash.replace("#", ""),
      };
      const url = `${baseApiUrl}/publica/autenticar_usuario`;
      axios.post(url, modelo);
    }
  },
};
</script>
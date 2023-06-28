<template>
  <Desktop
    @recuperar="recuperar()"
    @cadastrarNovaSenha="cadastrarNovaSenha()"
    :usuario="usuario"
    :msgExibir="msgExibir"
    v-if="this.$mq !='xs'"
  />
  <Mobile
    @recuperar="recuperar()"
    @cadastrarNovaSenha="cadastrarNovaSenha()"
    :usuario="usuario"
    :msgExibir="msgExibir"
    v-else
  />
</template>

<script>
import Desktop from "./Desktop";
import Mobile from "./Mobile";

import axios from "axios";
import { baseApiUrl, showMsg } from "../../../../global";
export default {
  name: "RecuperarSenhaMain",
  components: { Desktop, Mobile },
  data() {
    return {
      usuario: {
        email: null,
        senha: null,
        confirmaSenha: null,
        outras: null,
        hash: null,
      },
      msgExibir: {
        email: null,
        senha: null,
        confirmaSenha: null,
        outras: null,
        hash: null,
      },
    };
  },
  methods: {
    recuperar() {
      const url = `${baseApiUrl}/publica/enviar_email_recuperar_senha`;
      axios
        .post(url, this.usuario)
        .then((res) => {
          /* REDIRECIONA PARA A TELA DE LOGIN */
          this.$router.push({
            path: "/autenticacao",
            query: {
              email: this.usuario.email /* Email para já ser setado no input */,
              msg: showMsg(res) /* Mensagem retornada do backend */,
              telaExibir: "L" /* L = tela de login */,
            },
          });
        })
        .catch((erro) => {
          this.setMsg(showMsg(erro));
        });
    },
    cadastrarNovaSenha() {
      const url = `${baseApiUrl}/publica/cadastrar-nova-senha`;
      axios
        .post(url, this.usuario)
        .then((res) => {
          this.setMsg(showMsg(res));
        })
        .catch((erro) => {
          /* REDIRECIONA PARA A TELA DE LOGIN */
          this.$router.push({
            path: "/autenticacao",
            query: {
              email: null /* Email para já ser setado no input */,
              msg: showMsg(erro) /* Mensagem retornada do backend */,
              telaExibir: "L" /* L = tela de login */,
            },
          });
        });
    },
    setMsg(msg) {
      eval(msg);
    },
  },
  watch: {
    usuario: {
      handler() {
        this.msgExibir = {
          email: null,
          senha: null,
          confirmaSenha: null,
          outras: null,
        };
      },
      deep: true,
    },
  },
  created() {
    /* Se vim email e hash nos query, habilita tela de criar nova senha*/
    if (this.$route.query.email && this.$route.hash) {
      this.usuario.email = this.$route.query.email;
      this.usuario.hash = this.$route.hash.replace("#", "");
      /* Remover o '#' quem vem no inicio como padrão por causa do elemento hash */
    }
  },
};
</script>

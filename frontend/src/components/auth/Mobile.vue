<template>
  <div class="mobile-autenticacao">
    <article class="cadastrar-login">
      <form class="bloco">
        <div @click="setTelaExibir('C')" class="bloco-1">
          <b-icon v-if="telaExibir.op=='C'" icon="chevron-double-right"></b-icon>
          <b-icon v-else icon="chevron-double-down"></b-icon>
          <label class="ctn-opcao-text" for="opcao-1">
            <span>FAZER CADASTRO</span>
            <span>Ainda não é cadastrado no site?</span>
          </label>
        </div>
        <Cadastrar
          @cadastrarUsuario="$emit('cadastrarUsuario')"
          :cadastrar="cadastrar"
          :msgExibir="msgExibir"
          v-if="telaExibir.op=='C'"
        />
      </form>
      <form class="bloco">
        <div @click="setTelaExibir('L')" class="bloco-1">
          <b-icon v-if="telaExibir.op=='L'" icon="chevron-double-right"></b-icon>
          <b-icon v-else icon="chevron-double-down"></b-icon>
          <label class="ctn-opcao-text" for="opcao-1">
            <span>JA É CADASTRADO?</span>
            <span>Entre com seus dados de login e senha.</span>
          </label>
        </div>
        <Login
          @loginUsuario="$emit('loginUsuario')"
          :login="login"
          :msgExibir="msgExibir"
          v-if="telaExibir.op=='L'"
        />
      </form>
    </article>
  </div>
</template>

<script>
import Cadastrar from "./mobile/Cadastrar";
import Login from "./mobile/Login";
export default {
  name: "MobileCadastrar",
  components: { Cadastrar, Login },
  props: {
    cadastrar: {},
    login: {},
    msgExibir: {},
    telaExibir: {} /* C= Cadastrar; L= Login */ /* Apenas para template Mobile */,
  },
  emits: ["cadastrarUsuario", "loginUsuario"],
  methods: {
    /* Apenas para template Mobile */
    /* C= Cadastrar; L= Login */
    setTelaExibir(opc) {
      if (this.telaExibir.op == opc) {
        this.telaExibir.op = "";
      } else {
        this.telaExibir.op = opc;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.mobile-autenticacao {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(250, 250, 251);
  /*  min-height: calc(100vh - 150px); */
}
.cadastrar-login {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 12px 0px;
}
.bloco {
  border-bottom: 1px solid #e6e6e6;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.bloco-1 {
  display: flex;
  align-items: center;
}
.bloco svg {
  font-size: 22px;
  margin-right: 12px;
  margin-bottom: 25px;
}
.ctn-opcao-text {
  display: flex;
  flex-direction: column;
}
.ctn-opcao-text span:nth-child(1) {
  color: var(--cor-laranja);
  margin-bottom: 2px;
  font-size: 1.2em;
  font-weight: bold;
}
.ctn-opcao-text span:nth-child(2) {
  color: #7d7d7d;
  font-size: 1em;
}
</style>
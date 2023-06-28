<template>
  <div class="desktop-autenticacao">
    <div class="autenticacao-exibir">
      <Login @loginUsuario="$emit('loginUsuario')" :login="login" :msgExibir="msgExibir" />
      <div class="barra"></div>
      <Cadastrar
        @cadastrarUsuario="$emit('cadastrarUsuario')"
        :cadastrar="cadastrar"
        :msgExibir="msgExibir"
      />
    </div>
  </div>
</template>

<script>
import Cadastrar from "./desktop/Cadastrar";
import Login from "./desktop/Login";
export default {
  name: "MobileCadastrar",
  components: { Cadastrar, Login },
  props: {
    cadastrar: {},
    login: {},
    msgExibir: {},
  },
  emits: ["cadastrarUsuario", "loginUsuario"],
};
</script>

<style lang="css" scoped>
.desktop-autenticacao {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(250, 250, 251);
  min-height: calc(100vh - 150px);
}
.autenticacao-exibir {
  max-width: 1200px;
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 30px 15px;
}
.barra {
  display: flex;
  width: 2px;
  background-color: rgb(242, 243, 244);
  margin: 0px 32px;
}
</style>
<template>
  <form class="login" @keyup.enter="$emit('loginUsuario')">
    <div class="msg-exibir-outras" v-show="msgExibir.outras">
      <div class="titulo-msg">
        <b-icon icon="check2-square" style="color: #3ba80c;" scale="1.8" class="mr-3"></b-icon>
        <h4>Operação realizada</h4>
      </div>
      {{msgExibir.outras}}
    </div>
    <div class="msg-exibir-outras-erro" v-show="msgExibir.outrasErro">
      <div class="titulo-msg">
        <b-icon icon="exclamation-triangle" style="color: #c40000;" scale="1.8" class="mr-3"></b-icon>
        <h4 class="h4-erro">Houve um problema</h4>
      </div>
      {{msgExibir.outrasErro}}
    </div>
    <b-form-group class="mt-3">
      <input
        maxlength="191"
        :class="{'input-erro':msgExibir.lemail}"
        type="text"
        placeholder="EMAIL"
        name="lemail"
        v-model="login.email"
      />
      <label v-show="msgExibir.lemail" class="msg-exibir-erro">{{msgExibir.lemail}}</label>
    </b-form-group>
    <b-form-group>
      <input
        maxlength="32"
        :class="{'input-erro':msgExibir.lsenha}"
        type="password"
        placeholder="SENHA"
        name="lsenha"
        v-model="login.senha"
      />
      <label v-show="msgExibir.lsenha" class="msg-exibir-erro">{{msgExibir.lsenha}}</label>
    </b-form-group>
    <div class="esqueci-senha">
      <router-link
        to="/autenticacao/recuperar"
        type="button"
        @click="navRecupSenha()"
      >Esqueci minha senha</router-link>
    </div>
    <button type="button" @click="$emit('loginUsuario')" class="button-verde">ENTRAR</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  props: {
    login: {},
    msgExibir: {},
  },
  emits: ["loginUsuario"],
};
</script>

<style lang="css" scoped>
.login {
  width: 100%;
}
input[type="text"],
input[type="password"],
input[type="number"],
input[type="date"],
input[type="tel"],
select,
textarea {
  padding: 0 14px !important;
  height: 45px !important;
  width: 100% !important;
  border: 1px solid #d0d0d0 !important;
  color: #858585 !important;
  border-radius: 2px !important;
  font-size: 0.8em !important;
}
.esqueci-senha {
  display: flex;
  justify-content: flex-end;
  padding: 10px 3px;
}
.esqueci-senha a {
  background-color: transparent;
  border: none;
  color: #b3b3b3;
  font-size: 0.9em;
}
.msg-exibir-outras {
  padding: 15px 20px;
  border-radius: 3px;
  width: 100%;
  font-size: 0.87em;
  line-height: 1.1em;
  color: rgb(0, 0, 0);
  border: solid 1px #3ba80c;
  background-color: #fff;
  box-shadow: 0 0 0 4px #fcf4f4 inset;
}
.msg-exibir-outras h4 {
  flex: 1;
  color: #3ba80c;
  font-weight: 500;
  font-size: 18px;
}
.msg-exibir-outras-erro {
  padding: 15px 20px;
  border-radius: 3px;
  width: 100%;
  font-size: 0.87em;
  line-height: 1.1em;
  color: rgb(0, 0, 0);
  border: solid 1px #c400004b;
  background-color: #fff;
  box-shadow: 0 0 0 4px #fcf4f4 inset;
}
.msg-exibir-outras-erro h4 {
  flex: 1;
  color: #c40000;
  font-weight: 500;
  font-size: 18px;
}
.titulo-msg {
  width: 100%;
  display: flex;
}
</style>
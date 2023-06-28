<template>
  <div class="menu-toggle">
    <div class="header-usuario">
      <div
        v-if="user"
        class="nome-usuario"
      >Olá, {{ this.$store.state.user.nome | usuarioFormatNome}}</div>
      <div v-else class="nome-usuario">
        <b-icon class="mr-2 pt-1" icon="person-circle" style="color: #ffffff;" font-scale="1.5"></b-icon>FAÇA LOGIN
      </div>
      <b-icon
        @click="$root.$emit('setExibirToggle',false)"
        class="mr-2"
        icon="x"
        style="color: #ffffff;"
        font-scale="2.5"
      ></b-icon>
    </div>
    <div class="nav1">
      <ul>
        <li @click="$root.$emit('setExibirToggle','/minha-conta')">
          <b-icon icon="person-fill"></b-icon>Minha conta
        </li>
        <li @click="$root.$emit('setExibirToggle','/minha-conta/meus-pedidos')">
          <b-icon icon="basket2-fill"></b-icon>Meus pedidos
        </li>
        <li @click="$root.$emit('setExibirToggle','/atendimento')">
          <b-icon icon="chat-text-fill"></b-icon>Atendimento
        </li>
      </ul>
      <ul class="ul-departamentos">
        <li>Material</li>
        <li>Eletricos</li>
        <li>Construção</li>
        <li>Tubos</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas</li>
        <li>Reformas11111</li>
      </ul>
    </div>
    <div class="cadastrar-login">
      <button @click="$root.$emit('setExibirToggle','login')" type="button" class="cadastrar">Login</button>
      <button
        @click="$root.$emit('setExibirToggle','cadastrar')"
        type="button"
        class="login"
      >Cadastrar</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MenuToggle",
  filters: {
    usuarioFormatNome: function (nome) {
      if (nome) {
        const soPrimeiroNome = nome.split(" ")[0];
        return soPrimeiroNome.charAt(0).toUpperCase() + soPrimeiroNome.slice(1);
      }
    },
  },
  computed: mapState(["user"]),
};
</script>

<style scoped>
.menu-toggle {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--cor-header);
}
.header-usuario {
  height: 76px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 2px rgb(187, 184, 184);
}
.nome-usuario {
  text-transform: uppercase;
  color: white;
  display: block;
  margin-left: 20px;
  font-weight: bold;
  font-family: "Roboto Condensed", sans-serif !important;
  font-size: 18px;
}
.nav1 {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.nav1 ul {
  margin: 0px;
  width: 100%;
  border-bottom: solid 1px rgba(255, 255, 255, 0.152);
}
.nav1 ul li {
  display: flex;
  align-items: center;
  margin: 5px 10px;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(255, 255, 255);
}
.nav1 ul li svg {
  font-size: 23px;
  margin-right: 15px;
}
.ul-departamentos {
  flex: 1;
  overflow-x: scroll;
}
.cadastrar-login {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 45px 10px 7px 10px;
}
.cadastrar-login button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  line-height: 2rem;
  font-weight: 700;
  height: 48px;
  padding: 0px 3rem;
  color: rgb(255, 255, 255);
}
.cadastrar-login .cadastrar {
  background: var(--cor-laranja);
}
</style>

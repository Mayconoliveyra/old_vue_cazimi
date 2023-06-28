<template>
  <div class="user-dropdown">
    <span>Olá, {{ this.$store.state.user.nome | usuarioFormatNome}}</span>
    <div class="conta-sair">
      <router-link class="mr-1" to="/conta/inicio">MINHA CONTA</router-link>|
      <router-link to class="ml-1" @click.native="sairConta">SAIR</router-link>
    </div>
    <div class="mt-1">
      <router-link v-if=" this.$store.state.user &&  this.$store.state.user.admin" to="/portal">
        <b class="text-white">Portal da empresa</b>
      </router-link>
    </div>
  </div>
</template>

<script>
import { usuarioChave } from "../../../../global";
export default {
  name: "UserDropdown",
  methods: {
    sairConta: function () {
      localStorage.removeItem(usuarioChave);
      this.$store.commit("setUser", null);
      this.$store.commit("setCarrinhoQtd", null);
      this.$router.push({ path: "/autenticacao" });
    },
  },
  filters: {
    usuarioFormatNome: function (nome) {
      if (nome) {
        const soPrimeiroNome = nome.split(" ")[0];
        return soPrimeiroNome.charAt(0).toUpperCase() + soPrimeiroNome.slice(1);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.user-dropdown {
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px;
  color: rgba(255, 255, 255, 0.885);
  font-size: 13px;
}
.user-dropdown a,
button {
  text-decoration: nome;
  padding: 0px;
  margin: 0px;
  color: rgba(255, 255, 255, 0.782);
}
.user-dropdown span {
  font-weight: bolder;
  font-size: 12.8px;
}
</style>
<template>
  <div class="header">
    <div class="logo-carrinho">
      <div class="menu-logo">
        <div class="menu-mobile">
          <div class="icone-toggle">
            <b-icon @click="$root.$emit('setExibirToggle',null,true)" icon="list" font-scale="1.7"></b-icon>
          </div>
        </div>
        <router-link to="/" class="logo">
          <img
            src="https://static.kabum.com.br/conteudo/temas/001/imagens/topo/logo_kabum_mobile.svg"
            alt="Logo"
          />
        </router-link>
      </div>
      <router-link to="/carrinho" class="icone-meu-carrinho">
        <div class="qtd-mercadoria-carrinho" v-if="carrinhoQtdItem">{{carrinhoQtdItem}}</div>
        <b-icon class="mr-1" icon="cart4" style="color: #ffffff;" font-scale="1.5"></b-icon>
      </router-link>
    </div>
    <div class="input-form">
      <div class="input">
        <b-form-input
          class="input-pesquisa"
          type="search"
          placeholder="O que você está procurando?"
        ></b-form-input>
      </div>
      <div class="icone-pesquisar">
        <b-icon class="mr-1" icon="search" style="color: #ffffff;" font-scale="1.4"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderMobile",
  computed: mapState(["carrinhoQtdItem"]),
};
</script>

<style scoped>
.header {
  grid-area: header;
  width: 100%;
  background: var(--cor-header);
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
}
.logo-carrinho {
  flex: 1;
  display: flex;
  align-items: center;
  height: 50px;
}
.menu-logo {
  flex: 1;
  display: flex;
  align-items: center;
}
.menu-mobile {
  background: none;
  color: #ffffff;
  display: flex;
  margin-right: 13px;
}
.logo {
  width: 85px;
  height: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo img {
  width: 100%;
  height: 100%;
}
.icone-meu-carrinho {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.icone-meu-carrinho .qtd-mercadoria-carrinho {
  position: relative;
  z-index: 999;
  right: -30px;
  top: -15px;

  border-radius: 20px;
  padding: 0px 7px;
  background: rgb(255, 102, 0);
  color: rgb(250, 250, 251);
  font-size: 11px;
  font-weight: normal;
}
.icone-meu-carrinho:hover {
  text-decoration: none;
}
.input-form {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-form .input {
  flex: 1;
}
.input-form .icone-pesquisar {
  width: 20vw;
  display: flex;
  justify-content: flex-end;
}

.input-pesquisa {
  height: 37px;
  width: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  font-size: 15px;
  background: rgb(255, 255, 255);
  padding: 0px 15px;
  border: none;
}
.input-pesquisa:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}
</style>
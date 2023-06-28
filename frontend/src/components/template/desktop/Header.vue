<template>
  <div class="header">
    <div class="header-exixbir">
      <router-link to="/" class="logo">
        <img
          src="https://static.kabum.com.br/conteudo/temas/001/imagens/topo/logo_kabum_mobile.svg"
          alt="Logo"
        />
        <!--  <img src="../../assets/logo.svg" alt="Logo" /> -->
      </router-link>
      <div class="input-form">
        <b-input-group size="md">
          <b-form-input class="input-pesquisa" type="search" placeholder="Busque aqui"></b-form-input>
          <b-input-group-append is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-append>
        </b-input-group>
      </div>
      <div class="utilitario">
        <router-link v-if="!user" to="/autenticacao" class="login_cadastrase">
          <div>
            Faça seu
            <b>Login</b> ou crie seu
            <b>Cadastro</b>
          </div>
        </router-link>
        <UserDropdown v-else />
        <router-link to="/carrinho" class="meu-carrinho">
          <div class="icone-meu-carrinho">
            <b-icon icon="cart4" style="color: #ffffffcc;" font-scale="2.5"></b-icon>
            <div class="qtd-mercadoria-carrinho" v-if="carrinhoQtdItem">{{ carrinhoQtdItem}}</div>
          </div>
        </router-link>
        <router-link to="/" class="contato">
          <svg width="40" viewBox="0 0 24 24" fill="none">
            <g opacity="0.8">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.4175 7.08151H21.8906C23.0537 7.08151 24 8.02776 24 9.18901V12.0015C24 13.1646 23.0537 14.1109 21.8906 14.1109H20.4087C19.275 16.8334 16.9169 18.8234 14.1094 19.4909V20.4396C14.1094 21.6028 13.1631 22.549 12 22.549C10.8369 22.549 9.89062 21.6028 9.89062 20.4396C9.89062 19.2765 10.8431 18.3303 12.0138 18.3303C15.275 18.3303 18.195 16.2596 19.2806 13.1771L19.2837 13.169C19.7212 11.9621 19.8419 10.6296 19.6306 9.31464C19.5681 8.87464 19.4581 8.44714 19.3013 8.03089L19.2956 8.01526C18.3244 5.29089 15.8725 3.29401 13.0487 2.92589C10.3781 2.57589 7.76437 3.59714 6.0525 5.66026C4.31062 7.75964 3.81562 10.504 4.695 13.1903L4.99688 14.1128H2.10938C0.94625 14.1128 0 13.1665 0 12.0034V9.19089C0 8.02776 0.94625 7.08151 2.10938 7.08151H3.5575C3.90313 6.25901 4.37438 5.47964 4.96938 4.76276C6.9925 2.32464 10.0844 1.11339 13.2313 1.53276C16.4062 1.94526 19.165 4.10714 20.4175 7.08151ZM5.67188 16.9253V15.519C6.3125 15.519 6.85375 15.099 7.02312 14.5059C6.14937 13.3947 5.67188 12.0197 5.67188 10.5972C5.67188 7.10717 8.51062 4.26904 12 4.26904C15.4894 4.26904 18.3281 7.10717 18.3281 10.5972C18.3281 14.0865 15.4894 16.9253 12 16.9253H5.67188ZM15.5156 9.89404H14.1094V11.3003H15.5156V9.89404ZM9.89062 9.89404H8.48438V11.3003H9.89062V9.89404ZM12.7031 9.89404H11.2969V11.3003H12.7031V9.89404Z"
                fill="white"
              />
            </g>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserDropdown from "./UserDropdown";
export default {
  name: "Header",
  components: {
    UserDropdown,
  },
  computed: mapState(["user", "carrinhoQtdItem"]),
};
</script>

<style lang="css" scoped>
.header {
  grid-area: header;
  width: 100%;
  background: #0060b1;
  display: flex;
  justify-content: center;
}
.header-exixbir {
  display: flex;
  height: 100%;
  background: rgb(0, 96, 177);
  max-width: 1360px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 158px;
  height: 54px;
  display: flex;
  margin-right: 10px;
}
.logo img {
  width: 100%;
  height: 100%;
}
.input-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-right: 30px;
  padding-left: 13px;
}
.input-pesquisa {
  height: 37px;
  width: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  font-size: 17px;
  background: rgb(255, 255, 255);
  padding: 0px 15px;
  border: none;
}
.input-pesquisa:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}
.header .utilitario {
  display: flex;
  flex-direction: row;
  width: 290px;
  height: 100%;
}
.header .login_cadastrase {
  width: 50%;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1.1px;
  color: #ffffffcc;
}
.header .login_cadastrase:hover {
  text-decoration: none;
}
.header .meu-carrinho {
  width: 30%;
}
.header .meu-carrinho:hover {
  text-decoration: none;
}
.header .contato {
  width: 20%;
  display: flex;
  align-items: center;
}
.header .contato:hover {
  text-decoration: none;
}
.header .meu-carrinho .icone-meu-carrinho {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header .meu-carrinho .icone-meu-carrinho .qtd-mercadoria-carrinho {
  position: relative;
  z-index: 999;
  right: 7px;
  top: -14px;

  border-radius: 10px;
  padding: 1px 7px;
  background: rgb(227, 34, 20);
  color: rgb(250, 250, 251);
  font-size: 0.75rem;
  font-weight: bold;
}
</style>
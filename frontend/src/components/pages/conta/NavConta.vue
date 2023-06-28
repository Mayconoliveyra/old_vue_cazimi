<template>
  <div
    class="nav-conta bloq-selec-text"
    @mouseenter="exibirTexto=true"
    @mouseleave="exibirTexto=false"
  >
    <div class="itens-nav">
      <router-link to="/conta/inicio">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M0.413927 9.83614L9.501 0.21903C9.56643 0.149598 9.64415 0.0945134 9.7297 0.0569295C9.81525 0.0193456 9.90697 0 9.99959 0C10.0922 0 10.1839 0.0193456 10.2695 0.0569295C10.355 0.0945134 10.4327 0.149598 10.4982 0.21903L19.5852 9.83614C19.85 10.1165 20 10.4974 20 10.8946C20 11.7194 19.3668 12.39 18.5881 12.39H17.6306V19.2523C17.6306 19.6659 17.3151 20 16.9246 20H11.4115V14.7662H8.94064V20H3.07453C2.68404 20 2.36856 19.6659 2.36856 19.2523V12.39H1.4111C1.03606 12.39 0.676458 12.2334 0.411722 11.9507C-0.137606 11.3666 -0.137608 10.4203 0.413927 9.83614Z"
            fill="#E35214"
          />
        </svg>
        <span v-show="exibirTexto">Início</span>
      </router-link>
    </div>
    <div class="itens-nav">
      <router-link to="/conta/meus-dados">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.3125 9.6875C14.7188 8.71875 15.625 7.125 15.625 5.3125C15.625 2.375 13.25 0 10.3125 0C7.375 0 5 2.375 5 5.3125C5 7.125 5.90625 8.71875 7.3125 9.6875C4.53125 10.5625 2.5 13.1875 2.5 16.25V20H18.125V16.25C18.125 13.1875 16.0938 10.5625 13.3125 9.6875Z"
            fill="#E35214"
          />
        </svg>
        <span v-show="exibirTexto">Meus dados</span>
      </router-link>
    </div>
    <div class="itens-nav">
      <router-link to="/conta/meus-pedidos">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M18.3335 7.50676H14.3418L10.6835 2.03529C10.6073 1.92192 10.5043 1.82904 10.3837 1.76481C10.2631 1.70058 10.1285 1.66699 9.99183 1.66699C9.85516 1.66699 9.72059 1.70058 9.59997 1.76481C9.47935 1.82904 9.37639 1.92192 9.30016 2.03529L5.64183 7.50676H1.66683C1.2085 7.50676 0.833496 7.88152 0.833496 8.33956C0.833496 8.41451 0.841829 8.48946 0.866829 8.56441L2.9835 16.2844C3.17516 16.984 3.81683 17.5003 4.5835 17.5003H15.4168C16.1835 17.5003 16.8252 16.984 17.0252 16.2844L19.1418 8.56441L19.1668 8.33956C19.1668 7.88152 18.7918 7.50676 18.3335 7.50676ZM9.99183 4.00069L12.3335 7.50676H7.65016L9.99183 4.00069ZM10.0002 14.1691C9.0835 14.1691 8.3335 13.4196 8.3335 12.5035C8.3335 11.5875 9.0835 10.8379 10.0002 10.8379C10.9168 10.8379 11.6668 11.5875 11.6668 12.5035C11.6668 13.4196 10.9168 14.1691 10.0002 14.1691Z"
            fill="#E35214"
          />
        </svg>
        <span v-show="exibirTexto">Meus pedidos</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavConta",
  data() {
    return {
      exibirTexto: false,
    };
  },
};
</script>

<style  scoped>
.nav-conta {
  background: rgb(255, 255, 255); /* padrão */
  box-shadow: rgb(40 41 61 / 4%) 0px 2px 4px, rgb(96 97 112 / 16%) 0px 8px 16px; /* padrão */
  width: 64px;
  transition: width 0.2s;
  overflow: hidden;
}
.nav-conta:hover {
  width: 250px;
}
.itens-nav {
  height: 48px;
}
.itens-nav:hover {
  background: rgb(244, 242, 241); /* padrão */
}
.itens-nav a {
  border: none;
  background: none;
  display: block;
  height: 100%;
  width: 100%;
  padding: 11px 21px;
  white-space: nowrap;
}
.itens-nav a:hover {
  text-decoration: none;
}
.itens-nav a span {
  margin-left: 17px;
  font-size: 0.875rem;
  font-weight: 400;
  color: #7f858d; /* padrão */
}
</style>
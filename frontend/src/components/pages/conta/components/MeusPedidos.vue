<template>
  <div class="meus-pedidos">
    <div class="titulo">
      <svg class="mb-2" width="24px" height="24px" viewBox="0 0 20 20" fill="none" color="#FF6500">
        <path
          d="M18.3335 7.50676H14.3418L10.6835 2.03529C10.6073 1.92192 10.5043 1.82904 10.3837 1.76481C10.2631 1.70058 10.1285 1.66699 9.99183 1.66699C9.85516 1.66699 9.72059 1.70058 9.59997 1.76481C9.47935 1.82904 9.37639 1.92192 9.30016 2.03529L5.64183 7.50676H1.66683C1.2085 7.50676 0.833496 7.88152 0.833496 8.33956C0.833496 8.41451 0.841829 8.48946 0.866829 8.56441L2.9835 16.2844C3.17516 16.984 3.81683 17.5003 4.5835 17.5003H15.4168C16.1835 17.5003 16.8252 16.984 17.0252 16.2844L19.1418 8.56441L19.1668 8.33956C19.1668 7.88152 18.7918 7.50676 18.3335 7.50676ZM9.99183 4.00069L12.3335 7.50676H7.65016L9.99183 4.00069ZM10.0002 14.1691C9.0835 14.1691 8.3335 13.4196 8.3335 12.5035C8.3335 11.5875 9.0835 10.8379 10.0002 10.8379C10.9168 10.8379 11.6668 11.5875 11.6668 12.5035C11.6668 13.4196 10.9168 14.1691 10.0002 14.1691Z"
          fill="#FF6500"
        />
      </svg>
      <h1>MEUS PEDIDOS</h1>
    </div>
    <div
      v-for="pedido in dataPedidoUsuario"
      :key="pedido.codigo_pedido"
      class="pedido"
      v-show="dataPedidoUsuario"
    >
      <CabecalhoPedido :pedido="pedido" />
    </div>
    <div v-show="dataPedidoUsuario.length==0" class="pedidos-vazio">
      <div class="sem-pedido">
        <b>Não existe nenhum pedido finalizado.</b>
        <span>Deseja fazer seu primeiro pedido?</span>
        <router-link to="/" class="btn-add-carrinho">
          <svg width="35" height="23" viewBox="0 0 23 22" fill="none">
            <path
              d="M7.09977 17.6C5.88981 17.6 4.91085 18.59 4.91085 19.8C4.91085 21.01 5.88981 22 7.09977 22C8.30973 22 9.2997 21.01 9.2997 19.8C9.2997 18.59 8.30973 17.6 7.09977 17.6ZM0.5 0V2.2H2.69992L6.65979 10.549L5.17484 13.244C4.99885 13.552 4.89985 13.915 4.89985 14.3C4.89985 15.51 5.88981 16.5 7.09977 16.5H20.2993V14.3H7.56176C7.40776 14.3 7.28677 14.179 7.28677 14.025L7.31977 13.893L8.30973 12.1H16.5044C17.3294 12.1 18.0554 11.649 18.4294 10.967L22.3672 3.828C22.458 3.66013 22.5037 3.47158 22.4998 3.28078C22.4959 3.08998 22.4426 2.90346 22.345 2.73943C22.2475 2.5754 22.1091 2.43947 21.9433 2.34492C21.7776 2.25037 21.5901 2.20044 21.3993 2.2H5.13084L4.09688 0H0.5ZM18.0994 17.6C16.8894 17.6 15.9105 18.59 15.9105 19.8C15.9105 21.01 16.8894 22 18.0994 22C19.3094 22 20.2993 21.01 20.2993 19.8C20.2993 18.59 19.3094 17.6 18.0994 17.6Z"
              fill="white"
            />
          </svg>CONTINUAR COMPRANDO
        </router-link>
      </div>
    </div>
    <div class="carregar-mais-pedidos">
      <button
        v-if="qtdTotalPedidosUsuario>dataPedidoUsuario.length"
        @click="loadPedidosUsuario()"
      >VER MAIS</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, showError } from "../../../../../global";
import CabecalhoPedido from "./CabecalhoPedido";

export default {
  name: "MinhaContaMeusPedidos",
  components: { CabecalhoPedido },
  data() {
    return {
      dataPedidoUsuario: [],
      page: 1,
      qtdTotalPedidosUsuario: 0,
    };
  },
  methods: {
    navegar(rota) {
      this.$root.$emit("navegarMinhaConta", rota);
    },
    loadPedidosUsuario() {
      const url = `${baseApiUrl}/pedido/pedidos_usuario/${this.user.codigo_usuario}/pedidos?page=${this.page}`;
      axios
        .get(url)
        .then((res) => {
          this.dataPedidoUsuario = this.dataPedidoUsuario.concat(
            res.data.pedidos
          );
          this.qtdTotalPedidosUsuario = res.data.totaisPedidos["count(*)"];

          this.page++;
        })
        .catch(showError);
    },
  },
  computed: mapState(["user"]),
  created() {
    this.loadPedidosUsuario();
  },
};
</script>

<style scoped>
.meus-pedidos {
  width: 100%;
  height: 100%;
}
.titulo {
  display: flex;
  align-items: center;
  width: 100%;
}
.titulo h1 {
  display: flex;
  font-size: 24px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  margin-left: 16px;
}
.pedido {
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  margin-top: 16px;
  padding: 32px;
  border-radius: 0.25rem;
}
.carregar-mais-pedidos {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
}
.carregar-mais-pedidos button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgb(255, 101, 0);
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: none;
}

.pedidos-vazio {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  align-items: center;
  justify-content: center;
}
.sem-pedido {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20rem;
  align-items: center;
  justify-content: center;
}
.btn-add-carrinho {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(255, 101, 0);
  background-color: rgb(255, 101, 0);
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  margin-top: 5rem;
}
.btn-add-carrinho:hover {
  text-decoration: none;
}

</style>
<template>
  <div>
    <div class="cabecalho-pedidos">
      <div width="180px">
        <div class="cabelhado-pedido">NÚMERO DO PEDIDO</div>
        <div class="dados-pedido">#{{pedido.codigo_pedido}}</div>
      </div>
      <div width="140px">
        <div class="cabelhado-pedido">STATUS</div>
        <div
          v-if="pedido.confirmado_loja == false &&
                          pedido.separacao == false &&
                          pedido.saiu_entrega == false &&
                          pedido.finalizado == false &&
                          pedido.cancelado == false"
          class="dados-pedido-status"
        >Pendente</div>
        <div
          v-if="pedido.confirmado_loja == true &&
                          pedido.separacao == false &&
                          pedido.saiu_entrega == false &&
                          pedido.finalizado == false &&
                          pedido.cancelado == false"
          class="dados-pedido-status"
          style="color: rgb(45, 194, 110);"
        >Confirmado</div>
        <div
          v-if="pedido.confirmado_loja == true &&
                          pedido.separacao == true &&
                          pedido.saiu_entrega == false &&
                          pedido.finalizado == false &&
                          pedido.cancelado == false"
          class="dados-pedido-status"
          style="color: rgb(255 101 0 / 85%);"
        >Separação e carregamento</div>
        <div
          v-if="pedido.confirmado_loja == true &&
                          pedido.separacao == true &&
                          pedido.saiu_entrega == true &&
                          pedido.finalizado == false &&
                          pedido.cancelado == false"
          class="dados-pedido-status"
          style="color: rgb(255 101 0 / 85%);"
        >Saiu para entrega</div>
        <div
          v-if="pedido.confirmado_loja == true &&
                          pedido.separacao == true &&
                          pedido.saiu_entrega == true &&
                          pedido.finalizado == true &&
                          pedido.cancelado == false"
          class="dados-pedido-status"
          style="color: rgb(45, 194, 110);"
        >Concluído</div>
        <div
          v-else-if="pedido.cancelado"
          class="dados-pedido-status"
          style="color: rgb(231, 38, 38);"
        >Cancelado</div>
      </div>
      <div width="140px">
        <div class="cabelhado-pedido">DATA</div>
        <div class="dados-pedido">
          {{
          formatDataDiaMesAno(pedido.cadastrado_em)}}
        </div>
      </div>
      <div width="180px">
        <div class="cabelhado-pedido">PAGAMENTO</div>
        <div class="dados-pedido">{{pedido.tipo_pagamento}}</div>
      </div>
      <div @click="loadPedido(pedido.codigo_pedido)" class="detalhar-pedido">
        <b class="detalhar-pedido-1">Detalhes do pedido</b>
        <svg
          :class="{'icone':true, 'icone-esconder': exibirDetalhes}"
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.947265 9.86399L2.21999 11.1367L7.94727 5.40945L13.6745 11.1367L14.9473 9.86399L7.94727 2.86399L0.947265 9.86399Z"
            fill="#FF6500"
          />
        </svg>
      </div>
    </div>
    <DetalhesPedidos
      v-if="exibirDetalhes"
      :cabecalhoPedido="pedido"
      :mercadoriasPedido="dataMercadadorias"
    />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../../global";
import moment from "moment";
import DetalhesPedidos from "./DetalhesPedido";
export default {
  name: "CabecalhoPedido",
  components: { DetalhesPedidos },
  props: ["pedido"],
  data() {
    return {
      dataMercadadorias: {},
      exibirDetalhes: false,
    };
  },
  methods: {
    formatDataDiaMesAno(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    formatDataDiaMesAnoHoraMin(date) {
      return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
    },
    loadPedido(codigo_pedido) {
      if (!this.dataMercadadorias.length > 0) {
        const url = `${baseApiUrl}/pedido/pedido_codigo/${codigo_pedido}`;
        axios
          .get(url)
          .then((res) => {
            this.dataMercadadorias = res.data;
          })
          .catch(showError);
      }
      this.exibirDetalhes = !this.exibirDetalhes;
    },
  },
};
</script>

<style scoped>
.cabecalho-pedidos {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  margin-bottom: 10px;
}
.cabelhado-pedido {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  color: rgb(66, 70, 77);
}
.dados-pedido {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: rgb(66, 70, 77);
  margin-top: 16px;
}
.detalhar-pedido {
  display: flex;
  height: 100%;
  justify-content: center;
  cursor: pointer;
  align-items: center;
}
.detalhar-pedido-1 {
  display: flex;
  align-items: center;
  text-decoration: underline;
  font-size: 14px;
  color: rgb(255, 101, 0);
  font-weight: bold;
}
.detalhar-pedido .icone {
  margin-left: 16px;
  transition: transform 0.3s ease 0s;
  transform: rotate(180deg);
}
.detalhar-pedido .icone-esconder {
  margin-left: 16px;
  transition: transform 0.3s ease 0s;
  transform: rotate(0deg);
}
.dados-pedido-status {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(253, 135, 25);
  margin-top: 16px;
}
</style>
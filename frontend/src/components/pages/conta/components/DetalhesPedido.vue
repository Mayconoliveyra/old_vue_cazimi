<template>
  <div>
    <div class="endereco-pedidos">
      <hr class="mt-1 mb-4 p-0" />
      <div class="title-endereco">ENDEREÇO</div>
      <div class="rua-endereco">{{cabecalhoPedido.ped_logradouro}}</div>
      <div class="endereco-info">
        Número
        {{cabecalhoPedido.ped_numero}}, {{cabecalhoPedido.ped_bairro}}
      </div>
      <div
        class="endereco-info"
      >CEP {{cabecalhoPedido.ped_cep}} - {{cabecalhoPedido.ped_localidade}}, {{cabecalhoPedido.ped_uf}}</div>
    </div>
    <h4 class="title-endereco mt-4">STATUS DO PEDIDO</h4>
    <div class="status-pedidos">
      <div :class="{'container-passos':true ,'status-icones-ativo':!cabecalhoPedido.cancelado}">
        <div class="passos-icone">
          <b-icon icon="cart-check-fill" font-scale="1.2"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Pedido recebido</span>
        </div>
      </div>
      <div
        :class="{'container-passos':true ,'status-icones-ativo':cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="check-circle-fill" font-scale="1.2"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Confirmado pela Loja</span>
          <small
            v-if="cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(cabecalhoPedido.data_confirmado_loja)}}</small>
        </div>
      </div>
      <div
        :class="{'container-passos':true ,'status-icones-ativo':cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.separacao == true &&
                          cabecalhoPedido.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="minecart-loaded" font-scale="1.2"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Separação e carregamento</span>
          <small
            v-if="cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.separacao == true &&
                          cabecalhoPedido.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(cabecalhoPedido.data_separacao)}}</small>
        </div>
      </div>
      <div
        :class="{'container-passos':true ,'status-icones-ativo':cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.separacao == true &&
                          cabecalhoPedido.saiu_entrega == true &&
                          cabecalhoPedido.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="truck" font-scale="1.2"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Saiu para entrega</span>
          <small
            v-if="cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.separacao == true &&
                          cabecalhoPedido.saiu_entrega == true &&
                          cabecalhoPedido.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(cabecalhoPedido.data_saiu_entrega)}}</small>
        </div>
      </div>
      <div
        v-if="!cabecalhoPedido.cancelado"
        :class="{'container-passos':true ,'status-icones-ativo':cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.separacao == true &&
                          cabecalhoPedido.saiu_entrega == true &&
                          cabecalhoPedido.finalizado == true &&
                          cabecalhoPedido.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="check-square-fill" font-scale="1.2"></b-icon>
        </div>
        <div class="text-passsos">
          <span>Entrega realizada</span>
          <small
            v-if="cabecalhoPedido.confirmado_loja == true &&
                          cabecalhoPedido.separacao == true &&
                          cabecalhoPedido.saiu_entrega == true &&
                          cabecalhoPedido.finalizado == true &&
                          cabecalhoPedido.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(cabecalhoPedido.data_finalizado)}}</small>
        </div>
      </div>
      <div v-if="cabecalhoPedido.cancelado" class="container-passos">
        <div class="passos-icone">
          <b-icon icon="x-circle-fill" style="color: rgb(231, 38, 38);" font-scale="1.2"></b-icon>
        </div>
        <div class="text-passsos">
          <span style="color: rgb(231, 38, 38);">Pedido cancelado</span>
        </div>
      </div>
    </div>

    <div class="produtos-totais">
      <div class="titulo-totais">
        <div class="titulo-text">PRODUTO</div>
        <div class="titulo-text">TOTAL</div>
      </div>
      <div class="itens">
        <div v-for="item in mercadoriasPedido" :key="item.id_mercadoria" class="item">
          <div class="item-img">
            <img :src="item.url_principal" alt="mercadoria" />
          </div>
          <div class="nome-quantidade">
            <div class="descricao">{{item.nome_exibir}}</div>
            <div class="quantidade">Quantidade: {{item.quantidade}}</div>
          </div>
          <div class="preco">{{item.valor_total_item|maskDinheiro}}</div>
        </div>
      </div>
      <div class="pedido-totais">
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">TOTAL DE ITENS</div>
          <div class="text-totais-data">{{cabecalhoPedido.qtd_itens}}</div>
        </div>
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">TOTAL DOS PRODUTOS</div>
          <div class="text-totais-data">{{cabecalhoPedido.vlr_total_produtos|maskDinheiro}}</div>
        </div>
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">FRETE</div>
          <div class="text-totais-data">{{cabecalhoPedido.vlr_frete|maskDinheiro}}</div>
        </div>
      </div>
      <div class="pedido-totais">
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">TOTAL</div>
          <div class="text-totais-data">{{cabecalhoPedido.vlr_total|maskDinheiro}}</div>
        </div>
      </div>
      <div class="pedido-totais">
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">FORMA DE PAGAMENTO</div>
          <div class="text-pagamento">
            {{cabecalhoPedido.tipo_pagamento}}
            <b
              v-if="cabecalhoPedido.tipo_pagamento=='PAGAR NA ENTREGA'"
            >({{ cabecalhoPedido.tipo_pagamento_entrega}})</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DetalhesPedidos",
  props: ["cabecalhoPedido", "mercadoriasPedido"],
  methods: {
    formatDataDiaMesAno(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    formatDataDiaMesAnoHoraMin(date) {
      return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
    },
  },
};
</script>

<style scoped>
.endereco-pedidos {
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 13px;
}
.endereco-pedidos .endereco-info {
  display: flex;
  font-size: 14px;
  color: rgb(127, 133, 141);
}
.endereco-pedidos .rua-endereco {
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 16px;
}
.title-endereco {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
}
.status-pedidos {
  display: flex;
  width: 100%;
}
.container-passos {
  display: flex;
  flex-direction: column;
  margin-right: 11px;
  max-width: 200px;
  width: 100%;
  overflow: hidden;
  color: #dee0e4;
}
.passos-icone {
  display: flex;
  align-items: center;
  height: 30px;
}
.passos-icone-barra {
  width: 100%;
  height: 2px;
  margin-left: 8px;
  background-color: #dee0e4;
  position: relative;
}

.text-passsos {
  display: flex;
  flex-direction: column;
  max-width: 100px;
  margin-top: 0px;
  margin-left: 26px;
}
.text-passsos span {
  transition: color 0.1s ease 150ms;
  font-weight: 600;
  font-size: 12.5px;
  margin: 0px;
  padding: 0px;
}
.text-passsos small {
  transition: color 0.8s ease 2s;
  color: rgb(255, 101, 0);
  font-weight: 400;
  font-size: 10px;
  margin: 0px;
  padding: 0px;
}
.status-icones-ativo {
  color: rgb(255, 101, 0) !important;
  border-color: rgb(255, 101, 0) !important;
}
.status-icones-ativo .passos-icone-barra {
  background-color: rgb(255, 101, 0) !important;
}
.produtos-totais {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
}
.titulo-totais {
  display: flex;
  width: 100%;
  padding: 2rem 0px;
  justify-content: space-between;
  border-top: 1px solid rgb(222, 224, 228);
  border-bottom: 1px solid rgb(222, 224, 228);
}
.titulo-text {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
}
.itens {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.item {
  display: flex;
  border-bottom: 1px solid rgb(222, 224, 228);
  /* border-top: 1px solid rgb(222, 224, 228); */
  padding: 2rem 0px;
}
.item-img {
  display: flex;
  border: 1px solid rgb(222, 224, 228);
  height: 136px;
  width: 136px;
  align-items: center;
  justify-content: center;
}
.item-img img {
  width: 100%;
  height: 120px;
}
.nome-quantidade {
  flex: 1;
  margin: 0px 30px;
}
.preco {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: rgb(66, 70, 77);
}
.descricao {
  display: flex;
  font-size: 14px;
  color: rgb(66, 70, 77);
  font-weight: bold;
  margin-top: 8px;
}
.quantidade {
  display: flex;
  font-size: 14px;
  color: rgb(66, 70, 77);
  font-weight: normal;
  margin-top: 8px;
}
.pedido-totais {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 0px;
  justify-content: space-between;
  border-bottom: 1px solid rgb(222, 224, 228);
}
.pedido-totais-linha {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.25rem 0px;
}
.text-titulo-totais {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
}
.text-totais-data {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: rgb(66, 70, 77);
}
.text-pagamento {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  color: rgb(85, 157, 116);
}
</style>
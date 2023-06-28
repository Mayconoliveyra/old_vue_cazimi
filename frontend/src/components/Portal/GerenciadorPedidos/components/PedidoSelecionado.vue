<template>
  <div class="content-pedidos" v-if="dataPedidoCabecalho.codigo_pedido">
    <h4 class="title-status-pedido">STATUS DO PEDIDO #{{dataPedidoCabecalho.codigo_pedido}}</h4>
    <div class="status-pedido">
      <div
        :class="{'container-passos':true ,'status-icones-ativo':dataPedidoCabecalho.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="cart-check-fill" font-scale="1"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Pedido recebido</span>
          <small
            v-if="dataPedidoCabecalho.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(dataPedidoCabecalho.cadastrado_em)}}</small>
        </div>
      </div>
      <div
        :class="{'container-passos':true ,'status-icones-ativo':dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="check-circle-fill" font-scale="1"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Confirmado</span>
          <small
            v-if="dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(dataPedidoCabecalho.data_confirmado_loja)}}</small>
        </div>
      </div>
      <div
        :class="{'container-passos':true ,'status-icones-ativo':dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.separacao == true &&
                          dataPedidoCabecalho.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="minecart-loaded" font-scale="1"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Separação</span>
          <small
            v-if="dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.separacao == true &&
                          dataPedidoCabecalho.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(dataPedidoCabecalho.data_separacao)}}</small>
        </div>
      </div>
      <div
        :class="{'container-passos':true ,'status-icones-ativo':dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.separacao == true &&
                          dataPedidoCabecalho.saiu_entrega == true &&                   
                          dataPedidoCabecalho.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="truck" font-scale="1"></b-icon>
          <div class="passos-icone-barra"></div>
        </div>
        <div class="text-passsos">
          <span>Entrega</span>
          <small
            v-if="dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.separacao == true &&
                          dataPedidoCabecalho.saiu_entrega == true &&
                          dataPedidoCabecalho.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(dataPedidoCabecalho.data_saiu_entrega)}}</small>
        </div>
      </div>
      <div
        v-if="!dataPedidoCabecalho.cancelado"
        :class="{'container-passos':true ,'status-icones-ativo':dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.separacao == true &&
                          dataPedidoCabecalho.saiu_entrega == true &&
                          dataPedidoCabecalho.finalizado == true &&
                          dataPedidoCabecalho.cancelado == false}"
      >
        <div class="passos-icone">
          <b-icon icon="check-square-fill" font-scale="1"></b-icon>
        </div>
        <div class="text-passsos">
          <span>Finalizado</span>
          <small
            v-if="dataPedidoCabecalho.confirmado_loja == true &&
                          dataPedidoCabecalho.separacao == true &&
                          dataPedidoCabecalho.saiu_entrega == true &&
                          dataPedidoCabecalho.finalizado == true &&
                          dataPedidoCabecalho.cancelado == false"
          >{{formatDataDiaMesAnoHoraMin(dataPedidoCabecalho.data_finalizado)}}</small>
        </div>
      </div>
      <div v-if="dataPedidoCabecalho.cancelado" class="container-passos">
        <div class="passos-icone">
          <b-icon icon="x-circle-fill" style="color: rgb(231, 38, 38);" font-scale="1"></b-icon>
        </div>
        <div class="text-passsos">
          <span style="color: rgb(231, 38, 38);">Pedido cancelado</span>
        </div>
      </div>
    </div>
    <hr class="mt-2 mb-2" />
    <div class="pedido-cabecalho-container">
      <div class="informaçoes-pedido">
        <div class="mr-1 w-100">
          <h4>Dados pessoais</h4>
          <div class="informacao-container">
            <div class="p-1">
              <p>
                <b>{{dataPedidoCabecalho.ped_nome}}</b>
              </p>
              <p>
                <b>CPF/CNPJ:</b>
                {{dataPedidoCabecalho.ped_cpf_cnpj}}
              </p>
              <p>
                <b>contato:</b>
                {{dataPedidoCabecalho.ped_contato}}
              </p>
              <p>
                <b>E-mail:</b>
                {{dataPedidoCabecalho.ped_email}}
              </p>
            </div>
          </div>
        </div>
        <div class="ml-1 w-100">
          <h4>Endereço de entrega</h4>
          <div class="informacao-container">
            <div class="p-1">
              <p>
                <b>{{dataPedidoCabecalho.ped_logradouro}}</b>
              </p>
              <p>
                <b>Número:</b>
                {{dataPedidoCabecalho.ped_numero}}
              </p>
              <p>
                <b>Bairro:</b>
                {{dataPedidoCabecalho.ped_bairro}}
              </p>
              <p>
                <b>CEP:</b>
                {{dataPedidoCabecalho.ped_cep}}
              </p>
              <p>
                <b>Cidade:</b>
                {{dataPedidoCabecalho.ped_localidade}} - {{dataPedidoCabecalho.ped_uf}}
              </p>
              <p>
                <b>Complemento:</b>
                {{dataPedidoCabecalho.ped_complemento}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="produtos-totais">
      <div class="titulo-totais">
        <div class="titulo-text" style="width:80px;">CÓDIGO</div>
        <div class="titulo-text" style="flex:1;">PRODUTO</div>
        <div class="titulo-text texto-item-center">QUANTIDADE</div>
        <div class="titulo-text texto-item-center">PREÇO</div>
        <div class="titulo-text texto-item-center">TOTAL</div>
      </div>
      <div class="itens">
        <div v-for="item in dataPedidoMercadorias" :key="item.id_mercadoria" class="item">
          <div class="texto-item" style="width:80px;">{{item.codigo_integracao}}</div>
          <div class="texto-item" style="flex:1;">{{item.nome_exibir}}</div>
          <div class="texto-item texto-item-center">{{item.quantidade}}</div>
          <div class="texto-item texto-item-center">{{item.preco_venda|maskDinheiro(false)}}</div>
          <div class="texto-item texto-item-center">{{item.valor_total_item|maskDinheiro(false)}}</div>
        </div>
      </div>
      <div class="pedido-totais">
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">TOTAL DE ITENS</div>
          <div class="text-totais-data">{{dataPedidoCabecalho.qtd_itens}}</div>
        </div>
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">TOTAL DOS PRODUTOS</div>
          <div class="text-totais-data">{{dataPedidoCabecalho.vlr_total_produtos|maskDinheiro}}</div>
        </div>
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">FRETE</div>
          <div class="text-totais-data">{{dataPedidoCabecalho.vlr_frete|maskDinheiro}}</div>
        </div>
      </div>
      <div class="pedido-totais">
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">TOTAL</div>
          <div class="text-totais-data">{{dataPedidoCabecalho.vlr_total|maskDinheiro}}</div>
        </div>
      </div>
      <div class="pedido-totais">
        <div class="pedido-totais-linha">
          <div class="text-titulo-totais">FORMA DE PAGAMENTO</div>
          <div class="text-pagamento">
            {{dataPedidoCabecalho.tipo_pagamento}}
            <b
              v-if="dataPedidoCabecalho.tipo_pagamento=='PAGAR NA ENTREGA'"
            >({{ dataPedidoCabecalho.tipo_pagamento_entrega}})</b>
          </div>
        </div>
      </div>
      <BtnAcaoPedido
        :statusPedido="{
          confirmado_loja:dataPedidoCabecalho.confirmado_loja,
          separacao:dataPedidoCabecalho.separacao,
          saiu_entrega:dataPedidoCabecalho.saiu_entrega,
          finalizado:dataPedidoCabecalho.finalizado,
          cancelado:dataPedidoCabecalho.cancelado}"
      />
    </div>
  </div>
</template>

<script>
import BtnAcaoPedido from "./BtnAcaoPedido";
import moment from "moment";
export default {
  name: "PedidoSelecionado",
  components: { BtnAcaoPedido },
  props: ["dataPedidoCabecalho", "dataPedidoMercadorias"],
  methods: {
    formatDataDiaMesAnoHoraMin(date) {
      return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
    },
  },
};
</script>

<style scoped>
.content-pedidos {
  grid-area: "content-pedidos";
  margin-left: 30px;

  background: rgb(255, 255, 255);
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px;
  padding: 1rem;
  width: 100% !important;
  height: 100%;
}
.title-status-pedido {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
  width: 100%;
}
.status-pedido {
  display: flex;
  width: 100%;
  padding-left: 20px;
}
.container-passos {
  display: flex;
  flex-direction: column;
  margin-right: 4px;
  margin-left: 4px;
  width: 100%;
  overflow: hidden;
  color: #dee0e4;
}
.passos-icone {
  display: flex;
  align-items: center;
  height: 16px;
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
  font-size: 11px;
  margin: 0px;
  padding: 0px;
  line-height: 13px;
}
.text-passsos small {
  transition: color 0.8s ease 2s;
  color: rgb(255, 101, 0);
  font-weight: 400;
  font-size: 11px;
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
/* ##### */

.pedido-cabecalho-container {
  background: rgb(255, 255, 255);
  border-radius: 0.25rem;
}
.endereco {
  display: flex;
  flex-direction: column;
  margin-top: 7px;
  background-color: rgb(250, 250, 251);
  border-left: 4px solid rgb(255, 101, 0);
  border-radius: 0.25rem;
  color: black;
}
.endereco p {
  font-size: 0.905rem;
  line-height: 1rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
  color: rgb(127, 133, 141);
}
.informaçoes-pedido {
  display: flex;
  width: 100%;
  margin-top: 5px;
}
.informaçoes-pedido h4 {
  font-size: 17px;
  font-weight: 700;
  color: rgb(66, 70, 77);
}
.informacao-container {
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 250, 251);
  border-radius: 0.25rem;
  color: black;
  min-height: 170px;
}
.informacao-container p {
  font-size: 13px;
  line-height: 1rem;
  font-weight: 400;
  margin: 5px;
  color: rgb(86, 92, 105);
}
/* ######## */
.produtos-totais {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 13px;
}
.titulo-totais {
  display: flex;
  width: 100%;
  padding: 0.7rem 0px;
  border-top: 1px solid rgb(222, 224, 228);
}
.titulo-text {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
  margin: 0px 2px !important;
}
.itens {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.item {
  display: flex;
  border-bottom: 1px solid rgb(222, 224, 228);
  padding: 5px 0px;
}
.texto-item {
  font-size: 14px;
  margin: 0px 2px !important;
}
.texto-item-center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
}

.pedido-totais {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 7px 0px;
  justify-content: space-between;
  border-bottom: 1px solid rgb(222, 224, 228);
}
.pedido-totais-linha {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1px 0px;
}
.text-titulo-totais {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
}
.text-totais-data {
  display: flex;
  align-items: center;
  font-size: 18px;
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
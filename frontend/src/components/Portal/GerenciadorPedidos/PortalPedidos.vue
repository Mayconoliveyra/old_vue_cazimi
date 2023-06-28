<template>
  <div class="portal-main">
    <aside class="aside">
      <navPortal />
    </aside>
    <section class="portal-exibir p-2">
      <div class="portal-pedidos">
        <div class="titulo">
          <b-icon icon="file-text" scale="1.5" style="color:#FF6500;"></b-icon>
          <h1>GERENCIADOR DE PEDIDOS</h1>
        </div>
        <div class="main-pedidos">
          <div class="nav-pedidos bloq-selec-text">
            <div class="nav-itens-status">
              <b @click="togglePendetes=!togglePendetes" class="nav-itens-titulo">
                PEDIDOS PENDENTES ({{dataPendentes.length}})
                <b-icon v-show="!togglePendetes" icon="chevron-down" scale="1.1"></b-icon>
                <b-icon v-show="togglePendetes" icon="chevron-up" scale="1.1"></b-icon>
              </b>
              <div v-show="togglePendetes">
                <div
                  @click="loadPedido(pedido.codigo_pedido)"
                  v-for="pedido in dataPendentes"
                  :key="pedido.codigo_pedido"
                  class="pedido-nav"
                >
                  <div class="codigo">#{{pedido.codigo_pedido}}</div>
                  <div class="nome">{{pedido.ped_nome}}</div>
                  <div class="data-valor">
                    <div>{{formatDataDiaMesAnoHoraMin(pedido.cadastrado_em)}}</div>
                    <div class="valor">{{pedido.vlr_total|maskDinheiro}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nav-itens-status">
              <b @click="toggleSeparacao=!toggleSeparacao" class="nav-itens-titulo">
                ENVIAR PARA SEPARAÇÃO ({{dataSeparacao.length}})
                <b-icon v-show="!toggleSeparacao" icon="chevron-down" scale="1.1"></b-icon>
                <b-icon v-show="toggleSeparacao" icon="chevron-up" scale="1.1"></b-icon>
              </b>
              <div v-show="toggleSeparacao">
                <div
                  @click="loadPedido(pedido.codigo_pedido)"
                  v-for="pedido in dataSeparacao"
                  :key="pedido.codigo_pedido"
                  class="pedido-nav"
                >
                  <div class="codigo">#{{pedido.codigo_pedido}}</div>
                  <div class="nome">{{pedido.ped_nome}}</div>
                  <div class="data-valor">
                    <div>{{formatDataDiaMesAnoHoraMin(pedido.cadastrado_em)}}</div>
                    <div class="valor">{{pedido.vlr_total|maskDinheiro}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nav-itens-status">
              <b @click="toggleSaiuEntrega=!toggleSaiuEntrega" class="nav-itens-titulo">
                SAIR PARA ENTREGA ({{dataSairEntrega.length}})
                <b-icon v-show="!toggleSaiuEntrega" icon="chevron-down" scale="1.1"></b-icon>
                <b-icon v-show="toggleSaiuEntrega" icon="chevron-up" scale="1.1"></b-icon>
              </b>
              <div v-show="toggleSaiuEntrega">
                <div
                  @click="loadPedido(pedido.codigo_pedido)"
                  v-for="pedido in dataSairEntrega"
                  :key="pedido.codigo_pedido"
                  class="pedido-nav"
                >
                  <div class="codigo">#{{pedido.codigo_pedido}}</div>
                  <div class="nome">{{pedido.ped_nome}}</div>
                  <div class="data-valor">
                    <div>{{formatDataDiaMesAnoHoraMin(pedido.cadastrado_em)}}</div>
                    <div class="valor">{{pedido.vlr_total|maskDinheiro}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nav-itens-status">
              <b @click="toggleFinalizarPedido=!toggleFinalizarPedido" class="nav-itens-titulo">
                FINALIZAR ENTREGA ({{dataFinalizar.length}})
                <b-icon v-show="!toggleFinalizarPedido" icon="chevron-down" scale="1.1"></b-icon>
                <b-icon v-show="toggleFinalizarPedido" icon="chevron-up" scale="1.1"></b-icon>
              </b>
              <div v-show="toggleFinalizarPedido">
                <div
                  @click="loadPedido(pedido.codigo_pedido)"
                  v-for="pedido in dataFinalizar"
                  :key="pedido.codigo_pedido"
                  class="pedido-nav"
                >
                  <div class="codigo">#{{pedido.codigo_pedido}}</div>
                  <div class="nome">{{pedido.ped_nome}}</div>
                  <div class="data-valor">
                    <div>{{formatDataDiaMesAnoHoraMin(pedido.cadastrado_em)}}</div>
                    <div class="valor">{{pedido.vlr_total|maskDinheiro}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PedidoSelecionado
            v-if="dataPedidoCabecalho.codigo_pedido"
            :dataPedidoCabecalho="dataPedidoCabecalho"
            :dataPedidoMercadorias="dataPedidoMercadorias"
          />
          <div class="content-pedidos-vazio" v-else>
            <h1>Controle de pedidos</h1>
            <small>
              <b-icon class="mr-3" icon="check2-square" scale="2"></b-icon>Gerencie os pedidos realizados pelos seus clientes e visualize de forma simples o status dos mesmos;
            </small>
            <small>
              <b-icon class="mr-3" icon="check2-square" scale="2"></b-icon>Selecione um pedido para visualizar os detalhes do mesmo e realize a mudança do status quando for necessário.
            </small>
          </div>
        </div>
      </div>
      <b-modal
        ref="modal-pedido-cancelar"
        hide-footer
        id="modal-pedido-cancelar"
        size="md"
        title="Cancelar Pedido"
      >
        <ModalConfirmacaoPedido
          icon="x-circle"
          mensagem="Essa operação não poderá ser desfeita, o pedido será cancelado."
          @confirmar="confirmarStatusPedido(dataPedidoCabecalho.codigo_pedido,'CANCELAR'); $refs['modal-pedido-cancelar'].hide()"
        />
      </b-modal>
      <b-modal
        ref="modal-pedido-confirmar"
        hide-footer
        id="modal-pedido-confirmar"
        size="md"
        title="Confirmar"
      >
        <ModalConfirmacaoPedido
          icon="check-circle"
          mensagem="O pedido será confirmado ao cliente."
          @confirmar="confirmarStatusPedido(dataPedidoCabecalho.codigo_pedido,'CONFIRMAR'); $refs['modal-pedido-confirmar'].hide()"
        />
      </b-modal>
      <b-modal
        ref="modal-pedido-separacao"
        hide-footer
        id="modal-pedido-separacao"
        size="md"
        title="Separação e Carregamento"
      >
        <ModalConfirmacaoPedido
          icon="minecart-loaded"
          mensagem="O pedido será enviado para separação e carregamento."
          @confirmar="confirmarStatusPedido(dataPedidoCabecalho.codigo_pedido,'SEPARACAO'); $refs['modal-pedido-separacao'].hide()"
        />
      </b-modal>
      <b-modal
        ref="modal-pedido-entrega"
        hide-footer
        id="modal-pedido-entrega"
        size="md"
        title="Entrega"
      >
        <ModalConfirmacaoPedido
          icon="truck"
          mensagem="O pedido será enviado para entrega."
          @confirmar="confirmarStatusPedido(dataPedidoCabecalho.codigo_pedido,'ENTREGA'); $refs['modal-pedido-entrega'].hide()"
        />
      </b-modal>
      <b-modal
        ref="modal-pedido-finalizar"
        hide-footer
        id="modal-pedido-finalizar"
        size="md"
        title="Finalizar Pedido"
      >
        <ModalConfirmacaoPedido
          icon="check-square"
          mensagem="O pedido será finalizado para o cliente."
          @confirmar="confirmarStatusPedido(dataPedidoCabecalho.codigo_pedido,'FINALIZAR'); $refs['modal-pedido-finalizar'].hide()"
        />
      </b-modal>
    </section>
  </div>
</template>
<script>
import moment from "moment";
import { baseApiUrl, showError, showSucesso } from "../../../../global";
import navPortal from "../components/navPortal";
import ModalConfirmacaoPedido from "./components/ModalConfirmacaoPedido";
import PedidoSelecionado from "./components/PedidoSelecionado";
import axios from "axios";
export default {
  name: "portalPedidos",
  components: { navPortal, PedidoSelecionado, ModalConfirmacaoPedido },
  data() {
    return {
      togglePendetes: false,
      toggleSeparacao: false,
      toggleSaiuEntrega: false,
      toggleFinalizarPedido: false,
      dataPendentes: [],
      dataSeparacao: [],
      dataSairEntrega: [],
      dataFinalizar: [],
      dataPedidoCabecalho: {},
      dataPedidoMercadorias: [],
    };
  },
  methods: {
    formatDataDiaMesAnoHoraMin(date) {
      return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
    },
    loadPedidosCabecalho() {
      axios
        .get(`${baseApiUrl}/portal/pedidos`)
        .then((res) => {
          this.dataPendentes = res.data.pendentes;
          this.dataSeparacao = res.data.separacao;
          this.dataSairEntrega = res.data.sairEntrega;
          this.dataFinalizar = res.data.finalizar;
        })
        .catch(showError);
    },
    loadPedido(codigo_pedido) {
      axios
        .get(`${baseApiUrl}/portal/pedidos/${codigo_pedido}`)
        .then((res) => {
          this.dataPedidoCabecalho = res.data.cabecalho;
          this.dataPedidoMercadorias = res.data.itens;
        })
        .catch(showError);
    },
    confirmarStatusPedido(codigo_pedido, acao) {
      const modeloAtualizarStatus = {
        codigo_pedido,
        acao,
      };

      axios
        .put(
          `${baseApiUrl}/portal/pedidos/${codigo_pedido}`,
          modeloAtualizarStatus
        )
        .then(() => {
          showSucesso("OPERAÇÃO REALIZADA COM SUCESSO.");
          this.reset();
        })
        .catch(showError);
      console.log(modeloAtualizarStatus);
    },
    reset() {
      this.loadPedido(this.dataPedidoCabecalho.codigo_pedido);
      this.loadPedidosCabecalho();
    },
  },
  created() {
    this.loadPedidosCabecalho();
  },
};
</script>

<style scoped>
.portal-pedidos {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  height: 100%;
}
.portal-pedidos .titulo {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.portal-pedidos .titulo h1 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 800;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
  padding-left: 5px;
}
.portal-pedidos .main-pedidos {
  padding: 40px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 270px 1fr;
  grid-template-areas: "nav-pedidos content-pedidos";
}
.na0v-pedidos {
  grid-area: "nav-pedidos";
  /*  border: red solid 1px; */
}
.content-pedidos-vazio {
  grid-area: "content-pedidos";
  margin-left: 30px;

  background: rgb(255, 255, 255);
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px;
  padding: 3rem;
  width: 100% !important;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-pedidos-vazio h1 {
  font-size: 22px;
  color: #333;
}
.content-pedidos-vazio small {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #333;
  margin-top: 20px;
}
.nav-itens-titulo {
  border: solid 1px rgb(195, 192, 192);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  border-radius: 0.25rem;
  padding: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.nav-itens-status .pedido-nav {
  background-color: rgba(255, 255, 255, 0.658);
  padding: 1px 5px;
  border: solid 1px rgb(199, 197, 197);
  margin: 1px 0px;
  margin-left: 4px;
  border-radius: 3px;
  cursor: pointer;
}
.pedido-nav .codigo {
  width: 100%;
  font-weight: 600;
  font-size: 14px;
}
.pedido-nav .nome {
  width: 100%;
  font-size: 13px;
}
.pedido-nav .data-valor {
  width: 100%;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  padding: 5px 7px 3px 5px;
}
.pedido-nav .data-valor .valor {
  font-weight: 600;
  color: rgb(129, 129, 129);
}
</style>

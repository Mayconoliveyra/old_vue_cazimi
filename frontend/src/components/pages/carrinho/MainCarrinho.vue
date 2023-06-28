<template>
  <Desktop
    :telaExibir="telaExibir"
    :efeitoCarregar="efeitoCarregar"
    :dataUsuario="dataUsuario"
    :dataMercadorias="dataMercadorias"
    :dataResumo="dataResumo"
    :dataFormasPagamento="dataFormasPagamento"
    :dataCartoes="dataCartoes"
    :codPedidoFinalizado="codPedidoFinalizado"
    v-if="this.$mq !='xs'"
  />
  <Mobile
    :telaExibir="telaExibir"
    :efeitoCarregar="efeitoCarregar"
    :dataUsuario="dataUsuario"
    :dataMercadorias="dataMercadorias"
    :dataResumo="dataResumo"
    :dataFormasPagamento="dataFormasPagamento"
    :dataCartoes="dataCartoes"
    :codPedidoFinalizado="codPedidoFinalizado"
    v-else
  />
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default {
  name: "CarrinhoMain",
  components: { Desktop, Mobile },
  data() {
    return {
      /*INICIAL= Tela inicial; FINALIZAR= Finalizar pedido; PAGAMENTO= Tela pagamento; VAZIO= Carrinho vazio;*/
      telaExibir: "",
      dataUsuario: {},
      dataMercadorias: {},
      dataResumo: {},
      dataFormasPagamento: {},
      dataCartoes: {},
      codPedidoFinalizado: 0,
      efeitoCarregar: false /* Da um efeito na div quando trocado de tela */,
    };
  },
  methods: {
    loadCarrinho() {
      const url = `${baseApiUrl}/carrinho`;
      axios
        .get(url)
        .then((res) => {
          /* Atualiza div com qtd de item no carrinho */
          this.$root.$emit("getQtdItensCarrinho");

          this.dataUsuario = res.data.usuario;
          this.dataMercadorias = res.data.mercadorias;
          this.dataResumo = res.data.resumo;
          this.dataFormasPagamento = res.data.formasPagamentos;
          this.dataCartoes = res.data.cartoes;

          /*Seta a primeira forma de pagamento como padrão e o codigo do pagamento*/
          /* O código e utilizado no elemento Pagamento, se for =1 vai abrir o modal */
          for (let i = 0; i < this.dataFormasPagamento.length; i++) {
            let forma = this.dataFormasPagamento[i];
            if (!forma.pagar_entrega) {
              this.dataResumo.tipo_pagamento = forma.nome_pagamento;
              this.dataResumo.codigo_pagamento = forma.codigo_pagamento;
              break;
            }
          }
          if (this.dataResumo.qtd_itens) {
            this.telaExibir = "INICIAL";
          } else {
            this.telaExibir = "VAZIO";
          }
        })
        .catch(showError);
    },
  },
  mounted() {
    /* Espera um pouco para que o token seja autenticado */
    setTimeout(() => {
      this.loadCarrinho();
    }, 100);

    /* Atualiza o data do carrinho do usuário */
    this.$root.$on("getCarrinhoUsuario", () => this.loadCarrinho());

    /*INICIAL= Tela inicial; FINALIZAR= Finalizar pedido; PAGAMENTO= Tela pagamento; VAZIO= Carrinho vazio;*/
    this.$root.$on(
      "setTelaCarrinho",
      (opc = "INICIAL") => (this.telaExibir = opc)
    );

    /*Função para setar a forma de pagamento do pedido*/
    this.$root.$on(
      "finalizarPagamento",
      ({
        bandeira_cartao = null,
        tipo_cartao = null,
        max_parcelas = null,
        troco_entrega = null,
        vlr_pago_entrega = null,
        vlr_troco_entrega = null,
      }) => {
        this.dataResumo.bandeira_cartao = bandeira_cartao;
        this.dataResumo.tipo_cartao = tipo_cartao;
        this.dataResumo.max_parcelas = max_parcelas;
        this.dataResumo.troco_entrega = troco_entrega;
        this.dataResumo.vlr_pago_entrega = vlr_pago_entrega;
        this.dataResumo.vlr_troco_entrega = vlr_troco_entrega;
        this.telaExibir = "FINALIZAR";
      }
    );

    /* Função para finalizar o pedido */
    this.$root.$on("finalizarPedidoNEW", () => {
      const url = `${baseApiUrl}/pedido`;
      const modelo = {
        usuario: this.dataUsuario,
        resumo: this.dataResumo,
      };
      axios
        .post(url, modelo)
        .then((res) => {
          this.codPedidoFinalizado = res.data;
          this.telaExibir = "FINALIZADO";
          this.$root.$emit("getQtdItensCarrinho");
        })
        .catch(showError);
    });
  },
  beforeDestroy() {
    /* Destroy todos eventos para que não fique duplicados quando for aberto a pagina novamente */
    this.$root.$off("getCarrinhoUsuario", this.fn);
    this.$root.$off("setTelaCarrinho", this.fn);
    this.$root.$off("finalizarPagamento", this.fn);
    this.$root.$off("finalizarPedidoNEW", this.fn);
  },
  watch: {
    telaExibir() {
      this.efeitoCarregar = true;
      setTimeout(() => {
        this.efeitoCarregar = false;
      }, 300);
    },
  },
};
</script>

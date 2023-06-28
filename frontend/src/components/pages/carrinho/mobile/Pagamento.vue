<template>
  <div class="pagamentos-mobile">
    <h1 class="titulo-pgt">FORMA DE PAGAMENTO</h1>
    <div class="opcoes-pagamento">
      <!-- Os elementos que tiver pagar_entrega=true, não vai aparecer aqui. -->
      <div
        v-show="!forma.pagar_entrega"
        v-for="forma in dataFormasPagamento"
        :key="forma.codigo_pagamento"
      >
        <button
          v-if="!forma.pagar_entrega"
          @click="setTipoPagamento(forma.nome_pagamento,forma.codigo_pagamento)"
          type="button"
        >
          <b-icon :icon="forma.icone" scale="1.4"></b-icon>
          {{forma.nome_pagamento}}
        </button>
      </div>
    </div>
    <b-modal
      ref="modal-pagar-entrega"
      hide-footer
      id="modal-pagar-entrega"
      size="md"
      title="PAGAR NA ENTREGA"
    >
      <ModalPagarEntrega
        :dataFormasPagamento="dataFormasPagamento"
        :dataCartoes="dataCartoes"
        :dataResumo="dataResumo"
      />
    </b-modal>
  </div>
</template>

<script>
import ModalPagarEntrega from "./ModalPagarEntrega";
export default {
  name: "Pagamentos",
  props: {
    dataFormasPagamento: {},
    dataCartoes: {},
    dataResumo: {},
  },
  components: { ModalPagarEntrega },
  methods: {
    /* Essa função seta o this.dataResumo.tipo_pagamento */
    /* Ex: PAGAR NA ENTREGA, PAGAR COM PIX, RETIRAR NA LOJA... */
    setTipoPagamento(formaSelecionada, codigo_pagamento) {
      this.dataResumo.codigo_pagamento = codigo_pagamento;
      this.dataResumo.tipo_pagamento = formaSelecionada;

      /* Chama a função para finalizar pedido. Em desckop funciona diferente. */
      this.formaPagamento();
    },
    formaPagamento() {
      this.dataResumo.tipo_pagamento_entrega = null;
      if (this.dataResumo.codigo_pagamento == 1) {
        this.$refs["modal-pagar-entrega"].show();
      } else {
        this.$root.$emit("finalizarPagamento", {});
      }
    },
  },
};
</script>

<style  scoped>
.pagamentos-mobile {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #f2f3f4; /* Padrão */
  background: #ffffff; /* Padão */
}
.titulo-pgt {
  width: 100%;
  padding: 14px;
  color: var(--cor-laranja);
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
}
.opcoes-pagamento {
  width: 100%;
  height: 100%;
}
.opcoes-pagamento button {
  padding: 18px;
  width: 100%;
  display: flex;
  justify-content: left;
  border: none;
  border-bottom: 2px solid #e6e6e6; /* Padrão */
  user-select: none;
  color: #6d6c6c; /* Padrão */
  background-color: transparent;
  font-size: 17px;
  font-weight: bold;
}
.opcoes-pagamento:last-child {
  border-top: 2px solid #e6e6e6; /* Padrão */
}
.opcoes-pagamento button svg {
  margin-right: 15px;
}
</style>
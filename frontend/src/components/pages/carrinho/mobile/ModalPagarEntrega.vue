<template>
  <div>
    <div v-if="!dataResumo.tipo_pagamento_entrega">
      <div v-for="forma in dataFormasPagamento" :key="forma.codigo_pagamento">
        <button
          v-if="forma.pagar_entrega"
          @click="setTipoPagamentoEntrega(forma.nome_pagamento,forma.codigo_pagamento)"
          class="btn-forma-pagamento mt-2"
        >
          <b-icon class="mr-3" :icon="forma.icone" font-scale="2" style="color:#ff6500;"></b-icon>
          {{forma.nome_pagamento}}
        </button>
      </div>
    </div>
    <div v-if="dataResumo.tipo_pagamento_entrega=='Cartão'" class="dinheiro">
      <h1 class="mt-0 mb-0">Cartão de Crédito</h1>
      <div
        v-for="cartao in dataCartoes"
        :key="cartao.codigo_cartao+'C'"
        v-show="cartao.tipo=='C'"
        class="w-75"
      >
        <button
          v-if="cartao.tipo=='C'"
          @click="formaPagamento({
            bandeira_cartao: cartao.bandeira,
            tipo_cartao: cartao.tipo,
            max_parcelas: maxParcelas(cartao.vlr_minimo_parcela, cartao.maximo_parcelas)})"
          class="btn-cartao-entrega mt-2"
        >
          <b-icon class="mr-2" icon="credit-card2-back-fill" font-scale="2" style="color:#ff6500;"></b-icon>
          <div class="d-flex justify-content-between align-items-center w-100">
            {{cartao.bandeira}}
            <p v-if="dataResumo.vlr_total>= cartao.vlr_minimo_parcela">
              parcelamos até
              <b>{{cartao.maximo_parcelas}}</b>x
            </p>
            <p v-else>
              parcelamos até
              <b>1x</b>
            </p>
          </div>
        </button>
      </div>
      <h1 class="mt-3 mb-0">Cartão de Débito</h1>
      <div
        v-for="cartao in dataCartoes"
        :key="cartao.codigo_cartao+'D'"
        v-show="cartao.tipo=='D'"
        class="w-75"
      >
        <button
          v-if="cartao.tipo=='D'"
          @click="formaPagamento({bandeira_cartao: cartao.bandeira, tipo_cartao: cartao.tipo})"
          class="btn-cartao-entrega mt-2"
        >
          <b-icon class="mr-2" icon="credit-card2-back-fill" font-scale="2" style="color:#ff6500;"></b-icon>
          {{cartao.bandeira}}
        </button>
      </div>
    </div>
    <div v-if="dataResumo.tipo_pagamento_entrega=='Dinheiro'" class="dinheiro">
      <h1>Troco pra quanto?</h1>
      <p
        v-if="dataResumo"
      >O valor do seu pedido atualmente é de {{dataResumo.vlr_total|maskDinheiro}}.</p>
      <p>Digite quanto vai pagar em dinheiro para que o entregador leve o seu troco.</p>
      <!--  <money
        class="input-troco"
        autocomplete="off"
        ref="input-troco"
        type="text"
        v-model="valorPagoCliente"
        v-bind="maskDinheiroRS"
        @keydown.esc="pagtoEntrega=''"
        @keydown.enter="alterarQuantidadeMercadoria()"
        @keypress="aceitarSoNumeroInput"
      />-->
      <input
        class="input-troco"
        autocomplete="off"
        ref="input-troco"
        type="number"
        v-model="valorPagoCliente"
        v-bind="maskDinheiroRS"
        @keydown.esc="pagtoEntrega=''"
        @keydown.enter="alterarQuantidadeMercadoria()"
        @keypress="aceitarSoNumeroInput"
      />
      <div class="mt-5 d-flex w-100">
        <button
          @click="formaPagamento({troco_entrega: false})"
          type="button"
          class="btn-nao-troco"
        >Não quero troco</button>
        <button
          @click="formaPagamento({
            troco_entrega: true,
            vlr_pago_entrega: valorPagoCliente,
            vlr_troco_entrega: (valorPagoCliente - dataResumo.vlr_total)})"
          :disabled="dataResumo.vlr_total>valorPagoCliente"
          type="button"
          :class="{'btn-confirmar-troco':true, 'btn-desabilitado':dataResumo.vlr_total>valorPagoCliente}"
        >Confirmar</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalPagarEntrega",
  data() {
    return {
      valorPagoCliente: 0,
      maskDinheiroRS: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        prefix: "R$  ",
        masked: false,
      },
    };
  },
  props: {
    dataFormasPagamento: {},
    dataCartoes: {},
    dataResumo: {},
  },
  methods: {
    /* Se A for maior que B, retorna A. Caso contrario retorna o valor "Retorna" */
    maxParcelas(valorMinimoParcelamento, maximo_parcelas) {
      if (valorMinimoParcelamento <= this.dataResumo.vlr_total)
        return maximo_parcelas;
      return 1;
    },
    setTipoPagamentoEntrega(formaSelecionada, codigo_pagamento) {
      this.dataResumo.tipo_pagamento_entrega = formaSelecionada;
      /* Se a forma de pagamento no PAGAR NA ENTREGA for selecionado DInheiro ou Cartão, abre modal, caso contrario finalizar direto. */
      /*4= Dinheiro; 5= Cartão  */
      if (codigo_pagamento != 4 && codigo_pagamento != 5) {
        this.formaPagamento({});
      }
    },
    aceitarSoNumeroInput(evt) {
      let theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      let regex = /^[0-9.]+$/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
    /*bandeira_cartao:(master, amex...);*/
    /*tipo_cartao:(C=Credito, D=Debito);*/
    /*max_parcelas:(1,2,3...);*/
    /*troco_entrega:true=levar troco; false= cliente seleciou 'Não quero troco'*/
    /*vlr_pago_entrega:dinheiro que o cliente vai dar na hora da entrega*/
    formaPagamento({
      bandeira_cartao,
      tipo_cartao,
      max_parcelas,
      troco_entrega,
      vlr_pago_entrega,
      vlr_troco_entrega,
    }) {
      this.$root.$emit("finalizarPagamento", {
        bandeira_cartao,
        tipo_cartao,
        max_parcelas,
        troco_entrega,
        vlr_pago_entrega,
        vlr_troco_entrega,
      });
    },
  },
};
</script>

<style scoped>
.btn-forma-pagamento {
  background-color: none;
  width: 100%;
  border-radius: 7px;
  border: solid 1px rgb(191, 190, 190);
  padding: 5px 20px;
  display: flex;
  align-items: center;
}

.dinheiro {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 7px 15px 7px;
}
.dinheiro h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(66, 70, 77);
}
.dinheiro p {
  margin-bottom: 2px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
.input-troco {
  border: none;
  border-bottom: solid 2px rgb(169, 168, 168);
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
  text-align: center;
  max-width: 50%;
}
.input-troco:active {
  outline-style: none !important;
  box-shadow: 0 0 0 0 !important;
  outline: 0 !important;
}
.input-troco:focus {
  outline-style: none !important;
  box-shadow: 0 0 0 0 !important;
  outline: 0 !important;
}
.btn-nao-troco {
  flex: 1;
  border: solid 1px rgb(216, 215, 215);
  font-size: 0.9rem;
  padding: 7px;
  margin-right: 7px;
  border-radius: 5px;
  color: rgba(243, 37, 37, 0.85);
  background-color: rgb(250, 250, 250);
  font-weight: bold;
  letter-spacing: 1px;
}
.btn-confirmar-troco {
  flex: 1;
  border: solid 1px rgb(191, 190, 190);
  font-size: 0.9rem;
  padding: 7px;
  margin-left: 7px;
  border-radius: 5px;
  background-color: rgba(240, 68, 68, 0.94);
  color: rgba(255, 255, 255, 0.926);
  border: none;
  letter-spacing: 1px;
}

.btn-cartao-entrega {
  background-color: none;
  width: 100%;
  border-radius: 7px;
  border: solid 1px rgb(191, 190, 190);
  padding: 2px 10px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: normal;
  color: #333232;
}
.btn-cartao-entrega p {
  font-size: 11px;
  color: #333232b1;
  padding: 0px;
  margin: 0px;
}
</style>
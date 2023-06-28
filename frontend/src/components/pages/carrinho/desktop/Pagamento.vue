<template>
  <div class="pagamentos">
    <Progresso
      :progresso="{percentual:60, carrinho:true,identificacao:true,pagamento:true,confirmacao:false,conclusao:false}"
    />
    <div class="pagamentos-exibir">
      <div class="icone-h2">
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 1C6.54545 1 1.88727 4.62833 0 9.75C1.88727 14.8717 6.54545 18.5 12 18.5C12.3927 18.5 12.7855 18.5 13.1782 18.4417C13.1221 18.0752 13.0929 17.7046 13.0909 17.3333C13.0909 16.68 13.1782 16.0267 13.3527 15.3967C12.9055 15.5133 12.4582 15.5833 12 15.5833C10.5534 15.5833 9.16598 14.9688 8.14305 13.8748C7.12013 12.7808 6.54545 11.2971 6.54545 9.75C6.54545 8.2029 7.12013 6.71917 8.14305 5.62521C9.16598 4.53125 10.5534 3.91667 12 3.91667C13.4466 3.91667 14.834 4.53125 15.8569 5.62521C16.8799 6.71917 17.4545 8.2029 17.4545 9.75C17.4545 10.0883 17.4218 10.4383 17.3673 10.7767C18.0873 10.485 18.8618 10.3333 19.6364 10.3333C20.9127 10.3333 22.1564 10.73 23.2255 11.5C23.52 10.9167 23.7818 10.3333 24 9.75C22.1127 4.62833 17.4545 1 12 1ZM12 6.25C11.132 6.25 10.2996 6.61875 9.68583 7.27513C9.07208 7.9315 8.72727 8.82174 8.72727 9.75C8.72727 10.6783 9.07208 11.5685 9.68583 12.2249C10.2996 12.8813 11.132 13.25 12 13.25C12.868 13.25 13.7004 12.8813 14.3142 12.2249C14.9279 11.5685 15.2727 10.6783 15.2727 9.75C15.2727 8.82174 14.9279 7.9315 14.3142 7.27513C13.7004 6.61875 12.868 6.25 12 6.25ZM18.5455 12.6667V16.1667H15.2727V18.5H18.5455V22H20.7273V18.5H24V16.1667H20.7273V12.6667H18.5455Z"
            fill="#FF6500"
          />
        </svg>
        <h2>FORMA DE PAGAMENTO</h2>
      </div>
      <div class="d-flex h-100 mt-3">
        <div class="opcoes-pagamento">
          <!-- Os elementos que tiver pagar_entrega=true, não vai aparecer aqui. -->
          <div
            v-show="!forma.pagar_entrega"
            class="mb-3"
            v-for="forma in dataFormasPagamento"
            :key="forma.codigo_pagamento"
          >
            <button
              v-if="!forma.pagar_entrega"
              :class="{'btn-selecionado': dataResumo.tipo_pagamento==forma.nome_pagamento}"
              @click="setTipoPagamento(forma.nome_pagamento,forma.codigo_pagamento)"
              type="button"
            >{{forma.nome_pagamento}}</button>
          </div>
        </div>
        <div class="form-pagamento">
          <h2>{{dataResumo.tipo_pagamento}}</h2>
          <!-- Os elementos que tiver pagar_entrega=true, não vai aparecer aqui. -->
          <div
            v-html="forma.descricao"
            v-show="dataResumo.tipo_pagamento==forma.nome_pagamento && !forma.pagar_entrega"
            v-for="forma in dataFormasPagamento"
            :key="forma.codigo_pagamento"
          ></div>
          <div class="total-pagar-compra">
            <span class="span-title-total">Total da sua compra:</span>
            <span class="span-total">{{dataResumo.vlr_total|maskDinheiro}}</span>
          </div>
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
    <div class="confirma-pagamento">
      <button @click="$root.$emit('setTelaCarrinho','INICIAL')" class="btn-voltar">VOLTAR</button>
      <button
        @click="formaPagamento()"
        type="button"
        class="btn-pagar"
      >{{dataResumo.tipo_pagamento}}</button>
    </div>
  </div>
</template>

<script>
import Progresso from "./Progresso";
import ModalPagarEntrega from "./ModalPagarEntrega";
export default {
  name: "Pagamentos",
  props: {
    dataFormasPagamento: {},
    dataCartoes: {},
    dataResumo: {},
  },
  components: { Progresso, ModalPagarEntrega },
  methods: {
    /* Essa função seta o this.dataResumo.tipo_pagamento */
    /* Ex: PAGAR NA ENTREGA, PAGAR COM PIX, RETIRAR NA LOJA... */
    setTipoPagamento(formaSelecionada, codigo_pagamento) {
      this.dataResumo.codigo_pagamento = codigo_pagamento;
      this.dataResumo.tipo_pagamento = formaSelecionada;
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

<style>
.pagamentos {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background: rgb(242, 243, 244);
}
.pagamentos .pagamentos-exibir {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  background-color: rgb(255, 255, 255);
  margin-top: 10px;
}
.pagamentos .opcoes-pagamento {
  width: 280px;
  height: 100%;
}
.pagamentos .opcoes-pagamento button {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--cor-laranja);
  background-color: var(--cor-branca);
  user-select: none;
  color: var(--cor-laranja);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
}
.pagamentos .form-pagamento {
  flex: 1;
  margin-left: 32px;
}
.pagamentos .form-pagamento h2 {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: rgb(66, 70, 77);
}
.pagamentos .form-pagamento h3 {
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 700;
  margin-top: 0.5rem;
  color: rgb(86, 92, 105);
}
.pagamentos .form-pagamento p {
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
}
.pagamentos .form-pagamento ul {
  padding-left: 1rem;
}
.pagamentos .form-pagamento li {
  font-size: 0.875rem;
  line-height: 1.5rem;
  list-style: disc;
  color: rgb(86, 92, 105);
}
.pagamentos .confirma-pagamento {
  width: 100%;
  padding: 32px 0px;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  max-width: 1200px;
}
.pagamentos .total-pagar-compra {
  background-color: #f0eeee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 6.875rem;
  padding: 1rem;
  border-radius: 0.3rem;
  margin-top: 2.5rem;
}
.pagamentos .span-title-total {
  font-size: 1.25rem;
  line-height: 1.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--cor-laranja);
}
.pagamentos .span-total {
  font-size: 1.875rem;
  line-height: 2.3125rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.25rem;
  font-style: normal;
  letter-spacing: -0.35px;
  color: var(--cor-laranja);
}
.pagamentos .btn-voltar {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--cor-laranja);
  background-color: var(--cor-branca);
  user-select: none;
  color: var(--cor-laranja);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  padding: 0px 3rem;
}
.pagamentos .btn-pagar {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--cor-laranja);
  background-color: var(--cor-laranja);
  user-select: none;
  color: var(--cor-branca);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  padding: 0px 3rem;
}
.pagamentos .btn-selecionado {
  outline-style: none;
  box-shadow: 0 0 0 0;
  outline: 0 !important;
  border: 1px solid var(--cor-laranja) !important;
  background-color: var(--cor-laranja) !important;
  color: var(--cor-branca) !important;
}
.pagamentos button:hover {
  text-decoration: none;
  opacity: 80%;
}
</style>
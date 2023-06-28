<template>
  <div class="carrinho-resumo">
    <div>
      <div class="carrinho-resumo-exibir">
        <div class="icone-h2">
          <b-icon icon="file-earmark-check-fill" scale="1.6"></b-icon>
          <h2>RESUMO</h2>
        </div>
        <div class="text-resumo">
          Total de itens:
          <b>{{dataResumo.qtd_itens}}</b>
        </div>
        <div class="text-resumo">
          Valor dos Produtos:
          <b>{{dataResumo.vlr_total_produtos|maskDinheiro}}</b>
        </div>
        <div class="text-resumo">
          Frete:
          <b>{{dataResumo.vlr_frete|maskDinheiro}}</b>
        </div>
        <hr class="mt-1 mb-1" />
        <div class="text-resumo">
          Total da compra:
          <b>{{dataResumo.vlr_total|maskDinheiro}}</b>
        </div>
        <div v-if="dataResumo.infomacoes_pendete" class="cadastro-incompleto">
          <div class="msg-inc-icon">
            <b-icon icon="exclamation-diamond" scale="1.8"></b-icon>
          </div>
          <div
            class="msg-icon-text"
          >Seu cadastro está incompleto, por favor, forneça mais informações para continuar com seu pedido.</div>
        </div>
        <div v-if="telaExibir=='FINALIZAR'">
          <div class="forma-pagamento">
            <span>Forma de pagamento:</span>
            <span>
              <b>{{dataResumo.tipo_pagamento}}</b>
            </span>
            <span v-show="dataResumo.tipo_pagamento_entrega" class="mt-1">Pagamento em:</span>
            <span>
              <b>{{dataResumo.tipo_pagamento_entrega}}</b>
            </span>
            <div v-if="dataResumo.tipo_pagamento_entrega=='Dinheiro'" class="d-flex flex-column">
              <span class="mt-1">Troco para:</span>
              <span v-if="dataResumo.troco_entrega">
                <b>{{dataResumo.vlr_pago_entrega|maskDinheiro}}</b>
              </span>
              <span v-else>
                <b>Não quero troco</b>
              </span>
            </div>
            <div v-if="dataResumo.tipo_pagamento_entrega=='Cartão'" class="d-flex flex-column">
              <span class="mt-1">Bandeira:</span>
              <span v-if="dataResumo.tipo_cartao=='C'">
                <b>{{dataResumo.bandeira_cartao}}</b>(Crédito)
              </span>
              <span v-if="dataResumo.tipo_cartao=='D'">
                <b>{{dataResumo.bandeira_cartao}}</b>(Débito)
              </span>
              <span v-if="dataResumo.tipo_cartao=='C'">
                No momento do pagamento você poderá escolher parcelar em até
                <b>x{{dataResumo.max_parcelas}}</b> parcelas(Sem Júros).
              </span>
            </div>
          </div>
          <router-link
            v-if="dataResumo.infomacoes_pendete"
            class="btn-resumo btn-resumo-1"
            to="/conta/meus-dados"
          >FINALIZAR</router-link>
          <button
            v-else
            @click="$root.$emit('finalizarPedidoNEW')"
            class="btn-resumo btn-resumo-1"
          >FINALIZAR</button>

          <button
            @click="$root.$emit('setTelaCarrinho','PAGAMENTO')"
            class="btn-resumo btn-resumo-2"
          >VOLTAR</button>
        </div>
        <div v-else>
          <router-link
            v-if="dataResumo.infomacoes_pendete"
            class="btn-resumo btn-resumo-1"
            to="/conta/meus-dados"
          >IR PARA O PAGAMENTO</router-link>
          <button
            v-else
            @click="$root.$emit('setTelaCarrinho','PAGAMENTO')"
            class="btn-resumo btn-resumo-1"
          >IR PARA O PAGAMENTO</button>
          <router-link class="btn-resumo btn-resumo-2" to="/">CONTINUAR COMPRANDO</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resumo",
  props: {
    dataResumo: {},
    telaExibir: String,
  },
};
</script>

<style scoped>
.carrinho-resumo {
  grid-area: carrinho-resumo;
  margin: 10px 7px 13px 13px;
}
.carrinho-resumo > div {
  background: rgb(255, 255, 255);
  padding: 15px 20px;
  border-radius: 0.25rem;
}
.carrinho-resumo-exibir {
  width: 100%;
  height: auto;
}
.text-resumo {
  font-size: 0.75rem;
  line-height: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  color: rgb(127, 133, 141);
}
.text-resumo b {
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: rgb(66, 70, 77);
}

.btn-resumo {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
}
.btn-resumo-1 {
  border: 1px solid var(--cor-laranja);
  background-color: var(--cor-laranja);
  color: var(--cor-branca);
  margin-top: 20px;
}
.btn-resumo-2 {
  border: 1px solid var(--cor-laranja);
  background-color: var(--cor-branca);
  color: var(--cor-laranja);
  margin-top: 10px;
}
.btn-resumo:hover {
  text-decoration: none;
  opacity: 80%;
}

.forma-pagamento {
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
  background-color: rgb(229, 255, 241);
  margin-top: 3px;
}
.forma-pagamento span {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  color: rgb(31, 144, 80);
}
.informaçoes-pedido-finalizar {
  display: flex;
  width: 100%;
  margin-top: 15px;
}
.informaçoes-pedido-finalizar h4 {
  font-size: 20px;
  font-weight: 700;
  color: rgb(66, 70, 77);
}
.informaçoes-pedido-finalizar span {
  font-size: 14px;
  color: rgb(127, 133, 141);
  font-weight: 400;
}
.informacao-finalizar {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  background-color: rgb(250, 250, 251);
  border-radius: 0.25rem;
  color: black;
}
.informacao-finalizar p {
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: rgb(86, 92, 105);
}
.cadastro-incompleto {
  display: flex;
  padding: 4px 7px;
  background-color: rgb(248, 211, 211);
  border: solid 3px rgb(235, 202, 202);
  margin-top: 4px;
  border-radius: 5px;

  border: solid 1px #be68683c;
  background-color: #fff;
  box-shadow: 0 0 0 4px #fcf4f4 inset;
  align-items: center;
}
.msg-inc-icon {
  height: 100%;
  margin: 0px 17px 0px 7px;
}
.msg-inc-icon svg {
  color: rgb(255, 0, 0);
}
.msg-icon-text {
  font-size: 12px;
  color: rgb(245, 31, 31);
}
</style>
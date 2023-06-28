<template>
  <div class="pagamentos">
    <h1 class="titulo-pagamento">FORMA DE PAGAMENTO</h1>
    <div class="opcoes-pagamento">
      <div class="pagamento">
        <!--  <button
          :class="{'btn-selecionado': tipoPagamento=='PAGAR NA ENTREGA'}"
          @click="alterarFormaPagamento('PAGAR NA ENTREGA')"
          type="button"
        >PAGAR NA ENTREGA</button>-->
        <b
          @click="alterarFormaPagamento('PAGAR NA ENTREGA');togglePagarEntrega=!togglePagarEntrega"
          :class="{'btn-selecionado': tipoPagamento=='PAGAR NA ENTREGA'}"
        >
          <div>PAGAR NA ENTREGA</div>
          <b-icon v-show="!togglePagarEntrega" icon="chevron-right" scale="1.2"></b-icon>
          <b-icon v-show="togglePagarEntrega" icon="chevron-down" scale="1.2"></b-icon>
        </b>
        <div v-show="togglePagarEntrega">
          <div class="form-pagamento">
            <h3>Compra segura. Só pague no momento da entrega!</h3>
            <p>
              No pagamento
              <b>pagar na entrega</b>, você efetua sua compra com ainda mais segurança, podendo verificar seu pedido fisicamente.
            </p>
            <p>Você pode realizar o pagamento em espécie, cartão de crédito e/ou débito.</p>
          </div>
          <div class="total-compra">
            <div>Valor total da compra</div>
            <div>{{carrinhoResumo.vlr_total|maskDinheiro}}</div>
          </div>
          <div class="confirma-pagamento">
            <button
              @click="finalizarFormaPagamento()"
              type="button"
              class="btn-pagar"
            >{{tipoPagamento}}</button>
          </div>
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
      <div
        class="title-atencao"
      >Atenção para a forma de pagamento selecionada. Você não poderá utilizar outra nessa entrega.</div>
      <div v-if="!tipoPagamentoEntrega">
        <button @click="tipoPagamentoEntrega='Dinheiro'" class="btn-forma-pagamento">
          <b-icon class="mr-3" icon="cash" font-scale="2.5" style="color:#ff6500;"></b-icon>Dinheiro
        </button>
        <button @click="tipoPagamentoEntrega='Cartão'" class="btn-forma-pagamento mt-3">
          <b-icon
            class="mr-3"
            icon="credit-card2-back-fill"
            font-scale="2.5"
            style="color:#ff6500;"
          ></b-icon>Cartão
        </button>
        <button
          @click="tipoPagamentoEntrega='Pix';  finalizarFormaPagamentoPagarEntrega(false)"
          class="btn-forma-pagamento mt-3"
        >
          <b-icon class="mr-3" icon="x-diamond-fill" font-scale="2.5" style="color:#ff6500;"></b-icon>PIX
        </button>
      </div>
      <div v-if="tipoPagamentoEntrega=='Cartão'" class="dinheiro">
        <h1 class="mt-0 mb-0">Cartão de Crédito</h1>
        <div
          v-for="cartao in dataCartaoAceitos"
          :key="cartao.codigo_cartao+'C'"
          v-show="cartao.tipo=='C'"
          class="w-100"
        >
          <button
            v-if="cartao.tipo=='C'"
            @click="finalizarFormaPagamentoPagarEntrega(false,cartao.bandeira,cartao.tipo,carrinhoResumo.vlr_total >= cartao.vlr_minimo_parcela? cartao.maximo_parcelas: 1)"
            class="btn-cartao-entrega mt-2"
          >
            <b-icon
              class="mr-2"
              icon="credit-card2-back-fill"
              font-scale="2"
              style="color:#ff6500;"
            ></b-icon>
            <div class="d-flex justify-content-between align-items-center w-100">
              {{cartao.bandeira}}
              <p v-if="carrinhoResumo.vlr_total>= cartao.vlr_minimo_parcela">
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
          v-for="cartao in dataCartaoAceitos"
          :key="cartao.codigo_cartao+'D'"
          v-show="cartao.tipo=='D'"
          class="w-100"
        >
          <button
            v-if="cartao.tipo=='D'"
            @click="finalizarFormaPagamentoPagarEntrega(false,cartao.bandeira,cartao.tipo,1)"
            class="btn-cartao-entrega mt-2"
          >
            <b-icon
              class="mr-2"
              icon="credit-card2-back-fill"
              font-scale="2"
              style="color:#ff6500;"
            ></b-icon>
            {{cartao.bandeira}}
          </button>
        </div>
      </div>
      <div v-if="tipoPagamentoEntrega=='Dinheiro'" class="dinheiro">
        <h1>Troco pra quanto?</h1>
        <p
          v-if="carrinhoResumo"
        >O valor do seu pedido atualmente é de {{carrinhoResumo.vlr_total|maskDinheiro}}.</p>
        <p>Digite quanto vai pagar em dinheiro para que o entregador leve o seu troco.</p>
        <money
          class="input-troco"
          autocomplete="off"
          ref="input-troco"
          type="text"
          v-model="valorPagoCliente"
          v-bind="maskDinheiroRS"
          @keydown.esc="tipoPagamentoEntrega=''"
          @keydown.enter="alterarQuantidadeMercadoria()"
          @keypress="aceitarSoNumeroInput"
        />
        <div class="mt-5 d-flex w-100">
          <button
            @click="finalizarFormaPagamentoPagarEntrega(false)"
            type="button"
            class="btn-nao-troco"
          >Não quero troco</button>
          <button
            @click="finalizarFormaPagamentoPagarEntrega()"
            :disabled="valorPagoCliente==0"
            type="button"
            :class="{'btn-confirmar-troco':true, 'btn-desabilitado':valorPagoCliente < parseFloat(carrinhoResumo.vlr_total) - parseFloat(0.01)}"
          >Confirmar</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";
export default {
  name: "Pagamentos",
  data() {
    return {
      tipoPagamento: "PAGAR NA ENTREGA",
      tipoPagamentoEntrega: "",
      valorPagoCliente: 0,
      maskDinheiroRS: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        prefix: "R$  ",
        masked: false,
      },
      dataCartaoAceitos: [],
      togglePagarEntrega: true,
      togglePix: false,
      togglePagarCartao: false,
    };
  },
  methods: {
    voltarParaCarrinho() {
      this.$store.commit("setFinalizarPedido", null);
      this.$router.push({ path: "/carrinho" });
    },
    loadCartoesAceitos() {
      const url = `${baseApiUrl}/cartoes`;
      axios
        .get(url)
        .then((res) => {
          this.dataCartaoAceitos = res.data;
        })
        .catch(showError);
    },
    alterarFormaPagamento(formaSelecionada) {
      this.tipoPagamento = formaSelecionada;
    },
    finalizarFormaPagamento() {
      this.tipoPagamentoEntrega = ""; /* padrao */
      this.valorPagoCliente = 0; /* padrao */
      if (this.tipoPagamento == "PAGAR NA ENTREGA") {
        this.$refs["modal-pagar-entrega"].show();
      } else if (this.tipoPagamento == "PAGAR COM PIX") {
        console.log("Pagar com pix");
      } else if (this.tipoPagamento == "PAGAR COM CARTÃO") {
        console.log("Pagar com cartão");
      }
    },
    finalizarFormaPagamentoPagarEntrega(
      troco = true,
      bandeira = "",
      tipo = "",
      maxParcelas = ""
    ) {
      const modeloFinalizarPagamento = {
        vlr_total: this.carrinhoResumo.vlr_total,
        vlr_total_produtos: this.carrinhoResumo.vlr_total_produtos,
        vlr_frete: this.carrinhoResumo.vlr_frete,
        qtd_itens: this.carrinhoResumo.qtd_itens,

        tipo_pagamento: this.tipoPagamento,
        tipo_pagamento_entrega: this.tipoPagamentoEntrega,
        vlr_pago_entrega: troco
          ? this.valorPagoCliente
          : this.carrinhoResumo.vlr_total,
        vlr_troco_entrega: troco
          ? this.arredondarValor(
              parseFloat(this.valorPagoCliente) -
                parseFloat(this.carrinhoResumo.vlr_total)
            )
          : 0,

        troco_entrega: troco ? troco : false,
        tipo_cartao: tipo,
        bandeira_cartao: bandeira,
        max_parcelas: maxParcelas,
      };
      this.$store.commit("setFinalizarPedido", modeloFinalizarPagamento);
      this.$refs["modal-pagar-entrega"].hide();
      this.$router.push({ path: "/carrinho" });
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
    arredondarValor(num, places = 2) {
      if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + places) + "e-" + places);
      } else {
        let arr = ("" + num).split("e");
        let sig = "";
        if (+arr[1] + places > 0) {
          sig = "+";
        }

        return +(
          Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) +
          "e-" +
          places
        );
      }
    },
  },
  computed: mapState(["carrinhoResumo"]),
  created() {
    /* ABRE PAGINA NO INICIO DA DIV */
    window.scrollTo(0, 0);
    this.loadCartoesAceitos();
  },
  mounted() {
    if (!this.carrinhoResumo || !this.carrinhoResumo.vlr_total) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style scoped>
.pagamentos {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 10px;
  background: rgb(242, 243, 244);
}
.titulo-pagamento {
  padding: 10px 16px 12px;
  color: rgb(255, 102, 0);
  font-size: 19px;
  font-weight: bold;
}
.pagamento {
  width: 100%;
  border-top: 1px solid rgb(230, 230, 230);
}
.pagamento > b {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  border: none;
  background: none;
}
.opcoes-pagamento {
  padding: 0px 4px;
}

.form-pagamento {
  flex: 1;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding: 0px 20px;
  letter-spacing: 0.3px;
  color: rgb(127, 133, 141);
  margin-bottom: 26px;
}
.form-pagamento h2 {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
}
.form-pagamento h3 {
  font-size: 16px;
  line-height: 1.125rem;
  font-weight: 700;
  margin-top: 3px;
}
.form-pagamento p {
  margin-bottom: 1px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
}

.form-pagamento ul {
  padding-left: 1rem;
}
.form-pagamento li {
  font-size: 0.875rem;
  line-height: 1.5rem;
  list-style: disc;
  color: rgb(86, 92, 105);
}
.total-compra {
  border-top: 1px solid rgb(222, 224, 228);
  border-bottom: 1px solid rgb(222, 224, 228);
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  color: rgb(102, 102, 102);
}
.btn-pagar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47px;
  background: linear-gradient(0deg, rgb(10, 153, 7), rgb(10, 153, 7));
  border-radius: 3px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.2px;
  color: rgb(255, 255, 255);
  margin-bottom: 32px;
  cursor: pointer;
  border: none;
}
/* MODAL */
.title-atencao {
  background-color: rgba(245, 245, 247, 0.604);
  padding: 10px;
  font-weight: normal;
  font-size: 13px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #2b2c2ca4;
}

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
  padding: 10px 20px;
}
.dinheiro h1 {
  font-size: 1.25rem;
  line-height: 1.875rem;
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
  padding: 5px 10px;
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
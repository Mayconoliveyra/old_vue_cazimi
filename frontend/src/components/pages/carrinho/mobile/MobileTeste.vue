<template>
  <div class="carrinho-mobile">
    <div
      class="carrinho-com-itens"
      v-if="carrinho && user && carrinho.length > 0 && !finalizarPedido && carrinhoResumo"
    >
    
      <div class="carrinho-itens">
        <div class="titulo-itens">PRODUTO {{carrinhoResumo.qtd_itens}}</div>
        <div
          class="item_carrinho"
          v-for="(mercadoria) in carrinho"
          :key="mercadoria.codigo_mercadoria"
        >
          <CardMercadoriaMobile :mercadoria="mercadoria" :exibirUtilititarios="true"></CardMercadoriaMobile>
        </div>
        <div class="totais">
          <div class="totais-row">
            <span class="totais-1">Total de itens:</span>
            <span class="totais-2">{{carrinhoResumo.qtd_itens}}</span>
          </div>
          <div class="totais-row">
            <span class="totais-1">Total dos Produtos:</span>
            <span class="totais-2">{{carrinhoResumo.vlr_total_produtos|maskDinheiro}}</span>
          </div>
          <div class="totais-row">
            <span class="totais-1">Frete:</span>
            <span class="totais-2">{{carrinhoResumo.vlr_frete|maskDinheiro}}</span>
          </div>
          <div class="totais-row mt-2">
            <span class="totais-vlr-total">VALOR TOTAL:</span>
            <span class="totais-2">{{carrinhoResumo.vlr_total|maskDinheiro}}</span>
          </div>
        </div>
        <div class="finalizar">
          <router-link class="fechar-pedido" to="/pagamentos">Finalizar Compra</router-link>
        </div>
      </div>
    </div>
    <!-- CONFIRMA DADOS E FINALIZAR PEDIDO -->
    <div
      class="carrinho-com-itens-finalizar"
      v-if="carrinho && user && carrinho.length > 0 && finalizarPedido && !pedidoFinalizado && carrinhoResumo"
    >
      <div class="carrinho-endereco-finalizar">
        <div class="titulo">
          <h2>CONFIRMAÇÃO DO PEDIDO</h2>
          <span>Confira as informações para concluir o pedido</span>
        </div>
        <hr class="mt-3 mb-2" />
        <div class="informaçoes-pedido-finalizar">
          <div class="mr-1 w-100">
            <h4>DADOS PESSOAIS</h4>
            <div class="informacao-finalizar">
              <div class="p-1">
                <p>
                  <b>{{usuarioEndereco.nome}}</b>
                </p>
                <p>
                  <b>CPF/CNPJ:</b>
                  {{usuarioEndereco.cpf_cnpj}}
                </p>
                <p>
                  <b>Telefone:</b>
                  {{usuarioEndereco.telefone}}
                </p>
                <p>
                  <b>contato:</b>
                  {{usuarioEndereco.contato}}
                </p>
                <p>
                  <b>E-mail:</b>
                  {{usuarioEndereco.email}}
                </p>
                <p>
                  <b>CEP:</b>
                  {{usuarioEndereco.cep}}
                </p>
              </div>
            </div>
          </div>
          <hr class="mt-4 mb-3" />
          <div class="ml-1 w-100">
            <h4>ENDEREÇO PARA ENTREGA</h4>
            <div class="informacao-finalizar">
              <div class="p-1">
                <p>
                  <b>{{usuarioEndereco.logradouro}}</b>
                </p>
                <p>
                  <b>Número:</b>
                  {{usuarioEndereco.numero}}
                </p>
                <p>
                  <b>Bairro:</b>
                  {{usuarioEndereco.bairro}}
                </p>
                <p>
                  <b>CEP:</b>
                  {{usuarioEndereco.cep}}
                </p>
                <p>
                  <b>Cidade:</b>
                  {{usuarioEndereco.localidade}}
                </p>
                <p>
                  <b>Complemento:</b>
                  {{usuarioEndereco.complemento}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carrinho-itens">
        <div class="titulo-itens-finalizar">PRODUTOS DO PEDIDO</div>
        <div
          class="item_carrinho"
          v-for="(mercadoria) in carrinho"
          :key="mercadoria.codigo_mercadoria"
        >
          <CardMercadoriaMobile :mercadoria="mercadoria" :exibirUtilititarios="false"></CardMercadoriaMobile>
        </div>
        <div class="titulo-itens-finalizar">FORMA DE PAGAMENTO</div>
        <div class="totais">
          <div class="totais-row">
            <span class="totais-1">Total de itens:</span>
            <span class="totais-2">{{carrinhoResumo.qtd_itens}}</span>
          </div>
          <div class="totais-row">
            <span class="totais-1">Total dos Produtos:</span>
            <span class="totais-2">{{carrinhoResumo.vlr_total_produtos|maskDinheiro}}</span>
          </div>
          <div class="totais-row">
            <span class="totais-1">Frete:</span>
            <span class="totais-2">{{carrinhoResumo.vlr_frete|maskDinheiro}}</span>
          </div>
          <div class="totais-row mt-2">
            <span class="totais-vlr-total">VALOR TOTAL:</span>
            <span class="totais-2">{{carrinhoResumo.vlr_total|maskDinheiro}}</span>
          </div>
          <div class="forma-pagamento">
            <span>Forma de pagamento:</span>
            <span>
              <b>{{finalizarPedido.tipo_pagamento}}</b>
            </span>
            <span class="mt-1">Pagamento em:</span>
            <span>
              <b>{{finalizarPedido.tipo_pagamento_entrega}}</b>
            </span>
            <div
              v-if="finalizarPedido.tipo_pagamento_entrega=='Dinheiro'"
              class="d-flex flex-column"
            >
              <span class="mt-1">Troco para:</span>
              <span v-if="finalizarPedido.troco_entrega">
                <b>{{finalizarPedido.vlr_pago_entrega|maskDinheiro}}</b>
              </span>
              <span v-else>
                <b>Não quero troco</b>
              </span>
            </div>
            <div v-if="finalizarPedido.tipo_pagamento_entrega=='Cartão'" class="d-flex flex-column">
              <span class="mt-1">Bandeira:</span>
              <span v-if="finalizarPedido.tipo_cartao=='C'">
                <b>{{finalizarPedido.bandeira_cartao}}</b>(Crédito)
              </span>
              <span v-if="finalizarPedido.tipo_cartao=='D'">
                <b>{{finalizarPedido.bandeira_cartao}}</b>(Débito)
              </span>
              <span v-if="finalizarPedido.tipo_cartao=='C'">
                No momento do pagamento você poderá escolher parcelar em até
                <b>x{{finalizarPedido.max_parcelas}}</b> parcelas(Sem Júros).
              </span>
            </div>
          </div>
        </div>
        <div class="finalizar">
          <b class="fechar-pedido" @click="confirmarFinalizarPedido()">Finalizar Compra</b>
        </div>
      </div>
    </div>
    <div v-if="carrinho.length ==0 && !codigoPedidoFinalizado" class="carrinho-vazio">
      <b>O seu carrinho está vazio.</b>
      <span>Deseja olhar outros produtos similares?</span>
      <router-link to="/" class="btn-add-carrinho">
        <svg width="35" height="23" viewBox="0 0 23 22" fill="none">
          <path
            d="M7.09977 17.6C5.88981 17.6 4.91085 18.59 4.91085 19.8C4.91085 21.01 5.88981 22 7.09977 22C8.30973 22 9.2997 21.01 9.2997 19.8C9.2997 18.59 8.30973 17.6 7.09977 17.6ZM0.5 0V2.2H2.69992L6.65979 10.549L5.17484 13.244C4.99885 13.552 4.89985 13.915 4.89985 14.3C4.89985 15.51 5.88981 16.5 7.09977 16.5H20.2993V14.3H7.56176C7.40776 14.3 7.28677 14.179 7.28677 14.025L7.31977 13.893L8.30973 12.1H16.5044C17.3294 12.1 18.0554 11.649 18.4294 10.967L22.3672 3.828C22.458 3.66013 22.5037 3.47158 22.4998 3.28078C22.4959 3.08998 22.4426 2.90346 22.345 2.73943C22.2475 2.5754 22.1091 2.43947 21.9433 2.34492C21.7776 2.25037 21.5901 2.20044 21.3993 2.2H5.13084L4.09688 0H0.5ZM18.0994 17.6C16.8894 17.6 15.9105 18.59 15.9105 19.8C15.9105 21.01 16.8894 22 18.0994 22C19.3094 22 20.2993 21.01 20.2993 19.8C20.2993 18.59 19.3094 17.6 18.0994 17.6Z"
            fill="white"
          />
        </svg>CONTINUAR COMPRANDO
      </router-link>
    </div>
<!-- 
    <PedidoFinalizado :codigo_pedido="codigoPedidoFinalizado" v-if="pedidoFinalizado" /> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, showError } from "../../../../../global";
/* import PedidoFinalizado from "../../componentsMobile/PedidoFinalizado"; */

import CardMercadoriaMobile from "../componentsMobile/CardMercadoriaMobile";
export default {
  name: "CarrinhoMobile",
  data() {
    return {
      toggleEndereco: true,
      usuarioEndereco: {},
      pedidoFinalizado: false,
      codigoPedidoFinalizado: null,
    };
  },
  components: {
    /* PedidoFinalizado, */
    CardMercadoriaMobile,
  },
  computed: mapState(["carrinho", "user", "carrinhoResumo", "finalizarPedido"]),
  methods: {
    loadEnderecoUsuario() {
      if (this.user) {
        const url = `${baseApiUrl}/conta/usuario_endereco/${this.user.codigo_usuario}`;
        axios.get(url).then((res) => {
          this.usuarioEndereco = res.data;
        });
      }
    },
    confirmarFinalizarPedido() {
      const modeloFinalizarPedido = {
        id_usuario: this.user.codigo_usuario,

        ped_nome: this.usuarioEndereco.nome,
        ped_email: this.usuarioEndereco.email,
        ped_cpf_cnpj: this.usuarioEndereco.cpf_cnpj,
        ped_contato: this.usuarioEndereco.contato,

        ped_cep: this.usuarioEndereco.cep,
        ped_logradouro: this.usuarioEndereco.logradouro,
        ped_complemento: this.usuarioEndereco.complemento,
        ped_bairro: this.usuarioEndereco.bairro,
        ped_localidade: this.usuarioEndereco.localidade,
        ped_uf: this.usuarioEndereco.uf,
        ped_numero: this.usuarioEndereco.numero,

        vlr_total: this.finalizarPedido.vlr_total,
        vlr_total_produtos: this.finalizarPedido.vlr_total_produtos,
        vlr_frete: this.finalizarPedido.vlr_frete,
        qtd_itens: this.finalizarPedido.qtd_itens,
        tipo_pagamento: this.finalizarPedido.tipo_pagamento,

        tipo_pagamento_entrega: this.finalizarPedido.tipo_pagamento_entrega,
        vlr_pago_entrega: this.finalizarPedido.vlr_pago_entrega,
        vlr_troco_entrega: this.finalizarPedido.vlr_troco_entrega,
        troco_entrega: this.finalizarPedido.troco_entrega,

        tipo_cartao: this.finalizarPedido.tipo_cartao,
        bandeira_cartao: this.finalizarPedido.bandeira_cartao,
        max_parcelas: this.finalizarPedido.max_parcelas,

        confirmado_loja: false,
        separacao: false,
        saiu_entrega: false,
        finalizado: false,
        cancelado: false,
      };

      const url = `${baseApiUrl}/pedido`;
      axios
        .post(url, modeloFinalizarPedido)
        .then((res) => {
          this.codigoPedidoFinalizado = res.data;
          this.pedidoFinalizado = true;
        })
        .catch(showError);
    },
  },
  created() {
    this.loadEnderecoUsuario();
  },
};
</script>

<style scoped>
.carrinho-mobile {
  flex: 1;
  display: flex;
}
.carrinho-com-itens {
  width: 100%;
  height: 100%;
}
/* QUANITADE DE ITENS E VALOR TOTAL */
.total-qtd-itens {
  display: flex;
  align-items: center;
  color: rgb(133, 133, 133);
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding: 16px;
}
.total-qtd-itens span {
  display: flex;
  justify-content: center;

  align-items: center;
  color: rgb(2, 153, 5);
  margin-left: 4px;
  letter-spacing: -1.1px;
  font-size: 16px;
  font-weight: bold;
}

/* ITENS */
.carrinho-itens {
  display: flex;
  flex-direction: column;
  /*  border-top: 1px solid rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 8px;
}
.titulo-itens {
  display: flex;
  align-items: center;
  height: 39px;
  padding: 8px 16px;
  background: rgb(251, 251, 251);
  font-size: 14px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 600;
}
/* TOTAIS */
/* .totais {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 13px;
  border-top: 1px solid rgb(230, 230, 230);
  border-bottom: 1px solid rgb(230, 230, 230);
}
.totais-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.totais-1 {
  font-size: 16px;
  line-height: 29px;
  color: rgb(125, 125, 125);
}
.totais-2 {
  font-size: 16px;
  line-height: 29px;
  font-weight: bold;
  color: rgb(125, 125, 125);
}
.totais-vlr-total {
  font-size: 16px;
  line-height: 29px;
  color: rgb(54, 93, 174);
  font-weight: bold;
} */
.finalizar {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fechar-pedido {
  background: rgb(2, 153, 5);
  height: 50px;
  border-radius: 4px;
  width: 100%;
  max-width: 768px;
  box-shadow: rgb(20 20 20 / 24%) 0px 1px 4px 0px;
  text-transform: uppercase;
  font-size: 15px;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.fechar-pedido:hover {
  text-decoration: none;
}
.carrinho-com-itens-finalizar {
  width: 100%;
  padding: 15px;
}
.carrinho-endereco-finalizar {
  width: 100%;
}
.carrinho-endereco-finalizar .titulo h2 {
  color: rgb(255, 102, 0);
  border-bottom: 0px;
  padding: 0px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
.carrinho-endereco-finalizar .titulo span {
  color: rgb(125, 125, 125);
  font-size: 16px;
}
.informaçoes-pedido-finalizar {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
}
.informaçoes-pedido-finalizar h4 {
  color: rgb(54, 93, 174);
  font-size: 19px;
  font-weight: 700;
}
.titulo-itens-finalizar {
  color: rgb(54, 93, 174);
  font-size: 19px;
  font-weight: 700;
  margin-top: 30px;
  margin-left: 5px;
}
.informacao-finalizar {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  background-color: rgb(250, 250, 251);
  border-radius: 0.25rem;
  color: rgb(125, 125, 125);
}
.informacao-finalizar p {
  font-size: 16px;
  line-height: 1rem;
  font-weight: 400;
  margin-bottom: 7px;
  color: rgb(130, 131, 136) !important;
}
.forma-pagamento {
  display: flex;
  flex-direction: column;
  padding: 7px;
  background-color: rgb(229, 255, 241);
  margin-top: 5px;
}
.forma-pagamento span {
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;
  color: rgb(31, 144, 80);
}

.carrinho-vazio {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.btn-add-carrinho {
  width: 80%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(255, 101, 0);
  background-color: rgb(255, 101, 0);
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  margin-top: 5rem;
}
.btn-add-carrinho:hover {
  text-decoration: none;
}
</style>
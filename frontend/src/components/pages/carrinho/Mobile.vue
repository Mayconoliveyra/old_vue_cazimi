<template>
  <div :class="{'carrinho-mobile':true, 'efeitoCarregar':efeitoCarregar}">
    <!-- Tela inicial onde pode remover mercadoria do carrinho e alterar quantidade da mercadoria -->
    <div class="carrinho-com-itens" v-if="telaExibir=='INICIAL'">
      <div class="total-qtd-itens">
        Total no carrinho ({{dataResumo.qtd_itens}} itens):
        <span>{{dataResumo.vlr_total_produtos |maskDinheiro}}</span>
      </div>
      <Endereco :dataUsuario="dataUsuario" />
      <!-- Lista todas as mercadoriar do pedido -->
      <!-- 'cardExibir' seta o modelo de card, futuramento tera novos layut -->
      <div class="carrinho-itens">
        <MainCard
          desktopD_mobileM="M"
          cardLayout="PADRAO"
          :dataMercadorias="dataMercadorias"
          :utilitario="true"
        />
      </div>
      <Resumo :telaExibir="telaExibir" :dataResumo="dataResumo" />
    </div>
    <!-- Tela apenas para confirmar os dados e finalizar o pedido -->
    <div class="carrinho-com-itens" v-if="telaExibir=='FINALIZAR'">
      <Endereco :dataUsuario="dataUsuario" />
      <!-- Lista todas as mercadoriar do pedido -->
      <!-- 'cardExibir' seta o modelo de card, futuramento tera novos layut -->
      <div class="carrinho-itens">
        <MainCard
          desktopD_mobileM="M"
          cardLayout="PADRAO"
          :dataMercadorias="dataMercadorias"
          :utilitario="false"
        />
      </div>
      <Resumo v-if="false" :telaExibir="telaExibir" :dataResumo="dataResumo" />
    </div>
    <Pagamento
      :dataFormasPagamento="dataFormasPagamento"
      :dataCartoes="dataCartoes"
      :dataResumo="dataResumo"
      v-if="telaExibir=='PAGAMENTO'"
    />
    <PedidoFinalizado :codPedidoFinalizado="codPedidoFinalizado" v-if="telaExibir=='FINALIZADO'" />
    <Vazio v-if="telaExibir=='VAZIO'" />
  </div>
</template>
<script>
import Endereco from "./mobile/Endereco";
import MainCard from "../card/MainCard";
import Resumo from "./mobile/Resumo";
import Pagamento from "./mobile/Pagamento";
import PedidoFinalizado from "./mobile/PedidoFinalizado";
import Vazio from "./mobile/Vazio";
export default {
  name: "CarrinhoMobile",
  components: {
    Endereco,
    MainCard,
    Resumo,
    Pagamento,
    PedidoFinalizado,
    Vazio,
  },
  props: {
    telaExibir: String,
    efeitoCarregar: Boolean,
    dataUsuario: {},
    dataMercadorias: {},
    dataResumo: {},
    dataFormasPagamento: {},
    dataCartoes: {},
    codPedidoFinalizado: Number,
  },
};
</script>

<style  scoped>
.carrinho-mobile {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #ffffff; /* Padão */
}
.carrinho-com-itens {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.carrinho-itens {
  margin-top: 7px;
  border-bottom: 1px solid #0000001a;
  padding-bottom: 8px;
}
.total-qtd-itens {
  display: flex;
  align-items: center;
  color: #858585; /* Padrão */
  font-size: 15px;
  width: 100%;
  border-bottom: 1px solid #e6e6e6; /* Padrão */
  padding: 13px 12px;
}
.total-qtd-itens span {
  display: flex;
  justify-content: center;

  align-items: center;
  color: var(--cor-verde);
  margin-left: 4px;
  letter-spacing: 0.5px;
  font-size: 17px;
  font-weight: bold;
}
.efeitoCarregar {
  opacity: 4%;
  background-color: #ffffff; /* Padão */
}
</style>
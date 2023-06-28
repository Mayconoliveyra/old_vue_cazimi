<template>
  <div :class="{'carrinho-desktop':true, 'efeitoCarregar':efeitoCarregar}">
    <div class="carrinho-exibir">
      <!-- Tela inicial onde pode remover mercadoria do carrinho e alterar quantidade da mercadoria -->
      <div class="carrinho-com-itens" v-if="telaExibir=='INICIAL'">
        <Progresso
          :progresso="{percentual:20, carrinho:true,identificacao:false,pagamento:false,confirmacao:false,conclusao:false}"
        />
        <Endereco :dataUsuario="dataUsuario" />
        <!-- Lista todas as mercadoriar do pedido -->
        <!-- 'cardLayout' seta o modelo de card, futuramento tera novos layut -->
        <div class="carrinho-itens">
          <MainCard
            desktopD_mobileM="D"
            cardLayout="PADRAO"
            :dataMercadorias="dataMercadorias"
            :utilitario="true"
          />
        </div>
        <Resumo :telaExibir="telaExibir" :dataResumo="dataResumo" />
      </div>
      <!-- Tela apenas para confirmar os dados e finalizar o pedido -->
      <div class="carrinho-com-itens" v-if="telaExibir=='FINALIZAR'">
        <Progresso
          :progresso="{percentual:80, carrinho:true,identificacao:true,pagamento:true,confirmacao:true,conclusao:false}"
        />
        <Endereco :dataUsuario="dataUsuario" />
        <!-- Lista todas as mercadoriar do pedido -->
        <!-- 'cardLayout' seta o modelo de card, futuramento tera novos layut -->
        <div class="carrinho-itens">
          <MainCard
            desktopD_mobileM="D"
            cardLayout="PADRAO"
            :dataMercadorias="dataMercadorias"
            :utilitario="false"
          />
        </div>
        <Resumo :telaExibir="telaExibir" :dataResumo="dataResumo" />
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
  </div>
</template>
<script>
import Progresso from "./desktop/Progresso";
import Endereco from "./desktop/Endereco";
import Resumo from "./desktop/Resumo";
import MainCard from "../card/MainCard";
import Pagamento from "./desktop/Pagamento";
import PedidoFinalizado from "./desktop/PedidoFinalizado";
import Vazio from "./desktop/Vazio";
export default {
  name: "CarrinhoDesktop",
  components: {
    Progresso,
    Endereco,
    Resumo,
    MainCard,
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
.carrinho-desktop {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 10px;
  background: #f2f3f4; /* Padão */
}
.carrinho-exibir {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  width: 100%;
  height: 100%;
}
.carrinho-com-itens {
  display: grid;
  grid-template-rows: 120px auto 1fr;
  grid-template-columns: 1fr 325px;
  grid-template-areas:
    "progresso progresso"
    "carrinho-endereco carrinho-resumo"
    "carrinho-itens carrinho-resumo";
}
.carrinho-itens {
  grid-area: carrinho-itens;
  background: rgb(255, 255, 255);
  border-radius: 0.25rem;
  margin: 10px 13px 13px 7px;
  padding: 15px 20px;
}
.item_carrinho {
  border-top: 2px solid rgb(222, 224, 228);
}
.item_carrinho:nth-child(2) {
  border-top: none;
}
.efeitoCarregar {
  opacity: 4%;
  background-color: #ffffff; /* Padão */
}
</style>
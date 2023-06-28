<template>
  <div class="item-container">
    <div class="cabecalho"></div>
    <div class="item-imagem">
      <img
        draggable="false"
        :src="mercadoria.url_principal"
        :title="mercadoria.nome_exibir"
        :alt="mercadoria.nome_exibir"
      />
    </div>
    <div class="item-descricao">
      <h2>{{ mercadoria.nome_exibir }}</h2>
    </div>
    <div class="item-preco">
      <span class="old-preco">
        <span v-show="mercadoria.promocao_ativa">{{mercadoria.preco_venda|maskDinheiro}}</span>
      </span>
      <span
        class="preco-venda"
        v-if="mercadoria.promocao_ativa"
      >{{mercadoria.preco_promocao|maskDinheiro}}</span>
      <span class="preco-venda" v-else>{{mercadoria.preco_venda|maskDinheiro}}</span>
      <span class="forma-pagamento">À vista ou PIX</span>
    </div>
    <div class="item-add-carrinho">
      <button
        v-if="!carregandoParaCarrinho"
        class="btn-add-carrinho-item"
        @click="addMercadoriaCarrinho(mercadoria.codigo_mercadoria)"
      >
        <svg width="35" height="23" viewBox="0 0 23 22" fill="none">
          <path
            d="M7.09977 17.6C5.88981 17.6 4.91085 18.59 4.91085 19.8C4.91085 21.01 5.88981 22 7.09977 22C8.30973 22 9.2997 21.01 9.2997 19.8C9.2997 18.59 8.30973 17.6 7.09977 17.6ZM0.5 0V2.2H2.69992L6.65979 10.549L5.17484 13.244C4.99885 13.552 4.89985 13.915 4.89985 14.3C4.89985 15.51 5.88981 16.5 7.09977 16.5H20.2993V14.3H7.56176C7.40776 14.3 7.28677 14.179 7.28677 14.025L7.31977 13.893L8.30973 12.1H16.5044C17.3294 12.1 18.0554 11.649 18.4294 10.967L22.3672 3.828C22.458 3.66013 22.5037 3.47158 22.4998 3.28078C22.4959 3.08998 22.4426 2.90346 22.345 2.73943C22.2475 2.5754 22.1091 2.43947 21.9433 2.34492C21.7776 2.25037 21.5901 2.20044 21.3993 2.2H5.13084L4.09688 0H0.5ZM18.0994 17.6C16.8894 17.6 15.9105 18.59 15.9105 19.8C15.9105 21.01 16.8894 22 18.0994 22C19.3094 22 20.2993 21.01 20.2993 19.8C20.2993 18.59 19.3094 17.6 18.0994 17.6Z"
            fill="white"
          />
        </svg> ADICIONAR AO CARRINHO
      </button>
      <button
        v-else
        id="carregar-para-carrinho"
        class="btn-add-carrinho-item"
        disabled
        type="button"
      >
        <svg width="0" height="23" viewBox="0 0 0 0" fill="none" />
        <b-icon icon="three-dots" style="color:#ff6500" animation="fade" font-scale="4"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardMercadoria",
  props: {
    mercadoria: {},
  },
  data() {
    return {
      carregandoParaCarrinho: false,
    };
  },
  methods: {
    /* Chama a função que adiciona mercadoria ao carrinho, essa função fica em App.vue */
    addMercadoriaCarrinho(id_mercadoria, quantidade = 1) {
      this.carregandoParaCarrinho = true;
      this.$root.$emit("addMercadoriaCarrinho", id_mercadoria, quantidade);
      setTimeout(() => {
        this.carregandoParaCarrinho = false;
      }, 1100);
    },
  },
};
</script>

<style lang="css" scoped>
.item-container {
  background: rgb(255, 255, 255);
  height: 100%;
  display: inline-block;
  width: 214px;
  height: 379.4px;
  border-radius: 0.25rem;
  cursor: pointer;
  transform: scale(0.95);
  transition: all ease 0.1s;
  border: solid 1px rgb(235, 231, 231);
}
.item-container:hover {
  transform: scale(0.99);
  box-shadow: rgb(40 41 61 / 4%) 0px 4px 8px, rgb(96 97 112 / 16%) 0px 8px 16px;
}
.item-container:hover .btn-add-carrinho-item {
  visibility: visible;
}
.cabecalho {
  position: relative;
  display: flex;
  width: 100%;
  padding: 0px 0.75rem;
  height: 48px;
  margin-bottom: 6px;
}
.item-imagem {
  height: 140px;
  display: flex;
  justify-content: center;
}
.item-imagem img {
  width: 182px;
  height: 140px;
}
.item-descricao {
  padding: 0px 1rem;
  width: 100%;
  height: 54px;
}
.item-descricao h2 {
  margin: 0px;
  height: 100%;
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: rgb(66, 70, 77);
  /* ADICIONA (...) SE O TEXTO FOR MAIOR QUE A DIV */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.item-preco {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
}
.item-preco .old-preco {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  height: 1rem;
  color: rgb(127, 133, 141);
  text-decoration: line-through;
  height: 15.6px;
}
.item-preco .preco-venda {
  font-size: 1.5rem;
  line-height: 2.125rem;
  font-weight: 700;
  color: rgb(255, 101, 0);
}
.item-preco .forma-pagamento {
  font-size: 0.75rem;
  line-height: 1.125rem;
  font-weight: 400;
  height: 1.125rem;
  color: rgb(127, 133, 141);
}
.item-add-carrinho {
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 100%;
}
.item-add-carrinho .btn-add-carrinho-item {
  font-size: 0.7rem;
  line-height: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background: rgb(255, 101, 0);
  border-radius: 0.25rem;
  border: none;
  visibility: hidden;
}
.item-add-carrinho .btn-add-carrinho-item:focus {
  outline-style: none;
  box-shadow: 0 0 0 0;
  outline: 0;
}

#carregar-para-carrinho {
  background-color: rgb(255, 255, 255);
}
</style>
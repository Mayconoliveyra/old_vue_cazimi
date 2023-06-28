<template>
  <div class="item-container-mobile">
    <div class="item" :style="'opacity:'+opacityMercadoria+'%;'">
      <div class="item-imagem">
        <img
          draggable="false"
          :src="mercadoria.url_principal"
          :title="mercadoria.nome_exibir"
          :alt="mercadoria.nome_exibir"
        />
      </div>
      <div class="item-descricao">
        <div class="marca">
          <div class="marca-marca"></div>
          <div class="item-add-carrinho">
            <button
              v-if="!carregandoParaCarrinho"
              class="btn-add-carrinho-item"
              @click="addMercadoriaCarrinho(mercadoria.codigo_mercadoria)"
            >
              <b-icon icon="cart4" style="color: #ff6500;" font-scale="1.5"></b-icon>
            </button>
            <button
              v-else
              id="carregar-para-carrinho"
              class="btn-add-carrinho-item"
              disabled
              type="button"
            >
              <svg width="0" height="23" viewBox="0 0 0 0" fill="none" />
              <b-icon icon="three-dots" style="color:#ff6500" animation="fade" font-scale="1.5"></b-icon>
            </button>
          </div>
        </div>
        <div class="descricao">{{ mercadoria.nome_exibir }}</div>
        <div class="avaliacao"></div>
        <div class="container-preco">
          <span
            class="preco-venda"
            v-if="mercadoria.promocao_ativa"
          >{{mercadoria.preco_promocao|maskDinheiro}}</span>
          <span class="preco-venda" v-else>
            <strong>{{mercadoria.preco_venda|maskDinheiro}}</strong>
          </span>
          <span class="forma-pagamento">à vista ou PIX</span>
        </div>
      </div>
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
      opacityMercadoria: 100,
    };
  },
  methods: {
    /* Chama a função que adiciona mercadoria ao carrinho, essa função fica em App.vue */
    addMercadoriaCarrinho(id_mercadoria, quantidade = 1) {
      this.opacityMercadoria = 20;
      this.carregandoParaCarrinho = true;
      this.$root.$emit("addMercadoriaCarrinho", id_mercadoria, quantidade);
      setTimeout(() => {
        this.carregandoParaCarrinho = false;
        this.opacityMercadoria = 100;
      }, 900);
    },
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");
.item-container-mobile {
  height: 163.09px;
  width: 100%;
  padding: 10px 16px;
  border-top: 1px solid #e6e6e6;
}
.item-container-mobile .item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.item .item-imagem {
  width: 90px;
  height: 90px;
}
.item .item-imagem img {
  width: 100%;
  height: 100%;
}
.item .item-descricao {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.item-descricao .descricao {
  line-height: 1.17em;
  -webkit-line-clamp: 2;
  font-size: 1em;
  display: -webkit-box;
  max-width: 100%;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Roboto Condensed", sans-serif !important;
}
.item-descricao .marca {
  min-height: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item-descricao .marca-marca {
  min-height: 20px;
  font-size: 0.8rem;
  line-height: 1.125rem;
  color: rgb(127, 133, 141);
  padding-bottom: 3px;
}
.item-descricao .avaliacao {
  min-height: 20px;
  width: 100%;
}
.container-preco {
  flex: 1;
}
.container-preco .preco-venda strong {
  color: #029905;
  font-size: 1.3em;
  font-family: "Roboto Condensed", sans-serif !important;
}
.container-preco .forma-pagamento {
  color: #029905;
  font-size: 0.93em;
  font-family: "Roboto Condensed", sans-serif !important;
}
.item-add-carrinho .btn-add-carrinho-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  border: none;
  margin-bottom: 5px;
  padding-left: 10px;
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
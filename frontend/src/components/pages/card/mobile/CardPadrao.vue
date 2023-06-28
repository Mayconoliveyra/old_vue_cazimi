<template>
  <div :class="{'card-padrao-mb':true,'efeitoCarregar':efeitoCarregar}">
    <div v-if="sequencia < 10" class="titulo-itens">PRODUTO 0{{sequencia}}</div>
    <div v-else class="titulo-itens">PRODUTO {{sequencia}}</div>
    <div class="img-descricao">
      <div class="card-img">
        <img draggable="false" :src="mercadoria.url_principal" alt="mercadoria" />
      </div>
      <div class="card-descricao">
        <div class="marca-unidade">
          <span v-if="mercadoria.marca">{{mercadoria.marca}}</span>
          <span v-if="mercadoria.unidade_medida">
            <b v-if="mercadoria.marca">|</b>
            {{mercadoria.unidade_medida}}
          </span>
        </div>
        <div class="descricao">{{ mercadoria.nome_exibir }}</div>
        <div class="preco">
          <strong>{{mercadoria.preco_venda |maskDinheiro}}</strong>
        </div>
      </div>
    </div>
    <div v-if="utilitario" class="utilitarios">
      <div class="qtd-btnalterar">
        <input
          @keydown.enter="emitEvento('alterarQuantidade')"
          type="number"
          v-model="mercadoria.quantidade"
          maxlength="6"
          @keypress="mercadoria.quantidade=mercadoria.quantidade.substr(0, 6)"
        />
        <button @click="emitEvento('alterarQuantidade')">Alterar Quantidade</button>
      </div>
      <button class="btn-remover" @click="emitEvento('removerMercadoria')">Remover</button>
    </div>
    <div v-else class="utilitarios">
      <h1>teste</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPadaoMobile",
  props: {
    sequencia: Number,
    mercadoria: Object,
    utilitario: Boolean,
  },
  data() {
    return {
      efeitoCarregar: false /* Da um efeito na div */,
    };
  },
  methods: {
    emitEvento(evento) {
      this.efeitoCarregar = true;
      setTimeout(() => {
        this.efeitoCarregar = false;
        if (evento == "alterarQuantidade") {
          this.$root.$emit(
            "alterarQuantidade",
            this.mercadoria.codigo_mercadoria,
            this.mercadoria.quantidade
          );
        }
        if (evento == "removerMercadoria") {
          this.$root.$emit(
            "removerMercadoria",
            this.mercadoria.codigo_mercadoria
          );
        }
      }, 400);
    },
  },
};
</script>

<style lang="css" scoped>
.card-padrao-mb {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dee0e4; /* Padrão */
  padding: 5px 10px;
  height: 175px; /* Altura do card-padrao-mb */
  width: 100%;
}
.card-padrao-mb:nth-child(1) {
  border-top: none;
}
.titulo-itens {
  display: flex;
  font-size: 14px;
  color: #0000004d; /* Padrão */
  font-weight: 600;
  padding: 0px 0px 5px 0px;
}
.img-descricao {
  flex: 1;
  display: flex;
  align-items: center;
}
.card-img {
  width: 75px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-img img {
  width: 70px;
  height: 70px;
  margin-right: 3px;
}
.card-descricao {
  flex: 1;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.marca-unidade {
  min-height: 20px;
  width: 100%;
  display: flex;
}
.marca-unidade span {
  min-height: 20px;
  font-size: 0.8rem;
  line-height: 1.125rem;
  color: #7f858d; /*  Padrão */
  margin-right: 4px;
}
.marca-unidade b {
  font-weight: normal;
}
.descricao {
  line-height: 1.2em;
  -webkit-line-clamp: 2;
  font-size: 1em;
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Roboto Condensed";
}
.preco {
  width: 100%;
  padding: 3px 0px;
}
.preco strong {
  color: var(--cor-verde);
  font-size: 1.3em;
  font-family: "Roboto Condensed";
}
.utilitarios {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.qtd-btnalterar {
  display: flex;
}
.qtd-btnalterar input {
  text-align: center;
  border: 1px solid #0000001a; /* Padrão */
  border-radius: 4px;
  width: 96px;
  font-family: "Roboto Condensed";
  font-size: 14px;
  color: #858585; /* Padrão */
  padding: 8px 0px;
  margin-right: 8px;
  height: 32px;
  font-weight: 600;
}
.qtd-btnalterar input:focus {
  outline-style: none !important;
  box-shadow: 0 0 0 0 !important;
  outline: 0 !important;
}
.qtd-btnalterar button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  background: var(--cor-laranja);
  border-radius: 4px;
  font-family: "Roboto Condensed";
  font-size: 12px;
  color: var(--cor-branca);
  padding: 8px;
  height: 32px;
  border: none;
}
@media (max-width: 425px) {
  .qtd-btnalterar input {
    width: 70px;
  }
}
.btn-remover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  border: 1px solid #0000001a; /* Padrão */
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 12px;
  color: #858585; /* Padrão */
  padding: 8px 0px;
  background: none;
  height: 32px;
}
.efeitoCarregar {
  opacity: 20%;
  background-color: #ffffff; /* Padão */
}
</style>
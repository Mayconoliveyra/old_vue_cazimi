<template>
  <article class="secao bloq-selec-text">
    <div class="titulo-secao">
      <h1>{{ title }}</h1>
    </div>
    <button class="itens__nav itens__next" @click="navRightRowList()">
      <b-icon icon="chevron-right" scale="4.5" variant="secondary" animation="cylon"></b-icon>
    </button>
    <div class="row-mercadorias-lista" :style="'margin-left: -'+widthRowList+'px;'">
      <CardMercadoria
        v-for="mercadoria in mercadorias"
        :key="mercadoria.codigo_mercadoria"
        :mercadoria="mercadoria"
      />
    </div>
    <button class="itens__nav" @click="navLeftRowList()">
      <b-icon icon="chevron-left" scale="4.5" variant="secondary" animation="cylon"></b-icon>
    </button>
  </article>
</template>
<script>
import CardMercadoria from "./CardMercadoria";
export default {
  name: "Secao",
  components: { CardMercadoria },
  props: {
    title: String,
    mercadorias: {},
  },
  data() {
    return {
      widthRowList: 0,
    };
  },
  methods: {
    navLeftRowList() {
      /* PEGA A LARGURA DA DIV SECAO */
      let widthDivSecao = document.getElementsByClassName("secao")[0]
        .offsetWidth;
      let widthFullMercadorias =
        this.mercadorias.length * 214.4 - widthDivSecao;
      if (this.widthRowList > 0) {
        this.widthRowList += -214;
        if (this.widthRowList < 0) {
          this.widthRowList = 0;
        }
      } else {
        this.widthRowList = widthFullMercadorias;
      }
    },
    navRightRowList() {
      /* PEGA A LARGURA DA DIV SECAO */
      let widthDivSecao = document.getElementsByClassName("secao")[0]
        .offsetWidth;

      let widthFullMercadorias =
        this.mercadorias.length * 214.4 - widthDivSecao;
      if (widthFullMercadorias > this.widthRowList) {
        this.widthRowList += +214;
      } else {
        this.widthRowList = 0;
      }
    },
  },
};
</script>
<style lang="css" scoped>
.secao {
  display: flex;
  flex-direction: column;
  /* background-color: rgb(249, 249, 251); */
  background-color: rgba(255, 255, 255, 0.987);
  height: 425px;
  max-width: 1230px;
  width: calc(100vw - 40px);
  overflow: hidden;
  margin: 10px 0px;
  padding: 0px;
  position: relative;
  border-radius: 5px;
  border: solid 2px rgb(255, 255, 255);
}
.secao img {
  width: 100%;
  height: 100%;
}
.titulo-secao,
h1 {
  padding: 3px 0px 4px 6px;
  margin: 0px;
  font-size: 22px;
  color: rgb(55, 53, 53);
}
.row-mercadorias-lista {
  /* A LARGURA SERA DE ACORDO COM A QUANTIDADE DE MERCADORIA QUE EXISTE */
  height: 100%;
  white-space: nowrap;
  transition: all ease 0.3s;
}
.itens__nav {
  position: absolute;
  top: 49px;
  left: 0px;
  height: 360px;
  background: rgba(255, 255, 255, 0.433);
  width: 45px;
  font-size: 10px;
  border: none;
  z-index: 1;
}
.itens__next {
  right: 0px;
  left: auto;
}
.itens__nav:hover {
  background: rgba(0, 0, 0, 0.412);
  box-shadow: rgb(40 41 61 / 4%) 0px 4px 8px, rgb(96 97 112 / 16%) 0px 8px 16px;
}

button {
  border: none;
}
button:focus {
  outline-style: none;
  box-shadow: 0 0 0 0;
  outline: 0;
}
</style>


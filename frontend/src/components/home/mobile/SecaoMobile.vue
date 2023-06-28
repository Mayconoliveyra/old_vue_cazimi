<template>
  <article class="secao-mobile bloq-selec-text">
    <div class="titulo-secao">
      <h1>{{ title }}</h1>
    </div>
    <div class="row-mercadorias-lista">
      <CardMercadoriaMobile
        v-for="mercadoria in mercadorias"
        :key="mercadoria.codigo_mercadoria"
        :mercadoria="mercadoria"
      />
    </div>
  </article>
</template>
<script>
import CardMercadoriaMobile from "./CardMercadoriaMobile";
export default {
  name: "Secao",
  components: { CardMercadoriaMobile },
  props: {
    title: String,
    mercadorias: {},
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="css" scoped>
.secao-mobile {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.987);
  width: 100%;
}
.secao-mobile img {
  width: 100%;
  height: 100%;
}
.titulo-secao h1 {
  color: var(--cor-laranja);
  font-size: 1.3em;
  padding: 16px 22px;
  padding-top: 25px;
  font-weight: 600;
}
</style>


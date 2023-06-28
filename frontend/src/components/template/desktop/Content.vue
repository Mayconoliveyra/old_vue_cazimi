<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content",
 /*  updated() {
    switch (this.$route.path) {
      case "/portal":
      case "/portal/mercadorias":
      case "/portal/departamento":
      case "/portal/atributos":
      case "/portal/pedidos":
        this.$store.commit("setPortal", true);
        break;
      case "/carrinho":
        this.$store.commit("setHideSobre", true);
        break;
      case "/pagamentos":
        this.$store.commit("setHideSobre", true);
        break;
      default:
        this.$store.commit("setPortal", false);
        this.$store.commit("setHideSobre", false);
        break;
    }
  },
  mounted() {
    switch (this.$route.path) {
      case "/portal":
      case "/portal/mercadorias":
      case "/portal/departamento":
      case "/portal/atributos":
      case "/portal/pedidos":
        this.$store.commit("setPortal", true);
        break;
      case "/carrinho":
        this.$store.commit("setHideSobre", true);
        break;
      case "/pagamentos":
        this.$store.commit("setHideSobre", true);
        break;
      default:
        this.$store.commit("setPortal", false);
        this.$store.commit("setHideSobre", false);
        break;
    }
  }, */
};
</script>

<style>
.content {
  grid-area: content;
  display: flex;
  background: #f2f3f4;
  background-repeat: no-repeat;
}
</style>
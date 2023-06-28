<template>
  <div class="template">
    <div class="app-mobile-template" v-show="!menuToggle">
      <Header />
      <Content />
      <Footer />
    </div>
    <div class="app-mobile-template-menu" v-show="menuToggle">
      <MenuToggle />
    </div>
  </div>
</template>

<script>
import Header from "./mobile/Header";
import MenuToggle from "./mobile/MenuToggle";
import Content from "./mobile/Content";
import Footer from "./Footer";

export default {
  name: "MobileTemplete",
  components: { Header, Content, Footer, MenuToggle },
  data() {
    return {
      menuToggle: false,
    };
  },
  methods: {},
  created() {
    this.$root.$on("setExibirToggle", (rota = null, menuToggle = false) => {
      this.menuToggle = menuToggle;
      if (rota == "cadastrar") {
        this.$router.push({
          path: "/autenticacao",
          query: { telaExibir: "C" },
        });
      } else if (rota == "login") {
        this.$router.push({
          path: "/autenticacao",
          query: { telaExibir: "L" },
        });
      } else {
        if (rota) this.$router.push({ path: rota });
      }
    });
  },
};
</script>
<style scoped>
.template {
  flex: 1;
  display: flex;
}
.app-mobile-template {
  flex: 1;
  display: grid;
  grid-template-rows: 110px 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "footer";
}
.app-mobile-template-menu {
  flex: 1;
}
</style>
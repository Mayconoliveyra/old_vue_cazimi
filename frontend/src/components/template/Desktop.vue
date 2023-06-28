<template>
  <div :class="{'app-desktop-template':true,'app-desktop-template-hide-nav': hideNav}">
    <Header />
    <Navbar />
    <Content />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./desktop/Header";
import Navbar from "./desktop/Navbar";
import Content from "./desktop/Content";
import Footer from "./Footer";

export default {
  name: "DesktopTemplete",
  components: { Header, Navbar, Content, Footer },
  computed: mapState(["hideNav"]),
};
</script>
<style scoped>
.app-desktop-template {
  flex: 1;
  display: grid;
  grid-template-rows: 120px 37px 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "navbarr"
    "content"
    "footer";
}
.app-desktop-template-hide-nav {
  flex: 1;
  display: grid;
  grid-template-rows: 120px 2px 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "navbarr"
    "content"
    "footer";
}
</style>
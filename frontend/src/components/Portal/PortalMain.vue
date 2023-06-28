<template>
  <div class="portal-main">
    <aside class="aside">
      <navPortal />
    </aside>
    <section class="portal-exibir">
      <main class="portal-cotainer">aa</main>
    </section>
  </div>
</template>

<script>
import navPortal from "./components/navPortal";
export default {
  name: "PortalMain",
  components: { navPortal },
};
</script>

<style>
.portal-main {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas: "aside portal-exibir";
  height: 100%;
  width: 100%;
  min-height: 100vh;
}
.aside {
  grid-area: aside;
  height: 100%;
  z-index: 100;
  margin-right: 15px;
}
.portal-exibir {
  display: grid;
  grid-area: portal-exibir;
  height: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
}
</style>

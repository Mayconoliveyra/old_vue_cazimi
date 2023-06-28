<template>
  <div class="navbarr">
    <div
      class="todos-departamentos"
      @mouseout="icone='chevron-down'"
      @mouseenter="icone='chevron-up'"
      v-show="!hideNav"
    >
      <button>
        TODOS OS DEPARTAMENTOS
        <b-icon class="ml-3" :icon="icone" style="color: rgb(255, 255, 255);" scale="1.3"></b-icon>
      </button>
    </div>
    <nav class="navbarr-container" v-show="infoEmpresa && !hideNav">
      <router-link
        :key="index"
        v-for="(departamento, index) in infoEmpresa.departamento"
        :to="'/departamentos'+departamento.path"
        class="item-nav"
      >{{departamento.departamento}}</router-link>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      icone: "chevron-down",
    };
  },
  computed: mapState(["hideNav", "infoEmpresa"]),
};
</script>

<style scoped>
.navbarr {
  grid-area: navbarr;
  width: 100%;
  position: relative;
  display: flex;
  z-index: 999;
  background-color: rgb(255, 101, 0);
  overflow-x: hidden;
}
.navbarr-container {
  max-width: 855px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0px 20px;
}
/* #############  ############# */

.navbarr .item-nav {
  font-size: 14px;
  font-weight: 700;
  padding: 0px 15px;
  color: rgb(255, 255, 255);
  margin: 0px 1px;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  text-align: center;
  white-space: nowrap;
}
.todos-departamentos {
  background-color: rgb(255, 81, 1);
  padding: 0px;
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 31vw;
}
.todos-departamentos button {
  font-size: 14px;
  text-align: right;
  font-weight: 700;
  color: rgb(255, 255, 255);
  background-color: transparent;
  position: relative;
  cursor: pointer;
  border: none;
  width: 262px;
  padding: 8px 20px 8px 0px;
  z-index: 2;
}
.todos-departamentos button:hover {
  background-color: rgb(128, 49, 0);
}
</style>
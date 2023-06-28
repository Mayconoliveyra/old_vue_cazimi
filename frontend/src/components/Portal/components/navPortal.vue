<template>
  <aside class="menu">
    <header>
      <router-link to="/" href>
        <h1>Portal da empresa</h1>
      </router-link>
    </header>
    <ul>
      <li>
        <router-link to="/portal" href>Home</router-link>
      </li>
      <li>
        <router-link to="/portal/pedidos" href>Pedidos</router-link>
      </li>
      <li>
        <b @click="toggleMercadorias=!toggleMercadorias">
          Mercadorias
          <b-icon v-show="!toggleMercadorias" icon="chevron-down" scale="1.3"></b-icon>
          <b-icon v-show="toggleMercadorias" icon="chevron-up" scale="1.3"></b-icon>
        </b>
        <ul v-show="toggleMercadorias">
          <li>
            <router-link to="/portal/atributos">Atributos</router-link>
          </li>
          <li>
            <router-link to="/portal/departamento">Departamento</router-link>
          </li>
          <li>
            <router-link to="/portal/mercadorias">Mercadoria</router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/portal/relatorios" href>Relatórios</router-link>
      </li>
      <li>
        <router-link to href class="cadastros-btn">Clientes</router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "NavPortal",
  data() {
    return {
      toggleMercadorias: true,
    };
  },
};
</script>

<style>
.menu header {
  height: 65px;
  background-color: #063146;
}
.menu header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.menu header h1 {
  color: white;
  font-size: 22px;
  padding: 0px;
  margin: 0px;
}

.menu {
  grid-area: menu;
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
  list-style: none;
  text-decoration: none;
  width: 100%;
  height: 100%;
  background-color: #042331;
  border-right: 2px solid #031923;
}

.menu ul li {
  line-height: 60px;
  border-bottom: 2px solid #ffffff1a;
}

.menu ul li a {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 600;
  padding-left: 21px;
  color: rgba(255, 255, 255, 0.836);

  box-sizing: border-box;

  border-left: 2px solid transparent;
  transition: 0.5s;
}

.menu ul li:hover > a {
  /*  padding-left: 35px; */
  font-size: 16px;
  color: rgb(255, 255, 255);
  text-decoration: none;
  border-left-color: #00ffff;
}

.menu ul li ul {
  display: flex;
  flex-direction: column;
}

.menu ul li ul li {
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  line-height: 40px;
  border-top: none;
  border-bottom: none;
}

.menu ul li ul li a {
  font-size: 14.5px;
  padding-left: 15px;
  border-top: solid 1px rgb(77, 77, 91);
  transition: 0.1s;
}
.menu b {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 600;
  padding-left: 21px;
  color: rgba(255, 255, 255, 0.836);
  box-sizing: border-box;
  border-left: 2px solid transparent;
  transition: 0.5s;
  cursor: pointer;
  justify-content: space-between;
  padding-right: 15px;
}
</style>
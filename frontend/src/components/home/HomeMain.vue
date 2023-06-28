<template>
  <Desktop
    :interessar="interessar"
    :destaques="destaques"
    :novidades="novidades"
    :maisVendidosSemana="maisVendidosSemana"
    v-if="this.$mq !='xs'"
  />
  <Mobile :interessar="interessar" v-else />
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../../global";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default {
  name: "HomeMain",
  components: { Desktop, Mobile },
  data() {
    return {
      interessar: [],
      destaques: [],
      novidades: [],
      maisVendidosSemana: [],
    };
  },
  methods: {
    loadMercadorias() {
      const urlMaisVendidos = `${baseApiUrl}/mercadorias/home`;
      axios.put(urlMaisVendidos).then((res) => {
        this.interessar = res.data.interessar;
        this.destaques = res.data.destaques;
        this.novidades = res.data.novidades;
        this.maisVendidosSemana = res.data.maisVendidosSemana;
      });
    },
  },
  created() {
    this.loadMercadorias();
  },
};
</script>

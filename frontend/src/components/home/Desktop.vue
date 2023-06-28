<template>
  <div class="home-desktop">
    <Carousel class="carousel">
      <CarouselSlide>
        <router-link to="/">
          <img
            draggable="false"
            src="https://d2r9epyceweg5n.cloudfront.net/stores/001/448/935/themes/amazonas/1-slide-1607185732160-4800201456-e201e7bc5d087d27d0bada3714b51dec1607185726-1920-1920.jpg?653575799"
          />
        </router-link>
      </CarouselSlide>
      <CarouselSlide>
        <router-link to="produtos_grupo_eletrica">
          <img draggable="false" src="https://bravoenergy.com.br/fotos/banner_1.jpg" />
        </router-link>
      </CarouselSlide>
      <CarouselSlide>
        <router-link to="produtos_grupo_reformas_construcao">
          <img
            draggable="false"
            src="https://banco.bradesco/assets/classic/img/produtos-servicos/imoveis/produtos/banner-cdc-material-de-construcao.jpg"
          />
        </router-link>
      </CarouselSlide>
      <CarouselSlide>
        <router-link to="produtos_grupo_tintas">
          <img
            draggable="false"
            src="https://www.taqi.com.br/file/general/banner-taqi-categoria-tintas-e-acessorios-desk-111220.jpg"
          />
        </router-link>
      </CarouselSlide>
    </Carousel>
    <Secao title="Produtos que podem lhe interessar" :mercadorias="interessar" />
    <Secao title="Destaques" :mercadorias="destaques" />
    <Secao title="Veja as últimas novidades selecionadas para você!" :mercadorias="novidades" />
    <Secao title="Mais Comprados da Semana" :mercadorias="maisVendidosSemana" />
  </div>
</template>

<script>
import CarouselSlide from "./desktop/carousel/CarouselSlide.vue";
import Carousel from "./desktop/carousel/Carousel.vue";
import Secao from "./desktop/Secao.vue";

export default {
  name: "HomeDesktop",
  components: { Carousel, CarouselSlide, Secao },
  props: ["interessar", "destaques", "novidades", "maisVendidosSemana"],
};
</script>

<style>
.home-desktop {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
}
.carousel {
  max-width: 1230px;
  width: 100%;
}
</style>
<template>
  <div class="home-mobile">
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
    <SecaoMobile title="RECOMENDADOS PARA VOCÊ" :mercadorias=" interessar" />
    <div class="completa-sm"></div>
  </div>
</template>

<script>
import CarouselSlide from "./mobile/carousel/CarouselSlide";
import Carousel from "./mobile/carousel/Carousel";
import SecaoMobile from "./mobile/SecaoMobile";

export default {
  name: "HomeMobile",
  components: { Carousel, CarouselSlide, SecaoMobile },
  props: ["interessar"],
};
</script>

<style  scoped>
.home-mobile {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.carousel-mobile {
  width: 100%;
}
/* div vazia, serve apenas para completar a tela e os outros elemetos se ajustar */
.completa-sm {
  flex: 1;
}
</style>
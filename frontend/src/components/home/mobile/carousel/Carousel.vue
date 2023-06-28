<template>
  <div class="carousel-mobile">
    <slot></slot>
    <button class="carousel__nav carousel__next" @click.prevent="next"></button>
    <button class="carousel__nav" @click.prevent="prev"></button>
  </div>
</template>
<script>
export default {
  name: "carousel",
  data() {
    return {
      index: 0,
      slides: [],
    };
  },
  computed: {
    slidesCount() {
      return this.slides.length;
    },
  },
  methods: {
    next() {
      this.index++;
      if (this.index >= this.slidesCount) {
        this.index = 0;
      }
    },
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.slidesCount - 1;
      }
    },
  },
  mounted() {
    this.slides = this.$children;
    this.slides.forEach((slide, i) => {
      slide.index = i;
    });
    /* ATUALIZA O CAROSEL A CADA 15S */
    setInterval(() => {
      this.next();
    }, 15000);
  },
};
</script>
<style scoped>
.carousel-mobile {
  position: relative;
}

.carousel-mobile .carousel__nav {
  position: absolute;
  top: 0%;
  left: 0px;
  height: 91%;
  background: transparent;
  width: 50px;
}

.carousel-mobile .carousel__nav.carousel__next {
  right: 0px;
  left: auto;
}
.carousel-mobile button {
  border: none;
}
.carousel-mobile button:focus {
  outline-style: none;
}
</style>




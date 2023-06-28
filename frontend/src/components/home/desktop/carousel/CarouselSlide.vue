<template>
  <div class="carousel-slide" v-show="visible">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "carouselSlide",
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    visible() {
      return this.index === this.$parent.index;
    },
  },
};
</script>
<style>
.carousel-slide {
  height: 300px;
  max-width: 1400px;
  width: 100%;
}
.carousel-slide img {
  width: 100%;
  height: 100%;
}
</style>



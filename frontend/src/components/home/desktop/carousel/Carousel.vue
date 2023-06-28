<template>
  <div class="carousel">
    <slot></slot>
    <button class="carousel__nav carousel__next" @click.prevent="next">
      <svg
        width="45"
        height="45"
        viewBox="0 0 15 24"
        fill="none"
        data-role="none"
        class="slick-arrow slick-next"
        style="display:block"
        currentslide="0"
        slidecount="18"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.18182 24L5 21.8182L14.8182 12L5 2.18182L7.18182 0L19.1818 12L7.18182 24Z"
          fill="#262626"
        />
      </svg>
    </button>
    <button class="carousel__nav" @click.prevent="prev">
      <svg
        width="45"
        height="45"
        viewBox="0 0 24 24"
        fill="none"
        data-role="none"
        class="slick-arrow slick-prev slick-disabled"
        style="display:block"
        currentslide="0"
        slidecount="18"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.9998 24L19.1816 21.8182L9.36346 12L19.1816 2.18182L16.9998 0L4.99982 12L16.9998 24Z"
          fill="#262626"
        />
      </svg>
    </button>
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
<style>
.carousel {
  position: relative;
}

.carousel__nav {
  position: absolute;
  top: 0%;
  left: 20px;
  height: 91%;
  background: transparent;
  width: 60px;
}

.carousel__nav.carousel__next {
  right: 20px;
  left: auto;
}
.carousel button {
  border: none;
}
.carousel button:focus {
  outline-style: none;
}
</style>




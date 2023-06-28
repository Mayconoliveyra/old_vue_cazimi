<template>
  <div class="main-templete">
    <Desktop v-if="this.$mq !='xs'" />
    <Mobile v-else />
  </div>
</template>

<script>
import Desktop from "./Desktop";
import Mobile from "./Mobile";
export default {
  name: "MainTemplete",
  components: { Desktop, Mobile },
};
</script>
<style>
.main-templete {
  flex: 1;
  display: flex;
}
</style>
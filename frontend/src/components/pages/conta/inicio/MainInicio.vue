<template>
  <Desktop v-if="this.$mq !='xs'" />
  <Mobile v-else />
</template>

<script>
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default {
  name: "MainInicio",
  components: { Desktop, Mobile },
};
</script>
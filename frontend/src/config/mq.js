import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs: 880,
        xl: Infinity
    }
})
/* xs: 576, */
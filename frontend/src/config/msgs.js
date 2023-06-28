import Vue from "vue"
import Toasted from "vue-toasted"


Vue.use(Toasted, {
    duration: 7000
})

Vue.toasted.register(
    "defaultError",
    payload => !payload.msg ? "Oops... Erro inesperado." : payload.msg,
    {
        type: "error", position: "top-center", className: ['msgDefultErroToasted']
    }
)
Vue.toasted.register(
    "defaultSuccess",
    payload => !payload.msg ? "Operação realizada com sucesso!" : payload.msg,
    {
        type: "success", position: "top-center", className: ['msgDefultSucessoToasted']
    }
)


/*  action: {
            text: 'X',
            onClick: (e, toastObject) => {
                toastObject.goAway(0);
            }
        }, */
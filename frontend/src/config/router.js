import Vue from "vue"
import VueRouter from "vue-router"
import store from './store'

import MainAutenticacao from "../components/auth/MainAutenticacao"

/* MOBILE */
import MainRecuperarSenha from "../components/auth/recuperarSenha/MainRecuperarSenha"
/*##### FIM MOBILE ##### */

import MainInicio from "../components/pages/conta/inicio/MainInicio"
import MainDados from "../components/pages/conta/dados/MainDados"

import HomeMain from "../components/home/HomeMain"

import MainCarrinho from "../components/pages/carrinho/MainCarrinho"
import ExibirDepartamento from "../components/pages/Departamento/ExibirDepartamento"

import PortalMain from "../components/Portal/PortalMain"
import PortalMercadorias from "../components/Portal/PortalMercadorias"
import PortalDepartamento from "../components/Portal/PortalDepartamento"
import PortalAtributos from "../components/Portal/PortalAtributos"
import PortalPedidos from "../components/Portal/GerenciadorPedidos/PortalPedidos"
import axios from "axios"
import { usuarioChave, baseApiUrl, showError } from "../../global"
Vue.use(VueRouter)

/* const rotasCategorias = ["/organizacao_da_casa", "/material_de_construcao", "/tintas"] */

const routes = [
    {
        name: "home",
        path: "/",
        component: HomeMain
    },
    {
        name: "autenticacao",
        path: "/autenticacao",
        component: MainAutenticacao
    },

    {
        name: "conta-inicio",
        path: "/conta/inicio",
        component: MainInicio,
        meta: { requiresAutenticado: true }
    },
    {
        name: "conta-dados",
        path: "/conta/meus-dados",
        component: MainDados,
        meta: { requiresAutenticado: true }
    },

    /* MOBILE */
    {
        name: "recuperar-senha",
        path: "/autenticacao/recuperar",
        component: MainRecuperarSenha
    },
    /*##### FIM MOBILE ##### */
    {
        name: "carrinho",
        path: "/carrinho",
        component: MainCarrinho,
        meta: { requiresAutenticado: true }
    },
    {
        name: "departamentos",
        path: "/departamentos/:departamento",
        /*    alias: rotasCategorias, */
        component: ExibirDepartamento
    },

    {
        name: "portal",
        path: "/portal",
        component: PortalMain,
        meta: { requiresAutenticado: true, requiresAdmin: true }
    },
    {
        name: "portal-mercadorias",
        path: "/portal/mercadorias",
        component: PortalMercadorias,
        meta: { requiresAutenticado: true, requiresAdmin: true }
    },
    {
        name: "portal-departamento",
        path: "/portal/departamento",
        component: PortalDepartamento,
        meta: { requiresAutenticado: true, requiresAdmin: true }
    },
    {
        name: "portal-atributos",
        path: "/portal/atributos",
        component: PortalAtributos,
        meta: { requiresAutenticado: true, requiresAdmin: true }
    },
    {
        name: "portal-pedidos",
        path: "/portal/pedidos",
        component: PortalPedidos,
        meta: { requiresAutenticado: true, requiresAdmin: true }
    }
]

const router = new VueRouter({
    mode: "history",
    routes,
})

// REGRAS DE ROUTER (RESTRIÇÕES)
//essa funcão recebe varios paramentros: to= para onde eu vou, from= de onde estou vindo, next= para onde vou
router.beforeEach(async (to, from, next) => {
    /* Dependendo do nome do "Rauter" executa um procedimeto; */
    switch (to.name) {
        case 'carrinho':
        case 'minha-conta':
            /* Esconde "Navbar" */
            store.state.hideNav = true

            break;

        default:
            /* Exibir "Navbar" */
            store.state.hideNav = false
            break;
    }
    const json = localStorage.getItem(usuarioChave)

    // VALIDA SE O USUARIO ESTÁ LOGADO.
    if (to.matched.some(record => record.meta.requiresAutenticado)) {
        const url = `${baseApiUrl}/validar_token`
        await axios.post(url, JSON.parse(json))
            .then(res => {
                res.data ? next() : next({ path: "/autenticacao" })
            }
            )
            .catch(showError)
    } else {
        next()
    }

    // VALIDA SE O USUARIO LOGADO É ADMINISTRADOR. 
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const url = `${baseApiUrl}/validar_token_adm`
        await axios.post(url, JSON.parse(json))
            .then(res => {
                res.data ? next() : next({ path: "/" })
            }
            )
            .catch(showError)
    } else {
        next()
    }

})


export default router
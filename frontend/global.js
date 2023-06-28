import Vue from "vue"

export const usuarioChave = "__cazimi_usuario"
export const baseApiUrl = "http://10.0.0.200:3030"

export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data, duration: 5000 })
    } else if (typeof e === "string") {
        Vue.toasted.global.defaultError({ msg: e, duration: 5000 })
    } else {
        Vue.toasted.global.defaultError() /* mensagem do msg sera invocada */
    }
}

export function showSucesso(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultSuccess({ msg: e.response.data.msg, duration: 9000 })
    } else if (typeof e === "string") {
        Vue.toasted.global.defaultSuccess({ msg: e, duration: 9000 })
    } else {
        Vue.toasted.global.defaultSuccess() /* mensagem do msg sera invocada */
    }
}

export function showMsg(msg) {
    if (msg && msg.response && msg.response.data) {
        return `this.msgExibir.${msg.response.data}`
    } else if (typeof msg === "string") {
        return `this.msgExibir.${msg}`
    } else if (msg && msg.data) {
        return `this.msgExibir.${msg.data}`
    } else {
        return `this.msgExibir.outras = 'Oops... Erro inesperado.'`
    }
}

export default { baseApiUrl, showError, showSucesso, usuarioChave, showMsg } 
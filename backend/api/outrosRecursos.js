const axio = require("axios")
const nodemailer = require('nodemailer');
const { email } = require("../.env")
const CryptoJS = require("crypto-js");

const SEGREDO_CRIPTOFRAFIA = "qQaZSaCVZoEkLBiF5zBhg6G5KWfhD9s-ZooQjzQko94" /* Não pode ser alterada se já foi utilizada, poís, vai dar erro para descriptografar*/

const transporter = nodemailer.createTransport(email.emailConfig) /* Configuração do email */

module.exports = app => {
    const { existeOuErro, maiorOuErro } = app.api.validador
    const msgPadraoErro = 'Não foi possível realizar a operação!.<br>Por favor, atualize a página e tente novamente.'

    async function consultaCep(cep) {
        let endereço = {}
        try {
            existeOuErro(cep, "CEP não pode ser nulo.")
            if (cep.length != 8) throw "CEP com tamanho inválido: " + cep
        } catch (error) {
            endereço = { erro: 'true' }
            util_console({ funcao: 'consultaCep', tipo: 'ERRO-400', mensagem: 'CEP inválido.', erro: error, salvarDB: true })
            return
        }

        /* Verifica se o cliente tem o cep cadastrado na base(cadastro_enderecos) */
        /* Se tiver da prioridade ao cadastro da base. */
        const cepFromDB = await app.db
            .select("cep", "logradouro", "bairro", "localidade", "uf")
            .table("cadastro_enderecos")
            .where({ cep: cep })
            .andWhere({ status: true })
            .first()
        if (cepFromDB) {
            endereço = {
                logradouro: cepFromDB.logradouro,
                bairro: cepFromDB.bairro,
                localidade: cepFromDB.localidade,
                uf: cepFromDB.uf,
            }
        } else {
            /* Consultar cep em API de Terceiros. */
            const urlApi = `https://viacep.com.br/ws/${cep}/json`
            await axio.get(urlApi)
                .then(res => {
                    const cepApi = res.data
                    endereço = {
                        logradouro: cepApi.logradouro,
                        bairro: cepApi.bairro,
                        localidade: cepApi.localidade,
                        uf: cepApi.uf,
                        erro: Boolean(cepApi.erro) /* Quando CEP não encontrado na API de terceiro, retornar string 'true', logo converti para boolean. */
                    }
                })
                .catch(error => {
                    endereço = { erro: true }
                    util_console({ funcao: 'consultaCep', tipo: 'ERRO-500', mensagem: 'Não foi possível encontrar o endereco CEP= ' + cep, erro: error, salvarDB: true })
                })
        }

        /* 'api_endereco' serve para bloquear os inputs de endereço caso  tenha cadastrado na base ou na api de terceiros */
        /* Se algum campo do 'endereço' tiver nulo, sera como False, para que os inputs fiquem liberados para preenchimento */
        endereço.api_endereco = true
        if (!endereço.logradouro) endereço.api_endereco = false
        if (!endereço.bairro) endereço.api_endereco = false
        if (!endereço.localidade) endereço.api_endereco = false
        if (!endereço.uf) endereço.api_endereco = false

        return endereço
    }

    function enviarEmail(emailDestino, titulo, conteudo) {
        transporter.sendMail({
            from: email.from,
            to: emailDestino,
            subject: titulo,
            html: conteudo
        })
            .then(() => console.log("Email enviado com sucesso."))
            .catch(err => console.log("[ERRO]E-mail não enviado 'enviarEmail'. Erro: " + err))
    }

    function criptografar(texto) {
        const encryptText = CryptoJS.AES.encrypt(texto, SEGREDO_CRIPTOFRAFIA).toString();
        return encryptText
    };

    function descriptografar(texto) {
        const bytes = CryptoJS.AES.decrypt(texto, SEGREDO_CRIPTOFRAFIA);
        const decryptText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptText
    };

    function util_console({ funcao = null, tipo = null, mensagem = null, erro = null, salvarDB = false }) {
        console.log(`Function: ${funcao}; Tipo: ${tipo}; Mensagem: ${mensagem};`)
        console.log("Erro: " + erro)
        /* Salva no banco de dados */
        if (salvarDB) {
            const moodelo = {
                funcao: funcao,
                tipo: tipo,
                mensagem: mensagem,
                erro: String(erro)
            }
            app.db.insert(moodelo)
                .table("mensagem_backend")
                .then()
                .catch((erro) => console.log("ERRO PARA SALVAR util_console. " + erro))
        }

    }



    return { consultaCep, enviarEmail, criptografar, descriptografar, util_console, msgPadraoErro }
}

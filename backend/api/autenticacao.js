const { senhaSecretaAutenticacao } = require("../.env")
const jwt = require("jwt-simple")
const bcrypt = require("bcrypt-nodejs")


module.exports = app => {
        const { existeOuErro, validarEmail, igualOuErro, naoExisteOuErro, menorOuErro, maiorOuErro } = app.api.validador
        const { enviarEmail, criptografar, descriptografar } = app.api.outrosRecursos

        function gerarHashAutenticar(email) { /* Essa função retorna o tempo que o hash expira= (@#TempoEmSegundosAqui@#), mais o email, tudo criptografado*/
                const expira_em = Math.floor(Date.now() / 1000) + (60 * 30) // expira em 3 dias (60segundos x 60 minutos x 24horas x 90 dias)
                const hash = criptografar(`i6Wf@#${expira_em}@#69Wb${email}`)
                return hash
        }

        function validarHash(hash) { /* valida se o hash é valido. retorna expira_em e o email*/
                try {
                        const hashDescript = descriptografar(hash)
                        if (!hashDescript) throw "erro"
                        const retorno = {
                                expira_em: hashDescript.slice(6, 16),
                                email: hashDescript.slice(22)
                        }
                        return retorno
                } catch (error) {
                        throw "Hash não está em formato correto para descriptografar. (pode ser fraude)" /* Pode ser  que o usuario tenha alterado manual o hash para tentar raquear */
                }
        }

        const entrar = async (req, res) => {
                const { email, senha } = req.body

                try {
                        existeOuErro(email, "lemail = 'Digite seu e-mail';");
                        validarEmail(email, "lemail = 'Digite um e-mail válido';");
                        existeOuErro(senha, "lsenha = 'Insira sua senha';");
                } catch (error) {
                        return res.status(400).send(error)
                }

                const usuario = await app.db("cadastro_usuarios")
                        .where({ email: email })
                        .first()
                if (!usuario) return res.status(400).send("lemail = 'E-mail incorreto ou não existe cadastro.';")

                /* Obrigatorio ter o trycatch, poís se tiver o resulta for false o retorno retorno no catch */
                try {
                        const senhaIgual = bcrypt.compareSync(senha, usuario.senha)
                        existeOuErro(senhaIgual, "lsenha = 'Senha incorreto.';")
                } catch (error) {
                        return res.status(400).send(error)
                }

                if (usuario.bloqueado) return res.status(400).send("outrasErro = 'Sua conta está bloqueada, contate o suporte para mais informação.'")

                /* Se o usuario ainda não tiver com o email autenticado envia email de autenticação */
                if (!usuario.codigo_autenticacao) {
                        await enviarEmailAutenticacao(email, usuario.codigo_usuario)
                        return res.status(400).send("outras = 'Caro cliente, enviamos um email de ativação. Favor verifique o seu email e siga os passos para prosseguir com o seu acesso.'")
                }

                const data = Math.floor(Date.now() / 1000)
                const payload = {
                        codigo_usuario: usuario.codigo_usuario,
                        email: usuario.email,
                        cpf_cnpj: usuario.cpf_cnpj,
                        admin: usuario.admin,
                        codigo_autenticacao: usuario.codigo_autenticacao,
                        bloqueado: usuario.bloqueado,
                        iat: data, // emitido em
                        exp: data + (60 * 60 * 24 * 90) // expira em 3 dias (60segundos x 60 minutos x 24horas x 90 dias)
                }

                return res.json({
                        ...payload,
                        token: jwt.encode(payload, senhaSecretaAutenticacao)
                })
        }

        function enviarEmailAutenticacao(email) {
                const hash = gerarHashAutenticar(email)
                const conteudo = `<div style='text-align: center;'>
                <thead style='text-align: center;'>
                  <img
                    src='https://d2r9epyceweg5n.cloudfront.net/stores/001/448/935/themes/common/logo-678818323-1642765237-494caf53526e230fd98593b4ae0e6a121642765237-320-0.png?0'
                    alt='logo'
                    width='180px'
                  />
                  <hr />
                  <h4>Olá, Abençoado! <br>
                  Falta pouco para você ativar sua conta Cazimi</h4>
                  <p>Clique no link abaixo e libere seu acesso:</p>
                  <b><a href='http://localhost:8080/autenticacao/?email=${email}#${hash}'>Seu acesso na Cazimi</a></b>
                  <br>
                  <br>
                  <h4>Atenção!</h4>
                  <small>Se você não realizou esta solicitação, por favor ignore esta mensagem.</small>
                  <br>
                  <small>Caso tenha dúvidas, nos envie uma mensagem: faleconosco@cazimi.com.br</small>
                </thead>
              </div>`

                enviarEmail(email, "Verifique sua conta Cazimi", conteudo)
        }

        const enviarEmailRecuperarSenha = async (req, res) => {
                const { email } = req.body
                try {
                        existeOuErro(email, "email = 'Digite seu e-mail';");
                        validarEmail(email, "email = 'Digite um e-mail válido';");
                } catch (msg) {
                        return res.status(400).send(msg)
                }
                const usuario = await app.db("cadastro_usuarios")
                        .where({ email: email })
                        .first()

                if (!usuario) return res.status(400).send("email = 'O E-mail informado não possui cadastro.';")
                if (usuario.bloqueado) return res.status(400).send("email = 'Sua conta está bloqueada, contate o suporte para mais informação.'")

                const hash = gerarHashAutenticar(usuario.email)

                const conteudo = `<div style='text-align: center;'>
                <thead style='text-align: center;'>
                  <img
                    src='https://d2r9epyceweg5n.cloudfront.net/stores/001/448/935/themes/common/logo-678818323-1642765237-494caf53526e230fd98593b4ae0e6a121642765237-320-0.png?0'
                    alt='logo'
                    width='180px'
                  />
                  <hr />
                  <h4>Olá, ${usuario.nome}!</h4>
                  <small>Recebemos uma solicitação de senha referente ao e-mail abaixo. Para cadastrá-la, acesse o link "Clique aqui para cadastrar uma nova senha".</small>
                  <br>
                  <br>
                  <h4>${email}</h4>
                  <br>
                  <b><a href='http://localhost:8080/autenticacao/recuperar/?email=${email}#${hash}'>Click aqui para cadastrar uma nova senha</a></b>
                  <br>
                  <br>
                  <br>
                  <small>Se esta solicitação não partiu de você, orientamos a atualizar sua senha de cadastro o mais breve possível.</small>
                  <br>
                  <br>
                </thead>
              </div>`

                enviarEmail(email, "Esqueci minha senha", conteudo)
                return res.json("outras = 'Caro cliente, enviamos um email de recuperação. Favor verifique o seu email e siga os passos para prosseguir com a recuperação.';")
        }

        const autenticarUsuario = async (req, res) => {
                const { hash } = req.body
                let modelo = {};

                try {
                        existeOuErro(hash, "'hash' não informado")
                        modelo = validarHash(hash) /* retorna expira_em e email vindo do hash criptigradado  */
                        existeOuErro(modelo.expira_em, "'expira_em' não informado")
                        existeOuErro(modelo.email, "'email' não informado")
                        validarEmail(modelo.email, "'email' não tem o formato valido");
                } catch (erro) {
                        console.log("[ERRO]autenticarUsuario: " + erro)
                        return res.status(400).send()
                }

                const usuario = await app.db("cadastro_usuarios")
                        .where({ email: modelo.email })
                        .first()

                try {
                        existeOuErro(usuario, "usuario não foi encontrado")
                        naoExisteOuErro(usuario.codigo_autenticacao, "usuario.codigo_autenticacao já está autenticado")
                } catch (erro) {
                        console.log("[ERRO]'autenticarUsuario': " + erro)
                        return res.status(400).send()
                }

                await app.db("cadastro_usuarios")
                        .update({ codigo_autenticacao: criptografar(`OlH4k5@${usuario.codigo_usuario}@fL#wkf`) }) /* codigo_autenticacao= codigo do cliente criptografado */
                        .where({ codigo_usuario: usuario.codigo_usuario })
                        .then(() => {
                                res.status(204).send();
                        })
                        .catch(erro => {
                                console.log("[ERRO]'autenticarUsuario': " + erro)
                                return res.status(400).send()
                        })
        }

        const cadastrarNovaSenha = async (req, res) => {
                const { senha, confirmaSenha, hash } = req.body
                let modelo = {};
                try {
                        existeOuErro(hash, "outrasErro ='Não foi possível concluir a sua solicitação. Utilize opção Esqueci minha senha e tente novamente.';")
                        modelo = validarHash(hash) /* retorna expira_em e email vindo do hash criptigradado  */
                        existeOuErro(modelo.expira_em, "outrasErro ='Não foi possível concluir a sua solicitação. Utilize opção Esqueci minha senha e tente novamente.';")
                        existeOuErro(modelo.email, "outrasErro ='Não foi possível concluir a sua solicitação. Utilize opção Esqueci minha senha e tente novamente.';")
                        validarEmail(modelo.email, "outrasErro ='Não foi possível concluir a sua solicitação. Utilize opção Esqueci minha senha e tente novamente.';");
                        maiorOuErro(modelo.expira_em, 10, "outrasErro ='Não foi possível concluir a sua solicitação. Utilize opção Esqueci minha senha e tente novamente.';");
                } catch (error) {
                        return res.status(400).send(error)
                }

                const usuario = await app.db("cadastro_usuarios")
                        .where({ email: modelo.email })
                        .first()

                if (!usuario) return res.status(400).send("outrasErro ='Não foi possível concluir a sua solicitação. Utilize opção Esqueci minha senha e tente novamente.';")
                if (usuario.bloqueado) return res.status(400).send("outrasErro = 'Sua conta está bloqueada, contate o suporte para mais informação.'")
                try {
                        existeOuErro(senha, "senha ='Insira sua nova senha';")
                        maiorOuErro(senha, 6, "senha = 'A senha deve conter números, letras, conter no mínimo 6 digítos e no máximo de 32 digítos';");
                        existeOuErro(confirmaSenha, "confirmaSenha = 'Confirme a senha';");
                        igualOuErro(senha, confirmaSenha, "confirmaSenha = 'As senhas não coincidem';");
                } catch (error) {
                        return res.send(error)
                }

                if (parseInt(modelo.expira_em) < Math.floor(Date.now() / 1000)) return res.status(400).send("outrasErro ='Não foi possível concluir a sua solicitação. Utilize opção Esqueci minha senha e tente novamente.';");

                const cryptografarSenha = senha => { /* A mesa função que ta no cadastro de Usuario */
                        const salt = bcrypt.genSaltSync(10)
                        return bcrypt.hashSync(senha, salt)
                }

                const novaSenha = cryptografarSenha(senha)
                await app.db("cadastro_usuarios")
                        .update({ senha: novaSenha })
                        .where({ codigo_usuario: usuario.codigo_usuario })
                        .then(() => res.status(400).send("outras ='Sua senha foi alterada com sucesso. Por favor, use a nova senha para efetuar o login.'"))
                        .catch(err => res.status(500).send(err))
        }

        const validarToken = async (req, res) => {
                const dataUsuario = req.body || null
                try {
                        if (dataUsuario) {
                                // VALIDA SE O TOKEN É VALIDO
                                const token = jwt.decode(dataUsuario.token, senhaSecretaAutenticacao)
                                const funcionarioDB = await app.db("cadastro_usuarios")
                                        .where({ codigo_usuario: token.codigo_usuario })
                                        .first()

                                if (!funcionarioDB) return res.send(false)
                                if (funcionarioDB.codigo_usuario !== token.codigo_usuario) return res.send(false)
                                if (funcionarioDB.email !== token.email) return res.send(false)
                                if (funcionarioDB.cpf_cnpj !== token.cpf_cnpj) return res.send(false)
                                if (funcionarioDB.admin !== token.admin) return res.send(false)
                                if (!funcionarioDB.codigo_autenticacao) return res.send(false)
                                if (funcionarioDB.codigo_autenticacao !== token.codigo_autenticacao) return res.send(false)
                                if (funcionarioDB.bloqueado !== token.bloqueado) return res.send(false)

                                //NO JS A DATA E EM MILISSEGUNDOS, NO TOKEN ESTA EM SEGUNDOS, MULTIPLICO POR 1000 PRA TRANSFORMA EM MILISSEGUNDOS TBM.
                                if (new Date(token.exp * 1000) > new Date()) {
                                        return res.send(true)
                                }
                        }
                } catch (e) {
                        // problema com o token
                        // poderia criar  uma nova data de expiração para o teken aqui.  
                }
                return res.send(false)
        }
        const validarUsuarioADM = async (req, res) => {
                const dataUsuario = req.body || null
                try {
                        if (dataUsuario) {
                                const usuario = await app.db("cadastro_usuarios").select("admin", "codigo_usuario").where({ "codigo_usuario": dataUsuario.codigo_usuario }).first()
                                const token = jwt.decode(dataUsuario.token, senhaSecretaAutenticacao)
                                if (new Date(token.exp * 1000) > new Date() && usuario.admin) {
                                        return res.send(true)
                                }
                        }
                } catch (e) {
                }
                return res.send(false)
        }
        return { entrar, validarToken, validarUsuarioADM, autenticarUsuario, cadastrarNovaSenha, enviarEmailAutenticacao, enviarEmailRecuperarSenha }
}
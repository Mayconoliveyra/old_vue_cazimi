const bcrypt = require("bcrypt-nodejs")

module.exports = app => {
        const { existeOuErro, igualOuErro, naoExisteNoBancoOuErro, validarEmail, maiorOuErro, validarTelefoneOuErro, validarCNPJOuErro, validarCPFOuErro } = app.api.validador
        const { consultaCep, util_console, msgPadraoErro } = app.api.outrosRecursos
        const { enviarEmailAutenticacao } = app.api.autenticacao
        const cryptografarSenha = senha => {
                const salt = bcrypt.genSaltSync(10)
                return bcrypt.hashSync(senha, salt)
        }

        /* Essa função é utilizada apenas para o cadastro inicial do usuário. */
        const saveUsuario = async (req, res) => {
                let usuarioBody = {
                        nome,
                        email,
                        senha,
                        confirmaSenha,
                        contato,
                        cpf_cnpj,
                        cep,
                } = req.body;

                try {
                        existeOuErro(usuarioBody.nome, "nome = 'Digite seu nome';");
                        existeOuErro(usuarioBody.email, "email = 'Digite seu e-mail';");
                        validarEmail(usuarioBody.email, "email = 'Digite um e-mail válido';");
                        existeOuErro(usuarioBody.senha, "senha = 'Insira sua senha';");
                        maiorOuErro(usuarioBody.senha, 6, "senha = 'A senha deve conter números, letras, conter no mínimo 6 digítos e no máximo de 32 digítos';");
                        existeOuErro(usuarioBody.confirmaSenha, "confirmaSenha = 'Confirme a senha';");
                        igualOuErro(usuarioBody.senha, usuarioBody.confirmaSenha, "confirmaSenha = 'As senhas não coincidem';");
                        existeOuErro(usuarioBody.contato, "contato = 'Digite um número de contato';");
                        validarTelefoneOuErro(usuarioBody.contato, "contato = 'Digite um contato válido';");
                        existeOuErro(usuarioBody.cpf_cnpj, "cpf_cnpj = 'Digite seu CPF ou CNPJ';");
                        if (usuarioBody.cpf_cnpj.length == 11) {
                                validarCPFOuErro(usuarioBody.cpf_cnpj, "cpf_cnpj = 'Digite um CPF ou CNPJ válido';")
                        } else if (usuarioBody.cpf_cnpj.length == 14) {
                                validarCNPJOuErro(usuarioBody.cpf_cnpj, "cpf_cnpj = 'Digite um CPF ou CNPJ válido';");
                        } else {
                                /* SE ENTRA AQUI SEMPRE VAI RETORNAR MSG DE ERRO */
                                maiorOuErro(usuarioBody.cpf_cnpj, 999, "cpf_cnpj = 'Digite um CPF ou CNPJ válido';");
                        }
                        existeOuErro(usuarioBody.cep, "cep = 'Digite seu cep';");
                        maiorOuErro(usuarioBody.cep, 8, "cep = 'Digite um cep válido';");
                        await naoExisteNoBancoOuErro("cadastro_usuarios", "email", usuarioBody.email, "email = 'Já existe cadastro para o e-mail informado';")
                } catch (msg) {
                        return res.status(400).send(msg)
                }

                /* Preenche endereço através de API */
                const enderecoApi = await consultaCep(usuarioBody.cep)
                if (!enderecoApi.erro) {
                        usuarioBody = { ...usuarioBody, ...enderecoApi }
                        delete usuarioBody.erro
                }

                /* Criptografando a senha */
                usuarioBody.senha = cryptografarSenha(usuarioBody.senha)
                delete usuarioBody.confirmaSenha
                await app.db("cadastro_usuarios")
                        .insert(usuarioBody)
                        .then(async () => {
                                /* Envia o email de autenticação */
                                await enviarEmailAutenticacao(usuarioBody.email)
                                /*  return res.status(204).send() */
                                return res.json("outras = 'Caro cliente, enviamos um email de ativação. Favor verifique o seu email e siga os passos para prosseguir com o seu acesso.';")
                        })
                        .catch(error => {
                                util_console({ funcao: 'saveUsuario', tipo: 'ERRO-500', mensagem: 'Não foi possível cadastrar o cliente', erro: error, salvarDB: true })
                                return res.status(500).send(msgPadraoErro)
                        })
        }

        const getUsuarioEndereco = (req, res) => {
                app.db.select("nome", "apelido", "email", "cpf_cnpj", "contato", "cep", "logradouro", "numero", "complemento", "bairro", "localidade", "uf", "api_endereco")
                        .table("cadastro_usuarios")
                        .where("codigo_usuario", req.user.codigo_usuario)
                        .first()
                        .then(usuario => res.json(usuario))
                        .catch(error => {
                                util_console({ funcao: 'getUsuarioEndereco', tipo: 'ERRO', mensagem: 'Não foi possível carregar o cadastro do cliente.', erro: error, salvarDB: true })
                                return res.status(500).send(msgPadraoErro)
                        })
        }

        const saveEditDadosConta = async (req, res) => {
                const codigo_usuario = req.user.codigo_usuario
                const reqBody = req.body

                const modelo = {
                        nome: reqBody.nome,
                        apelido: reqBody.apelido,
                        contato: reqBody.contato,
                        cep: reqBody.cep,
                        logradouro: reqBody.logradouro,
                        numero: reqBody.numero,
                        complemento: reqBody.complemento,
                        bairro: reqBody.bairro,
                        localidade: reqBody.localidade,
                        uf: reqBody.uf,
                        api_endereco: reqBody.api_endereco
                }

                try {
                        existeOuErro(modelo.nome, "nome = 'Digite seu nome';");
                        existeOuErro(modelo.contato, "contato = 'Digite um número de contato';");
                        validarTelefoneOuErro(modelo.contato, "contato = 'Digite um contato válido';");
                        existeOuErro(modelo.cep, "cep = 'Digite seu cep';");
                        maiorOuErro(modelo.cep, 8, "cep = 'O número precisa ter 8 digitos';");

                        existeOuErro(modelo.logradouro, "logradouro = 'Por favor, preencha o nome da rua.';");
                        existeOuErro(modelo.numero, "numero = 'Obrigatorio';");
                        existeOuErro(modelo.bairro, "bairro = 'Por favor, preencha o bairro.';");
                        existeOuErro(modelo.localidade, "localidade = 'Por favor, preencha a cidade.';");
                        existeOuErro(modelo.uf, "uf = 'Obrigatorio';");
                } catch (msg) {
                        return res.status(400).send(msg)
                }

                await app.db("cadastro_usuarios")
                        .update(modelo)
                        .where({ codigo_usuario: codigo_usuario })
                        .then(() => res.status(204).send())
                        .catch(error => {
                                util_console({ funcao: 'saveEditDadosConta', tipo: 'ERRO-500', mensagem: 'Não foi possível salvar alterações do cadastro do cliente', erro: error, salvarDB: true })
                                return res.status(500).send(msgPadraoErro)
                        })
        }

        /* Função para carrega endereço, nela vocçe passa o CEP como paramentro */
        /* Vai ser verificado se existe o cadastro do endereço na tabela 'cadastro_enderecos', se tiver retorna */
        /* Caso não tenha o endereço cadastrado na 'cadastro_enderecos' consulta em uma API de terceiro */
        /* Sela sera retornado: logradouro, bairro, localidade, uf e api_endereco  */
        /* Se api_endereco == true: que dizer que cep foi encontrado na base/api e todos campos veio preenchido(bairo,uf...) */
        /* Se api_endereco == false: que dizer que cep não foi encontrado base/apiTerceiro ou algum campo(bairro,uf...) veio nulo. */
        const getApiEndereco = async (req, res) => {
                const reqCep = req.params.cep
                const enderecoApi = await consultaCep(reqCep)
                return res.json(enderecoApi)
        }

        return { saveUsuario, getUsuarioEndereco, saveEditDadosConta, getApiEndereco }
}
module.exports = app => {
        const { existeOuErro } = app.api.validador
        const { queryResumo } = app.api.queries
        const { util_console, msgPadraoErro } = app.api.outrosRecursos

        const addMercadoriaCarrinho = async (req, res) => {
                const modelo = {
                        id_usuario: Number(req.user.codigo_usuario),
                        id_mercadoria: Number(req.params.codigo_mercadoria),
                        quantidade: Number(req.body.quantidade),
                }

                /* Se a quantidade for nulo ou menor que 1, seta 1 */
                if (modelo.quantidade == 0 || !modelo.quantidade) modelo.quantidade = 1
                try {
                        existeOuErro(modelo.id_usuario, "[id_usuario] não pode ser nulo.");
                        existeOuErro(modelo.id_mercadoria, "[id_mercadoria] não pode ser nulo.");
                        existeOuErro(modelo.quantidade, "[quantidade] não pode ser nulo.");
                } catch (error) {
                        util_console({ funcao: 'addMercadoriaCarrinho', tipo: 'ERRO', mensagem: 'Não foi possível add mercadoria', erro: error, salvarDB: true })
                        return res.status(400).send(msgPadraoErro)
                }


                // VERIFICA SE A MERCADORIA JÁ TEM NA LISTA DO CARRINHO DO CLIENTE, CASO TIVER FAZ UPDATE NA QUANTIDADE
                let jaNoCarrinho = await app.db("carrinho")
                        .select()
                        .where({ id_usuario: modelo.id_usuario })
                        .andWhere({ id_mercadoria: modelo.id_mercadoria }).first()

                if (jaNoCarrinho) {
                        app.db("carrinho")
                                .update({ quantidade: modelo.quantidade })
                                .where({ id_usuario: modelo.id_usuario })
                                .andWhere({ id_mercadoria: modelo.id_mercadoria })
                                .then(() => res.status(204).send())
                                .catch(error => {
                                        util_console({ funcao: 'addMercadoriaCarrinho', tipo: 'ERRO', mensagem: 'Não foi possível add mercadoria [jaNoCarrinho=True]', erro: error, salvarDB: true })
                                        return res.status(500).send(msgPadraoErro)
                                })
                } else {
                        app.db("carrinho")
                                .insert(modelo)
                                .then(() => res.status(204).send())
                                .catch(error => {
                                        util_console({ funcao: 'addMercadoriaCarrinho', tipo: 'ERRO', mensagem: 'Não foi possível add mercadoria [jaNoCarrinho=False]', erro: error, salvarDB: true })
                                        return res.status(500).send(msgPadraoErro)
                                })
                }
        }

        const getCarrinho = async (req, res) => {
                /* Pega o codigo_usuario no token */
                const codigo_usuario = Number(req.user.codigo_usuario)
                try {
                        existeOuErro(parseInt(codigo_usuario), "[codigo_usuario] não pode ser nulo.")

                        /* Dados do usuario, nome, endereço... */
                        const usuario = await app.db.raw(`SELECT 
                        cadastro_usuarios.codigo_usuario, 
                        cadastro_usuarios.nome, 
                        cadastro_usuarios.email, 
                        cadastro_usuarios.apelido, 
                        cadastro_usuarios.cpf_cnpj, 
                        cadastro_usuarios.contato, 
                        cadastro_usuarios.cep, 
                        cadastro_usuarios.logradouro, 
                        cadastro_usuarios.complemento, 
                        cadastro_usuarios.bairro,  
                        cadastro_usuarios.localidade, 
                        cadastro_usuarios.uf, 
                        cadastro_usuarios.numero
                        FROM cadastro_usuarios
                        WHERE (((cadastro_usuarios.codigo_usuario)=${codigo_usuario}));`)

                        /* Retorna todas as mercadorias que estão no carrinho do usuário. */
                        const mercadorias = await app.db.raw("SELECT " +
                                "view_mercadorias_atributos.codigo_mercadoria, " +
                                "view_mercadorias_atributos.nome_exibir, " +
                                "view_mercadorias_atributos.preco_venda, " +
                                "view_mercadorias_atributos.estoque_disponivel, " +
                                "view_mercadorias_atributos.url_principal, " +
                                "view_mercadorias_atributos.status, " +
                                "view_mercadorias_atributos.Marcas AS marca, " +
                                "view_mercadorias_atributos.`Unidades de medida` AS unidade_medida, " +
                                "carrinho.quantidade, carrinho.id_usuario " +
                                "FROM view_mercadorias_atributos " +
                                "INNER JOIN carrinho ON view_mercadorias_atributos.codigo_mercadoria = carrinho.id_mercadoria " +
                                "WHERE (((view_mercadorias_atributos.status)=True) " +
                                "AND ((carrinho.id_usuario)= " + codigo_usuario + "));")

                        /* Resumo do carrinho, quantidades de itens, valor frente, valor total dos produtos somados. */
                        const resumo = await app.db.raw(queryResumo(codigo_usuario))

                        /* Verifica se o cadastro do cliente tem algum informação pendente de preenchimento */
                        /* Fica em resumo, pois, e no elemento Resumo que vou utilizar essse campo. */
                        resumo[0][0].infomacoes_pendete = cadastroPendente(usuario[0][0])

                        /* Formas de pagamento utilizada para finalizar o pedido */
                        const formasPagamentos = await app.db("formas_pagamentos")
                                .select("codigo_pagamento", "nome_pagamento", "descricao", "pagar_entrega", "icone")
                                .where({ status: true })
                                .orderBy('order', 'ASC')

                        /* Bandeira de cartões utilizada nas formas de pagamentos(PAGAR NA ENTREGA) */
                        const cartoes = await app.db("cadastro_cartoes")
                                .select("codigo_cartao", "bandeira", "tipo", "maximo_parcelas", "vlr_minimo_parcela")
                                .where({ status: true })
                                .orderBy('bandeira', 'ASC')

                        return res.json({ usuario: usuario[0][0], mercadorias: mercadorias[0], resumo: resumo[0][0], formasPagamentos, cartoes, })
                } catch (error) {
                        util_console({ funcao: 'getCarrinho', tipo: 'ERRO', mensagem: 'Não foi possível carregar o carrinho do usuário', erro: error, salvarDB: true })
                        return res.status(500).send(msgPadraoErro)
                }
        }

        /* Se o cadastro do usuário tiver algum campo obrigatorio pendente de preencimento retornar TRUE, caso contrario FALSE */
        function cadastroPendente(dataUsuario) {
                let pendente = false;
                if (!dataUsuario.nome) pendente = true
                if (!dataUsuario.cpf_cnpj) pendente = true
                if (!dataUsuario.contato) pendente = true
                if (!dataUsuario.email) pendente = true

                if (!dataUsuario.cep) pendente = true
                if (!dataUsuario.logradouro) pendente = true
                if (!dataUsuario.numero) pendente = true
                if (!dataUsuario.bairro) pendente = true
                if (!dataUsuario.localidade) pendente = true
                if (!dataUsuario.uf) pendente = true
                return pendente;
        }

        const getCarrinhoQuantidade = async (req, res) => {
                /* Pega o codigo_usuario no token */
                const codigo_usuario = Number(req.user.codigo_usuario)
                try {
                        existeOuErro(Number(codigo_usuario), "[codigo_usuario] não pode ser nulo.")
                        await app.db.raw(queryResumo(codigo_usuario))
                                .then(resumo => res.json(resumo[0][0].qtd_itens))

                } catch (error) {
                        util_console({ funcao: 'getCarrinhoQuantidade', tipo: 'ERRO', mensagem: 'Não foi possível carregar quantidades de itens do carrinho do usuário.', erro: error, salvarDB: true })
                        return res.status(500).send(error)
                }
        }

        const removerMercadoria = (req, res) => {
                const modelo = {
                        id_usuario: Number(req.user.codigo_usuario),
                        id_mercadoria: Number(req.params.codigo_mercadoria)
                }
                try {
                        existeOuErro(modelo.id_usuario, "[id_usuario] não pode ser nulo.");
                        existeOuErro(modelo.id_mercadoria, "[id_mercadoria] não pode ser nulo.");
                } catch (error) {
                        util_console({ funcao: 'removerMercadoria', tipo: 'ERRO', mensagem: 'Não foi possível remover mercadoria do carrinho.', erro: error, salvarDB: true })
                        return res.status(400).send(msgPadraoErro)
                }
                app.db("carrinho")
                        .delete()
                        .where({ id_usuario: modelo.id_usuario })
                        .andWhere({ id_mercadoria: modelo.id_mercadoria })
                        .then(() => res.status(204).send())
                        .catch(error => {
                                util_console({ funcao: 'removerMercadoria', tipo: 'ERRO', mensagem: 'Não foi possível remover mercadoria do carrinho.', erro: error, salvarDB: true })
                                return res.status(500).send(msgPadraoErro)
                        })
        }

        return { addMercadoriaCarrinho, getCarrinho, removerMercadoria, getCarrinhoQuantidade }
}
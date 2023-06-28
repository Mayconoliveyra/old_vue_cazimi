module.exports = app => {
        const { existeOuErro, igualOuErro } = app.api.validador
        const { queryResumo } = app.api.queries
        const { util_console, msgPadraoErro } = app.api.outrosRecursos

        const savePedido = async (req, res) => {
                const usuario = req.body.usuario
                const resumo = req.body.resumo
                const pedido = {
                        id_usuario: usuario.codigo_usuario,

                        ped_nome: usuario.nome,
                        ped_email: usuario.email,
                        ped_apelido: usuario.apelido,
                        ped_cpf_cnpj: usuario.cpf_cnpj,
                        ped_contato: usuario.contato,

                        ped_cep: usuario.cep,
                        ped_logradouro: usuario.logradouro,
                        ped_complemento: usuario.complemento,
                        ped_bairro: usuario.bairro,
                        ped_localidade: usuario.localidade,
                        ped_uf: usuario.uf,
                        ped_numero: usuario.numero,

                        vlr_total: resumo.vlr_total,
                        vlr_total_produtos: resumo.vlr_total_produtos,
                        vlr_frete: resumo.vlr_frete,
                        qtd_itens: resumo.qtd_itens,
                        tipo_pagamento: resumo.tipo_pagamento,

                        tipo_pagamento_entrega: resumo.tipo_pagamento_entrega,
                        vlr_pago_entrega: resumo.troco_entrega,
                        vlr_troco_entrega: resumo.vlr_troco_entrega,
                        troco_entrega: resumo.troco_entrega,

                        tipo_cartao: resumo.tipo_cartao,
                        bandeira_cartao: resumo.bandeira_cartao,
                        max_parcelas: resumo.max_parcelas,

                        confirmado_loja: false,
                        separacao: false,
                        saiu_entrega: false,
                        finalizado: false,
                        cancelado: false
                }

                try {
                        existeOuErro(pedido.id_usuario, "[id_usuario] Não pode ser nulo.");
                        existeOuErro(pedido.ped_nome, "[ped_nome] Não pode ser nulo.");
                        existeOuErro(pedido.ped_email, "[ped_email] Não pode ser nulo.");
                        existeOuErro(pedido.ped_cpf_cnpj, "[ped_cpf_cnpj] Não pode ser nulo.");
                        existeOuErro(pedido.ped_contato, "[ped_contato] Não pode ser nulo.");
                        existeOuErro(pedido.ped_cep, "[ped_cep] Não pode ser nulo.");
                        existeOuErro(pedido.ped_logradouro, "[ped_logradouro] Não pode ser nulo.");
                        existeOuErro(pedido.ped_numero, "[ped_numero] Não pode ser nulo.");
                        existeOuErro(pedido.ped_bairro, "[ped_bairro] Não pode ser nulo.");
                        existeOuErro(pedido.ped_localidade, "[ped_localidade] Não pode ser nulo.");
                        existeOuErro(pedido.ped_uf, "[ped_uf] Não pode ser nulo.");
                        existeOuErro(pedido.vlr_total, "[vlr_total] Não pode ser nulo.");
                        existeOuErro(pedido.vlr_total_produtos, "[vlr_total_produtos] Não pode ser nulo.");
                        if (pedido.vlr_frete) throw "[vlr_frete] Não pode ser nulo."
                        existeOuErro(pedido.qtd_itens, "[qtd_itens] Não pode ser nulo.");
                        existeOuErro(pedido.tipo_pagamento, "[tipo_pagamento] Não pode ser nulo.");

                        const usuarioFromDB = await app.db("cadastro_usuarios")
                                .where({ codigo_usuario: pedido.id_usuario }).first()
                        existeOuErro(usuarioFromDB, "[usuarioFromDB] Usuário não encontrado.");

                        /* Valida se o id_usario equivale ao codigo_usuario do token de autenticação */
                        igualOuErro(pedido.id_usuario, req.user.codigo_usuario, `[id_usuario] o codigo que veio no body não confere com o do token autenticado.`)

                        /* Valida se o valor total do pedido que veio do frontend é igual a soma do banckend. Isso evita burla o frontend e alterar o valor. */
                        const resumo = await app.db.raw(queryResumo(pedido.id_usuario))
                        igualOuErro(pedido.vlr_total, resumo[0][0].vlr_total, `[vlr_total] os valores são divergente: Front:${pedido.vlr_total}; Base:${resumo[0][0].vlr_total};`)

                } catch (error) {
                        util_console({ funcao: 'savePedido', tipo: 'ERRO-400', mensagem: 'Erro para salvar o pedido', erro: error, salvarDB: true })
                        return res.status(400).send(msgPadraoErro)
                }

                let codigoPedido = null
                await app.db.transaction(async trans => {
                        /* CADASTRA O CABEÇALHO DO PEDIDO E RETORNA O ID */
                        codigoPedido = await trans.insert(pedido)
                                .table("cadastro_pedidos")
                                .then((codigo_pedido) => { return codigo_pedido })

                        /* CONSULTA TODAS AS MERCADORIAS DO PEDIDO FINALIZADO */
                        /* Os dados retornados  vai ser amazenados na tabela 'pedidos_efetuados' */
                        const carrinho = await trans.raw(
                                "SELECT " + codigoPedido + " AS id_pedido, " +
                                "view_mercadorias_atributos.codigo_mercadoria AS id_mercadoria, " +
                                "view_mercadorias_atributos.nome_exibir, " +
                                "view_mercadorias_atributos.url_principal, " +
                                "view_mercadorias_atributos.Marcas AS marca, " +
                                "view_mercadorias_atributos.`Unidades de medida` AS unidade_medida, " +
                                "view_mercadorias_atributos.valor_custo, " +
                                "view_mercadorias_atributos.preco_venda, " +
                                "view_mercadorias_atributos.codigo_integracao, " +
                                "carrinho.quantidade, " +
                                "view_mercadorias_atributos.preco_venda*carrinho.quantidade AS valor_total_item " +
                                "FROM view_mercadorias_atributos RIGHT JOIN carrinho " +
                                "ON view_mercadorias_atributos.codigo_mercadoria = carrinho.id_mercadoria " +
                                "WHERE (((carrinho.id_usuario)=" + pedido.id_usuario + ") " +
                                "AND ((view_mercadorias_atributos.status)=True));"
                        )

                        await trans.delete()
                                .table("carrinho")
                                .where({ id_usuario: pedido.id_usuario })

                        await trans.insert(carrinho[0])
                                .table("pedidos_efetuados")
                })
                        .then(() => { return res.json(codigoPedido[0]) })
                        .catch(error => {
                                util_console({ funcao: 'savePedido', tipo: 'ERRO-500', mensagem: 'Erro para salvar o pedido', erro: error, salvarDB: true })
                                return res.status(500).send(msgPadraoErro)
                        })


        }

        const getUltimoPedidoUsuario = (req, res) => {
                app.db.raw(`SELECT 
                codigo_pedido, 
                cadastrado_em,
                tipo_pagamento,
                tipo_pagamento_entrega, 
                ped_logradouro, 
                ped_numero, 
                ped_bairro, 
                ped_cep, 
                ped_localidade, 
                ped_uf, 
                confirmado_loja, 
                data_confirmado_loja, 
                separacao, 
                data_separacao, 
                saiu_entrega, 
                data_saiu_entrega, 
                finalizado, 
                data_finalizado, 
                cancelado, 
                data_cancelado
                FROM cadastro_pedidos WHERE id_usuario=${req.params.id_usuario} 
                ORDER BY codigo_pedido DESC LIMIT 1`)
                        .then(ultimoPedido => res.json(ultimoPedido[0][0]))
                        .catch(err => res.status(500).send(err))
        }

        const limit = 5 // usado para paginação
        const getPedidosUsuario = async (req, res) => {
                const page = req.query.page || 1
                const totaisPedidos = await app.db('cadastro_pedidos').count().where({ id_usuario: req.params.id_usuario }).first()

                app.db('cadastro_pedidos')
                        .select(
                                "codigo_pedido",
                                "cadastrado_em",
                                "tipo_pagamento",
                                "tipo_pagamento_entrega",
                                "ped_logradouro",
                                "ped_numero",
                                "ped_cep",
                                "ped_bairro",
                                "ped_localidade",
                                "ped_uf",
                                "confirmado_loja",
                                "data_confirmado_loja",
                                "separacao",
                                "data_separacao",
                                "saiu_entrega",
                                "data_saiu_entrega",
                                "finalizado",
                                "data_finalizado",
                                "cancelado",
                                "data_cancelado",
                                "vlr_total",
                                "vlr_total_produtos",
                                "vlr_frete",
                                "qtd_itens")
                        .where({ id_usuario: req.params.id_usuario })
                        .orderBy('codigo_pedido', 'desc')
                        .limit(limit).offset(page * limit - limit)
                        .then(pedidos => res.json({ pedidos, totaisPedidos }))
                        .catch(err => res.status(500).send(err))
        }

        const getPedidoByID = (req, res) => {
                app.db.raw(`SELECT 
                pedidos_efetuados.id_mercadoria,
                pedidos_efetuados.nome_exibir,
                pedidos_efetuados.url_principal,
                pedidos_efetuados.valor_total_item,
                pedidos_efetuados.quantidade 
                FROM pedidos_efetuados 
                WHERE id_pedido =${req.params.codigo_pedido}`)
                        .then(pedido => res.json(pedido[0]))
                        .catch(err => res.status(500).send(err))
        }
        return { savePedido, getUltimoPedidoUsuario, getPedidosUsuario, getPedidoByID }
}

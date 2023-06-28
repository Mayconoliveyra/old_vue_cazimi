exports.up = function (knex) {
        return knex.schema.createTable("cadastro_pedidos", table => {
                table.increments("codigo_pedido").primary()
                table.integer("id_usuario").unsigned().notNull().references("codigo_usuario").inTable("cadastro_usuarios")

                table.string("ped_nome", 191).notNull()
                table.string("ped_apelido", 191)
                table.string("ped_email", 191).notNull()
                table.string("ped_cpf_cnpj", 14).notNull()
                table.string("ped_contato", 11).notNull()

                table.string("ped_cep", 8).notNull()
                table.string("ped_logradouro", 191).notNull()
                table.string("ped_complemento", 50)
                table.string("ped_bairro", 191).notNull()
                table.string("ped_localidade", 191).notNull()
                table.string("ped_uf", 2).notNull()
                table.string("ped_numero", 191).notNull()

                table.decimal("vlr_total", 65, 2).notNull() /* valor total dos produtus + frete */
                table.decimal("vlr_total_produtos", 65, 2).notNull() /* valor total dos produtos */
                table.decimal("vlr_frete", 65, 2).notNull() /* valor do frete */
                table.integer("qtd_itens").notNull() /* quantidade total de mercadorias do pedido */

                table.string("tipo_pagamento", 191).notNull() /* forma de pagamento (pagar na entrega, pix, cartao, boleto...) */

                table.string("tipo_pagamento_entrega", 191) /* tipo de pegamento quando utilizado a forma de pagamento "Pagar na entrega" */
                table.decimal("vlr_pago_entrega", 65, 2) /* utilizado para calcular o valor do troco, só é utilizado quando a forma de pgamento é "Pagar na entrega"  e o pagamento for em "Dinheiro*/
                table.decimal("vlr_troco_entrega", 65, 2) /* valor do troco para que o entregador leve no momento da entrega (vlr_pago_entrega - vlr_total) */
                table.boolean("troco_entrega", 1) /* boleano, se vai ser necessario troco ou nao, se tiver false, significa que o cliente utilizou a opção "Não quero troco" */

                table.string("tipo_cartao", 1) /* tipo de cartão: c= crédito, d= débito. Utilizado para venda com "tipo_pagamento= Pagar na entrega e que tinha a forma de pagamento como Cartão" */
                table.string("bandeira_cartao", 191) /* bandeira do cartão na entrega (hiper, visa...) */
                table.integer("max_parcelas") /* quantidade maxima de parcelas que o cliente pode escolher no momento do pagamento na entrega */

                table.boolean("confirmado_loja", 1).notNull().defaultTo(0)   /* CONFIRMADO PEDIDO  */
                table.timestamp("data_confirmado_loja").defaultTo('0000-00-00 00:00:00')

                table.boolean("separacao", 1).notNull().defaultTo(0)      /* SENDO SEPARADO OS PRODUTOS / CARREGAMENTO */
                table.timestamp("data_separacao").defaultTo('0000-00-00 00:00:00')

                table.boolean("saiu_entrega", 1).notNull().defaultTo(0)      /* PEDIDO A CAMINHO DA ENTREGA */
                table.timestamp("data_saiu_entrega").defaultTo('0000-00-00 00:00:00')

                table.boolean("finalizado", 1).notNull().defaultTo(0)       /* PEDIDO FINALIZADO COM SUCESSO */
                table.timestamp("data_finalizado").defaultTo('0000-00-00 00:00:00')

                table.boolean("cancelado", 1).notNull().defaultTo(0) /* PEDIDO CANCELADO */
                table.timestamp("data_cancelado").defaultTo('0000-00-00 00:00:00')

                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_pedidos")
};


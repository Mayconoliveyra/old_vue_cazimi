exports.up = function (knex) {
        return knex.schema.createTable("pedidos_efetuados", table => {
                table.integer("id_pedido").unsigned().notNull().references("codigo_pedido").inTable("cadastro_pedidos")
                table.integer("id_mercadoria").unsigned().notNull().references("codigo_mercadoria").inTable("cadastro_mercadorias")

                table.string("nome_exibir", 120).notNull()
                table.text('url_principal').notNull()
                table.string("marca", 191)
                table.string("unidade_medida", 191)
                table.decimal("valor_custo", 65, 2).notNull()
                table.decimal("preco_venda", 65, 2).notNull()
                table.string("codigo_integracao", 191)

                table.integer("quantidade").notNull()
                table.decimal("valor_total_item", 65, 2).notNull()
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("pedidos_efetuados")
};

exports.up = function (knex) {
        return knex.schema.createTable("cadastro_mercadorias", table => {
                table.increments("codigo_mercadoria").primary()
                table.string("nome_exibir", 120).notNull().unique()
                table.integer("id_departamento").unsigned().notNull().references("codigo_departamento").inTable("cadastro_departamentos")
                table.float("valor_custo").notNull().defaultTo(0)
                table.float("preco_venda").notNull().defaultTo(0)
                table.float("preco_promocao").notNull().defaultTo(0)
                table.boolean("promocao_ativa", 1).notNull().defaultTo(0)
                table.timestamp("fim_promocao")
                table.decimal("estoque_disponivel", 65, 3).notNull().defaultTo(0)
                table.decimal("quantidade_minima_venda", 65, 3).notNull().defaultTo(1)
                table.boolean("controlar_estoque", 1).notNull().defaultTo(0)
                table.text('descricao_produto')
                table.text('url_principal').notNull()
                table.string("codigo_integracao", 191)

                table.boolean("status", 1).notNull().defaultTo(1)

                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_mercadorias")
};

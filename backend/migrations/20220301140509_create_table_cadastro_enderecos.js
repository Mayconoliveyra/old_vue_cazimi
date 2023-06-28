exports.up = function (knex) {
        return knex.schema.createTable("cadastro_enderecos", table => {
                table.increments("codigo").primary()
                table.string("cep", 8).notNull().unique()
                table.string("logradouro", 191).notNull() /* Endereco/ Rua */
                table.string("bairro", 191).notNull()
                table.string("localidade", 191).notNull() /* Cidade */
                table.string("uf", 191).notNull()

                table.boolean("status", 1).notNull().defaultTo(1)
                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_enderecos")
};

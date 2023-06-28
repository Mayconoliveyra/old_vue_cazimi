exports.up = function (knex) {
        return knex.schema.createTable("cadastro_usuarios", table => {
                table.increments("codigo_usuario").primary()
                table.string("nome", 191).notNull()
                table.string("email", 191).notNull().unique()
                table.string("apelido", 191)
                table.string("cpf_cnpj", 14).notNull()
                table.string("contato", 11).notNull()
                table.string("senha", 191).notNull()

                table.boolean("admin", 1).notNull().defaultTo(0)
                table.string("codigo_autenticacao", 191) /* codigo_autenticacao= codigo do cliente criptografado */

                table.string("cep", 8).notNull()
                table.string("logradouro", 191)
                table.string("complemento", 191)
                table.string("bairro", 191)
                table.string("localidade", 191)
                table.string("uf", 191)
                table.string("numero", 191)
                table.boolean("api_endereco", 1).notNull().defaultTo(0) /* Valida se o endereço foi preenchido manual ou pela API */

                table.boolean("bloqueado", 1).notNull().defaultTo(0)
                table.float("vlr_frete").notNull().defaultTo(0)

                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_usuarios")
};

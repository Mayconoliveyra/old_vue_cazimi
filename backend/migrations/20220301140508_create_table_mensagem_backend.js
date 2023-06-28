exports.up = function (knex) {
        return knex.schema.createTable("mensagem_backend", table => {
                table.increments("codigo").primary()
                table.string("funcao", 191)
                table.string("tipo", 191)
                table.string("mensagem", 191)
                table.text("erro")
                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("mensagem_backend")
};

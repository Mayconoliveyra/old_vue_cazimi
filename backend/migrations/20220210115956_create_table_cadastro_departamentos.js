exports.up = function (knex) {
        return knex.schema.createTable("cadastro_departamentos", table => {
                table.increments("codigo_departamento").primary()
                table.string("departamento", 30).notNull().unique()
                table.string("path", 191).notNull().unique()

                table.boolean("status", 1).notNull().defaultTo(1)

                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_departamentos")
};

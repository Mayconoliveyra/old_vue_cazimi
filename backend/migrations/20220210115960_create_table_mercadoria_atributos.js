exports.up = function (knex) {
        return knex.schema.createTable("mercadoria_atributos", table => {
                table.integer("id_mercadoria").unsigned().notNull().references("codigo_mercadoria").inTable("cadastro_mercadorias")
                table.integer("id_atributo").unsigned().notNull().references("codigo").inTable("atributos")
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("mercadoria_atributos")
};

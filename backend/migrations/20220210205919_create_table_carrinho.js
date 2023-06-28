exports.up = function (knex) {
        return knex.schema.createTable("carrinho", table => {
                table.integer("id_usuario").unsigned().notNull().references("codigo_usuario").inTable("cadastro_usuarios")
                table.integer("id_mercadoria").unsigned().notNull().references("codigo_mercadoria").inTable("cadastro_mercadorias")
                table.integer("quantidade").notNull()
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("carrinho")
};

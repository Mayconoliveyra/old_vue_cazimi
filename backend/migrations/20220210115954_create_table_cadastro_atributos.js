exports.up = function (knex) {
        return knex.schema.createTable("cadastro_atributos", table => {
                table.increments("codigo_atributo").primary()
                table.string("atributo", 30).notNull().unique()
                table.boolean("padrao", 1).notNull().defaultTo(0)
        })
                .then(function () {
                        return knex("cadastro_atributos").insert([
                                {
                                        atributo: "Marcas",
                                        padrao: true
                                },
                                {
                                        atributo: "Unidades de medida",
                                        padrao: true
                                },
                                {
                                        atributo: "Cores",
                                        padrao: true
                                },
                                {
                                        atributo: "Tamanhos",
                                        padrao: true
                                }
                        ])
                })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_atributos")
};

exports.up = function (knex) {
        return knex.schema.createTable("atributos", table => {
                table.increments("codigo").primary()
                table.string("atributo_nome", 30).notNull()
                table.integer("id_atributo").unsigned().notNull().references("codigo_atributo").inTable("cadastro_atributos")

        }).then(function () {
                return knex("atributos").insert([
                        {
                                atributo_nome: "BALDE",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "CARRINHO",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "CX",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "EMBAL",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "KG",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "LATA",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "LITRO",
                                id_atributo: 2
                        },

                        {
                                atributo_nome: "M",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "M3",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "MILHEI",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "PC",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "ROLO",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "SACO",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "UNID",
                                id_atributo: 2
                        },
                        {
                                atributo_nome: "PACOTE",
                                id_atributo: 2
                        },
                ])
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("atributos")
};

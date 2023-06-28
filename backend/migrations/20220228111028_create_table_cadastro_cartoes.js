exports.up = async function (knex) {
        return knex.schema.createTable("cadastro_cartoes", table => {
                table.increments("codigo_cartao").primary()
                table.string("bandeira", 191).notNull()
                table.string("tipo", 1).notNull()
                table.integer("maximo_parcelas").notNull().defaultTo(1)
                table.float("vlr_minimo_parcela").notNull().defaultTo(0)
                table.boolean("status", 1).notNull().defaultTo(1)
                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        }).then(function () {
                return knex("cadastro_cartoes").insert([
                        {
                                bandeira: "Amex", tipo: "C", maximo_parcelas: 12, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "Diners", tipo: "C", maximo_parcelas: 12, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "ELO Debito", tipo: "D", maximo_parcelas: 1, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "ELO Credito", tipo: "C", maximo_parcelas: 12, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "Hipercard", tipo: "D", maximo_parcelas: 1, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "Hipercard", tipo: "C", maximo_parcelas: 12, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "Maestro", tipo: "D", maximo_parcelas: 1, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "Mastercard", tipo: "C", maximo_parcelas: 12, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "Visa Electron", tipo: "D", maximo_parcelas: 1, vlr_minimo_parcela: 0, status: true
                        },
                        {
                                bandeira: "Visa", tipo: "C", maximo_parcelas: 12, vlr_minimo_parcela: 0, status: true
                        },
                ])
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("cadastro_cartoes")
};

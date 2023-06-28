exports.up = async function (knex) {
        return knex.schema.createTable("formas_pagamentos", table => {
                table.increments("codigo_pagamento").primary()
                table.string("nome_pagamento", 191).notNull().unique()
                table.text("descricao")
                table.integer("order").notNull().unique()
                table.boolean("pagar_entrega", 1).notNull().defaultTo(0)
                table.string("icone", 191)
                table.boolean("status", 1).notNull().defaultTo(1)
                table.timestamp('cadastrado_em').defaultTo(knex.fn.now())
                table.timestamp("alterado_em").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
        }).then(function () {
                return knex("formas_pagamentos").insert([
                        {
                                nome_pagamento: "Pagar na Entrega", icone: 'shop', descricao: "<h3>Compra segura. Só pague no momento da entrega!</h3><p>No pagamento <b>pagar na entrega</b>, você efetua sua compra com ainda mais segurança, podendo verificar seu pedido fisicamente.</p><p>Você pode realizar o pagamento em espécie, cartão de crédito e/ou débito.</p><p>O que você precisa saber antes:</p><ul><li><b>Verifique seu limite disponível</b><br />Sua administradora do cartão pode informar se o limite é compatível com o valor total de seu pedido.</li><li>No caso de utilização de mais de um cartão, verifique o limite para cada valor atribuído a cada cartão.</li><li>Caso o pagamento não seja realizado na entrega, seu pedido será cancelado e reservamos o direito de limitar as formas de pagamento disponíveis para você futuramente.</li></ul>", pagar_entrega: false, order: 1, status: true
                        },
                        {
                                nome_pagamento: "Retirar na Loja", icone: 'shop', descricao: "<h3>Compra segura. Só pague no momento da entrega!</h3><p>No pagamento <b>pagar na entrega</b>, você efetua sua compra com ainda mais segurança, podendo verificar seu pedido fisicamente.</p><p>Você pode realizar o pagamento em espécie, cartão de crédito e/ou débito.</p><p>O que você precisa saber antes:</p><ul><li><b>Verifique seu limite disponível</b><br />Sua administradora do cartão pode informar se o limite é compatível com o valor total de seu pedido.</li><li>No caso de utilização de mais de um cartão, verifique o limite para cada valor atribuído a cada cartão.</li><li>Caso o pagamento não seja realizado na entrega, seu pedido será cancelado e reservamos o direito de limitar as formas de pagamento disponíveis para você futuramente.</li></ul>", pagar_entrega: false, order: 2, status: true
                        },
                        {
                                nome_pagamento: "Pagar com PIX", icone: 'x-diamond', descricao: "<h3>A melhor opção para suas compras à vista</h3><p>Pague com PIX. Nessa modalidade, seu <b>pedido é aprovado instantaneamente</b>, o que torna a expedição do seu pedido ainda mais rápida.</p><p>O que você precisa saber antes de pagar por PIX:</p><ul><li>É necessário possuir uma chave PIX cadastrada no seu Banco;</li><li>Com o seu contato, basta escanear o QR Code ou copiar o código para efetivar a compra;</li><li>O pagamento é processado e debitado do valor em sua conta corrente;</li><li>Como padrão, o Banco Central limitou os pagamentos no período das 20h às 06h, a valores de até R$1.000. Mas você pode solicitar o aumento do limite deste período diretamente com o seu banco, pela Central de Atendimento ou APP. O prazo de liberação é de até 48h.</li></ul>", pagar_entrega: false, order: 3, status: false
                        },
                        {
                                nome_pagamento: "Dinheiro", descricao: null, pagar_entrega: true, icone: "cash", order: 4, status: true
                        },
                        {
                                nome_pagamento: "Cartão", descricao: null, pagar_entrega: true, icone: "credit-card2-back-fill", order: 5, status: true
                        },
                        {
                                nome_pagamento: "Pix", descricao: null, pagar_entrega: true, icone: "x-diamond-fill", order: 6, status: true
                        },
                ])
        })
};

exports.down = function (knex) {
        return knex.schema.dropTable("formas_pagamentos")
};

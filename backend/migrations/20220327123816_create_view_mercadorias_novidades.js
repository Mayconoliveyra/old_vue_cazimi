
exports.up = function (knex) {
        return knex.raw(`
        CREATE VIEW view_mercadorias_novidades 
        AS SELECT 
        cadastro_mercadorias.codigo_mercadoria,
        cadastro_mercadorias.nome_exibir,
        cadastro_mercadorias.preco_venda,
        cadastro_mercadorias.preco_promocao,
        cadastro_mercadorias.promocao_ativa,
        cadastro_mercadorias.estoque_disponivel,
        cadastro_mercadorias.quantidade_minima_venda,
        cadastro_mercadorias.descricao_produto,
        cadastro_mercadorias.url_principal
        FROM cadastro_mercadorias
        WHERE (((cadastro_mercadorias.status)=True))
        ORDER BY cadastro_mercadorias.codigo_mercadoria DESC LIMIT 20
      `);
};

exports.down = function (knex) {
        return knex.raw('DROP VIEW view_mercadorias_novidades');
};

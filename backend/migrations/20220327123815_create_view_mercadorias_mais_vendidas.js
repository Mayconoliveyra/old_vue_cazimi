
exports.up = function (knex) {
        return knex.raw(`
        CREATE VIEW view_mercadorias_mais_vendidas 
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
        FROM cadastro_pedidos 
        INNER JOIN (cadastro_mercadorias 
        INNER JOIN pedidos_efetuados 
        ON cadastro_mercadorias.codigo_mercadoria = pedidos_efetuados.id_mercadoria) 
        ON cadastro_pedidos.codigo_pedido = pedidos_efetuados.id_pedido
        AND (cadastro_pedidos.cadastrado_em >= DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -7 DAY) 
        AND cadastro_pedidos.cadastrado_em <= CURRENT_TIMESTAMP)
        GROUP BY cadastro_mercadorias.codigo_mercadoria, 
        cadastro_mercadorias.nome_exibir, 
        cadastro_mercadorias.preco_venda, 
        cadastro_mercadorias.preco_promocao, 
        cadastro_mercadorias.promocao_ativa, 
        cadastro_mercadorias.estoque_disponivel, 
        cadastro_mercadorias.quantidade_minima_venda, 
        cadastro_mercadorias.descricao_produto, 
        cadastro_mercadorias.url_principal, 
        cadastro_mercadorias.status
        HAVING (((cadastro_mercadorias.status)=TRUE))
        ORDER BY Sum(pedidos_efetuados.quantidade) DESC LIMIT 20
      `);
};

exports.down = function (knex) {
        return knex.raw('DROP VIEW view_mercadorias_mais_vendidas');
};

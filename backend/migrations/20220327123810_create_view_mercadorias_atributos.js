
exports.up = function (knex) {
        return knex.raw(`
        CREATE VIEW view_mercadorias_atributos 
        AS SELECT 
        cadastro_mercadorias.codigo_mercadoria,
        cadastro_mercadorias.nome_exibir,
        cadastro_mercadorias.preco_venda,
        cadastro_mercadorias.valor_custo,
        cadastro_mercadorias.codigo_integracao,
        cadastro_mercadorias.preco_promocao,
        cadastro_mercadorias.promocao_ativa,
        cadastro_mercadorias.estoque_disponivel,
        cadastro_mercadorias.quantidade_minima_venda,
        cadastro_mercadorias.descricao_produto,
        cadastro_mercadorias.url_principal,
        cadastro_departamentos.path,
        MAX(CASE WHEN cadastro_atributos.atributo='Marcas' THEN atributos.atributo_nome END) 'Marcas',
        MAX(CASE WHEN cadastro_atributos.atributo='Unidades de medida' THEN atributos.atributo_nome END) 'Unidades de medida',
        MAX(CASE WHEN cadastro_atributos.atributo='Cores' THEN atributos.atributo_nome END) 'Cores',
        MAX(CASE WHEN cadastro_atributos.atributo='Tamanhos' THEN atributos.atributo_nome END) 'Tamanhos',
        cadastro_mercadorias.status
        FROM cadastro_mercadorias
        LEFT JOIN mercadoria_atributos 
        ON cadastro_mercadorias.codigo_mercadoria = mercadoria_atributos.id_mercadoria
        LEFT JOIN atributos ON mercadoria_atributos.id_atributo = atributos.codigo
        LEFT JOIN cadastro_atributos ON cadastro_atributos.codigo_atributo = atributos.id_atributo
        LEFT JOIN cadastro_departamentos ON cadastro_departamentos.codigo_departamento = cadastro_mercadorias.id_departamento
        GROUP BY cadastro_mercadorias.codigo_mercadoria
      `);
};

exports.down = function (knex) {
        return knex.raw('DROP VIEW view_mercadorias_atributos');
};

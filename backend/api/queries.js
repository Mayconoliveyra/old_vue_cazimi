module.exports = app => {
    /* Retorna uma Query SQL, onde com ela e retornado os dados do carrinho do usuário como: */
    /* Quantidades de itens, valor total, valor frete... */
    function queryResumo(codigo_usuario) {
        return `SELECT 
            SUM(carrinho.quantidade) AS qtd_itens, 
            SUM(cadastro_mercadorias.preco_venda * carrinho.quantidade) AS vlr_total_produtos, 
            SUM(cadastro_mercadorias.preco_venda * carrinho.quantidade) + cadastro_usuarios.vlr_frete AS vlr_total, 
            cadastro_usuarios.vlr_frete, 
            NULL AS 'tipo_pagamento', 
            NULL AS 'tipo_pagamento_entrega', 
            NULL AS 'vlr_pago_entrega', 
            NULL AS 'vlr_troco_entrega', 
            NULL AS 'troco_entrega', 
            NULL AS 'tipo_cartao', 
            NULL AS 'bandeira_cartao', 
            NULL AS 'max_parcelas'
            FROM carrinho INNER JOIN cadastro_mercadorias ON 
            cadastro_mercadorias.codigo_mercadoria = carrinho.id_mercadoria INNER JOIN 
            cadastro_usuarios ON carrinho.id_usuario = cadastro_usuarios.codigo_usuario WHERE 
            carrinho.id_usuario= ${codigo_usuario} 
            AND cadastro_mercadorias.status= true`
    }

    return { queryResumo }
}
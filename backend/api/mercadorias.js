module.exports = app => {
  getMercadoriasFiltros = async (req, res) => {
    /* Verifica se foi informado algum filtro em ExibirDepartamento */
    const filtros = req.body.length > 0 ? req.body : null
    let atributosNome = []
    let atributoData = {};
    let AndQueryFiltros = "WHERE status= TRUE"

    if (filtros) {
      for (let index = 0; filtros.length > index; index++) {
        /* Filtra todos atributos nome ex: Marca, Cor, Tamanho...*/
        atributosNome.push(filtros[index].atributo)

        if (!atributoData[filtros[index].atributo]) {
          /* Cria um array pra cada AND. Ex: COR IN ('Branco', 'Azul', 'Preto')) */
          atributoData[filtros[index].atributo] = [];
        }
        /* Adiciona cada atribudoData em seu array ex: COR["Azul","Branco","Vende"] */
        atributoData[filtros[index].atributo].push(filtros[index].dataAtributo)
      }
      /* Remove os atributos duplicados do array */
      atributosNome = [...new Set(atributosNome)];

      /* Criar o AND IN pra cada atributo filtrado EX: AND `Marcas` IN ("Sassung") AND `Tamanho` IN ("P")  */
      for (let index = 0; atributosNome.length > index; index++) {
        let queryAnd = ` AND *'#'${atributosNome[index]}*'#' IN (${JSON.stringify(atributoData[atributosNome[index]]).replace("[", "").replace("]", "")})`
        queryAnd = queryAnd.replace("*'#'", "`").replace("*'#'", "`")
        AndQueryFiltros = AndQueryFiltros + queryAnd
      }

    }

    switch (req.params.departamento) {
      case "home":
        /* Mercadorias mais vendidas */
        const interessar = await app.db.select()
          .table("view_mercadorias_interessar")

        /* Ultimas mercadorias vendidas */
        const destaques = await app.db.select()
          .table("view_mercadorias_destaques")

        /* Utimas mercadorias cadastradas */
        const novidades = await app.db.select()
          .table("view_mercadorias_novidades")

        /* Mais Vendidos nos ultimos 7 dias */
        const maisVendidosSemana = await app.db.select()
          .table("view_mercadorias_mais_vendidas")

        res.json({ interessar, destaques, novidades, maisVendidosSemana })
        break;
      case `${req.params.departamento}`:
        if (filtros) {
          const total_produtos = await app.db.raw(`
          SELECT 
          COUNT(*) as total_produtos
          FROM view_mercadorias_atributos
          ${AndQueryFiltros}
          AND path = '${req.params.departamento}'
          `)

          app.db.raw(`
          SELECT 
          *
          FROM view_mercadorias_atributos
          ${AndQueryFiltros}
          AND path = '${req.params.departamento}'
          ORDER BY ${req.query.order}
          LIMIT ${req.query.limit} OFFSET ${(req.query.page * req.query.limit - req.query.limit)}
          `)
            .then(mercadorias => res.json({ mercadorias: mercadorias[0], total_produtos: total_produtos[0][0].total_produtos }))
            .catch(err => res.status(500).send(err))
        } else {
          const total_produtos = await app.db.raw(`
          SELECT 
          COUNT(*) as total_produtos
          FROM view_mercadorias_atributos
          WHERE status= TRUE
          AND path = '${req.params.departamento}'
          `)

          const mercadorias = await app.db.raw(`
          SELECT 
          *
          FROM view_mercadorias_atributos
          WHERE status= TRUE
          AND path = '${req.params.departamento}'
          ORDER BY ${req.query.order}
          LIMIT ${req.query.limit} OFFSET ${(req.query.page * req.query.limit - req.query.limit)}`)

          /* So chama os data atributos, e dataAtributos se a page =1, se for igual 1 significa que a primeira requisição, caso 2,3... que dizer que apenas pra puxa as mercadoria com  limit */
          if (req.query.page == 1) {
            const atributos = await app.db.raw(`
            SELECT cadastro_atributos.atributo
            FROM (((cadastro_atributos 
            INNER JOIN atributos 
            ON cadastro_atributos.codigo_atributo = atributos.id_atributo) 
            INNER JOIN mercadoria_atributos 
            ON atributos.codigo = mercadoria_atributos.id_atributo) 
            INNER JOIN cadastro_mercadorias 
            ON mercadoria_atributos.id_mercadoria = cadastro_mercadorias.codigo_mercadoria) 
            INNER JOIN cadastro_departamentos 
            ON cadastro_mercadorias.id_departamento = cadastro_departamentos.codigo_departamento
            GROUP BY cadastro_atributos.atributo, cadastro_departamentos.path, cadastro_mercadorias.status
            HAVING (((cadastro_departamentos.path)='${req.params.departamento}') 
            AND ((cadastro_mercadorias.status)=True));`)

            const dataAtributos = await app.db.raw(`
            SELECT atributos.atributo_nome, cadastro_atributos.atributo
            FROM ((mercadoria_atributos 
            INNER JOIN (atributos 
            INNER JOIN cadastro_atributos 
            ON atributos.id_atributo = cadastro_atributos.codigo_atributo) 
            ON mercadoria_atributos.id_atributo = atributos.codigo) 
            INNER JOIN cadastro_mercadorias 
            ON mercadoria_atributos.id_mercadoria = cadastro_mercadorias.codigo_mercadoria) 
            INNER JOIN cadastro_departamentos 
            ON cadastro_mercadorias.id_departamento = cadastro_departamentos.codigo_departamento
            GROUP BY atributos.atributo_nome, cadastro_atributos.atributo, cadastro_departamentos.path, cadastro_mercadorias.status
            HAVING (((cadastro_departamentos.path)='${req.params.departamento}') 
            AND ((cadastro_mercadorias.status)=True));`)
            res.json({ mercadorias: mercadorias[0], atributos: atributos[0], dataAtributos: dataAtributos[0], total_produtos: total_produtos[0][0].total_produtos })
            return
          }
          res.json({ mercadorias: mercadorias[0] })
        }


        break;
      default:
        console.log("Não encontrado.");
        break;

    }


  }


  return { getMercadoriasFiltros }
}
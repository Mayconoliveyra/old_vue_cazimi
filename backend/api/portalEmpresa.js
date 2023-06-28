module.exports = app => {
  const { existeOuErro, naoExisteNoBancoOuErro } = app.api.validador

  const getMercadoriasPortal = (req, res) => {
    app.db("cadastro_mercadorias")
      .select(
        "cadastro_mercadorias.*",
        "cadastro_departamentos.departamento",
      )
      .innerJoin("cadastro_departamentos", "cadastro_departamentos.codigo_departamento", "cadastro_mercadorias.id_departamento")
      .orderBy('cadastro_mercadorias.codigo_mercadoria', 'DESC')
      .then(mercadorias => res.json(mercadorias))
      .catch(err => res.status(500).send(err))
  }

  /* Retorna todos atributos vinculadodo a mercadoria */
  const getAtributosMercadoria = (req, res) => {
    app.db.raw(`
    SELECT  
    cadastro_atributos.atributo, 
    atributos.codigo, 
    atributos.atributo_nome 
    FROM
    mercadoria_atributos
    INNER JOIN atributos ON mercadoria_atributos.id_atributo = atributos.codigo
    INNER JOIN cadastro_atributos ON atributos.id_atributo = cadastro_atributos.codigo_atributo
    WHERE id_mercadoria = '${req.params.id_mercadoria}'`)
      .then(atributosMercadoria => res.json(atributosMercadoria[0]))
      .catch(err => res.status(500).send(err))
  }

  const getDepartamentoOrdeName = (req, res) => {
    app.db("cadastro_departamentos")
      .select("codigo_departamento", "departamento")
      .where({ status: true })
      .orderBy('departamento', 'ASC')
      .then(departamentos => res.json(departamentos))
      .catch(err => res.status(500).send(err))
  }

  /* Retorna o data com todos abributos cadastrados */
  const getMercadoriaAtributos = (req, res) => {
    app.db.raw(`
    SELECT 
    cadastro_atributos.atributo, 
    atributos.codigo, 
    atributos.atributo_nome 
    FROM atributos INNER JOIN 
    cadastro_atributos 
    WHERE atributos.id_atributo = cadastro_atributos.codigo_atributo`)
      .then(atributosMercadoria => res.json(atributosMercadoria[0]))
      .catch(err => res.status(500).send(err))
  }

  const getAtributos = (req, res) => {
    app.db("cadastro_atributos")
      .select()
      .orderBy('codigo_atributo', 'ASC')
      .then(atributos => res.json(atributos))
      .catch(err => res.status(500).send(err))
  }
  const getAtributosAtributos = (req, res) => {
    app.db("atributos")
      .select("codigo", "atributo_nome")
      .where({ id_atributo: req.params.codigo })
      .orderBy('codigo', 'ASC')
      .then(atributos => res.json(atributos))
      .catch(err => res.status(500).send(err))
  }

  const saveAtributo = async (req, res) => {
    const modeloAtributo = {
      atributo
    } = req.body
    if (req.params.codigo_atributo) modeloAtributo.codigo_atributo = req.params.codigo_atributo
    /* Nomes proibidos para atributos, pois, ja existe coluna com os nome no cadastro de mercadorias */
    /* Então se fosse criado um atributo com o mesmo nome da erro de duplicidade na hora de criar a view_mercadorias_atributos */
    const nomesAtributosNaoPermitidos = ["codigo_mercadoria", "nome_exibir", "preco_venda", "preco_promocao", "promocao_ativa", "estoque_disponivel", "quantidade_minima_venda", "descricao_produto", "url_principal", "status", "path"];
    try {
      if (modeloAtributo.codigo_atributo == 1) throw "O registro não pode ser alterado."
      if (modeloAtributo.codigo_atributo == 2) throw "O registro não pode ser alterado."
      if (modeloAtributo.codigo_atributo == 3) throw "O registro não pode ser alterado."

      existeOuErro(modeloAtributo.atributo, "[Nome do Atributo*] não pode ser nulo.");
      if (nomesAtributosNaoPermitidos.includes(modeloAtributo.atributo)) throw "O nome do atributo já está em uso interno do sistema, por favor utilize outro nome."

      if (!modeloAtributo.codigo_atributo) {
        await naoExisteNoBancoOuErro('cadastro_atributos', 'atributo', modeloAtributo.atributo, "Já existe cadastro com o [Nome do Atributo*] informado.");
      } else {
        const atributoFromDBAtributo = await app.db.raw(`SELECT * FROM cadastro_atributos WHERE atributo='${modeloAtributo.atributo}' AND codigo_atributo != ${modeloAtributo.codigo_atributo}`)
        if (atributoFromDBAtributo[0].length > 0) throw "Já existe cadastro com o [Nome do Atributo*] informado."
      }

    } catch (msg) {
      return res.status(400).send(msg)
    }
    if (modeloAtributo.codigo_atributo) {
      await app.db("cadastro_atributos")
        .update(modeloAtributo)
        .where({ codigo_atributo: modeloAtributo.codigo_atributo })
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      await app.db("cadastro_atributos")
        .insert(modeloAtributo)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
    /* ATUALIZA VIEW view_mercadorias_atributos, ONDE TEM OS ATRIBUTOS */
    await app.db.raw('DROP VIEW view_mercadorias_atributos'); /* DELETA A VIEW */
    const atributos = await app.db("cadastro_atributos").select("atributo") /* CARREGA TODOS ATRIBUTOS CADASTRADOS */
    let atributosCase = ""
    /* CRIA AS COLUNAS DE ACORDO COM OS ATRIBUTOS, CADA ATRIBUTO SERA CRIADO UMA COLUNA */
    for (let index = 0; index < atributos.length; index++) {
      atributosCase = atributosCase + `MAX(CASE WHEN cadastro_atributos.atributo='${atributos[index].atributo}' THEN atributos.atributo_nome END)  '${atributos[index].atributo}', `
    }
    /*  CRIA A VIEW MERCADORIAS */
    await app.db.raw(`
   CREATE VIEW view_mercadorias_atributos 
   AS SELECT 
   cadastro_mercadorias.codigo_mercadoria,
   cadastro_mercadorias.nome_exibir,
   cadastro_mercadorias.preco_venda,
   cadastro_mercadorias.preco_promocao,
   cadastro_mercadorias.promocao_ativa,
   cadastro_mercadorias.estoque_disponivel,
   cadastro_mercadorias.quantidade_minima_venda,
   cadastro_mercadorias.descricao_produto,
   cadastro_mercadorias.url_principal,
   cadastro_departamentos.path,
   ${atributosCase}
   cadastro_mercadorias.status
   FROM cadastro_mercadorias
   LEFT JOIN mercadoria_atributos 
   ON cadastro_mercadorias.codigo_mercadoria = mercadoria_atributos.id_mercadoria
   LEFT JOIN atributos ON mercadoria_atributos.id_atributo = atributos.codigo
   LEFT JOIN cadastro_atributos ON cadastro_atributos.codigo_atributo = atributos.id_atributo
   LEFT JOIN cadastro_departamentos ON cadastro_departamentos.codigo_departamento = cadastro_mercadorias.id_departamento
   GROUP BY cadastro_mercadorias.codigo_mercadoria
 `);
  }

  const saveAtributoAtributo = async (req, res) => {
    const atributoAtributo = {
      atributo_nome,
      id_atributo,
    } = req.body
    if (req.params.codigo) atributoAtributo.codigo = req.params.codigo

    try {
      existeOuErro(atributoAtributo.atributo_nome, "O nome do atributo deve ser informado.");
      existeOuErro(atributoAtributo.id_atributo, "[id_atributo] não pode ser nulo.");
      const abributoFromDB = await app.db("atributos").where({ atributo_nome: atributoAtributo.atributo_nome }).andWhere({ id_atributo: atributoAtributo.id_atributo }).first()
      /* SE O ELEMENTO JA TIVER CADASTRADO PAUSA A FUNÇÃO */
      if (abributoFromDB) {
        return res.status(204).send()
      }
    } catch (msg) {
      return res.status(400).send(msg)
    }

    if (atributoAtributo.codigo) {
      app.db("atributos")
        .update(atributoAtributo)
        .where({ codigo: atributoAtributo.codigo })
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      app.db("atributos")
        .insert(atributoAtributo)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const removeAtributoAtributo = async (req, res) => {
    try {
      existeOuErro(req.params.codigo, "O código do atributo a ser removido não foi entrado.");
      await naoExisteNoBancoOuErro("mercadoria_atributos", "id_atributo", req.params.codigo, "O registro não pode ser excluído por possuir dependentes.")
    } catch (msg) {
      return res.status(400).send(msg)
    }

    app.db("atributos")
      .delete()
      .where({ codigo: req.params.codigo })
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send(err))
  }

  const getAtributosOrdeName = (req, res) => {
    app.db.raw(`SELECT 
    atributos.codigo, 
    atributos.atributo_nome, 
    cadastro_atributos.atributo 
    FROM atributos 
    INNER JOIN cadastro_atributos 
    ON atributos.id_atributo = cadastro_atributos.codigo_atributo
    ORDER BY cadastro_atributos.atributo ASC`)
      .then(atributos => res.json(atributos[0]))
      .catch(err => res.status(500).send(err))
  }
  const getDepartamentosPortal = (req, res) => {
    app.db("cadastro_departamentos")
      .select()
      .then(departamentos => res.json(departamentos))
      .catch(err => res.status(500).send(err))
  }

  const saveDepartamento = async (req, res) => {
    const modelo = {
      departamento,
      status,
    } = req.body

    if (req.params.codigo_departamento) modelo.codigo_departamento = req.params.codigo_departamento

    try {
      existeOuErro(modelo.departamento, "[Nome do Departamento] não pode ser nulo.");
      const formataPath = modelo.departamento.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
      modelo.path = formataPath.toLowerCase()
      existeOuErro(modelo.path, "[Path] não pode ser nulo.");

      if (!modelo.codigo_departamento) {
        await naoExisteNoBancoOuErro('cadastro_departamentos', 'departamento', modelo.departamento, "Já existe cadastro com o [Nome do Departamento*] informado.");
      } else {
        const departamentoFromDbDepartamento = await app.db.raw(`SELECT * FROM cadastro_departamentos WHERE departamento='${modelo.departamento}' AND codigo_departamento != ${modelo.codigo_departamento}`)
        if (departamentoFromDbDepartamento[0].length > 0) throw "Já existe cadastro com o [Nome do Departamento*] informado."
      }

    } catch (msg) {
      return res.status(400).send(msg)
    }

    if (modelo.codigo_departamento) {
      app.db("cadastro_departamentos")
        .update(modelo)
        .where({ codigo_departamento: modelo.codigo_departamento })
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      app.db("cadastro_departamentos")
        .insert(modelo)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }
  const saveMercadoria = async (req, res) => {
    const modeloMercadoria = {
      nome_exibir: req.body.nome_exibir,
      id_departamento: req.body.id_departamento,
      valor_custo: req.body.valor_custo,
      preco_venda: req.body.preco_venda,
      preco_promocao: req.body.preco_promocao,
      promocao_ativa: req.body.promocao_ativa,
      /* fim_promocao: req.body.fim_promocao, */
      estoque_disponivel: req.body.estoque_disponivel,
      quantidade_minima_venda: req.body.quantidade_minima_venda,
      controlar_estoque: req.body.controlar_estoque,
      descricao_produto: req.body.descricao_produto,
      url_principal: req.body.url_principal,
      codigo_integracao: req.body.codigo_integracao,
      status: req.body.status
    }
    if (req.params.codigo_mercadoria) modeloMercadoria.codigo_mercadoria = req.params.codigo_mercadoria


    try {
      existeOuErro(modeloMercadoria.nome_exibir, "[Nome do Produto*] deve ser informado.");
      existeOuErro(modeloMercadoria.preco_venda, "[Preço de Venda*] deve ser informado.");
      existeOuErro(modeloMercadoria.url_principal, "[URL Imagem Principal*] deve ser informado.");
      existeOuErro(modeloMercadoria.id_departamento, "[Departamento*] deve ser informado.");

      if (!modeloMercadoria.codigo_mercadoria) {
        await naoExisteNoBancoOuErro('cadastro_mercadorias', 'nome_exibir', modeloMercadoria.nome_exibir, "Já existe cadastro com o [Nome do Produto*] informado.");
      } else {
        const mercadoriaFromDBNomeExibir = await app.db.raw(`SELECT * FROM cadastro_mercadorias WHERE nome_exibir='${modeloMercadoria.nome_exibir}' AND codigo_mercadoria != ${modeloMercadoria.codigo_mercadoria}`)
        if (mercadoriaFromDBNomeExibir[0].length > 0) throw "Já existe cadastro com o [Nome do Produto*] informado."
      }
    } catch (msg) {
      return res.status(400).send(msg)
    }

    var codigoMercadoria = null

    if (modeloMercadoria.codigo_mercadoria) {
      try {
        await app.db.transaction(async trans => {

          await trans.update(modeloMercadoria)
            .table("cadastro_mercadorias")
            .where({ codigo_mercadoria: modeloMercadoria.codigo_mercadoria })

          /*Limpa os atributos*/
          await trans.delete()
            .table("mercadoria_atributos")
            .where({ id_mercadoria: modeloMercadoria.codigo_mercadoria })
          const dataAtributos = req.body.dataAtributos

          /* cadastra os atributos da mercadoria */
          await trans.insert(dataAtributos)
            .table("mercadoria_atributos")
        })
          .then(() => res.status(204).send())
          .catch(err => res.status(500).send("Não foi possível realizar a operação!.<br>Por favor, atualize a página e tente novamente."))
      } catch (msg) {
        return res.status(500).send(msg)
      }
    } else {
      try {
        await app.db.transaction(async trans => {
          /* Cadastra a mecadoria e retorna o ID*/
          codigoMercadoria = await trans.insert(modeloMercadoria)
            .table("cadastro_mercadorias")
            .then((codigo_mercadoria) => { return codigo_mercadoria })
          /* cadastra os atributos da mercadoria */
          const dataAtributos = req.body.dataAtributos
          for (let index = 0; index < dataAtributos.length; index++) {
            dataAtributos[index].id_mercadoria = codigoMercadoria
          }
          await trans.insert(dataAtributos)
            .table("mercadoria_atributos")
        })
          .then(() => res.status(204).send())
          .catch(err => res.status(500).send("Não foi possível realizar a operação!.<br>Por favor, atualize a página e tente novamente."))
      } catch (msg) {
        return res.status(500).send(msg)
      }
    }


  }
  const getPedidosCabecalho = async (req, res) => {
    const pendentes = await app.db("cadastro_pedidos")
      .select(
        "codigo_pedido",
        "ped_nome",
        "vlr_total",
        "cadastrado_em")
      .where({ confirmado_loja: false })
      .andWhere({ separacao: false })
      .andWhere({ saiu_entrega: false })
      .andWhere({ finalizado: false })
      .andWhere({ cancelado: false })
      .orderBy('codigo_pedido', 'DESC')

    const separacao = await app.db("cadastro_pedidos")
      .select(
        "codigo_pedido",
        "ped_nome",
        "vlr_total",
        "cadastrado_em")
      .where({ confirmado_loja: true })
      .andWhere({ separacao: false })
      .andWhere({ saiu_entrega: false })
      .andWhere({ finalizado: false })
      .andWhere({ cancelado: false })
      .orderBy('codigo_pedido', 'DESC')

    const sairEntrega = await app.db("cadastro_pedidos")
      .select(
        "codigo_pedido",
        "ped_nome",
        "vlr_total",
        "cadastrado_em")
      .where({ confirmado_loja: true })
      .andWhere({ separacao: true })
      .andWhere({ saiu_entrega: false })
      .andWhere({ finalizado: false })
      .andWhere({ cancelado: false })
      .orderBy('codigo_pedido', 'DESC')

    const finalizar = await app.db("cadastro_pedidos")
      .select(
        "codigo_pedido",
        "ped_nome",
        "vlr_total",
        "cadastrado_em")
      .where({ confirmado_loja: true })
      .andWhere({ separacao: true })
      .andWhere({ saiu_entrega: true })
      .andWhere({ finalizado: false })
      .andWhere({ cancelado: false })
      .orderBy('codigo_pedido', 'DESC')
    res.json({ pendentes, separacao, sairEntrega, finalizar })
  }

  const getPedidoPorID = async (req, res) => {
    const cabecalho = await app.db("cadastro_pedidos")
      .select(
        'codigo_pedido',
        'ped_nome',
        'ped_email',
        'ped_cpf_cnpj',
        'ped_contato',
        'ped_cep',
        'ped_logradouro',
        'ped_complemento',
        'ped_bairro',
        'ped_localidade',
        'ped_uf',
        'ped_numero',
        'vlr_total',
        'vlr_total_produtos',
        'vlr_frete',
        'qtd_itens',
        'tipo_pagamento',
        'tipo_pagamento_entrega',
        'vlr_pago_entrega',
        'troco_entrega',
        'confirmado_loja',
        'data_confirmado_loja',
        'separacao',
        'data_separacao',
        'saiu_entrega',
        'data_saiu_entrega',
        'finalizado',
        'data_finalizado',
        'cancelado',
        'data_cancelado',
        'cadastrado_em'
      )
      .where({ codigo_pedido: req.params.codigo_pedido })
      .first()
    const itens = await app.db("pedidos_efetuados")
      .select(
        'codigo_integracao',
        'nome_exibir',
        'quantidade',
        'preco_venda',
        'valor_total_item',
      )
      .where({ id_pedido: req.params.codigo_pedido })

    res.json({ cabecalho, itens })
  }

  const saveStatusPedido = async (req, res) => {

    let modeloAtualizarStatus = {}

    try {
      existeOuErro(req.body.codigo_pedido, "Não foi possível identificar o código do pedido. Atualize a pagina e tente novamente");
      existeOuErro(req.body.acao, "Não foi encontrado a acão. Atualize a pagina e tente novamente.");
    } catch (msg) {
      return res.status(400).send(msg)
    }

    switch (req.body.acao) {
      case "CONFIRMAR":
        modeloAtualizarStatus = {
          confirmado_loja: true,
          data_confirmado_loja: app.db.fn.now(),
          separacao: false,
          saiu_entrega: false,
          finalizado: false,
          cancelado: false,
        };
        break;
      case "SEPARACAO":
        modeloAtualizarStatus = {
          confirmado_loja: true,
          separacao: true,
          data_separacao: app.db.fn.now(),
          saiu_entrega: false,
          finalizado: false,
          cancelado: false,
        };
        break;
      case "ENTREGA":
        modeloAtualizarStatus = {
          confirmado_loja: true,
          separacao: true,
          saiu_entrega: true,
          data_saiu_entrega: app.db.fn.now(),
          finalizado: false,
          cancelado: false,
        };
        break;
      case "FINALIZAR":
        modeloAtualizarStatus = {
          confirmado_loja: true,
          separacao: true,
          saiu_entrega: true,
          finalizado: true,
          data_finalizado: app.db.fn.now(),
          cancelado: false,
        };
        break;
      case "CANCELAR":
        modeloAtualizarStatus = {
          cancelado: true,
          data_cancelado: app.db.fn.now(),
        };
        break;
      default:
        break;
    }

    app.db("cadastro_pedidos")
      .update(modeloAtualizarStatus)
      .where({ codigo_pedido: req.body.codigo_pedido })
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send(err))

  }
  return {
    getMercadoriasPortal,
    getAtributos,
    getAtributosAtributos,
    getDepartamentosPortal,
    saveAtributoAtributo,
    removeAtributoAtributo,
    saveAtributo,
    saveDepartamento,
    getDepartamentoOrdeName,
    getAtributosOrdeName,
    getAtributosMercadoria,
    getMercadoriaAtributos,
    saveMercadoria,
    getPedidosCabecalho,
    getPedidoPorID,
    saveStatusPedido
  }
}

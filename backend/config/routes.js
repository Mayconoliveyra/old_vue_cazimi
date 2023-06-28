const admin = require("./admin")

module.exports = app => {
   app.post("/entrar", app.api.autenticacao.entrar) //publico
   app.post("/publica/autenticar_usuario", app.api.autenticacao.autenticarUsuario) //publico
   app.post("/publica/enviar_email_recuperar_senha", app.api.autenticacao.enviarEmailRecuperarSenha) //publico
   app.post("/publica/cadastrar-nova-senha", app.api.autenticacao.cadastrarNovaSenha) //publico

   app.post("/validar_token", app.api.autenticacao.validarToken) //publico
   app.post("/validar_token_adm", app.api.autenticacao.validarUsuarioADM) //publico

   /* nome fantasia, logo, quem somos, nmr contato, rotas... */
   app.get("/publica/empresa", app.api.empresa.getEmpresa) //publico

   app.route("/cartoes")
      .all(app.config.passport.authenticate())
      .get(app.api.cartoes.getCartoes)

   /* CADASTRO USUÁRIO | ALTERAR CADASTRO | CONSULTAR CEP */
   app.route("/conta") //publico  /* Criar novo cadastro de usuário */
      .post(app.api.usuario.saveUsuario)
   app.route("/conta/usuario_endereco")  /* Get nos dados do usuario/alterar endereço */
      .all(app.config.passport.authenticate())
      .get(app.api.usuario.getUsuarioEndereco)
      .put(app.api.usuario.saveEditDadosConta)
   app.route("/api_endereco/:cep") /* Consultar CEP */
      .all(app.config.passport.authenticate())
      .get(app.api.usuario.getApiEndereco)



   /* ################################################### CARRINHO ###################################################  */
   app.route("/carrinho") /*Retornar carrinho do usuario*/
      .all(app.config.passport.authenticate())
      .get(app.api.carrinho.getCarrinho)

   app.route("/carrinho_quantidade")   /*Retorna a quantidade de itens que existe no carrinho do usuário*/
      .all(app.config.passport.authenticate())
      .get(app.api.carrinho.getCarrinhoQuantidade)

   app.route("/carrinho_add_remove/:codigo_mercadoria") /*Adicionar / altera quantidade  no carrinho do usuário*/
      .all(app.config.passport.authenticate())
      .post(app.api.carrinho.addMercadoriaCarrinho)
      .delete(app.api.carrinho.removerMercadoria)

   /* ######################################################################################################  */


   app.route("/pedido")
      .all(app.config.passport.authenticate())
      .post(app.api.pedido.savePedido)

   app.route("/pedido/ultimo_pedido/:id_usuario")
      .all(app.config.passport.authenticate())
      .get(app.api.pedido.getUltimoPedidoUsuario)
   app.route("/pedido/pedidos_usuario/:id_usuario/pedidos")
      .all(app.config.passport.authenticate())
      .get(app.api.pedido.getPedidosUsuario)
   app.route("/pedido/pedido_codigo/:codigo_pedido")
      .all(app.config.passport.authenticate())
      .get(app.api.pedido.getPedidoByID)

   /* REQUISIÇÕES PARA EXIBIR MERCADORIAS */
   /* OS FILTROS VEM NO BODY, POR ESSE MOTIVO ESTOU UNSADO 'PUT" */
   app.route("/mercadorias/:departamento")
      .put(app.api.mercadorias.getMercadoriasFiltros)


   /* PORTAL    PORTAL   PORTAL   PORTAL   PORTAL*/
   app.route("/portal/mercadorias")
      .all(app.config.passport.authenticate())
      .post(app.api.portalEmpresa.saveMercadoria)
      .get(admin(app.api.portalEmpresa.getMercadoriasPortal))
   app.route("/portal/mercadorias/:codigo_mercadoria")
      .all(app.config.passport.authenticate())
      .put(app.api.portalEmpresa.saveMercadoria)

   app.route("/portal/mercadoria/departamentos")
      .all(app.config.passport.authenticate())
      .get(admin(app.api.portalEmpresa.getDepartamentoOrdeName))

   /* Carrega todos os dados utilizados nos inputs de atributos, ex:Adidas, nike, UND, MT, Vermelho, Azul... (vindo da tabela Atributos) */
   app.route("/portal/mercadoria/atributos")
      .all(app.config.passport.authenticate())
      .get(admin(app.api.portalEmpresa.getMercadoriaAtributos))

   /* Carrega todos os atributos referente a mercadoria selecionada */
   app.route("/portal/mercadoria/atributos/mercadoria/:id_mercadoria")
      .all(app.config.passport.authenticate())
      .get(admin(app.api.portalEmpresa.getAtributosMercadoria))


   app.route("/portal/pedidos")
      .all(app.config.passport.authenticate())
      .get(admin(app.api.portalEmpresa.getPedidosCabecalho))
   app.route("/portal/pedidos/:codigo_pedido")
      .all(app.config.passport.authenticate())
      .get(admin(app.api.portalEmpresa.getPedidoPorID))
      .put(admin(app.api.portalEmpresa.saveStatusPedido))

   app.route("/portal/atributos")
      .all(app.config.passport.authenticate())
      .post(admin(app.api.portalEmpresa.saveAtributo))
      .get(admin(app.api.portalEmpresa.getAtributos))
   app.route("/portal/atributos/:codigo_atributo")
      .all(app.config.passport.authenticate())
      .put(admin(app.api.portalEmpresa.saveAtributo))

   app.route("/portal/atributos/atributos")
      .all(app.config.passport.authenticate())
      .post(admin(app.api.portalEmpresa.saveAtributoAtributo))
   app.route("/portal/atributos/atributos/:codigo")
      .all(app.config.passport.authenticate())
      .get(admin(app.api.portalEmpresa.getAtributosAtributos)) /* nessa pega o id_atributo, id referente ao cadastro_atributos */
      .put(admin(app.api.portalEmpresa.saveAtributoAtributo))
      .delete(admin(app.api.portalEmpresa.removeAtributoAtributo))


   app.route("/portal/departamentos")
      .all(app.config.passport.authenticate())
      .post(admin(app.api.portalEmpresa.saveDepartamento))
      .get(admin(app.api.portalEmpresa.getDepartamentosPortal))
   app.route("/portal/departamentos/:codigo_departamento")
      .all(app.config.passport.authenticate())
      .put(admin(app.api.portalEmpresa.saveDepartamento))
}
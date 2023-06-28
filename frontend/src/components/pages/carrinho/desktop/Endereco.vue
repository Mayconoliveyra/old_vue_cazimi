<template>
  <div class="carrinho-endereco">
    <div class="icone-h2">
      <b-icon icon="geo-alt-fill" scale="1.6"></b-icon>
      <h2>INFORMAÇÕES DO SEU PEDIDO</h2>
    </div>
    <div class="usua-ender">
      <div class="infor-cont">
        <div class="titulo-u-e">
          <h4>Dados pessoais</h4>
          <span>Informações do responsável pelo pedido</span>
        </div>
        <ul class="ul-usua-ender">
          <li>
            <b>{{dataUsuario.nome}}</b>
          </li>
          <li>
            <b>Apelido:</b>
            {{dataUsuario.apelido}}
          </li>
          <li>
            <b>CPF/CNPJ:</b>
            {{dataUsuario.cpf_cnpj}}
          </li>
          <li>
            <b>Contato:</b>
            {{dataUsuario.contato}}
          </li>
          <li>
            <b>E-mail:</b>
            {{dataUsuario.email}}
          </li>
          <li>
            <b>CEP:</b>
            {{dataUsuario.cep}}
          </li>
        </ul>
      </div>
      <div class="infor-cont">
        <div class="titulo-u-e">
          <h4>Endereço de entrega</h4>
          <span>Este é o endereço onde seu pedido será entregue</span>
        </div>
        <ul class="ul-usua-ender">
          <li>
            <b>{{dataUsuario.logradouro}}</b>
          </li>
          <li>
            <b>Número:</b>
            {{dataUsuario.numero}}
          </li>
          <li>
            <b>Bairro:</b>
            {{dataUsuario.bairro}}
          </li>
          <li>
            <b>CEP:</b>
            {{dataUsuario.cep}}
          </li>
          <li>
            <b>Cidade:</b>
            {{dataUsuario.localidade}} - {{dataUsuario.uf}}
          </li>
          <li>
            <b>Complemento:</b>
            {{dataUsuario.complemento}}
          </li>
        </ul>
      </div>
    </div>
    <div class="btn-atua-ender">
      <router-link to="/conta/meus-dados">ATUALIZAR INFORMAÇÕES</router-link>
    </div>
  </div>
</template>

<script>
export default {
  nome: "Endereco",
  props: {
    dataUsuario: {},
  },
};
</script>

<style lang="css" scoped>
.carrinho-endereco {
  grid-area: carrinho-endereco;
  background: rgb(255, 255, 255);
  border-radius: 0.25rem;
  margin: 10px 13px 13px 7px; /* NÃO ALTERAR(margin: 10px 13px 13px 7px;) */
  padding: 9px 13px 5px 13px;
}
.usua-ender {
  display: flex;
  width: 100%;
}
.infor-cont {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 2px solid #eae8e8;
  border-right: 2px solid #eae8e8;
  background-color: #fafafb;
  padding: 5px 6px;
  border-radius: 8px;
  margin-right: 1px;
  margin-left: 1px;
}
.titulo-u-e {
  border-bottom: 1px solid rgb(240, 241, 241);
  padding-bottom: 6px;
}
.titulo-u-e h4 {
  font-size: 19px;
  font-weight: 700;
  color: rgb(66, 70, 77);
  margin: 0px;
}
.titulo-u-e span {
  font-size: 13px;
  color: rgb(127, 133, 141);
  font-weight: 400;
}
.ul-usua-ender {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  margin-top: 5px;
  margin-bottom: 2px;
  margin-left: 3px;
}
.ul-usua-ender li {
  font-size: 0.87rem;
  line-height: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
  color: rgb(127, 133, 141);
}
.ul-usua-ender b {
  color: #42464d;
}

.btn-atua-ender {
  margin-top: 7px;
  display: flex;
  justify-content: center;
}
a {
  color: rgb(153, 157, 163);
  font-size: 0.9rem;
  font-weight: 700;
  border: none;
  background: transparent;
  padding: 2px 8px;
}
</style>
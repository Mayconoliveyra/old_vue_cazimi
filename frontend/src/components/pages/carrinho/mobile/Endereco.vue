<template>
  <div class="carrinho-endereco">
    <b @click="toggleEndereco=!toggleEndereco" class="btn-endereco">
      <h1>
        <b-icon icon="geo-alt-fill" class="mr-1" scale="1"></b-icon>ENDEREÇO DE ENTREGA
      </h1>
      <b-icon v-show="!toggleEndereco" icon="chevron-down" scale="1.2"></b-icon>
      <b-icon v-show="toggleEndereco" icon="chevron-up" scale="1.2"></b-icon>
    </b>
    <div v-show="toggleEndereco" @click="toggleEndereco=!toggleEndereco">
      <div class="infor-cont">
        <div class="titulo-u-e">Informações do responsável pelo pedido</div>
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
      <div class="infor-cont mt-1">
        <div class="titulo-u-e">Este é o endereço onde seu pedido será entregue</div>
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
      <div class="btn-atua-ender">
        <router-link to="/conta/meus-dados">ATUALIZAR INFORMAÇÕES</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nome: "Endereco",
  props: {
    dataUsuario: {},
  },
  data() {
    return {
      toggleEndereco: false,
    };
  },
};
</script>

<style lang="css" scoped>
.carrinho-endereco {
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  border-bottom: 1px solid #e6e6e6; /* Padrão */
}
.btn-endereco {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--cor-laranja);
  width: 100%;
  padding: 16px 8px 13px 0px;
}
.btn-endereco > h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0px;
  padding: 0px;
}
.infor-cont {
  display: flex;
  flex-direction: column;
  border-left: 2px solid #eae8e8; /* Padrão */
  border-right: 2px solid #eae8e8; /* Padrão */
  background-color: #fafafb; /* Padrão */
  padding: 1px 2px;
  border-radius: 8px;
}
.titulo-u-e {
  border-bottom: 1px solid #f0f1f1; /* Padrão */
  font-size: 13px;
  color: #7f858d; /* Padrão */
  font-weight: 400;
}
.ul-usua-ender {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 2px;
}
.ul-usua-ender li {
  font-size: 0.87rem;
  line-height: 0.77rem;
  font-weight: 400;
  margin-bottom: 3px;
  color: #7f858d; /* Padrão */
}
.ul-usua-ender b {
  font-size: 0.8rem;
  color: #42464d; /* Padrão */
}
.btn-atua-ender {
  display: flex;
  justify-content: center;
}
a {
  color: #999da3; /* Padrão */
  font-size: 0.9rem;
  font-weight: 700;
  border: none;
  background: transparent;
  padding: 5px 10px;
}
</style>
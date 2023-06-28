<template>
  <div class="cadastrar" @keyup.enter="$emit('cadastrarUsuario')">
    <h2 class="titulo">QUERO ME CADASTRAR</h2>
    <b-form-group>
      <input
        maxlength="191"
        :class="{'input-erro':msgExibir.nome}"
        type="text"
        placeholder="SEU NOME"
        name="cnome"
        autocomplete="off"
        v-model="cadastrar.nome"
      />
      <label v-show="msgExibir.nome" class="msg-exibir-erro">{{msgExibir.nome}}</label>
    </b-form-group>
    <b-form-group>
      <input
        maxlength="60"
        :class="{'input-erro':msgExibir.email}"
        type="text"
        placeholder="EMAIL"
        name="cemail"
        autocomplete="off"
        v-model="cadastrar.email"
      />
      <label v-show="msgExibir.email" class="msg-exibir-erro">{{msgExibir.email}}</label>
    </b-form-group>
    <b-form-group>
      <input
        maxlength="32"
        :class="{'input-erro':msgExibir.senha}"
        type="password"
        placeholder="SENHA"
        name="csenha"
        autocomplete="off"
        v-model="cadastrar.senha"
      />
      <label v-show="msgExibir.senha" class="msg-exibir-erro">{{msgExibir.senha}}</label>
    </b-form-group>
    <b-form-group>
      <input
        maxlength="32"
        :class="{'input-erro':msgExibir.confirmaSenha}"
        type="password"
        placeholder="CONFIRME SUA SENHA"
        name="cconfirmasenha"
        autocomplete="off"
        v-model="cadastrar.confirmaSenha"
      />
      <label v-show="msgExibir.confirmaSenha" class="msg-exibir-erro">{{msgExibir.confirmaSenha}}</label>
    </b-form-group>
    <b-form-group>
      <the-mask
        :mask="['(##) ####-####','(##) #####-####']"
        :class="{'input-erro':msgExibir.contato}"
        type="text"
        placeholder="CONTATO"
        name="ccontato"
        autocomplete="off"
        v-model="cadastrar.contato"
      />
      <label v-show="msgExibir.contato" class="msg-exibir-erro">{{msgExibir.contato}}</label>
    </b-form-group>
    <b-form-group>
      <the-mask
        :mask="['###.###.###-##', '##.###.###/####-##']"
        :class="{'input-erro':msgExibir.cpf_cnpj}"
        type="text"
        placeholder="CPF ou CNPJ"
        name="ccpfcnpj"
        autocomplete="off"
        v-model="cadastrar.cpf_cnpj"
      />
      <label v-show="msgExibir.cpf_cnpj" class="msg-exibir-erro">{{msgExibir.cpf_cnpj}}</label>
    </b-form-group>
    <b-form-group>
      <the-mask
        :mask="'#####-###'"
        :class="{'input-erro':msgExibir.cep}"
        type="text"
        placeholder="CEP"
        name="ccep"
        autocomplete="off"
        v-model="cadastrar.cep"
      />
      <label v-show="msgExibir.cep" class="msg-exibir-erro">{{msgExibir.cep}}</label>
    </b-form-group>
    <button type="button" @click="$emit('cadastrarUsuario')" class="button-cadastrar">CADASTRAR</button>
  </div>
</template>

<script>
export default {
  name: "Cadastrar",
  props: {
    cadastrar: {},
    msgExibir: {},
    telaExibir: String /* C= Cadastrar; L= Login */,
  },
  emits: ["cadastrarUsuario"],
};
</script>

<style lang="css" scoped>
.cadastrar {
  flex: 1;
}
.titulo {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: var(--cor-laranja);
  margin-bottom: 25px;
  margin-top: 25px;
}
input[type="text"],
input[type="password"],
input[type="number"],
input[type="date"],
input[type="tel"],
select,
textarea {
  padding: 0 14px !important;
  height: 44px !important;
  width: 100% !important;
  border: 1px solid #d0d0d0 !important;
  color: #858585 !important;
  border-radius: 2px !important;
  font-size: 0.87em !important;
}
input:focus,
textarea:focus {
  outline: none;
  border: solid 1px var(--cor-laranja) !important;
}
.button-cadastrar {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--cor-laranja);
  background-color: rgb(255, 255, 255);
  user-select: none;
  color: var(--cor-laranja);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
}
</style>
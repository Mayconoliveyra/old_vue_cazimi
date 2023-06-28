<template>
  <div v-if="!usuario.email || !usuario.hash" class="recuperar" @keyup.enter="$emit('recuperar')">
    <h1 class="text">RECUPERAR SENHA</h1>
    <div class="text1">Insira o seu E-mail abaixo para recuperar a sua senha:</div>
    <b-form-group class="mt-4">
      <input
        maxlength="191"
        :class="{'input-erro':msgExibir.email}"
        type="text"
        placeholder="EMAIL"
        name="cemail"
        autocomplete="off"
        v-model="usuario.email"
      />
      <label v-show="msgExibir.email" class="msg-exibir-erro">{{msgExibir.email}}</label>
    </b-form-group>
    <button type="button" @click="$emit('recuperar')" class="button-verde mt-2">RECUPERAR SENHA</button>
  </div>
  <div v-else class="recuperar" @keyup.enter="$emit('cadastrarNovaSenha')">
    <h1 class="text">RECUPERAR SENHA</h1>
    <div class="text1">Preencha os campos abaixo para criar uma nova senha:</div>
    <b-form-group class="mt-4 w-100">
      <input
        maxlength="32"
        :class="{'input-erro':msgExibir.senha}"
        type="password"
        placeholder="DIGITE A NOVA SENHA"
        name="rsenha"
        autocomplete="off"
        v-model="usuario.senha"
      />
      <label v-show="msgExibir.senha" class="msg-exibir-erro">{{msgExibir.senha}}</label>
    </b-form-group>
    <b-form-group class="w-100">
      <input
        maxlength="32"
        :class="{'input-erro':msgExibir.confirmaSenha}"
        type="password"
        placeholder="CONFIRME A NOVA SENHA"
        name="rconfirmasenha"
        autocomplete="off"
        v-model="usuario.confirmaSenha"
      />
      <label v-show="msgExibir.confirmaSenha" class="msg-exibir-erro">{{msgExibir.confirmaSenha}}</label>
    </b-form-group>

    <button
      type="button"
      @click="$emit('cadastrarNovaSenha')"
      class="button-verde mt-2"
    >RECUPERAR SENHA</button>
  </div>
</template>

<script>
export default {
  name: "Mobile",
  props: {
    usuario: {},
    msgExibir: {},
  },
  emits: ["recuperar", "cadastrarNovaSenha"],
};
</script>

<style lang="css" scoped>
.recuperar {
  width: 100%;
  padding: 15px;
}
input[type="text"],
input[type="password"],
input[type="number"],
input[type="date"],
input[type="tel"],
select,
textarea {
  padding: 0 14px !important;
  height: 45px !important;
  width: 100% !important;
  border: 1px solid #d0d0d0 !important;
  color: #858585 !important;
  border-radius: 2px !important;
  font-size: 0.8em !important;
}
.text {
  color: var(--cor-laranja);
  margin-bottom: 2px;
  font-size: 1.2em;
  font-weight: bold;
}
.text1 {
  color: var(--color-font-2);
  font-size: 1em;
}
</style>
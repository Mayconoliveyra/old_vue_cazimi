<template>
  <div class="conta-template">
    <NavConta />
    <div class="t-conteudo">
      <div class="template-exibir" :class="{'displaySection':displayEfeito}">
        <div class="icone-h2">
          <b-icon icon="person-fill" scale="2"></b-icon>
          <h2>MEUS DADOS</h2>
        </div>
        <section>
          <form>
            <div class="titulo-meus-d">
              <b-icon icon="file-earmark-check-fill" scale="1.6"></b-icon>
              <h1>DADOS PESSOAIS</h1>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <input
                    maxlength="191"
                    :class="{'input-erro':msgExibir.nome}"
                    type="text"
                    name="nome"
                    autocomplete="off"
                    v-model="dataUsuario.nome"
                  />
                  <label>Seu nome *</label>
                  <span v-show="msgExibir.nome" class="msg-exibir-erro">{{msgExibir.nome}}</span>
                </div>
              </div>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <input
                    maxlength="60"
                    :class="{'input-erro':msgExibir.apelido}"
                    type="text"
                    name="apelido"
                    autocomplete="off"
                    v-model="dataUsuario.apelido"
                  />
                  <label>Apelido</label>
                </div>
              </div>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <input
                    maxlength="60"
                    :class="{'input-erro':msgExibir.email}"
                    type="text"
                    name="email"
                    disabled
                    autocomplete="off"
                    v-model="dataUsuario.email"
                  />
                  <label>E-mail / Login *</label>
                  <div class="cadeado">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18.333 8.8H16.5622V3.2C16.5622 1.4325 15.07 0 13.2288 0H6.77051C4.92936 0 3.43717 1.4325 3.43717 3.2V8.8H1.66634C1.2054 8.8 0.833008 9.1575 0.833008 9.6V19.2C0.833008 19.6425 1.2054 20 1.66634 20H18.333C18.7939 20 19.1663 19.6425 19.1663 19.2V9.6C19.1663 9.1575 18.7939 8.8 18.333 8.8ZM10.7288 14.725V16.05C10.7288 16.16 10.6351 16.25 10.5205 16.25H9.47884C9.36426 16.25 9.27051 16.16 9.27051 16.05V14.725C9.05554 14.5768 8.89509 14.367 8.81225 14.1257C8.72941 13.8845 8.72845 13.6242 8.80952 13.3823C8.89058 13.1405 9.04949 12.9296 9.26336 12.78C9.47723 12.6304 9.73504 12.5498 9.99967 12.5498C10.2643 12.5498 10.5221 12.6304 10.736 12.78C10.9499 12.9296 11.1088 13.1405 11.1898 13.3823C11.2709 13.6242 11.2699 13.8845 11.1871 14.1257C11.1043 14.367 10.9438 14.5768 10.7288 14.725ZM14.6872 8.8H5.31217V3.2C5.31217 2.4275 5.96582 1.8 6.77051 1.8H13.2288C14.0335 1.8 14.6872 2.4275 14.6872 3.2V8.8Z"
                        fill="#B6BBC2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <the-mask
                    :mask="['###.###.###-##', '##.###.###/####-##']"
                    :class="{'input-erro':msgExibir.cpf_cnpj}"
                    type="text"
                    name="cpfcnpj"
                    disabled
                    autocomplete="off"
                    v-model="dataUsuario.cpf_cnpj"
                  />
                  <label>CPF/CNPJ *</label>
                  <div class="cadeado">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18.333 8.8H16.5622V3.2C16.5622 1.4325 15.07 0 13.2288 0H6.77051C4.92936 0 3.43717 1.4325 3.43717 3.2V8.8H1.66634C1.2054 8.8 0.833008 9.1575 0.833008 9.6V19.2C0.833008 19.6425 1.2054 20 1.66634 20H18.333C18.7939 20 19.1663 19.6425 19.1663 19.2V9.6C19.1663 9.1575 18.7939 8.8 18.333 8.8ZM10.7288 14.725V16.05C10.7288 16.16 10.6351 16.25 10.5205 16.25H9.47884C9.36426 16.25 9.27051 16.16 9.27051 16.05V14.725C9.05554 14.5768 8.89509 14.367 8.81225 14.1257C8.72941 13.8845 8.72845 13.6242 8.80952 13.3823C8.89058 13.1405 9.04949 12.9296 9.26336 12.78C9.47723 12.6304 9.73504 12.5498 9.99967 12.5498C10.2643 12.5498 10.5221 12.6304 10.736 12.78C10.9499 12.9296 11.1088 13.1405 11.1898 13.3823C11.2709 13.6242 11.2699 13.8845 11.1871 14.1257C11.1043 14.367 10.9438 14.5768 10.7288 14.725ZM14.6872 8.8H5.31217V3.2C5.31217 2.4275 5.96582 1.8 6.77051 1.8H13.2288C14.0335 1.8 14.6872 2.4275 14.6872 3.2V8.8Z"
                        fill="#B6BBC2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <the-mask
                    :mask="['(##) ####-####','(##) #####-####']"
                    :class="{'input-erro':msgExibir.contato}"
                    type="text"
                    placeholder="Preferência WhatsApp"
                    name="contato"
                    autocomplete="off"
                    v-model="dataUsuario.contato"
                  />
                  <label>Telefone para contato *</label>
                  <span v-show="msgExibir.contato" class="msg-exibir-erro">{{msgExibir.contato}}</span>
                </div>
              </div>
            </div>
          </form>
          <form>
            <div class="titulo-meus-d">
              <b-icon icon="geo-alt-fill" scale="1.6"></b-icon>
              <h1>ENDEREÇO</h1>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <the-mask
                    :mask="'#####-###'"
                    :class="{'input-erro':msgExibir.cep}"
                    type="text"
                    placeholder="O número precisa ter 8 digitos"
                    name="cep"
                    autocomplete="off"
                    v-model="dataUsuario.cep"
                  />
                  <label>CEP *</label>
                  <span v-show="msgExibir.cep" class="msg-exibir-erro">{{msgExibir.cep}}</span>
                </div>
              </div>
            </div>
            <div class="input-template-sub">
              <div class="input-template-1">
                <div class="input-template-2">
                  <input
                    maxlength="191"
                    :class="{'input-erro':msgExibir.logradouro}"
                    type="text"
                    placeholder="Nome da rua"
                    name="logradouro"
                    autocomplete="off"
                    :disabled="dataUsuario.api_endereco"
                    v-model="dataUsuario.logradouro"
                  />
                  <label>Logradouro *</label>
                  <span
                    v-show="msgExibir.logradouro"
                    class="msg-exibir-erro"
                  >{{msgExibir.logradouro}}</span>
                  <div class="cadeado" v-show="dataUsuario.api_endereco">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18.333 8.8H16.5622V3.2C16.5622 1.4325 15.07 0 13.2288 0H6.77051C4.92936 0 3.43717 1.4325 3.43717 3.2V8.8H1.66634C1.2054 8.8 0.833008 9.1575 0.833008 9.6V19.2C0.833008 19.6425 1.2054 20 1.66634 20H18.333C18.7939 20 19.1663 19.6425 19.1663 19.2V9.6C19.1663 9.1575 18.7939 8.8 18.333 8.8ZM10.7288 14.725V16.05C10.7288 16.16 10.6351 16.25 10.5205 16.25H9.47884C9.36426 16.25 9.27051 16.16 9.27051 16.05V14.725C9.05554 14.5768 8.89509 14.367 8.81225 14.1257C8.72941 13.8845 8.72845 13.6242 8.80952 13.3823C8.89058 13.1405 9.04949 12.9296 9.26336 12.78C9.47723 12.6304 9.73504 12.5498 9.99967 12.5498C10.2643 12.5498 10.5221 12.6304 10.736 12.78C10.9499 12.9296 11.1088 13.1405 11.1898 13.3823C11.2709 13.6242 11.2699 13.8845 11.1871 14.1257C11.1043 14.367 10.9438 14.5768 10.7288 14.725ZM14.6872 8.8H5.31217V3.2C5.31217 2.4275 5.96582 1.8 6.77051 1.8H13.2288C14.0335 1.8 14.6872 2.4275 14.6872 3.2V8.8Z"
                        fill="#B6BBC2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="input-template-1 template-sub">
                <div class="input-template-2">
                  <input
                    maxlength="7"
                    :class="{'input-erro':msgExibir.numero}"
                    type="text"
                    name="numero"
                    autocomplete="off"
                    v-model="dataUsuario.numero"
                  />
                  <label>Número *</label>
                  <span v-show="msgExibir.numero" class="msg-exibir-erro">{{msgExibir.numero}}</span>
                </div>
              </div>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <input
                    maxlength="191"
                    :class="{'input-erro':msgExibir.complemento}"
                    type="text"
                    name="complemento"
                    autocomplete="off"
                    v-model="dataUsuario.complemento"
                  />
                  <label>Complemento</label>
                </div>
              </div>
            </div>
            <div class="input-template">
              <div class="input-template-1">
                <div class="input-template-2">
                  <input
                    maxlength="191"
                    :class="{'input-erro':msgExibir.bairro}"
                    type="text"
                    name="bairro"
                    autocomplete="off"
                    :disabled="dataUsuario.api_endereco"
                    v-model="dataUsuario.bairro"
                  />
                  <label>Bairro *</label>
                  <span v-show="msgExibir.bairro" class="msg-exibir-erro">{{msgExibir.bairro}}</span>
                  <div class="cadeado" v-show="dataUsuario.api_endereco">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18.333 8.8H16.5622V3.2C16.5622 1.4325 15.07 0 13.2288 0H6.77051C4.92936 0 3.43717 1.4325 3.43717 3.2V8.8H1.66634C1.2054 8.8 0.833008 9.1575 0.833008 9.6V19.2C0.833008 19.6425 1.2054 20 1.66634 20H18.333C18.7939 20 19.1663 19.6425 19.1663 19.2V9.6C19.1663 9.1575 18.7939 8.8 18.333 8.8ZM10.7288 14.725V16.05C10.7288 16.16 10.6351 16.25 10.5205 16.25H9.47884C9.36426 16.25 9.27051 16.16 9.27051 16.05V14.725C9.05554 14.5768 8.89509 14.367 8.81225 14.1257C8.72941 13.8845 8.72845 13.6242 8.80952 13.3823C8.89058 13.1405 9.04949 12.9296 9.26336 12.78C9.47723 12.6304 9.73504 12.5498 9.99967 12.5498C10.2643 12.5498 10.5221 12.6304 10.736 12.78C10.9499 12.9296 11.1088 13.1405 11.1898 13.3823C11.2709 13.6242 11.2699 13.8845 11.1871 14.1257C11.1043 14.367 10.9438 14.5768 10.7288 14.725ZM14.6872 8.8H5.31217V3.2C5.31217 2.4275 5.96582 1.8 6.77051 1.8H13.2288C14.0335 1.8 14.6872 2.4275 14.6872 3.2V8.8Z"
                        fill="#B6BBC2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-template-sub">
              <div class="input-template-1">
                <div class="input-template-2">
                  <input
                    maxlength="191"
                    :class="{'input-erro':msgExibir.localidade}"
                    type="text"
                    name="localidade"
                    :disabled="dataUsuario.api_endereco"
                    autocomplete="off"
                    v-model="dataUsuario.localidade"
                  />
                  <label>Cidade *</label>
                  <span
                    v-show="msgExibir.localidade"
                    class="msg-exibir-erro"
                  >{{msgExibir.localidade}}</span>
                  <div class="cadeado" v-show="dataUsuario.api_endereco">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18.333 8.8H16.5622V3.2C16.5622 1.4325 15.07 0 13.2288 0H6.77051C4.92936 0 3.43717 1.4325 3.43717 3.2V8.8H1.66634C1.2054 8.8 0.833008 9.1575 0.833008 9.6V19.2C0.833008 19.6425 1.2054 20 1.66634 20H18.333C18.7939 20 19.1663 19.6425 19.1663 19.2V9.6C19.1663 9.1575 18.7939 8.8 18.333 8.8ZM10.7288 14.725V16.05C10.7288 16.16 10.6351 16.25 10.5205 16.25H9.47884C9.36426 16.25 9.27051 16.16 9.27051 16.05V14.725C9.05554 14.5768 8.89509 14.367 8.81225 14.1257C8.72941 13.8845 8.72845 13.6242 8.80952 13.3823C8.89058 13.1405 9.04949 12.9296 9.26336 12.78C9.47723 12.6304 9.73504 12.5498 9.99967 12.5498C10.2643 12.5498 10.5221 12.6304 10.736 12.78C10.9499 12.9296 11.1088 13.1405 11.1898 13.3823C11.2709 13.6242 11.2699 13.8845 11.1871 14.1257C11.1043 14.367 10.9438 14.5768 10.7288 14.725ZM14.6872 8.8H5.31217V3.2C5.31217 2.4275 5.96582 1.8 6.77051 1.8H13.2288C14.0335 1.8 14.6872 2.4275 14.6872 3.2V8.8Z"
                        fill="#B6BBC2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="input-template-1 template-sub">
                <div class="input-template-2">
                  <input
                    maxlength="7"
                    :class="{'input-erro':msgExibir.uf}"
                    type="text"
                    name="uf"
                    :disabled="dataUsuario.api_endereco"
                    autocomplete="off"
                    v-model="dataUsuario.uf"
                  />
                  <label>UF *</label>
                  <span v-show="msgExibir.uf" class="msg-exibir-erro">{{msgExibir.uf}}</span>
                  <div class="cadeado" v-show="dataUsuario.api_endereco">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18.333 8.8H16.5622V3.2C16.5622 1.4325 15.07 0 13.2288 0H6.77051C4.92936 0 3.43717 1.4325 3.43717 3.2V8.8H1.66634C1.2054 8.8 0.833008 9.1575 0.833008 9.6V19.2C0.833008 19.6425 1.2054 20 1.66634 20H18.333C18.7939 20 19.1663 19.6425 19.1663 19.2V9.6C19.1663 9.1575 18.7939 8.8 18.333 8.8ZM10.7288 14.725V16.05C10.7288 16.16 10.6351 16.25 10.5205 16.25H9.47884C9.36426 16.25 9.27051 16.16 9.27051 16.05V14.725C9.05554 14.5768 8.89509 14.367 8.81225 14.1257C8.72941 13.8845 8.72845 13.6242 8.80952 13.3823C8.89058 13.1405 9.04949 12.9296 9.26336 12.78C9.47723 12.6304 9.73504 12.5498 9.99967 12.5498C10.2643 12.5498 10.5221 12.6304 10.736 12.78C10.9499 12.9296 11.1088 13.1405 11.1898 13.3823C11.2709 13.6242 11.2699 13.8845 11.1871 14.1257C11.1043 14.367 10.9438 14.5768 10.7288 14.725ZM14.6872 8.8H5.31217V3.2C5.31217 2.4275 5.96582 1.8 6.77051 1.8H13.2288C14.0335 1.8 14.6872 2.4275 14.6872 3.2V8.8Z"
                        fill="#B6BBC2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
        <div class="btn-salvar">
          <button v-if="btnAlterar" type="button" @click="$emit('saveEditDados')">SALVAR ALTERAÇÕES</button>
          <button disabled v-else>SALVAR ALTERAÇÕES</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavConta from "../NavConta";

export default {
  name: "ContaDados",
  components: { NavConta },
  props: {
    dataUsuario: {},
    msgExibir: {},
    btnAlterar: Boolean,
    displayEfeito: Boolean,
  },
  emits: ["saveEditDados"],
};
</script>

<style scoped>
.conta-template {
  flex: 1;
  display: flex;
}
.t-conteudo {
  flex: 1;
  display: flex;
  justify-content: center;
}
.template-exibir {
  display: flex;
  flex-direction: column;
  max-width: 1216px;
  width: 100%;
  height: 100%;
  padding: 20px 15px 45px 15px;
}
section {
  display: flex;
  margin-top: 20px;
}
form {
  flex: 1;
  background-color: #ffffff; /* Padrão */
  padding: 20px 15px;
}
form:first-child {
  margin-right: 26px;
}
.titulo-meus-d {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}
.titulo-meus-d h1 {
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  margin: 0px;
  margin-left: 11px;
  padding: 0px;
}
.input-template {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
}
.input-template-1 {
  position: relative;
}
.input-template-2:focus-within {
  outline: none;
  border-color: var(--cor-laranja);
}
input:focus {
  outline: none;
  border-color: var(--cor-laranja);
}
input:focus ~ label {
  color: var(--cor-laranja);
}
input {
  font-size: 0.875rem;
  line-height: 1.5rem;
  width: 100%;
  padding: 10px 13px; /* altura/lagura do input */
  border: solid 1px #adb0b3;
  border-radius: 0.25rem;
}
input ~ label {
  top: 0px;
  left: 0.8125rem;
  background-color: #ffffff;
  padding: 0px 0.2rem;
  font-size: 0.75rem;
  line-height: 1.125rem;
}
input:disabled ~ label {
  color: #b7bcc3;
  opacity: 1;
}
input:disabled {
  color: #b1b6bd;
  opacity: 1;
}
label {
  position: absolute;
  pointer-events: none;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 300ms ease 0s;
  color: #545657;
  font-size: 0.75rem;
  line-height: 1rem;
}
.input-template-sub {
  display: flex;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 0px 15px;
}
.input-template-sub > div:first-child {
  width: 100%;
}
.template-sub {
  margin-left: 1rem;
  width: 90px;
}
.template-sub input {
  width: 90px;
}
.cadeado {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}
input::placeholder {
  color: #c7c9ce;
  font-size: 0.67rem;
}
.btn-salvar {
  display: flex;
  justify-content: center;
}
button {
  width: 300px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--cor-laranja);
  background-color: var(--cor-laranja);
  color: var(--cor-branca);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  margin-top: 15px;
}
button:hover {
  opacity: 80%;
}
button:disabled {
  opacity: 100%;
  border: 1px solid #b6bbc2; /* padrão */
  background-color: #b6bbc2; /* padrão */
  user-select: none;
  color: #ffffff; /* padrão */
}
.displaySection {
  opacity: 20%;
}
</style>
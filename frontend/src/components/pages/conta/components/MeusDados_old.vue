<template>
  <div class="meus-dados">
    <div class="titulo">
      <svg class="mb-2" width="24px" height="24px" viewBox="0 0 20 20" fill="none" color="#FF6500">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.3125 9.6875C14.7188 8.71875 15.625 7.125 15.625 5.3125C15.625 2.375 13.25 0 10.3125 0C7.375 0 5 2.375 5 5.3125C5 7.125 5.90625 8.71875 7.3125 9.6875C4.53125 10.5625 2.5 13.1875 2.5 16.25V20H18.125V16.25C18.125 13.1875 16.0938 10.5625 13.3125 9.6875Z"
          fill="#FF6500"
        />
      </svg>
      <h1>MEUS DADOS</h1>
    </div>
    <section class="dados-endereco">
      <div class="dados-basicos">
        <div class="title-2">
          <svg class="mb-2" width="22" height="24" viewBox="0 0 22 24" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.600098 2.4C0.600098 1.76348 0.852954 1.15303 1.30304 0.702944C1.75313 0.252856 2.36358 0 3.0001 0L16.1313 0L21.4001 5.2688V21.6C21.4001 22.2365 21.1472 22.847 20.6972 23.2971C20.2471 23.7471 19.6366 24 19.0001 24H3.0001C2.36358 24 1.75313 23.7471 1.30304 23.2971C0.852954 22.847 0.600098 22.2365 0.600098 21.6V2.4ZM5.4001 6.3952H16.6001V7.9952H5.4001V6.3952ZM16.6001 11.192H5.4001V12.792H16.6001V11.192ZM16.6001 16H5.4001V17.6H16.6001V16Z"
              fill="#FF6500"
            />
          </svg>
          <h1>DADOS BÁSICOS</h1>
        </div>
        <b-form class="mt-3">
          <div class="sc-duzrYq bopQBZ">
            <div class="sc-iAvgwm kWFmLG">
              <div class="sc-efBctP gOijTC inputForm">
                <input
                  type="text"
                  id="campoNomeDados"
                  name="nome"
                  placeholder="Antônio José da Silva"
                  value="Mayc55on Oliveira"
                />
                <label for="campoNomeDados">Nome completo *</label>
              </div>
            </div>
          </div>
          <b-form-group label="Nome*" label-form="cadastrar-usuario-nome">
            <b-form-input
              id="cadastrar-usuario-nome"
              type="text"
              maxlength="191"
              v-model="cadastroUsuario.nome"
              required
            />
            <div v-show="vld_cadastro_nome" class="validar-input">
              <div>
                <svg
                  class="mr-1"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.613 3.947c-1.444-2.597-3.781-2.594-5.224 0L.614 41.303C-.831 43.9.362 46 3.274 46h41.455c2.902 0 4.102-2.103 2.66-4.697L26.613 3.947zM23.403 32a1.95 1.95 0 01-1.942-1.775l-1.206-13.392A2.6 2.6 0 0122.845 14h2.31a2.6 2.6 0 012.59 2.833l-1.206 13.392A1.95 1.95 0 0124.597 32h-1.194zM20 38c0 2.214 1.77 4 4 4s4-1.786 4-4-1.77-4-4-4-4 1.786-4 4z"
                    fill="#E72626"
                  />
                </svg>
              </div>Por favor, preencha com seu nome completo.
            </div>
          </b-form-group>
          <b-form-group label="E-mail*" label-form="cadastrar-usuario-email">
            <b-form-input
              id="cadastrar-usuario-email"
              type="email"
              v-model="cadastroUsuario.email"
              required
              readonly
            />
          </b-form-group>
          <b-form-group label="Apelido" label-form="cadastrar-usuario-apelido">
            <b-form-input
              id="cadastrar-usuario-apelido"
              type="text"
              maxlength="191"
              v-model="cadastroUsuario.apelido"
              required
            />
          </b-form-group>
          <b-form-group label="CPF*" label-form="cadastrar-usuario-cpf">
            <the-mask
              class="form-control"
              id="cadastrar-usuario-cpf"
              type="text"
              v-model="cadastroUsuario.cpf_cnpj"
              :mask="['###.###.###-##']"
              required
              readonly
            />
          </b-form-group>
          <b-form-group label="Sexo*" v-slot="{ ariaDescribedby }">
            <div class="d-flex">
              <b-form-radio
                class="mr-2"
                v-model="cadastroUsuario.sexo"
                required
                name="Prefiro não informar"
                value="Prefiro não informar"
                :aria-describedby="ariaDescribedby"
              >Prefiro não informar</b-form-radio>
              <b-form-radio
                class="mr-2"
                v-model="cadastroUsuario.sexo"
                required
                name="Masculin"
                value="Masculino"
                :aria-describedby="ariaDescribedby"
              >Masculino</b-form-radio>
              <b-form-radio
                class="mr-2"
                v-model="cadastroUsuario.sexo"
                required
                name="Feminino"
                value="Feminino"
                :aria-describedby="ariaDescribedby"
              >Feminino</b-form-radio>
            </div>
            <div v-show="vld_cadastro_sexo" class="validar-input">
              <div>
                <svg
                  class="mr-1"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.613 3.947c-1.444-2.597-3.781-2.594-5.224 0L.614 41.303C-.831 43.9.362 46 3.274 46h41.455c2.902 0 4.102-2.103 2.66-4.697L26.613 3.947zM23.403 32a1.95 1.95 0 01-1.942-1.775l-1.206-13.392A2.6 2.6 0 0122.845 14h2.31a2.6 2.6 0 012.59 2.833l-1.206 13.392A1.95 1.95 0 0124.597 32h-1.194zM20 38c0 2.214 1.77 4 4 4s4-1.786 4-4-1.77-4-4-4-4 1.786-4 4z"
                    fill="#E72626"
                  />
                </svg>
              </div>Por favor, selecione uma das opções.
            </div>
          </b-form-group>
          <b-form-group label="Data de nascimento*" label-form="cadastrar-usuario-nascimento">
            <the-mask
              class="form-control"
              id="cadastrar-usuario-nascimento"
              type="text"
              v-model="cadastroUsuario.nascimento"
              :mask="['##/##/####']"
              required
            />
            <div v-show="vld_cadastro_nascimento" class="validar-input">
              <div>
                <svg
                  class="mr-1"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.613 3.947c-1.444-2.597-3.781-2.594-5.224 0L.614 41.303C-.831 43.9.362 46 3.274 46h41.455c2.902 0 4.102-2.103 2.66-4.697L26.613 3.947zM23.403 32a1.95 1.95 0 01-1.942-1.775l-1.206-13.392A2.6 2.6 0 0122.845 14h2.31a2.6 2.6 0 012.59 2.833l-1.206 13.392A1.95 1.95 0 0124.597 32h-1.194zM20 38c0 2.214 1.77 4 4 4s4-1.786 4-4-1.77-4-4-4-4 1.786-4 4z"
                    fill="#E72626"
                  />
                </svg>
              </div>Por favor, preencha com sua data de nascimento
            </div>
          </b-form-group>
          <b-form-group label="Telefone para contato" label-form="cadastrar-usuario-telefone">
            <the-mask
              class="form-control"
              pra
              id="cadastrar-usuario-telefone"
              type="text"
              v-model="cadastroUsuario.telefone"
              :mask="['(##) ####-####','(##) #####-####']"
              required
            />
          </b-form-group>
          <b-form-group label="Telefone contato(WhatsApp)*" label-form="cadastrar-usuario-contato">
            <the-mask
              class="form-control"
              pra
              id="cadastrar-usuario-contato"
              type="text"
              v-model="cadastroUsuario.contato"
              :mask="['(##) ####-####','(##) #####-####']"
              required
            />
            <div v-show="vld_cadastro_contato" class="validar-input">
              <div>
                <svg
                  class="mr-1"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.613 3.947c-1.444-2.597-3.781-2.594-5.224 0L.614 41.303C-.831 43.9.362 46 3.274 46h41.455c2.902 0 4.102-2.103 2.66-4.697L26.613 3.947zM23.403 32a1.95 1.95 0 01-1.942-1.775l-1.206-13.392A2.6 2.6 0 0122.845 14h2.31a2.6 2.6 0 012.59 2.833l-1.206 13.392A1.95 1.95 0 0124.597 32h-1.194zM20 38c0 2.214 1.77 4 4 4s4-1.786 4-4-1.77-4-4-4-4 1.786-4 4z"
                    fill="#E72626"
                  />
                </svg>
              </div>Por favor, preencha com seu telefone de contato.
            </div>
          </b-form-group>
        </b-form>
      </div>

      <div class="endereco">
        <div class="title-2">
          <svg class="mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.4243 23.3261L11.986 24L12.585 23.2886C12.6606 23.198 12.7544 23.0951 12.8616 22.9776L12.8617 22.9775C13.0201 22.8039 13.2078 22.5982 13.4087 22.3526L13.5684 22.1709C16.0593 19.3375 20.9719 13.7493 20.9719 8.98596C20.9719 4.04368 16.9282 0 11.986 0C7.04368 0 3 4.04368 3 8.98596C3 13.8908 8.16693 19.6942 10.6755 22.4649C10.8582 22.6933 11.027 22.8799 11.1734 23.0417L11.1734 23.0417L11.1734 23.0418C11.267 23.1452 11.3513 23.2385 11.4243 23.3261ZM7.86719 8.42435C7.86719 10.7083 9.70182 12.5429 11.9858 12.5429C14.2697 12.5429 16.1043 10.7083 16.1043 8.42435C16.1043 6.14042 14.2697 4.30579 11.9858 4.30579C9.70182 4.30579 7.86719 6.14042 7.86719 8.42435Z"
              fill="#FF6500"
            />
          </svg>
          <h1>ENDEREÇOS</h1>
        </div>
        <b-form class="mt-3">
          <b-form-group label="CEP*" label-form="cadastrar-usuario-cep">
            <b-row>
              <b-col class="pr-1" cols="10">
                <the-mask
                  class="form-control"
                  id="cadastrar-usuario-cep"
                  type="text"
                  v-model="cadastroUsuario.cep"
                  :mask="'#####-###'"
                />
              </b-col>
              <b-col class="pl-0" cols="2">
                <button
                  type="button"
                  @click="pesquisaCEP(cadastroUsuario.cep);cadastroUsuario.numero='',cadastroUsuario.complemento=''"
                  class="btn-atualizar-cep"
                >
                  <b-icon icon="arrow-repeat" scale="1.8"></b-icon>
                </button>
              </b-col>
            </b-row>
            <div
              v-show="vld_cadastro_cep_formato_invalido || vld_cadastro_cep"
              class="validar-input"
            >
              <div>
                <svg
                  class="mr-1"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.613 3.947c-1.444-2.597-3.781-2.594-5.224 0L.614 41.303C-.831 43.9.362 46 3.274 46h41.455c2.902 0 4.102-2.103 2.66-4.697L26.613 3.947zM23.403 32a1.95 1.95 0 01-1.942-1.775l-1.206-13.392A2.6 2.6 0 0122.845 14h2.31a2.6 2.6 0 012.59 2.833l-1.206 13.392A1.95 1.95 0 0124.597 32h-1.194zM20 38c0 2.214 1.77 4 4 4s4-1.786 4-4-1.77-4-4-4-4 1.786-4 4z"
                    fill="#E72626"
                  />
                </svg>
              </div>Insira um CEP válido.
            </div>
            <div v-show="vld_cadastro_cep_invalido" class="validar-input">
              <div>
                <svg
                  class="mr-1"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.613 3.947c-1.444-2.597-3.781-2.594-5.224 0L.614 41.303C-.831 43.9.362 46 3.274 46h41.455c2.902 0 4.102-2.103 2.66-4.697L26.613 3.947zM23.403 32a1.95 1.95 0 01-1.942-1.775l-1.206-13.392A2.6 2.6 0 0122.845 14h2.31a2.6 2.6 0 012.59 2.833l-1.206 13.392A1.95 1.95 0 0124.597 32h-1.194zM20 38c0 2.214 1.77 4 4 4s4-1.786 4-4-1.77-4-4-4-4 1.786-4 4z"
                    fill="#E72626"
                  />
                </svg>
              </div>Algo deu errado ao tentar buscar seu CEP, tente novamente mais tarde!
            </div>
          </b-form-group>
          <b-form-group label="Endereço*" label-form="cadastrar-usuario-logradouro">
            <b-form-input
              id="cadastrar-usuario-logradouro"
              type="text"
              v-model="cadastroUsuario.logradouro"
              readonly
            />
          </b-form-group>
          <b-form-group label="Número" label-form="cadastrar-usuario-numero">
            <b-form-input
              id="cadastrar-usuario-numero"
              type="text"
              maxlength="191"
              v-model="cadastroUsuario.numero"
            />
          </b-form-group>
          <b-form-group label="Complemento" label-form="cadastrar-usuario-complemento">
            <b-form-input
              id="cadastrar-usuario-complemento"
              type="text"
              maxlength="50"
              v-model="cadastroUsuario.complemento"
            />
          </b-form-group>
          <b-form-group label="Bairro*" label-form="cadastrar-usuario-bairro">
            <b-form-input
              id="cadastrar-usuario-bairro"
              type="text"
              v-model="cadastroUsuario.bairro"
              readonly
            />
          </b-form-group>
          <b-form-group label="Cidade*" label-form="cadastrar-usuario-cidade">
            <b-form-input
              id="cadastrar-usuario-cidade"
              type="text"
              v-model="cadastroUsuario.localidade"
              readonly
            />
          </b-form-group>
          <b-form-group label="Estado*" label-form="cadastrar-usuario-estado">
            <b-form-input
              id="cadastrar-usuario-estado"
              type="text"
              v-model="cadastroUsuario.uf"
              readonly
            />
          </b-form-group>
        </b-form>
      </div>
    </section>
    <div class="salvar">
      <button @click="salvarAlteracao()">SALVAR ALTERAÇÕES</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, showError, showSucesso } from "../../../../../global";
export default {
  name: "MinhaContaMeusDados",
  data() {
    return {
      cadastroUsuario: {},
      vld_cadastro_cep: false,
      vld_cadastro_cep_formato_invalido: false,
      vld_cadastro_cep_invalido: false,

      vld_cadastro_nome: false,
      vld_cadastro_sexo: false,
      vld_cadastro_nascimento: false,
      vld_cadastro_contato: false,
    };
  },
  methods: {
    loadEnderecoUsuario() {
      const url = `${baseApiUrl}/conta/usuario_endereco/${this.user.codigo_usuario}`;
      axios
        .get(url)
        .then((res) => {
          this.cadastroUsuario = res.data;
        })
        .catch(showError);
    },
    async salvarAlteracao() {
      this.vld_cadastro_cep_formato_invalido = false;
      this.vld_cadastro_cep_invalido = false;
      /* VALIDA SE OS CAMPOS ESTÃO PREENCHIDOS */
      this.vld_cadastro_cep = this.isVazio(this.cadastroUsuario.cep);

      /* Valida se os campos do finalizar cadastro estao preenchidos */
      /*Se algums dos campos do Finaliar cadastratro não tiver valido, a função e retornada antes de chegar ao final */
      this.vld_cadastro_nome = this.isVazio(this.cadastroUsuario.nome);
      if (this.cadastroUsuario.nome)
        this.vld_cadastro_nome = this.validarNome(this.cadastroUsuario.nome);
      this.vld_cadastro_sexo = this.isVazio(this.cadastroUsuario.sexo);
      this.vld_cadastro_nascimento = this.isVazio(
        this.cadastroUsuario.nascimento
      );
      this.vld_cadastro_nascimento = !this.isValidoTamanho(
        this.cadastroUsuario.nascimento,
        8
      );
      this.vld_cadastro_contato = this.isVazio(this.cadastroUsuario.contato);
      this.vld_cadastro_contato = !this.isValidoTamanho(
        this.cadastroUsuario.contato,
        10
      );
      /* Se existe algum dos campos do finalizar cadastro pedente de ser preenchido a função e parada antes de enviar para o backend */
      if (
        this.vld_cadastro_nome |
        this.vld_cadastro_sexo |
        this.vld_cadastro_nascimento |
        this.vld_cadastro_contato
      ) {
        return;
      }
      /* So consulta o cep se o input foi preenchido */
      if (!this.vld_cadastro_cep) {
        await this.pesquisaCEP(this.cadastroUsuario.cep).then(() => {
          /* SÓ FAZ A REQUISIÇÃO SE OS INPUTS TIVER PREENCHIDOS */
          if (
            !this.vld_cadastro_cep &&
            !this.vld_cadastro_cep_formato_invalido &&
            !this.vld_cadastro_cep_invalido
          ) {
            const usuarioModelo = {
              nome: this.cadastroUsuario.nome,
              apelido: this.cadastroUsuario.apelido,
              sexo: this.cadastroUsuario.sexo,
              nascimento: this.cadastroUsuario.nascimento,
              telefone: this.cadastroUsuario.telefone,
              contato: this.cadastroUsuario.contato,
              /* ENDEREÇO/ PREENCHIDO NA FUNÇÃO pesquisaCEP */
              cep: this.cadastroUsuario.cep,
              logradouro: this.cadastroUsuario.logradouro,
              numero: this.cadastroUsuario.numero,
              complemento: this.cadastroUsuario.complemento,
              bairro: this.cadastroUsuario.bairro,
              localidade: this.cadastroUsuario.localidade,
              uf: this.cadastroUsuario.uf,
              ibge: this.cadastroUsuario.ibge,
              finalizarCadastro: true,
            };
            console.log(usuarioModelo);
            axios
              .put(
                `${baseApiUrl}/conta/${this.user.codigo_usuario}`,
                usuarioModelo
              )
              .then(() => {
                showSucesso(
                  "Seu cadastro foi atualizado com sucesso!. <br>Por segurança, será necessário fazer login novamente."
                );
                this.$store.commit("setUser", null);
                this.$store.commit("setCarrinho", null);
                this.$router.push({ path: "/autenticacao" });
              })
              .catch((msg) => {
                showError(msg);
              });
          }
        });
      }
    },
    async pesquisaCEP(valor) {
      this.vld_cadastro_cep_formato_invalido = false;
      this.vld_cadastro_cep_invalido = false;
      this.limparFormularioCep();

      //Nova variável "cep" somente com dígitos.
      let cep = valor.replace(/\D/g, "");

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        delete axios.defaults.headers.common["Authorization"];
        await axios.get(`https://viacep.com.br/ws/${cep}/json`).then((res) => {
          /* SE O ENDEREÕ NAO FOR ENCONTRADO A API RETORNA (ERRO= TRUE) */
          /*  LOGO LIMPO O FORMULARIO E RETORNO OS VALIDADORES DE ERRRO */
          if (res.data.erro) {
            this.vld_cadastro_cep_invalido = true;
            this.limparFormularioCep();
          } else {
            /* SE O ENDEREÇO FOI ENCONTRADO SETA SUAS INFORMAÇÕES */
            this.cadastroUsuario.logradouro = res.data.logradouro;
            this.cadastroUsuario.bairro = res.data.bairro;
            this.cadastroUsuario.localidade = res.data.localidade;
            this.cadastroUsuario.uf = res.data.uf;
            this.cadastroUsuario.ibge = res.data.ibge;
          }
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `bearer ${this.user.token}`;
      } //end if.
      else {
        //cep é inválido.
        this.limparFormularioCep();
        this.vld_cadastro_cep_formato_invalido = true;
      }
    },
    /* Valida se o compo foi preenchido */
    isVazio(valor) {
      if (!valor) {
        return true;
      } else {
        return false;
      }
    },
    isValidoTamanho(valor, tamanho) {
      if (valor) {
        if (valor.toString().length >= tamanho) {
          return true;
        }
        return false;
      }
    },
    validarNome(nome) {
      if (nome.split(" ").length >= 2) {
        return false;
      } else return true;
    },
    limparFormularioCep() {
      //Limpa valores do formulário de cep.
      this.cadastroUsuario.logradouro = "";
      this.cadastroUsuario.bairro = "";
      this.cadastroUsuario.localidade = "";
      this.cadastroUsuario.uf = "";
      this.cadastroUsuario.ibge = "";
    },
  },
  computed: mapState(["user"]),
  created() {
    this.loadEnderecoUsuario();
  },
};
</script>

<style scoped>
.meus-dados {
  width: 100%;
  height: 100%;
}
.titulo {
  display: flex;
  align-items: center;
  width: 100%;
}
.titulo h1 {
  display: flex;
  font-size: 24px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  margin-left: 16px;
}
.dados-endereco {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 28px;
}
.title-2 {
  display: flex;
  align-items: center;
  width: 100%;
}
.title-2 h1 {
  display: flex;
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  margin-left: 11px;
}
.dados-basicos {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.727);
  margin-right: 16px;
  padding: 40px;
}
.endereco {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.727);
  margin-left: 16px;
  padding: 40px;
}
.salvar {
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.salvar button {
  width: 300px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(255, 101, 0);
  background-color: rgb(255, 101, 0);
  user-select: none;
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
}
.btn-atualizar-cep {
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 0px; */

  border: 1px solid rgb(255, 101, 0);
  background-color: rgb(255, 255, 255);
  color: rgb(255, 101, 0);
  border-radius: 0.25rem;
  width: 100%;
  height: 100%;
}
.btn-atualizar-cep:hover {
  cursor: pointer;
  color: rgb(255, 139, 31);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 139, 31);
}
</style>
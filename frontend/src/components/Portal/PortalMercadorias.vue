<template>
  <div class="portal-main">
    <aside class="aside">
      <navPortal />
    </aside>
    <section class="portal-exibir p-2">
      <div class="portal-mercadorias">
        <div class="titulo">
          <b-icon class="mr-1" icon="upc-scan" scale="1.5" style="color:#FF6500;"></b-icon>
          <h1>CADASTRO DE MERCADORIAS</h1>
          <div class="btn-adiconar">
            <button @click="novoCadastro()" type="button">NOVO</button>
          </div>
        </div>

        <div v-if="mode == null" class="mercadorias">
          <div
            v-for="mercadoria in dataMercadorias"
            :key="mercadoria.codigo_mercadoria"
            class="mercadoria-item bloq-selec-text"
            @click="loadMercadoria(mercadoria,'save')"
          >
            <div class="img-nome-codigo">
              <div class="img">
                <b-icon icon="camera" scale="2"></b-icon>
              </div>
              <div class="codigo">#{{mercadoria.codigo_mercadoria}}</div>
              <div class="nome">{{mercadoria.nome_exibir}}</div>
            </div>
            <div class="estoque-preco-outros">
              <div class="estoque">
                <div>
                  Status:
                  <span class="ml-1 text-success" v-if="mercadoria.status">Ativa</span>
                  <span class="ml-1 text-danger" v-else>Desabilitada</span>
                </div>
              </div>
              <div class="preco">
                <div>Preço de venda: {{mercadoria.preco_venda|maskDinheiro}}</div>
              </div>
              <div class="categoria">
                <div>
                  Departamento:
                  {{mercadoria.departamento}}
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-100" v-else>
          <b-form class="form-cadastro">
            <input id="id-mercadoria" type="hidden" v-model="mercadoria.codigo_mercadoria" />
            <b-card no-body class="tbodyCard">
              <b-tabs card pills justified>
                <!-- ####################  DADOS  #################### -->
                <b-tab title="Dados" active class="p-2">
                  <b-row class="m-0">
                    <b-col cols="4">
                      <b-form-group label-size="sm" label="Código" label-form="mercadoria-codigo">
                        <b-form-input
                          id="mercadoria-codigo"
                          type="number"
                          v-model="mercadoria.codigo_mercadoria"
                          disabled
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group label-size="sm" label="Data de Cadastro">
                        <div class="form-control form-control-disabled">
                          <span
                            v-if="mercadoria.cadastrado_em"
                          >{{formatDataDiaMesAnoHoraMin(mercadoria.cadastrado_em)}}</span>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group label-size="sm" label="Última Alteração">
                        <div class="form-control form-control-disabled">
                          <span
                            v-if="mercadoria.alterado_em && mercadoria.alterado_em.toString()!='0000-00-00 00:00:00'"
                          >{{formatDataDiaMesAnoHoraMin(mercadoria.alterado_em)}}</span>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12">
                      <b-form-group
                        label-size="sm"
                        label="Nome do Produto*"
                        label-form="mercadoria-nome"
                      >
                        <b-form-input
                          autocomplete="off"
                          maxlength="120"
                          id="mercadoria-nome"
                          type="text"
                          v-model="mercadoria.nome_exibir"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="6" lg="6">
                      <b-form-group
                        label-size="sm"
                        label="Preço de Custo"
                        label-form="mercadoria-preco-custo"
                      >
                        <money
                          class="form-control"
                          autocomplete="off"
                          id="mercadoria-preco-custo"
                          type="text"
                          v-model="mercadoria.valor_custo"
                          v-bind="maskDinheiroRS"
                          required
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="6" lg="6">
                      <b-form-group
                        label-size="sm"
                        label="Preço de Venda*"
                        label-form="mercadoria-preco-venda"
                      >
                        <money
                          class="form-control"
                          autocomplete="off"
                          id="mercadoria-preco-venda"
                          type="text"
                          v-model="mercadoria.preco_venda"
                          v-bind="maskDinheiroRS"
                          required
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="12">
                      <b-form-group
                        label-size="sm"
                        label="URL Imagem Principal*"
                        label-form="mercadoria-url-principal"
                      >
                        <b-form-input
                          autocomplete="off"
                          id="mercadoria-url-principal"
                          type="text"
                          v-model="mercadoria.url_principal"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="12">
                      <b-form-group
                        label-size="sm"
                        label="Departamento*"
                        label-form="form-mercadoria-departamento"
                      >
                        <b-form-select
                          autocomplete="off"
                          id="form-mercadoria-departamento"
                          @change="alterarDepartamento()"
                          v-model="mercadoria.departamento"
                          required
                        >
                          <option :value="null" disabled>Selecione</option>
                          <option
                            v-for="(option, index) in dataDepartamentos"
                            :value="option"
                            :key="index"
                          >{{ option.departamento }}</option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>

                    <b-col cols="12">
                      <b-form-group label="Descrição" label-form="mercadoria-descricao">
                        <b-form-textarea
                          id="mercadoria-descricao"
                          autocomplete="off"
                          rows="4"
                          v-model="mercadoria.descricao_produto"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group
                        label-size="sm"
                        label="Código de Integração"
                        label-form="mercadoria-codigo"
                      >
                        <b-form-input
                          id="mercadoria-codigo"
                          type="text"
                          maxlength="120"
                          v-model="mercadoria.codigo_integracao"
                          required
                        />
                      </b-form-group>
                    </b-col>

                    <div class="filtro-select">
                      <label>
                        Disponível para venda?
                        <input
                          id="mercadoria-status"
                          type="checkbox"
                          class="desig-input-checkbox"
                          value="true"
                          checked
                          v-model="mercadoria.status"
                        />
                      </label>
                    </div>
                    <div class="filtro-select" v-if="false">
                      <label>
                        Habilitar controle de estoque?
                        <input
                          id="mercadoria-controlar-estoque"
                          type="checkbox"
                          class="desig-input-checkbox"
                          value="true"
                          checked
                          v-model="mercadoria.controlar_estoque"
                        />
                      </label>
                    </div>
                    <div class="filtro-select" v-if="false">
                      <label>
                        Habilitar promoção?
                        <input
                          disabled
                          id="mercadoria-controlar-estoque"
                          type="checkbox"
                          class="desig-input-checkbox"
                          value="true"
                          checked
                          v-model="mercadoria.promocao_ativa"
                        />
                      </label>
                    </div>
                  </b-row>
                </b-tab>
                <!-- #######################  Atributos  #################### -->
                <b-tab title="Atributos" v-if="mercadoria.departamento" class="p-2">
                  <div class="adicionar-atrubuto">
                    <b-form-group
                      label-size="sm"
                      label="Adicionar Atributo"
                      label-form="adicionar-atributo"
                    >
                      <b-input-group>
                        <b-form-select
                          autocomplete="off"
                          id="adicionar-atributo"
                          v-model="tempAddAtributo"
                          required
                        >
                          <option
                            v-for="(option, index) in dataAtributosCabecalho"
                            :value="option.atributo"
                            v-show="!exibirAtributo(option.atributo)"
                            :key="index"
                          >{{ option.atributo }}</option>
                        </b-form-select>
                        <b-input-group-append>
                          <b-button
                            :disabled="!tempAddAtributo"
                            @click="addAtributo()"
                            variant="success"
                          >Adicionar</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </div>
                  <hr />
                  <b-row class="m-0">
                    <b-col
                      cols="12"
                      v-for="(atributo, index) in dataMercadoriaAtributos"
                      :key="index"
                    >
                      <b-form-group
                        label-size="sm"
                        :label="atributo.atributo"
                        :label-form="'mercadoria-atributo-'+atributo.atributo"
                      >
                        <b-input-group>
                          <b-form-select
                            autocomplete="off"
                            :id="'mercadoria-atributo-'+atributo.atributo"
                            v-model="atributo.codigo"
                            size="sm"
                            required
                          >
                            <option :value="null" disabled>Selecione</option>
                            <option
                              v-for="(option, index) in dataAtributos"
                              :value="option.codigo"
                              :key="index"
                              v-show="option.atributo==atributo.atributo"
                            >{{ option.atributo_nome }}</option>
                          </b-form-select>
                          <b-input-group-append>
                            <b-button size="sm" @click="removerAtributo(index)" variant="danger">X</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Estoque" v-if="mercadoria.controlar_estoque" class="p-2"></b-tab>
                <!-- #######################  ESTOQUE / VALORES  #################### -->
                <b-tab title="Promoção" v-if="mercadoria.promocao_ativa" class="p-2"></b-tab>
              </b-tabs>
            </b-card>

            <BtnAcaoSalvarCancelar @salvar="save()" @cancelar="reset()" />
          </b-form>
        </div>
      </div>
    </section>
    <b-modal
      ref="modal-alterar-departamento"
      hide-footer
      id="modal-alterar-departamento"
      size="md"
      title="ALTERAR REGISTRO"
    ></b-modal>
  </div>
</template>
<script>
import moment from "moment";
import { baseApiUrl, showError, showSucesso } from "../../../global";
import navPortal from "./components/navPortal";
import BtnAcaoSalvarCancelar from "./components/BtnAcaoSalvarCancelar";
import axios from "axios";
export default {
  name: "portalMercadorias",
  components: { navPortal, BtnAcaoSalvarCancelar },
  data() {
    return {
      mercadoria: {},
      dataMercadorias: [],
      dataDepartamentos: [],
      dataAtributosCabecalho: [],
      tempAddAtributo: null,
      dataAtributos: [],
      dataMercadoriaAtributos: [],
      mode: null,
      maskDinheiroRS: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        prefix: "R$  ",
        masked: false,
      },
    };
  },
  methods: {
    formatDataDiaMesAnoHoraMin(date) {
      return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
    },
    loadMercadorias() {
      axios
        .get(`${baseApiUrl}/portal/mercadorias`)
        .then((res) => {
          this.dataMercadorias = res.data;
        })
        .catch(showError);
    },
    loadMercadoria(mercadoria, mode = "null") {
      this.mode = mode;
      this.mercadoria = mercadoria;
      this.mercadoria.departamento = {
        codigo_departamento: this.mercadoria.id_departamento,
        departamento: this.mercadoria.departamento,
      };
      /* Limpa o input de adicionar atributo */
      this.tempAddAtributo = null;
      this.loadAtributosMercadoria();
    },
    save() {
      try {
        if (!this.mercadoria.nome_exibir) throw "[Nome do Produto*]";
        if (!this.mercadoria.preco_venda) throw "[Preço de Venda*]";
        if (!this.mercadoria.url_principal) throw "[URL Imagem Principal*]";
        if (!this.mercadoria.departamento) throw "[Departamento*]";
      } catch (msg) {
        showError(msg + " deve ser informado.");
        return;
      }
      const mercadoriaModelo = {
        nome_exibir: this.mercadoria.nome_exibir,
        id_departamento: this.mercadoria.departamento.codigo_departamento,
        valor_custo: this.mercadoria.valor_custo,
        preco_venda: this.mercadoria.preco_venda,
        preco_promocao: this.mercadoria.preco_promocao,
        fim_promocao: this.mercadoria.fim_promocao,
        estoque_disponivel: this.mercadoria.estoque_disponivel,
        quantidade_minima_venda: this.mercadoria.quantidade_minima_venda,
        controlar_estoque: this.mercadoria.controlar_estoque,
        descricao_produto: this.mercadoria.descricao_produto,
        url_principal: this.mercadoria.url_principal,
        codigo_integracao: this.mercadoria.codigo_integracao,
        status: this.mercadoria.status,
        promocao_ativa: this.mercadoria.promocao_ativa,
        dataAtributos: [],
      };

      try {
        for (
          let index = 0;
          index < this.dataMercadoriaAtributos.length;
          index++
        ) {
          if (!this.dataMercadoriaAtributos[index].codigo) {
            throw (
              `Preencha o Atributo:  ` +
              this.dataMercadoriaAtributos[index].atributo
            );
          }
          mercadoriaModelo.dataAtributos.push({
            id_mercadoria: this.mercadoria.codigo_mercadoria
              ? this.mercadoria.codigo_mercadoria
              : null,
            id_atributo: this.dataMercadoriaAtributos[index].codigo,
          });
        }
      } catch (error) {
        showError(error);
        return;
      }
      const id = this.mercadoria.codigo_mercadoria
        ? `/${this.mercadoria.codigo_mercadoria}`
        : "";
      const url = `${baseApiUrl}/portal/mercadorias${id}`;
      const method = this.mercadoria.codigo_mercadoria ? "put" : "post";

      axios[method](url, mercadoriaModelo)
        .then(() => {
          showSucesso("OPERAÇÃO REALIZADA COM SUCESSO.");
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = null;
      this.mercadoria = {};
      this.dataMercadoriaAtributos = [];
      this.loadMercadorias();
      /* Limpa o input de adicionar atributo */
      this.tempAddAtributo = null;
    },
    novoCadastro() {
      this.mercadoria = {};
      this.dataMercadoriaAtributos = [];
      this.mode = "save";
      this.mercadoria = {
        status: true,
        controlar_estoque: false,
        departamento: null,
        promocao_ativa: false,
      };
    },
    loadDepartamentos() {
      axios
        .get(`${baseApiUrl}/portal/mercadoria/departamentos`)
        .then((res) => {
          this.dataDepartamentos = res.data;
        })
        .catch(showError);
    },
    loadAtributosMercadoria() {
      axios
        .get(
          `${baseApiUrl}/portal/mercadoria/atributos/mercadoria/${this.mercadoria.codigo_mercadoria}`
        )
        .then((res) => {
          this.dataMercadoriaAtributos = res.data;
        })
        .catch(showError);
    },
    /* Carrega todos os dados utilizados nos inputs de atributos, ex:Adidas, nike, UND, MT, Vermelho, Azul... (vindo da tabela Atributos) */
    loadDataAtributos() {
      axios
        .get(`${baseApiUrl}/portal/mercadoria/atributos`)
        .then((res) => {
          this.dataAtributos = res.data;
        })
        .catch(showError);
    },
    loadDataAtributosCabecalho() {
      axios
        .get(`${baseApiUrl}/portal/atributos`)
        .then((res) => {
          this.dataAtributosCabecalho = res.data;
        })
        .catch(showError);
    },
    addAtributo() {
      this.dataMercadoriaAtributos.unshift({
        atributo: this.tempAddAtributo,
        codigo: null,
      });
      this.tempAddAtributo = null;
    },
    removerAtributo(index) {
      this.dataMercadoriaAtributos.splice(index, 1);
    },
    /* Adicionar Atributo, so aparece os atributos que ainda nao estao vinculado a mercadoria */
    exibirAtributo(atributo) {
      const tempDataAtributosMercadoria = [];
      this.dataMercadoriaAtributos.forEach((element) => {
        tempDataAtributosMercadoria.push(element.atributo);
      });
      return tempDataAtributosMercadoria.includes(atributo);
    },
    alterarDepartamento() {
      console.log("alterar");
    },
  },
  created() {
    this.loadMercadorias();
    this.loadDepartamentos();
    this.loadDataAtributosCabecalho();
    this.loadDataAtributos();
  },
};
</script>

<style >
.portal-mercadorias {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
  height: 100%;
}
.portal-mercadorias .titulo {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.portal-mercadorias .titulo h1 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 800;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
  padding-left: 5px;
}
.portal-mercadorias .btn-adiconar {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.portal-mercadorias .btn-adiconar button {
  width: 190px;
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
.portal-mercadorias .mercadorias {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px;
  padding: 1rem;
  width: 100% !important;
}
.portal-mercadorias .mercadoria-item {
  border: solid 1px rgb(208, 207, 207);
  padding: 5px;
  margin-bottom: 13px;
  border-radius: 5px;
}
.portal-mercadorias .mercadoria-item:hover {
  cursor: pointer;
}

.portal-mercadorias .img-nome-codigo {
  width: 100%;
  display: flex;
  height: 39px;
}
.portal-mercadorias .img-nome-codigo .img {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.portal-mercadorias .img-nome-codigo .codigo {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px 0px 10px;
}
.portal-mercadorias .img-nome-codigo .nome {
  flex: 1;
  /* border: solid 1px royalblue; */
  margin: 0px;
  height: 100%;
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: rgba(66, 70, 77, 0.753);
  /* ADICIONA (...) SE O TEXTO FOR MAIOR QUE A DIV */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.portal-mercadorias .estoque-preco-outros {
  width: 100%;
  display: flex;
  height: 23px;
  /* border-top: solid 1px rgb(228, 224, 224); */
  /* margin-top: 3px; */
  font-size: 13.3px;
  padding: 3px;
}
.portal-mercadorias .estoque-preco-outros .estoque {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.portal-mercadorias .estoque-preco-outros .preco {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-right: 5px;
}
.portal-mercadorias .estoque-preco-outros .outros {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-right: 5px;
}
.portal-mercadorias .estoque-preco-outros .categoria {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.portal-mercadorias .form-cadastro {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px;
  padding: 1rem;
  width: 100% !important;
  border-radius: 5px;
  padding: 5px;
  height: 100%;
}
.portal-mercadorias .form-cadastro legend {
  font-weight: 600;
  font-size: 14px;
  color: rgb(105, 105, 105);
  margin-bottom: 0px;
  margin-left: 2px;
}
.portal-mercadorias .nav-link {
  color: rgb(0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.213);
  margin: 2px 2px;
}

.portal-mercadorias .filtro-select {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-right: 16px;
  width: 100%;
}
.portal-mercadorias .filtro-select label {
  line-height: 1.8rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 270px;
  font-weight: 600;
  font-size: 15px;
  color: rgb(105, 105, 105);
}
.portal-mercadorias .filtro-select input {
  flex-shrink: 0;
}
.portal-mercadorias .desig-input-checkbox {
  appearance: none;
  position: relative;
  background: rgb(182, 187, 194);
  width: 70px;
  height: 20px;
  border-radius: 0.4375rem;
  cursor: pointer;
}
.portal-mercadorias .desig-input-checkbox::after {
  position: absolute;
  content: "";
  width: 25px;
  height: 25px;
  background: rgb(242, 243, 244);
  box-shadow: rgb(0 0 0 / 12%) 0px 0px 1px, rgb(0 0 0 / 25%) 0px 1px 1px;
  border-radius: 50%;
  left: -3px;
  top: -3px;
  transition: background 200ms ease 0s, left 200ms ease 0s;
  will-change: background, left;
}
.portal-mercadorias .desig-input-checkbox:checked {
  background: rgb(255, 169, 115);
}
.portal-mercadorias .desig-input-checkbox:checked::after {
  background: rgb(255, 101, 0);
  left: 47px;
}
.portal-mercadorias .form-control-disabled {
  background-color: #e9ecef;
  opacity: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.portal-mercadorias .nav-item {
  margin: 0px 2px;
}
.portal-mercadorias .nav-item a {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(255, 101, 0);
  background-color: rgb(255, 255, 255);
  user-select: none;
  color: #ff6500;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
}
.portal-mercadorias .nav-item .active {
  background-color: rgb(255, 101, 0) !important;
}
</style>

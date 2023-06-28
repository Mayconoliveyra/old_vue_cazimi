<template>
  <div class="portal-main">
    <aside class="aside">
      <navPortal />
    </aside>
    <section class="portal-exibir p-2">
      <div class="portal-departamentos">
        <div class="titulo">
          <b-icon class="mr-1" icon="diagram3-fill" scale="1.5" style="color:#FF6500;"></b-icon>
          <h1>CADASTRO DE DEPARTAMENTOS</h1>
          <div class="btn-adiconar">
            <button
              @click="departamento={}; departamentoAtributos=[]; departamentoAtributo={}; departamento.status=true; mode='save'"
              type="button"
            >NOVO</button>
          </div>
        </div>
        <div v-if="mode == null" class="departamentos">
          <div
            v-for="departamento in dataDepartamentos"
            :key="departamento.codigo_departamento"
            class="departamento-item bloq-selec-text"
            @click="loadDepartamento(departamento,'save')"
          >
            <div class="nome-codigo">
              <div class="codigo">#{{departamento.codigo_departamento}}</div>
              <div class="nome">{{departamento.departamento}}</div>
            </div>
            <div class="status-outros">
              <div class="status-info">
                <div>
                  Status:
                  <span class="ml-1 text-success" v-if="departamento.status">Ativo</span>
                  <span class="ml-1 text-danger" v-else>Desabilitado</span>
                </div>
              </div>
              <div class="status-info">
                <div>
                  Path:
                  {{departamento.path}}
                </div>
              </div>
              <div class="status-info">
                <div>
                  Data de Cadastro:
                  {{
                  formatDataDiaMesAnoHoraMin(departamento.cadastrado_em)
                  }}
                </div>
              </div>
              <div class="status-info">
                <div v-if="departamento.alterado_em.toString()!='0000-00-00 00:00:00'">
                  Última alteração:
                  {{formatDataDiaMesAnoHoraMin(departamento.alterado_em)}}
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-100" v-else>
          <b-form class="form-cadastro">
            <input id="id-departamento" type="hidden" v-model="departamento.codigo_departamento" />
            <b-row class="m-0 mt-2">
              <b-col cols="4">
                <b-form-group label-size="sm" label="Código" label-form="departamento-codigo">
                  <b-form-input
                    id="departamento-codigo"
                    type="number"
                    v-model="departamento.codigo_departamento"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label-size="sm" label="Data de Cadastro">
                  <div class="form-control form-control-disabled">
                    <span
                      v-if="departamento.codigo_departamento"
                    >{{formatDataDiaMesAnoHoraMin(departamento.cadastrado_em)}}</span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label-size="sm" label="Última Alteração">
                  <div class="form-control form-control-disabled">
                    <span
                      v-if="departamento.codigo_departamento && departamento.alterado_em.toString()!='0000-00-00 00:00:00'"
                    >{{formatDataDiaMesAnoHoraMin(departamento.alterado_em)}}</span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label-size="sm"
                  label="Nome do Departamento*"
                  label-form="departamento-nome"
                >
                  <b-form-input
                    autocomplete="off"
                    maxlength="30"
                    id="departamento-nome"
                    type="text"
                    v-model="departamento.departamento"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-size="sm" label="Path" label-form="departamento-path">
                  <b-form-input
                    maxlength="190"
                    id="departamento-path"
                    type="text"
                    v-model="departamento.path"
                    disabled
                  />
                </b-form-group>
              </b-col>

              <div class="filtro-select">
                <label>
                  Habilitado?
                  <input
                    id="departamento-status"
                    type="checkbox"
                    class="desig-input-checkbox"
                    value="true"
                    checked
                    v-model="departamento.status"
                  />
                </label>
              </div>
            </b-row>
            <BtnAcaoSalvarCancelar @salvar="save()" @cancelar="reset()" />
          </b-form>
        </div>
        <b-modal
          ref="modal-remover-atributo"
          hide-footer
          id="modal-remover-atributo"
          size="md"
          title="EXCLUIR REGISTRO"
        >
          <ModalConfirmacao
            mensagem="O atributo será desvinculado do departamento e das mercadorias refente a esté departamento."
            @cancelar="$refs['modal-remover-atributo'].hide()"
            @confirmar="removerDepartamentoAtributo(); $refs['modal-remover-atributo'].hide()"
          />
        </b-modal>
      </div>
    </section>
  </div>
</template>
<script>
import moment from "moment";
import { baseApiUrl, showError, showSucesso } from "../../../global";
import navPortal from "./components/navPortal";
import BtnAcaoSalvarCancelar from "./components/BtnAcaoSalvarCancelar";
import ModalConfirmacao from "./components/ModalConfirmacao";
import axios from "axios";
export default {
  name: "portaldepartamentos",
  components: { navPortal, BtnAcaoSalvarCancelar, ModalConfirmacao },
  data() {
    return {
      departamento: {},
      dataDepartamentos: [],
      mode: null,
    };
  },
  methods: {
    formatDataDiaMesAnoHoraMin(date) {
      return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
    },
    loadDepartamentos() {
      axios
        .get(`${baseApiUrl}/portal/departamentos`)
        .then((res) => {
          this.dataDepartamentos = res.data;
        })
        .catch(showError);
    },
    loadDepartamento(departamento, mode = "null") {
      this.mode = mode;
      this.departamento = departamento;
    },
    save() {
      try {
        if (!this.departamento.departamento) throw "[Nome do Departamento*]";
      } catch (msg) {
        showError(msg + " deve ser informado.");
        return;
      }
      const departamentoModelo = {
        departamento: this.departamento.departamento,
        status: this.departamento.status,
      };

      const id = this.departamento.codigo_departamento
        ? `/${this.departamento.codigo_departamento}`
        : "";
      const url = `${baseApiUrl}/portal/departamentos${id}`;
      const method = this.departamento.codigo_departamento ? "put" : "post";

      axios[method](url, departamentoModelo)
        .then(() => {
          showSucesso("OPERAÇÃO REALIZADA COM SUCESSO.");
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = null;
      this.departamento = {};
      this.loadDepartamentos();
    },
  },
  created() {
    this.loadDepartamentos();
  },
};
</script>

<style >
.portal-departamentos {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
  height: 100%;
}
.portal-departamentos .titulo {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.portal-departamentos .titulo h1 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 800;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
  padding-left: 5px;
}
.portal-departamentos .btn-adiconar {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.portal-departamentos .btn-adiconar button {
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

.portal-departamentos .departamentos {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px;
  padding: 1rem;
  width: 100% !important;
}
.portal-departamentos .departamento-item {
  border: solid 1px rgb(208, 207, 207);
  padding: 5px;
  margin-bottom: 13px;
  border-radius: 5px;
}
.portal-departamentos .departamento-item:hover {
  cursor: pointer;
}

.portal-departamentos .nome-codigo {
  width: 100%;
  display: flex;
  height: 39px;
}
.portal-departamentos .nome-codigo .codigo {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px 0px 10px;
}
.portal-departamentos .nome-codigo .nome {
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

.portal-departamentos .status-outros {
  width: 100%;
  display: flex;
  height: 25px;
  font-size: 13.3px;
  padding: 2px;
}

.portal-departamentos .status-outros .status-info {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-right: 5px;
}

.portal-departamentos .form-cadastro {
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
.portal-departamentos .form-cadastro legend {
  font-weight: 600;
  font-size: 14px;
  color: rgb(105, 105, 105);
  margin-bottom: 0px;
  margin-left: 2px;
}

.portal-departamentos .filtro-select {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-right: 16px;
  width: 100%;
}
.portal-departamentos .filtro-select label {
  line-height: 1.8rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 270px;
  font-weight: 600;
  font-size: 15px;
  color: rgb(105, 105, 105);
}
.portal-departamentos .filtro-select input {
  flex-shrink: 0;
}
.portal-departamentos .desig-input-checkbox {
  appearance: none;
  position: relative;
  background: rgb(182, 187, 194);
  width: 70px;
  height: 20px;
  border-radius: 0.4375rem;
  cursor: pointer;
}
.portal-departamentos .desig-input-checkbox::after {
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
.portal-departamentos .desig-input-checkbox:checked {
  background: rgb(255, 169, 115);
}
.portal-departamentos .desig-input-checkbox:checked::after {
  background: rgb(255, 101, 0);
  left: 47px;
}
.portal-departamentos .form-control-disabled {
  background-color: #e9ecef;
  opacity: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

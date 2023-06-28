<template>
  <div class="portal-main">
    <aside class="aside">
      <navPortal />
    </aside>
    <section class="portal-exibir p-2">
      <div class="portal-atributos">
        <div class="titulo">
          <b-icon icon="diagram2-fill" scale="1.5" style="color:#FF6500;"></b-icon>
          <h1>CADASTRO DE ATRIBUTOS</h1>
          <div class="btn-adiconar">
            <button @click="atributo={}, mode='save'" type="button">NOVO</button>
          </div>
        </div>
        <div v-if="mode == null" class="atributos">
          <div
            v-for="atributo in dataAtributos"
            :key="atributo.codigo_atributo"
            class="atributo-item bloq-selec-text"
            @click="loadAtributo(atributo,'save')"
          >
            <div class="nome-codigo">
              <div class="codigo">#{{atributo.codigo_atributo}}</div>
              <div class="nome">{{atributo.atributo}}</div>
            </div>
          </div>
        </div>
        <div class="h-100" v-else>
          <b-form class="form-cadastro">
            <input id="id-atributo" type="hidden" v-model="atributo.codigo_atributo" />
            <b-row class="m-0 mt-2">
              <b-col cols="12">
                <b-form-group label-size="sm" label="Código" label-form="atributo-codigo">
                  <b-form-input
                    id="atributo-codigo"
                    type="number"
                    v-model="atributo.codigo_atributo"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-size="sm" label="Nome do Atributo*" label-form="atributo-nome">
                  <b-form-input
                    autocomplete="off"
                    maxlength="30"
                    id="atributo-nome"
                    type="text"
                    v-model="atributo.atributo"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- ATRIBUTOS -->
            <div class="atributo-atributos" v-if="atributo.codigo_atributo">
              <div>
                <h2 class="atributos-h2">ATRIBUTOS</h2>
              </div>
              <div class="atributo-atributos-adicionar">
                <b-row>
                  <input id="id-atributo-atributo" type="hidden" v-model="atributoAtributo.codigo" />
                  <b-col class="pr-1" cols="5">
                    <b-form-input
                      autocomplete="off"
                      size="sm"
                      id="atributo-atributo-nome"
                      type="text"
                      maxlength="30"
                      v-model="atributoAtributo.atributo_nome"
                    />
                  </b-col>
                  <div v-if="!atributoAtributo.codigo">
                    <button
                      @click="saveAtributoAtributo()"
                      type="button"
                      :class="{'btn-adicionar-atributo':true,'btn-desabilitado':!atributoAtributo.atributo_nome}"
                      :disabled="!atributoAtributo.atributo_nome"
                    >ADICIONAR</button>
                  </div>
                  <div v-if="atributoAtributo.codigo">
                    <button
                      @click="saveAtributoAtributo()"
                      type="button"
                      class="btn-adicionar-atributo"
                    >SALVAR</button>
                  </div>
                  <div v-if="atributoAtributo.codigo">
                    <button
                      @click="resetLoadAtributoAtributo()"
                      type="button"
                      class="btn-adicionar-atributo ml-2 bg-warning"
                    >CANCELAR</button>
                  </div>
                  <div v-if="atributoAtributo.codigo">
                    <button
                      @click="removerAtributoAtributo()"
                      type="button"
                      class="btn-adicionar-atributo ml-2 bg-danger"
                    >EXCLUIR</button>
                  </div>
                </b-row>
              </div>
              <div class="atributo-atributos-1">
                <b-row>
                  <b-col
                    class="pr-1 mb-2"
                    cols="12"
                    md="6"
                    xl="4"
                    v-for="(atributo, index) in dataAtributosAtributos"
                    :key="atributo.codigo"
                  >
                    <div
                      @click="loadAtributoAtributo(atributo)"
                      class="form-control-atributos-atributos"
                    >{{index+1}} - {{atributo.atributo_nome}}</div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <BtnAcaoSalvarCancelar @salvar="save()" @cancelar="reset()" />
          </b-form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { baseApiUrl, showError, showSucesso } from "../../../global";
import navPortal from "./components/navPortal";
import BtnAcaoSalvarCancelar from "./components/BtnAcaoSalvarCancelar";
import axios from "axios";
export default {
  name: "portalAtributos",
  components: { navPortal, BtnAcaoSalvarCancelar },
  data() {
    return {
      atributo: {},
      atributoAtributo: {},
      dataAtributos: [],
      dataAtributosAtributos: [],
      mode: null,
    };
  },
  methods: {
    loadAtributos() {
      axios
        .get(`${baseApiUrl}/portal/atributos`)
        .then((res) => {
          this.dataAtributos = res.data;
        })
        .catch(showError);
    },
    loadAtributo(atributo, mode = "null") {
      this.mode = mode;
      this.atributo = atributo;
      this.resetLoadAtributoAtributo();
    },
    save() {
      try {
        if (!this.atributo.atributo) throw "[Nome do Atributo*]";
      } catch (msg) {
        showError(msg + " deve ser informado.");
        return;
      }
      const atributoModelo = {
        atributo: this.atributo.atributo,
      };

      const id = this.atributo.codigo_atributo
        ? `/${this.atributo.codigo_atributo}`
        : "";
      const url = `${baseApiUrl}/portal/atributos${id}`;
      const method = this.atributo.codigo_atributo ? "put" : "post";

      axios[method](url, atributoModelo)
        .then(() => {
          showSucesso("OPERAÇÃO REALIZADA COM SUCESSO.");
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = null;
      this.atributo = {};
      this.loadAtributos();
    },
    loadAtributoAtributo(atributo) {
      this.atributoAtributo = atributo;
    },
    saveAtributoAtributo() {
      const atributoAtibutoModelo = {
        atributo_nome: this.atributoAtributo.atributo_nome,
        id_atributo: this.atributo.codigo_atributo,
      };
      const id = this.atributoAtributo.codigo
        ? `/${this.atributoAtributo.codigo}`
        : "";
      const url = `${baseApiUrl}/portal/atributos/atributos${id}`;
      const method = this.atributoAtributo.codigo ? "put" : "post";

      axios[method](url, atributoAtibutoModelo)
        .then(() => {
          this.resetLoadAtributoAtributo();
        })
        .catch(showError);
    },
    resetLoadAtributoAtributo() {
      this.atributoAtributo = {};
      axios
        .get(
          `${baseApiUrl}/portal/atributos/atributos/${this.atributo.codigo_atributo}`
        )
        .then((res) => {
          this.dataAtributosAtributos = res.data;
        })
        .catch(showError);
    },
    removerAtributoAtributo() {
      axios
        .delete(
          `${baseApiUrl}/portal/atributos/atributos/${this.atributoAtributo.codigo}`
        )
        .then(() => {
          this.resetLoadAtributoAtributo();
        })
        .catch(showError);
    },
  },
  created() {
    this.loadAtributos();
  },
};
</script>

<style >
.portal-atributos {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
  height: 100%;
}
.portal-atributos .titulo {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.portal-atributos .titulo h1 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 800;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
  padding-left: 5px;
}
.portal-atributos .btn-adiconar {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.portal-atributos .btn-adiconar button {
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
.portal-atributos .atributos {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px;
  padding: 1rem;
  width: 100% !important;
}
.portal-atributos .atributo-item {
  border: solid 1px rgb(208, 207, 207);
  padding: 5px;
  margin-bottom: 13px;
  border-radius: 5px;
}
.portal-atributos .atributo-item:hover {
  cursor: pointer;
}

.portal-atributos .nome-codigo {
  width: 100%;
  display: flex;
  height: 35px;
}
.portal-atributos .nome-codigo .codigo {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px 0px 10px;
}
.portal-atributos .nome-codigo .nome {
  flex: 1;
  /* border: solid 1px royalblue; */
  margin: 0px;
  height: 100%;
  font-size: 0.975rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: rgba(66, 70, 77, 0.753);
  /* ADICIONA (...) SE O TEXTO FOR MAIOR QUE A DIV */
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.portal-atributos .form-cadastro {
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
.portal-atributos .form-cadastro legend {
  font-weight: 600;
  font-size: 14px;
  color: rgb(105, 105, 105);
  margin-bottom: 0px;
  margin-left: 2px;
}

.portal-atributos .atributo-atributos {
  margin: 15px;
  margin-top: 7px;
  padding: 5px;
}
.portal-atributos .atributos-h2 {
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(105, 105, 105);
  margin-bottom: 5px;
}
.portal-atributos .atributo-atributos-1 {
  padding: 10px;
}

.portal-atributos .atributo-atributos-adicionar {
  border: solid 1px rgba(194, 190, 190, 0.439);
  padding: 10px;
  border-radius: 5px;
}
.portal-atributos .btn-adicionar-atributo {
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: rgb(255, 101, 0);
  color: rgb(255, 255, 255);
  border-radius: 0.25rem;
  width: 100%;
  height: 100%;
  width: 110px;
}

.portal-atributos .form-control-atributos-atributos {
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  color: #495057;
  background-color: rgba(237, 236, 236, 0.919);
  background-clip: padding-box;
  border: 1px solid #ced4da;
  cursor: pointer;
}
</style>

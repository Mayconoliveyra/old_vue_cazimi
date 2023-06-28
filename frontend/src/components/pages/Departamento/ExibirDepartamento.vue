<template>
  <article class="departamento bloq-selec-text">
    <section class="departamento-exibir">
      <aside class="aside">
        <div class="filtros">
          <span>Filtrar por:</span>
          <div class="filtros-1">
            <details
              v-for="atributo in atributos"
              :key="atributo.atributo"
              class="w-100"
              :data-ic-section="'filtros-' + atributo.atributo"
              open
            >
              <summary :data-ic-title="'filtros-' + atributo.atributo">{{ atributo.atributo }}</summary>
              <div class="filtro-select">
                <div v-for="(atributosData, index) in dataAtributos" :key="index">
                  <label v-if="atributosData.atributo == atributo.atributo">
                    <input
                      v-model="dataFiltros"
                      @change="loadMercadoriaFiltros()"
                      type="checkbox"
                      height="10"
                      width="24"
                      class="desig-input-2"
                      :value="{atributo:atributosData.atributo, dataAtributo:atributosData.atributo_nome}"
                    />
                    {{ atributosData.atributo_nome }}
                  </label>
                </div>
              </div>
            </details>
          </div>
        </div>
      </aside>
      <div class="exibir-item">
        <div class="ordenar">
          <label>
            Ordenar
            <select @change="loadMercadoriaFiltros()" v-model="order">
              <option value="preco_venda ASC">Preço crescente</option>
              <option value="preco_venda DESC">Preço decrescente</option>
              <option value="codigo_mercadoria DESC">Mais recentes</option>
            </select>
          </label>
          <label class="ml-3">
            Exibir
            <select @change="loadMercadoriaFiltros()" v-model="limit">
              <option value="20">20 por exibição</option>
              <option value="40">40 por exibição</option>
              <option value="60">60 por exibição</option>
              <option value="80">80 por exibição</option>
              <option value="100">100 por exibição</option>
            </select>
          </label>
        </div>
        <main class="itens-container">
          <CardMercadoria
            class="w-100"
            v-for="mercadoria in dataMercadorias"
            :key="mercadoria.codigo_mercadoria"
            :mercadoria="mercadoria"
          />
        </main>
        <div class="carregar-mais-mercadorias">
          <button
            v-if="totalProdutos > dataMercadorias.length"
            @click="carregarMaisMercadoria()"
          >VER MAIS</button>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";
import CardMercadoria from "../../home/desktop/CardMercadoria";
export default {
  name: "Departamento",
  components: { CardMercadoria },
  data() {
    return {
      dataMercadorias: [],
      atributos: [],
      dataAtributos: [],
      dataFiltros: [],
      page: 1,
      order: "codigo_mercadoria DESC",
      limit: 20,
      totalProdutos: 0,
    };
  },
  methods: {
    loadMercadorias() {
      const urlMaisVendidos = `${baseApiUrl}/mercadorias/${this.$route.params.departamento.replace(
        "/",
        ""
      )}?page=1&limit=${this.limit}&order=${this.order}`;
      axios
        .put(urlMaisVendidos)
        .then((res) => {
          this.dataMercadorias = res.data.mercadorias;
          this.dataAtributos = res.data.dataAtributos;
          this.atributos = res.data.atributos;
          this.totalProdutos = res.data.total_produtos;
        })
        .catch(showError);
    },
    loadMercadoriaFiltros() {
      if (this.dataFiltros.length > 0) {
        this.page = 1;
        /* RETIRA O '/'  no momento solicitar a requição pra retirar as mercadoria */
        const urlMaisVendidos = `${baseApiUrl}/mercadorias/${this.$route.params.departamento.replace(
          "/",
          ""
        )}/?page=${this.page}&limit=${this.limit}&order=${this.order}`;
        axios
          .put(urlMaisVendidos, this.dataFiltros)
          .then((res) => {
            this.dataMercadorias = res.data.mercadorias;
            this.totalProdutos = res.data.total_produtos;
          })
          .catch(showError);
      } else {
        this.loadMercadorias();
      }
    },
    carregarMaisMercadoria() {
      if (this.page == 1) {
        this.page = 2;
      } else {
        this.page++;
      }
      if (this.dataFiltros.length > 0) {
        const urlMaisVendidos = `${baseApiUrl}/mercadorias/${this.$route.params.departamento.replace(
          "/",
          ""
        )}/?filtros=${JSON.stringify(this.dataFiltros)}&page=${
          this.page
        }&limit=${this.limit}&order=${this.order}`;
        axios
          .put(urlMaisVendidos)
          .then((res) => {
            this.dataMercadorias = this.dataMercadorias.concat(
              res.data.mercadorias
            );
          })
          .catch(showError);
      } else {
        const urlMaisVendidos = `${baseApiUrl}/mercadorias/${this.$route.params.departamento.replace(
          "/",
          ""
        )}/?page=${this.page}&limit=${this.limit}&order=${this.order}`;
        axios
          .put(urlMaisVendidos)
          .then((res) => {
            this.dataMercadorias = this.dataMercadorias.concat(
              res.data.mercadorias
            );
          })
          .catch(showError);
      }
    },
  },
  created() {
    this.loadMercadorias();
  },
  watch: {
    "$route.params.departamento": {
      handler: function () {
        this.page = 1;
        this.dataFiltros = [];
        this.loadMercadorias();
      },
    },
  },
};
</script>

<style scoped>
.departamento {
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.departamento-exibir {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 240px 1fr;
  grid-template-areas: "aside exibir-item";
  height: 100%;
  width: 100%;
  max-width: 1248px;
}
.aside {
  grid-area: aside;
  height: 100%;
  z-index: 100;
  /*   border: solid 1px red; */
  margin-right: 20px;
}
.exibir-item {
  display: grid;
  grid-area: exibir-item;
  height: 100%;
}
.itens-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(208px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}
.ordenar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(182, 187, 194);
  padding-bottom: 1rem;
  width: 100%;
}
.ordenar label {
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 700;
  color: rgb(66, 70, 77);
}
.ordenar select {
  font-size: 0.875rem;
  line-height: 1.5rem;
  background-color: #ffffff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAKCAYAAABrGwT5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC2SURBVHgBpc8xCsIwFAbg/6Xo7OjWdtDBySNEUXGokCPoSexRvIKDk2DxBK4ioj1CRgfbZ1tRUjWl4D9kCPn+vAdkkVK1UDPmWyHHs7loJgc5VV4dSI17JCdBWGDB7ALsiTSJqgpekAj9pwGc6+W09/0uQFDErNxObx2fj9oGwbzabTeLAudHVYEN5iHzh+EoWEIgzK7jVDgD3KBt8At/FjCztsH32GZKKxDaNvgTlwrAsQ3+nQeY02Y0uvQN4QAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-position: right 16px center;
  border-radius: 0.25rem;
  padding: 0.75rem 3rem 0.75rem 1rem;
  margin-left: 0.5rem;
  appearance: none;
  border: none;
}
.ordenar select:focus {
  outline-style: none !important;
  box-shadow: 0 0 0 0 !important;
  outline: 0 !important;
}
.filtros {
  display: flex;
  flex-direction: column;
}
.filtros > span {
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: rgb(66, 70, 77);
  margin-bottom: 1rem;
}
.filtros-1 {
  padding: 0.5rem 0px;
  border-radius: 0.25rem;
  background: rgb(255, 255, 255);
}
.filtros-1 summary {
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 700;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.25rem 2.5rem 0.25rem 1rem;
  color: rgb(86, 92, 105);
  cursor: pointer;
}
.filtro-select {
  display: flex;
  flex-direction: column;
  padding: 0.25rem 1rem;
}
.filtro-select label {
  font-size: 0.875rem;
  line-height: 1.2rem;
  display: flex;
  align-items: center;
  color: rgb(86, 92, 105);
  cursor: pointer;
}
.filtro-select input {
  margin-right: 0.5rem;
  flex-shrink: 0;
}
.desig-input-2 {
  appearance: none;
  background-color: transparent;
  border: 0.0625rem solid rgb(86, 92, 105);
  width: 1rem;
  height: 1rem;
  position: relative;
  transition: border-color 150ms ease 0s;
}
.desig-input-2:checked {
  border-color: rgb(255, 101, 0);
}
.desig-input-2:checked::after {
  opacity: 1;
  transform: scale(1);
}
.desig-input-2::after {
  position: absolute;
  display: flex;
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABtSURBVHgBhc7RDUAwEMbx/wl7GIVJeBAxkkcmMYruQZy2ElEavZc2d798d8JP6UDJweL+WRKpfRUkicCwUYv2rFzZtYyYKJowmYv1TTvUjiqGXI5oa5uFP7h8bA+Qh/6mEH/QDW+c07Azv5GrE4MoOCeYLx78AAAAAElFTkSuQmCC);
  width: 1rem;
  height: 1rem;
  bottom: 0.06rem;
  left: 0.125rem;
  opacity: 0;
  transition: opacity 150ms ease 0s, transform 150ms ease 0s;
  transform: scale(0);
}
.carregar-mais-mercadorias {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 30px;
}
.carregar-mais-mercadorias button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgb(255, 101, 0);
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: none;
}

@media (max-width: 1260px) {
  .itens-container {
    grid-template-columns: repeat(3, minmax(208px, 1fr));
  }
}
@media (max-width: 1024px) {
  .itens-container {
    grid-template-columns: repeat(2, minmax(208px, 1fr));
  }
}
@media (max-width: 680px) {
  .itens-container {
    grid-template-columns: repeat(1, minmax(208px, 1fr));
  }
}
</style>

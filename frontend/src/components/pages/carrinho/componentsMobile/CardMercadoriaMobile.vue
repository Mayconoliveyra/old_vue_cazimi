<template>
  <div class="item-container-mobile">
    <div class="item" :style="'opacity:'+opacityMercadoria+'%;'">
      <div class="item-imagem">
        <img draggable="false" :src="mercadoria.url_principal" alt="mercadoria" />
      </div>
      <div class="item-descricao">
        <div class="marca">
          <div class="marca-marca">{{mercadoria.marca}}</div>
          <div class="item-add-carrinho"></div>
        </div>
        <div class="descricao">{{ mercadoria.nome_exibir }}</div>
        <!--  <div class="avaliacao"></div> -->
        <div class="container-preco">
          <span
            class="preco-venda"
            v-if="mercadoria.promocao_ativa"
          >{{mercadoria.preco_promocao|maskDinheiro}}</span>
          <span class="preco-venda" v-else>
            <strong>{{mercadoria.preco_venda|maskDinheiro}}</strong>
          </span>
          <span class="forma-pagamento">à vista ou PIX</span>
          <div class="uteis" v-if="this.opacityMercadoria !=20">
            <button
              :disabled="!exibirUtilititarios"
              @click="clickAlterarQtdItem()"
              class="btn-exibir-qtds"
              v-show="!alterarQuantidade"
            >
              Qtd:
              <span class="ml-1">{{mercadoria.quantidade}}</span>
              <b-icon
                v-show="exibirUtilititarios"
                icon="chevron-down"
                font-scale="0.85"
                class="mr-1"
                style="{margin-left: 10px;}"
              ></b-icon>
            </button>
            <div v-show="alterarQuantidade">
              <input
                ref="input-qtd-alterar"
                class="input-alterar-qtd"
                @keydown.enter="alterarQuantidadeMercadoria()"
                type="number"
                v-model="novaQuantidade"
                maxlength="5"
              />
            </div>
            <div class="alterar-remover">
              <button
                v-if="alterarQuantidade"
                class="btn-atualizar"
                @click="alterarQuantidadeMercadoria()"
              >Atualizar</button>
              <button
                class="btn-remover mb-1"
                @click="removerMercadoria()"
                v-if="!alterarQuantidade && exibirUtilititarios"
              >
                <svg width="10" viewBox="0 0 24 32" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.6154 4H22.1538C23.2615 4 24 4.8 24 6V8H0V6C0 4.8 0.923077 4 1.84615 4H7.38462C7.75385 1.8 9.78461 0 12 0C14.2154 0 16.2462 1.8 16.6154 4ZM9.23077 4H14.7692C14.4 2.8 13.1077 2 12 2C10.8923 2 9.6 2.8 9.23077 4ZM1.84615 10H22.1538L20.4923 30.2C20.4923 31.2 19.5692 32 18.6462 32H5.35385C4.43077 32 3.69231 31.2 3.50769 30.2L1.84615 10Z"
                    fill="#e72626d4"
                  />
                </svg>
                REMOVER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../../global";
export default {
  name: "CardMercadoria",
  props: {
    mercadoria: {},
    exibirUtilititarios: Boolean,
  },
  data() {
    return {
      carregandoParaCarrinho: false,
      alterarQuantidade: false,
      novaQuantidade: "",
      opacityMercadoria: 100,
    };
  },
  methods: {
    removerMercadoria() {
      this.opacityMercadoria = 20;
      setTimeout(() => {
        const url = `${baseApiUrl}/carrinho_add_remove/${this.mercadoria.codigo_mercadoria}`;
        axios
          .delete(url)
          .then(() => {
            this.$root.$emit("getCarrinhoUsuario");
            this.opacityMercadoria = 100;
          })
          .catch(showError);
      }, 900);
    },
    alterarQuantidadeMercadoria() {
      if (this.novaQuantidade >= 1) {
        this.opacityMercadoria = 20;
        const modelo = {
          quantidade: this.novaQuantidade,
        };
        const url = `${baseApiUrl}/carrinho_add_remove/${this.mercadoria.codigo_mercadoria}`;
        axios
          .post(url, modelo)
          .then(() => {
            this.alterarQuantidade = false;
            this.$root.$emit("getCarrinhoUsuario");
          })
          .catch(showError);

        setTimeout(() => {
          this.opacityMercadoria = 100;
        }, 900);
      }
    },
    clickAlterarQtdItem() {
      this.alterarQuantidade = true;
      this.novaQuantidade = this.mercadoria.quantidade;
      setTimeout(() => {
        this.$refs["input-qtd-alterar"].focus();
      }, 200);
    },
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");
.item-container-mobile {
  height: 163.09px;
  width: 100%;
  padding: 10px 16px;
  border-top: 1px solid #e6e6e6;
}
.item-container-mobile .item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.item .item-imagem {
  width: 90px;
  height: 90px;
}
.item .item-imagem img {
  width: 100%;
  height: 100%;
}
.item .item-descricao {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.item-descricao .descricao {
  /*   border: solid 1px red; */
  line-height: 1em;
  -webkit-line-clamp: 2;
  font-size: 1em;
  display: -webkit-box;
  max-width: 100%;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Roboto Condensed", sans-serif !important;
}
.item-descricao .marca {
  min-height: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item-descricao .marca-marca {
  min-height: 20px;
  font-size: 0.8rem;
  line-height: 1.125rem;
  color: rgb(127, 133, 141);
  padding-bottom: 3px;
}
.item-descricao .avaliacao {
  min-height: 20px;
  width: 100%;
}
.container-preco {
  flex: 1;
}
.container-preco .preco-venda strong {
  color: #029905;
  font-size: 1.3em;
  font-family: "Roboto Condensed", sans-serif !important;
}
.container-preco .forma-pagamento {
  color: #029905;
  font-size: 0.93em;
  font-family: "Roboto Condensed", sans-serif !important;
}
.item-add-carrinho .btn-add-carrinho-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  border: none;
  margin-bottom: 5px;
  padding-left: 10px;
}
.item-add-carrinho .btn-add-carrinho-item:focus {
  outline-style: none;
  box-shadow: 0 0 0 0;
  outline: 0;
}
#carregar-para-carrinho {
  background-color: rgb(255, 255, 255);
}
/* UTEIS(INPUT QUANTIDADE/ E BOTOES ALTERAR/REMOVER ITENS) */
.uteis {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 10px;
}
.uteis .input-alterar-qtd {
  border-radius: 9px;
  font-size: 1.1rem;
  line-height: 1rem;
  font-weight: 700;
  width: 150px;
  outline: none;
  background-color: #fdfdfd;
  padding: 3px 7px;
  border: solid 1px #0000004f;
  text-align: center;
  margin-right: 20px;
}
.uteis .btn-exibir-qtds {
  width: 115px;
  border-radius: 9px;
  padding: 2px 2px 2px 7px;
  font-size: 14px;
  color: rgb(12, 12, 12);
  background-color: #e8f3ef;
  border: solid 1px rgb(197, 192, 192);
  outline: none;
  display: flex;
  align-items: center;
}
.uteis .btn-exibir-qtds span {
  font-weight: 600;
  font-size: 18px;
  flex: 1;
}

.uteis .alterar-remover {
  display: flex;
  height: 30px;
  align-items: center;
}
.uteis .alterar-remover .btn-remover {
  color: #e72626d4;
  background: transparent;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  margin: 0px 20px;
  border: none;
}
.uteis .alterar-remover .btn-atualizar {
  border-radius: 10px;
  padding: 0px 15px;
  height: 23px;
  background: rgb(252, 107, 15);
  border: none;
  color: rgba(33, 32, 32, 0.83);
  text-align: center;
  font-size: 0.8rem;
  margin-right: 10px;
}
.uteis .alterar-remover button:hover {
  text-decoration: none;
}
.uteis .alterar-remover button:focus {
  outline-style: none;
  box-shadow: 0 0 0 0;
  outline: 0;
}
</style>
<template>
  <div class="exibir-mercadoria-carrinho">
    <div class="mercadoria-imagem">
      <img :src="mercadoria.url_principal" alt />
    </div>
    <div class="cont-desc-preco-uteis">
      <div class="mercadoria-descricao-uteis">
        <span class="marca">{{mercadoria.marca}}</span>
        <div class="descricao">{{mercadoria.nome_exibir}}</div>
        <div class="uteis">
          <button
            :disabled="!utilitario"
            @click="clickAlterarQtdItem()"
            class="btn-exibir-qtds"
            v-show="!alterarQuantidade"
          >
            Qtd:
            <span class="ml-1">{{ mercadoria.quantidade}}</span>
            <b-icon
              v-show="utilitario"
              icon="chevron-down"
              font-scale="0.85"
              style="margin-left: 10px;"
            ></b-icon>
          </button>
          <div v-show="alterarQuantidade">
            <input
              ref="input-qtd-alterar"
              class="input-alterar-qtd"
              @keydown.esc="alterarQuantidade=false"
              @keydown.enter="alterarQuantidadeMercadoria()"
              @keypress="aceitarSoNumeroInput"
              type="text"
              v-model="novaQuantidade"
              maxlength="6"
            />
          </div>
          <div class="alterar-remover">
            <button
              v-if="alterarQuantidade"
              class="btn-atualizar"
              @click="alterarQuantidade=false; alterarQuantidadeMercadoria()"
            >Atualizar</button>
            <button
              class="btn-remover"
              @click="removerMercadoria()"
              v-if="!alterarQuantidade && utilitario"
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
      <div class="preco">{{mercadoria.preco_venda |maskDinheiro}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../../global";
export default {
  name: "ExibirMercadoriasCarrinho",
  props: {
    sequencia: Number,
    mercadoria: Object,
    utilitario: Boolean,
  },
  data() {
    return {
      alterarQuantidade: false,
      novaQuantidade: "",
    };
  },
  methods: {
    removerMercadoria() {
      const url = `${baseApiUrl}/carrinho_add_remove/${this.codigoMercadoria}`;
      axios
        .delete(url)
        .then(() => this.$root.$emit("getCarrinhoUsuario"))
        .catch(showError);
    },
    alterarQuantidadeMercadoria() {
      const modelo = {
        quantidade: this.novaQuantidade,
      };
      const url = `${baseApiUrl}/carrinho_add_remove/${this.codigoMercadoria}`;
      axios
        .post(url, modelo)
        .then(() => {
          this.alterarQuantidade = false;
          this.$root.$emit("getCarrinhoUsuario");
        })
        .catch(showError);
    },
    aceitarSoNumeroInput(evt) {
      let theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      let regex = /^[0-9]+$/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
    clickAlterarQtdItem() {
      this.alterarQuantidade = true;
      this.novaQuantidade = this.quantidade;
      setTimeout(() => {
        this.$refs["input-qtd-alterar"].focus();
      }, 200);
    },
  },
};
</script>

<style scoped>
.exibir-mercadoria-carrinho {
  height: 100%;
  display: flex;
  /*  border: solid 1px red; */
  height: 174px;
  padding: 5px;
}
.mercadoria-imagem {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 100%;
}
.mercadoria-imagem img {
  width: 110px;
  height: 110px;
}
.cont-desc-preco-uteis {
  display: flex;
  flex: 1;
  padding: 0px 0px 0px 10px;
  /* border: solid 1px red; */
}
.mercadoria-descricao-uteis {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.marca {
  min-height: 20px;
  font-size: 0.8rem;
  line-height: 1.125rem;
  color: rgb(127, 133, 141);
  padding-bottom: 3px;
}
.descricao {
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 700;
  overflow: hidden;
  max-height: 3.375rem;
  color: rgb(66, 70, 77);
  /*  border: solid 1px rgb(77, 62, 62); */
}
.preco {
  width: 160px;
  text-align: end;
  font-size: 1.1rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: rgb(252, 107, 15);
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
  padding: 2px 7px;
  border: solid 1px #0000004f;
  text-align: center;
  margin-right: 20px;
}
.uteis .btn-exibir-qtds {
  width: 115px;
  border-radius: 9px;
  padding: 2px 5px 2px 7px;
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
  font-size: 14px;
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
<template>
  <div class="inicial">
    <div class="informacoes-cadastro">
      <div class="pessoal">
        <div class="pessoal-1">
          <span class="span-nome">Bem-vindo, {{user.nome}}</span>
          <span class="span-email">
            <svg class="mr-1" width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.4485 0.433594H13.4465H0.553458H0.551435C0.473286 0.433895 0.439462 0.533453 0.499509 0.583465L5.56579 4.80217L5.56759 4.80367L6.34817 5.45366C6.72584 5.76817 7.27412 5.76817 7.65179 5.45366L13.5004 0.583465C13.5605 0.533426 13.5266 0.433867 13.4485 0.433594ZM9.07015 4.99293L13.9916 0.894788C13.9967 0.924921 14 0.955655 14 0.987155V8.27383L9.07015 4.99293ZM8.006 5.87908L8.62641 5.36247L14 8.93874V9.0124C14 9.31758 13.7517 9.56589 13.4465 9.56589H0.553492C0.248309 9.56589 0 9.31758 0 9.0124V8.93874L5.37365 5.36247L5.99405 5.87908C6.28548 6.12178 6.64278 6.24313 7.00003 6.24313C7.35727 6.24313 7.71455 6.12178 8.006 5.87908ZM0 0.987155C0 0.955601 0.00325391 0.924921 0.00833984 0.894788L4.92983 4.99291L0 8.27383V0.987155Z"
                fill="#FF6500"
              />
            </svg>
            {{user.email}}
          </span>
          <button @click="navegar('MEUS-DADOS')" class="btn-atualizar-dados">ATUALIZAR</button>
        </div>
      </div>
    </div>
    <div class="titulo-pagina" v-if="dataPedidosUsuarioUltimoPedido">
      <svg class="mb-2" width="24px" height="24px" viewBox="0 0 23 22" fill="none">
        <path
          d="M7.09977 17.6C5.88981 17.6 4.91085 18.59 4.91085 19.8C4.91085 21.01 5.88981 22 7.09977 22C8.30973 22 9.2997 21.01 9.2997 19.8C9.2997 18.59 8.30973 17.6 7.09977 17.6ZM0.5 0V2.2H2.69992L6.65979 10.549L5.17484 13.244C4.99885 13.552 4.89985 13.915 4.89985 14.3C4.89985 15.51 5.88981 16.5 7.09977 16.5H20.2993V14.3H7.56176C7.40776 14.3 7.28677 14.179 7.28677 14.025L7.31977 13.893L8.30973 12.1H16.5044C17.3294 12.1 18.0554 11.649 18.4294 10.967L22.3672 3.828C22.458 3.66013 22.5037 3.47158 22.4998 3.28078C22.4959 3.08998 22.4426 2.90346 22.345 2.73943C22.2475 2.5754 22.1091 2.43947 21.9433 2.34492C21.7776 2.25037 21.5901 2.20044 21.3993 2.2H5.13084L4.09688 0H0.5ZM18.0994 17.6C16.8894 17.6 15.9105 18.59 15.9105 19.8C15.9105 21.01 16.8894 22 18.0994 22C19.3094 22 20.2993 21.01 20.2993 19.8C20.2993 18.59 19.3094 17.6 18.0994 17.6Z"
          fill="#FF6500"
        />
      </svg>
      <h1>SEU ÚLTIMO PEDIDO</h1>
    </div>
    <div class="ultimo-pedido" v-if="dataPedidosUsuarioUltimoPedido">
      <div class="cabecalho-ultimo-pedido">
        <div width="180px">
          <div class="cabelhado-pedido">NÚMERO DO PEDIDO</div>
          <div class="dados-pedido">#{{dataPedidosUsuarioUltimoPedido.codigo_pedido}}</div>
        </div>
        <div width="140px">
          <div class="cabelhado-pedido">STATUS</div>
          <div
            v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == false &&
                          dataPedidosUsuarioUltimoPedido.separacao == false &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == false &&
                          dataPedidosUsuarioUltimoPedido.finalizado == false &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            class="dados-pedido-status"
          >Pendente</div>
          <div
            v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == false &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == false &&
                          dataPedidosUsuarioUltimoPedido.finalizado == false &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            class="dados-pedido-status"
            style="color: rgb(45, 194, 110);"
          >Confirmado</div>
          <div
            v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == false &&
                          dataPedidosUsuarioUltimoPedido.finalizado == false &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            class="dados-pedido-status"
            style="color: rgb(255 101 0 / 85%);"
          >Separação e carregamento</div>
          <div
            v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == true &&
                          dataPedidosUsuarioUltimoPedido.finalizado == false &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            class="dados-pedido-status"
            style="color: rgb(255 101 0 / 85%);"
          >Saiu para entrega</div>
          <div
            v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == true &&
                          dataPedidosUsuarioUltimoPedido.finalizado == true &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            class="dados-pedido-status"
            style="color: rgb(45, 194, 110);"
          >Concluído</div>
          <div
            v-else-if="dataPedidosUsuarioUltimoPedido.cancelado"
            class="dados-pedido-status"
            style="color: rgb(231, 38, 38);"
          >Cancelado</div>
        </div>
        <div width="140px">
          <div class="cabelhado-pedido">DATA</div>
          <div class="dados-pedido">
            {{
            formatDataDiaMesAno(dataPedidosUsuarioUltimoPedido.cadastrado_em)}}
          </div>
        </div>
        <div width="180px">
          <div class="cabelhado-pedido">PAGAMENTO</div>
          <div class="dados-pedido">{{dataPedidosUsuarioUltimoPedido.tipo_pagamento}}</div>
        </div>
      </div>
      <hr />
      <div class="endereco-ultimo-pedido">
        <div class="title-endereco">ENDEREÇO</div>
        <div class="rua-endereco">{{dataPedidosUsuarioUltimoPedido.ped_logradouro}}</div>
        <div
          class="endereco-info"
        >Número {{dataPedidosUsuarioUltimoPedido.ped_numero}}, {{dataPedidosUsuarioUltimoPedido.ped_bairro}}</div>
        <div
          class="endereco-info"
        >CEP {{dataPedidosUsuarioUltimoPedido.ped_cep}} - {{dataPedidosUsuarioUltimoPedido.ped_localidade}}, {{dataPedidosUsuarioUltimoPedido.ped_uf}}</div>
      </div>
      <h4 class="title-endereco mt-4">STATUS DO PEDIDO</h4>
      <div class="status-ultimo-pedido">
        <div
          :class="{'container-passos':true ,'status-icones-ativo':!dataPedidosUsuarioUltimoPedido.cancelado}"
        >
          <div class="passos-icone">
            <b-icon icon="cart-check-fill" font-scale="1.2"></b-icon>
            <div class="passos-icone-barra"></div>
          </div>
          <div class="text-passsos">
            <span>Pedido recebido</span>
          </div>
        </div>
        <div
          :class="{'container-passos':true ,'status-icones-ativo':dataPedidosUsuarioUltimoPedido.confirmado_loja == true && dataPedidosUsuarioUltimoPedido.cancelado == false}"
        >
          <div class="passos-icone">
            <b-icon icon="check-circle-fill" font-scale="1.2"></b-icon>
            <div class="passos-icone-barra"></div>
          </div>
          <div class="text-passsos">
            <span>Confirmado pela Loja</span>
            <small
              v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true && dataPedidosUsuarioUltimoPedido.cancelado == false"
            >{{formatDataDiaMesAnoHoraMin(dataPedidosUsuarioUltimoPedido.data_confirmado_loja)}}</small>
          </div>
        </div>
        <div
          :class="{'container-passos':true ,'status-icones-ativo':dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false}"
        >
          <div class="passos-icone">
            <b-icon icon="minecart-loaded" font-scale="1.2"></b-icon>
            <div class="passos-icone-barra"></div>
          </div>
          <div class="text-passsos">
            <span>Separação e carregamento</span>
            <small
              v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            >{{formatDataDiaMesAnoHoraMin(dataPedidosUsuarioUltimoPedido.data_separacao)}}</small>
          </div>
        </div>
        <div
          :class="{'container-passos':true ,'status-icones-ativo':dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == true &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false}"
        >
          <div class="passos-icone">
            <b-icon icon="truck" font-scale="1.2"></b-icon>
            <div class="passos-icone-barra"></div>
          </div>
          <div class="text-passsos">
            <span>Saiu para entrega</span>
            <small
              v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == true &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            >{{formatDataDiaMesAnoHoraMin(dataPedidosUsuarioUltimoPedido.data_saiu_entrega)}}</small>
          </div>
        </div>
        <div
          v-if="!dataPedidosUsuarioUltimoPedido.cancelado"
          :class="{'container-passos':true ,'status-icones-ativo':dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == true &&
                          dataPedidosUsuarioUltimoPedido.finalizado == true &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false}"
        >
          <div class="passos-icone">
            <b-icon icon="check-square-fill" font-scale="1.2"></b-icon>
          </div>
          <div class="text-passsos">
            <span>Entrega realizada</span>
            <small
              v-if="dataPedidosUsuarioUltimoPedido.confirmado_loja == true &&
                          dataPedidosUsuarioUltimoPedido.separacao == true &&
                          dataPedidosUsuarioUltimoPedido.saiu_entrega == true &&
                          dataPedidosUsuarioUltimoPedido.finalizado == true &&
                          dataPedidosUsuarioUltimoPedido.cancelado == false"
            >{{formatDataDiaMesAnoHoraMin(dataPedidosUsuarioUltimoPedido.data_finalizado)}}</small>
          </div>
        </div>
        <div v-if="dataPedidosUsuarioUltimoPedido.cancelado" class="container-passos">
          <div class="passos-icone">
            <b-icon icon="x-circle-fill" style="color: rgb(231, 38, 38);" font-scale="1.2"></b-icon>
          </div>
          <div class="text-passsos">
            <span style="color: rgb(231, 38, 38);">Pedido cancelado</span>
          </div>
        </div>
      </div>

      <div class="ver-todos-pedidos">
        <button @click="navegar('MEUS-PEDIDOS')">Ver todos os pedidos</button>
      </div>
    </div>
    <div v-else class="pedidos-vazio">
      <div class="sem-pedido">
        <b>Não existe nenhum pedido finalizado.</b>
        <span>Deseja fazer seu primeiro pedido?</span>
        <router-link to="/" class="btn-add-carrinho">
          <svg width="35" height="23" viewBox="0 0 23 22" fill="none">
            <path
              d="M7.09977 17.6C5.88981 17.6 4.91085 18.59 4.91085 19.8C4.91085 21.01 5.88981 22 7.09977 22C8.30973 22 9.2997 21.01 9.2997 19.8C9.2997 18.59 8.30973 17.6 7.09977 17.6ZM0.5 0V2.2H2.69992L6.65979 10.549L5.17484 13.244C4.99885 13.552 4.89985 13.915 4.89985 14.3C4.89985 15.51 5.88981 16.5 7.09977 16.5H20.2993V14.3H7.56176C7.40776 14.3 7.28677 14.179 7.28677 14.025L7.31977 13.893L8.30973 12.1H16.5044C17.3294 12.1 18.0554 11.649 18.4294 10.967L22.3672 3.828C22.458 3.66013 22.5037 3.47158 22.4998 3.28078C22.4959 3.08998 22.4426 2.90346 22.345 2.73943C22.2475 2.5754 22.1091 2.43947 21.9433 2.34492C21.7776 2.25037 21.5901 2.20044 21.3993 2.2H5.13084L4.09688 0H0.5ZM18.0994 17.6C16.8894 17.6 15.9105 18.59 15.9105 19.8C15.9105 21.01 16.8894 22 18.0994 22C19.3094 22 20.2993 21.01 20.2993 19.8C20.2993 18.59 19.3094 17.6 18.0994 17.6Z"
              fill="white"
            />
          </svg>CONTINUAR COMPRANDO
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, showError } from "../../../../../global";
import moment from "moment";
export default {
  name: "MinhaContaInicial",
  data() {
    return {
      dataPedidosUsuarioUltimoPedido: {},
    };
  },
  methods: {
    navegar(rota) {
      this.$root.$emit("navegarMinhaConta", rota);
    },
    loadUtimoPedidoUsiario() {
      const url = `${baseApiUrl}/pedido/ultimo_pedido/${this.user.codigo_usuario}`;
      axios
        .get(url)
        .then((res) => {
          this.dataPedidosUsuarioUltimoPedido = res.data;
        })
        .catch(showError);
    },
    formatDataDiaMesAno(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    formatDataDiaMesAnoHoraMin(date) {
      return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
    },
  },
  computed: mapState(["user"]),
  created() {
    this.loadUtimoPedidoUsiario();
  },
};
</script>

<style scoped>
.inicial {
  width: 100%;
  height: 100%;
}
.informacoes-cadastro {
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
}
.pessoal {
  flex: 1;
  background: rgb(255, 255, 255);
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 0.25rem;
}
.pessoal-1 {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  align-items: center;
}
.span-nome {
  font-size: 1.18rem;
  line-height: 1.875rem;
  font-weight: 700;
  color: #42464d;
}
.span-email {
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: 400;
  color: #42464d;
}
.btn-atualizar-dados {
  margin-top: 7px;
  color: rgb(255, 101, 0);
  font-size: 0.9rem;
  line-height: 1.125rem;
  font-weight: 700;
  border: none;
  background: transparent;
  border: none;
  width: 150px;
  padding: 3px;
}

.titulo-pagina {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}
.titulo-pagina h1 {
  display: flex;
  font-size: 24px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  margin-left: 16px;
}

.ultimo-pedido {
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  margin-top: 16px;
  padding: 32px;
  border-radius: 0.25rem;
}
.cabecalho-ultimo-pedido {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  margin-bottom: 10px;
}
.cabelhado-pedido {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  color: rgb(66, 70, 77);
}
.dados-pedido {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: rgb(66, 70, 77);
  margin-top: 16px;
}

.endereco-ultimo-pedido .endereco-info {
  display: flex;
  font-size: 14px;
  color: rgb(127, 133, 141);
}
.endereco-ultimo-pedido .rua-endereco {
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 16px;
}
.title-endereco {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
}
.endereco-ultimo-pedido {
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 13px;
}
.dados-pedido-status {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(253, 135, 25);
  margin-top: 16px;
}

.status-ultimo-pedido {
  display: flex;
  width: 100%;
}
.container-passos {
  display: flex;
  flex-direction: column;
  margin-right: 11px;
  max-width: 200px;
  width: 100%;
  overflow: hidden;
  color: #dee0e4;
}
.passos-icone {
  display: flex;
  align-items: center;
  height: 30px;
}
.passos-icone-barra {
  width: 100%;
  height: 2px;
  margin-left: 8px;
  background-color: #dee0e4;
  position: relative;
}

.text-passsos {
  display: flex;
  flex-direction: column;
  max-width: 100px;
  margin-top: 0px;
  margin-left: 26px;
}
.text-passsos span {
  transition: color 0.1s ease 150ms;
  font-weight: 600;
  font-size: 12.5px;
  margin: 0px;
  padding: 0px;
}
.text-passsos small {
  transition: color 0.8s ease 2s;
  color: rgb(255, 101, 0);
  font-weight: 400;
  font-size: 10px;
  margin: 0px;
  padding: 0px;
}

.status-icones-ativo {
  color: rgb(255, 101, 0) !important;
  border-color: rgb(255, 101, 0) !important;
}
.status-icones-ativo .passos-icone-barra {
  background-color: rgb(255, 101, 0) !important;
}
.ver-todos-pedidos {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgb(222, 224, 228);
  align-items: center;
  color: rgb(255, 101, 0);
  padding-top: 32px;
  margin-top: 45px;
}
.ver-todos-pedidos button {
  display: flex;
  align-items: center;
  color: rgb(255, 101, 0);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  border: none;
  background: none;
}
.pedidos-vazio {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  align-items: center;
  justify-content: center;
}
.sem-pedido {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20rem;
  align-items: center;
  justify-content: center;
}
.btn-add-carrinho {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(255, 101, 0);
  background-color: rgb(255, 101, 0);
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  margin-top: 5rem;
}
.btn-add-carrinho:hover {
  text-decoration: none;
}
</style>
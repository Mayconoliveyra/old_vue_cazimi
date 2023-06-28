<template>
  <div class="pedido-finalizado">
    <Progresso
      :progresso="{percentual:100, carrinho:true,identificacao:true,pagamento:true,confirmacao:true,conclusao:true}"
    />
    <div class="pedido-finalizado-exibir">
      <div class="container-finalizar-title">
        <svg class="mb-3" width="72" height="72" viewBox="0 0 22 22" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.8882 11C21.8882 17.0751 17.0075 22 10.9868 22C4.96616 22 0.0854492 17.0751 0.0854492 11C0.0854492 4.92487 4.96616 0 10.9868 0C17.0075 0 21.8882 4.92487 21.8882 11ZM4.62769 12.0404L8.50923 16.1944L17.3459 6.73737L16.1897 5.5L8.50923 13.7197L5.78389 10.803L4.62769 12.0404Z"
            fill="#2DC26E"
          />
        </svg>
        <div class="title-finalizar-pedido">
          <strong>PEDIDO REALIZADO COM SUCESSO!</strong>
          <span v-show="false">AGORA É SÓ REALIZAR O PAGAMENTO.</span>
        </div>
        <div class="container-numero-pedido">
          <span>O número do seu pedido é:</span>
          <strong>#{{codPedidoFinalizado}}</strong>
        </div>
      </div>
      <div class="sc-llYSUQ btns-pedido-finalizado">
        <router-link to="/minha-conta" class="btn-ver-pedidos">VER MEUS PEDIDOS</router-link>
        <router-link to="/" class="btn-continuar-navegando">CONTINUAR NAVEGANDO</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Progresso from "./Progresso";
export default {
  name: "PedidoFinalizado",
  props: ["codPedidoFinalizado"],
  components: { Progresso },
};
</script>

<style scoped>
.pedido-finalizado {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background: rgb(242, 243, 244);
}
.pedido-finalizado-exibir {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
}
.container-finalizar-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
.title-finalizar-pedido {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 24px;
}
.title-finalizar-pedido strong {
  font-size: 30px;
  font-weight: 700;
  line-height: 30px;
  color: rgb(45, 194, 110);
}
.title-finalizar-pedido span {
  font-size: 20px;
  font-weight: 700;
  line-height: 37px;
  color: #7f858d;
}
.container-numero-pedido {
  display: flex;
  align-items: center;
  margin-left: 32px;
  margin-top: 20px;
  padding: 38px 77px;
  width: 520px;
  background: rgba(250, 250, 251, 0.597);
  border-radius: 7px;
  border: solid 1px var(--cor-laranja);
}
.container-numero-pedido span {
  font-size: 16px;
  line-height: 18px;
  width: 114px;
  margin-right: 16px;
  color: #565c69;
}
.container-numero-pedido strong {
  font-size: 40px;
  line-height: 48px;
  margin-left: 16px;
  color: #42464d;
}
.btns-pedido-finalizado {
  display: flex;
  justify-content: center;
  margin: 64px 0px;
}
.btn-ver-pedidos {
  height: 48px;
  width: 282px;
  background: transparent;
  color: #ff6500;
  border: 1px solid #ff6500;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  margin: 0px 32px;
  border-radius: 0.25rem;
  align-items: center;
  justify-content: center;
  display: flex;
}
.btn-ver-pedidos:hover {
  text-decoration: none;
}
.btn-continuar-navegando {
  height: 48px;
  width: 282px;
  background: #ff6500;
  color: #ffffff;
  border: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  margin: 0px 32px;
  border-radius: 0.25rem;
  align-items: center;
  justify-content: center;
  display: flex;
}
.btn-continuar-navegando:hover {
  text-decoration: none;
}
</style>
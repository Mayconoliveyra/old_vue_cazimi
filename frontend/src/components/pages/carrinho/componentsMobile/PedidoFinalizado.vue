<template>
  <div class="pedido-finalizado">
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
        <strong>#{{codigo_pedido}}</strong>
      </div>
    </div>
    <div class="btns-pedido-finalizado">
      <router-link to="/" class="btn-continuar-navegando">CONTINUAR NAVEGANDO</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PedidoFinalizado",
  data() {
    return {};
  },
  props: ["codigo_pedido"],
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
  padding: 10px;
}
.container-finalizar-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.title-finalizar-pedido {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title-finalizar-pedido strong {
  font-size: 20px;
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
  margin-top: 20px;
  padding: 30px 25px;
  width: 100%;
  background: rgba(250, 250, 251, 0.597);
  border-radius: 7px;
  border: solid 1px var(--cor-laranja);
}
.container-numero-pedido span {
  font-size: 16px;
  line-height: 18px;
  width: 120px;
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
}

.btn-continuar-navegando {
  background: rgb(2, 153, 5);
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  margin-top: 16px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.btn-continuar-navegando:hover {
  text-decoration: none;
}
</style>
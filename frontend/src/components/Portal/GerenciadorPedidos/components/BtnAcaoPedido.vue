<template>
  <div
    class="btns-cadastros"
    v-if=" statusPedido.finalizado == false &&
            statusPedido.cancelado == false"
  >
    <button v-b-modal.modal-pedido-cancelar type="button" class="btn-cancelar">CANCELAR</button>
    <button
      v-show="statusPedido.confirmado_loja == false &&
            statusPedido.separacao == false &&
            statusPedido.saiu_entrega == false &&
            statusPedido.finalizado == false &&
            statusPedido.cancelado == false"
      type="button"
      class="btn-salvar"
      v-b-modal.modal-pedido-confirmar
    >CONFIRMAR</button>
    <button
      v-show="statusPedido.confirmado_loja == true &&
            statusPedido.separacao == false &&
            statusPedido.saiu_entrega == false &&
            statusPedido.finalizado == false &&
            statusPedido.cancelado == false"
      type="button"
      class="btn-salvar"
      v-b-modal.modal-pedido-separacao
    >SEPARAÇÃO</button>
    <button
      v-show="statusPedido.confirmado_loja == true &&
            statusPedido.separacao == true &&
            statusPedido.saiu_entrega == false &&
            statusPedido.finalizado == false &&
            statusPedido.cancelado == false"
      type="button"
      class="btn-salvar"
      v-b-modal.modal-pedido-entrega
    >ENTREGA</button>
    <button
      v-show="statusPedido.confirmado_loja == true &&
            statusPedido.separacao == true &&
            statusPedido.saiu_entrega == true &&
            statusPedido.finalizado == false &&
            statusPedido.cancelado == false"
      type="button"
      class="btn-salvar"
      v-b-modal.modal-pedido-finalizar
    >FINALIZAR</button>
  </div>
</template>

<script>
export default {
  name: "BtnAcaoSalvarCancelar",
  props: ["statusPedido"],
};
</script>

<style scoped>
.btns-cadastros {
  margin-top: 30px;
  margin-bottom: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
}
.btns-cadastros button {
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  padding: 0px 3rem;
  width: 250px;
  border: 1px solid rgb(255, 101, 0);
}
.btns-cadastros .btn-salvar {
  background-color: rgb(255, 101, 0);
  color: rgb(255, 255, 255);
  margin-left: 20px;
}
.btns-cadastros .btn-salvar:hover {
  background-color: rgba(255, 102, 0, 0.817);
}
.btns-cadastros .btn-cancelar {
  background-color: rgb(255, 255, 255);
  color: rgba(255, 34, 0, 0.837);
  margin-right: 20px;
}
.btns-cadastros .btn-cancelar:hover {
  background-color: rgb(247, 46, 19);
  color: rgb(255, 255, 255);
}
</style>
<template>
  <div class="modal-confirmacao-pedido">
    <b-icon v-if="icon!='x-circle'" style="color: #ff6500;" :icon="icon" font-scale="3"></b-icon>
    <b-icon v-else style="color: rgb(231, 38, 38);" :icon="icon" font-scale="3"></b-icon>
    <h1 class="mt-3">Você tem certeza?</h1>
    <p>{{ mensagem}}</p>
    <div class="btns-modal">
      <button type="button" class="btn-cancelar" @click="$emit('confirmar','teste')">Sim, Confirmar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirmacaoPedido",
  emits: ["cancelar", "confirmar"],
  props: {
    mensagem: String,
    icon: String,
  },
};
</script>

<style scoped>
.modal-confirmacao-pedido {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btns-modal {
  border-top: 2px solid rgb(222, 224, 228);
  margin-top: 45px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
.btns-modal button {
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.3s ease 0s;
  border-radius: 0.25rem;
  padding: 5px 3rem;
  width: 200px;
  border: 1px solid rgb(255, 101, 0);
}
.btns-modal .btn-salvar {
  background-color: rgb(255, 255, 255);
  color: #ff6500;
  margin-right: 20px;
}
.btns-modal .btn-cancelar {
  background-color: rgb(255, 101, 0);
  color: rgb(255, 255, 255);
  margin-left: 20px;
}
.modal-confirmacao-pedido h1 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 800;
  color: rgb(66, 70, 77);
  text-transform: uppercase;
  padding-left: 5px;
}
</style>
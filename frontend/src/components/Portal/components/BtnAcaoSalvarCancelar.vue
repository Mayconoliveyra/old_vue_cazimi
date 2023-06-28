<template>
  <div class="btns-cadastros">
    <button type="button" class="btn-cancelar" @click="$emit('cancelar')">Cancelar</button>
    <button type="button" class="btn-salvar" @click="$emit('salvar')">Salvar</button>
  </div>
</template>

<script>
export default {
  name: "BtnAcaoSalvarCancelar",
  emits: ["salvar", "cancelar"],
};
</script>

<style scoped>
.btns-cadastros {
  margin-top: 50px;
  margin-bottom: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.btns-cadastros button {
  height: 48px;
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
.btns-cadastros .btn-cancelar {
  background-color: rgb(255, 255, 255);
  color: rgb(255, 101, 0);
  margin-right: 20px;
}
</style>
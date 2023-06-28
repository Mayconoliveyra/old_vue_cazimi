<template>
  <div class="meus-dados">
    <div class="icone-h2">
      <b-icon icon="person-fill" scale="2"></b-icon>
      <h2>MEUS DADOS</h2>
    </div>
    <section>
      <form>
        <div class="titulo-meus-d">
          <b-icon icon="file-earmark-check-fill" scale="1.6"></b-icon>
          <h1>DADOS PESSOAIS</h1>
        </div>
        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>Nome completo *</label>
            </div>
          </div>
        </div>
        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder="Apelido" value />
              <label>Apelido</label>
            </div>
          </div>
        </div>
        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>E-mail / Login *</label>
            </div>
          </div>
        </div>
        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>CPF/CNPJ *</label>
            </div>
          </div>
        </div>
        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>Telefone para contato *</label>
            </div>
          </div>
        </div>
      </form>
      <form>
        <div class="titulo-meus-d">
          <b-icon icon="geo-alt-fill" scale="1.6"></b-icon>
          <h1>ENDEREÇO</h1>
        </div>
        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>CEP *</label>
            </div>
          </div>
        </div>
        <div class="input-template-sub">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>Logradouro *</label>
            </div>
          </div>
          <div class="input-template-1 template-sub">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>Número *</label>
            </div>
          </div>
        </div>
        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>Complemento</label>
            </div>
          </div>
        </div>

        <div class="input-template">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>Bairro *</label>
            </div>
          </div>
        </div>
        <div class="input-template-sub">
          <div class="input-template-1">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>Cidade *</label>
            </div>
          </div>
          <div class="input-template-1 template-sub">
            <div class="input-template-2">
              <input type="text" name="nome" placeholder value />
              <label>UF *</label>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.meus-dados {
  width: 100%;
}
section {
  display: flex;
  margin-top: 32px;
}
form {
  flex: 1;
  background-color: rgb(255, 255, 255);
  padding: 20px 15px;
}
form:first-child {
  margin-right: 26px;
}
.titulo-meus-d {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}
.titulo-meus-d h1 {
  font-size: 14px;
  font-weight: bold;
  color: rgb(66, 70, 77);
  margin: 0px;
  margin-left: 11px;
  padding: 0px;
}
.input-template {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
}
.input-template-1 {
  position: relative;
}
.input-template-2:focus-within {
  outline: none;
  border-color: rgb(255, 101, 0);
}
input:focus,
textarea:focus {
  outline: none;
  border-color: rgb(255, 101, 0);
}
input:focus ~ label,
textarea:focus ~ label {
  color: rgb(255, 101, 0);
}
input,
textarea {
  font-size: 0.875rem;
  line-height: 1.5rem;
  width: 100%;
  padding: 10px 13px; /* altura/lagura do input */
  border: solid 1px rgb(127, 133, 141);
  border-radius: 0.25rem;
}
input ~ label {
  top: 0px;
  left: 0.8125rem;
  background-color: rgb(255, 255, 255);
  padding: 0px 0.2rem;
  font-size: 0.75rem;
  line-height: 1.125rem;
}
label {
  position: absolute;
  pointer-events: none;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 300ms ease 0s;
  color: rgb(127, 133, 141);
  font-size: 0.75rem;
  line-height: 1rem;
}
.input-template-sub {
  display: flex;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 0px 15px;
}
.input-template-sub > div:first-child {
  width: 100%;
}
.template-sub {
  margin-left: 1rem;
  width: 90px;
}
.template-sub input {
  width: 90px;
}
</style>
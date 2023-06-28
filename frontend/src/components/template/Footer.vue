<template>
  <footer class="footer">
    <ul>
      <li>CAZIMI COMERCIO DE MATERIAL DE CONSTRUCAO LTDA | CNPJ 32.550.788/0001-04</li>
      <li
        class="li-endereço"
      >Rua Empresário Paulo Miranda D'Oliveira, Portal do Sol, João Pessoa - PB</li>
      <li>
        <a
          href="https://www.facebook.com/cazimi.oliveiras"
          target="_blank"
          aria-label="Link para facebook."
        >
          <b-icon icon="facebook"></b-icon>
        </a>
        <a
          href="https://www.instagram.com/cazimiconstrucao/"
          target="_blank"
          aria-label="Link para instagram."
        >
          <b-icon icon="instagram"></b-icon>
        </a>
        <a
          href="https://www.instagram.com/cazimiconstrucao/"
          target="_blank"
          aria-label="Link para WhatsApp"
        >
          <b-icon icon="whatsapp"></b-icon>
        </a>
      </li>
      <li>Os preços anunciados podem ser alterados sem prévio aviso. A loja não é responsável por erros descritivos. As fotos contidas nesta página são meramente ilustrativas do produto e podem variar de acordo com o fornecedor/lote do fabricante.</li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="css" scoped>
.footer {
  grid-area: footer;
  display: flex;
  justify-content: center;
  background: var(--cor-footer);
  color: #f0eeee;
  font-size: 0.6em;
  padding: 10px 3px;
}

ul {
  margin: 0px;
  padding: 0px;
}
ul li {
  list-style-type: none;
  text-align: center;
  margin: 5px 0px;
}
.li-endereço {
  font-weight: 600 !important;
}
a {
  color: #f0eeee;
  font-size: 30px;
  margin: 13px;
}
a:hover {
  color: #d7d1d1;
}
</style>
module.exports = app => {
        getCartoes = (req, res) => {
                app.db("cadastro_cartoes")
                        .select("codigo_cartao", "bandeira", "tipo", "maximo_parcelas", "vlr_minimo_parcela")
                        .where({ status: true })
                        .then(cartoes => res.json(cartoes))
                        .catch(err => res.status(500).send(err))
        }

        return { getCartoes }
}
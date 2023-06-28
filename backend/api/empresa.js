module.exports = app => {
  getEmpresa = async (req, res) => {
    const departamento = await app.db.raw(`SELECT CONCAT('/', path) AS path, departamento FROM cadastro_departamentos INNER JOIN cadastro_mercadorias ON cadastro_departamentos.codigo_departamento = cadastro_mercadorias.id_departamento WHERE cadastro_departamentos.status = TRUE AND cadastro_mercadorias.status =TRUE GROUP BY cadastro_departamentos.path, cadastro_departamentos.departamento ORDER BY cadastro_departamentos.codigo_departamento ASC`)

    res.json({ departamento: departamento[0], empresa: { fantasia: 'cazimi', contato: '88699874' } }

    )
  }

  return { getEmpresa }
}
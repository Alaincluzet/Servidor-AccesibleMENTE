const profesionales = require("../data/profesionales");

function listarProfesionales(req, res) {
  res.json(profesionales);
}

function agregarProfesional(req, res) {
  const nuevoProfesional = {
    id: profesionales.length + 1,
    nombre: req.body.nombre,
    edad: req.body.edad,
  };

  profesionales.push(nuevoProfesional);

  res.send("Profesional agregado");
}

function buscarProfesional(req, res) {
  const profesionalEncontrado = profesionales.find(
    profesional => profesional.nombre === req.params.nombre
  );

  res.json(profesionalEncontrado);
}

function modificarProfesional(req, res) {
  const profesionalModificado = profesionales.find(
    profesional => profesional.nombre === req.params.nombre
  );

  profesionalModificado.nombre = req.body.nombre;
  profesionalModificado.edad = req.body.edad;

  res.send("Profesional modificado");
}

function eliminarProfesional(req, res) {
  const profesionalEliminado = profesionales.findIndex(
    profesional => profesional.nombre === req.params.nombre
  );

  profesionales.splice(profesionalEliminado, 1);

  res.send("Profesional eliminado");
}

module.exports = {
  listarProfesionales,
  buscarProfesional,
  agregarProfesional,
  modificarProfesional,
  eliminarProfesional
};
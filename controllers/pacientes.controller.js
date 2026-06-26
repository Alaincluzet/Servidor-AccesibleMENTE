const pacientes = require("../data/pacientes");

function listarPacientes(req, res) {
  res.json(pacientes);
}

function agregarPaciente(req, res) {
  const nuevoPaciente = {
    id: pacientes.length + 1,
    nombre: req.body.nombre,
    edad: req.body.edad,
  };

  pacientes.push(nuevoPaciente);

  res.send("Paciente agregado");
}

function buscarPaciente(req, res) {
  const pacienteEncontrado = pacientes.find(
    paciente => paciente.nombre === req.params.nombre
  );

  res.json(pacienteEncontrado);
}

function modificarPaciente(req, res) {
  const pacienteModificado = pacientes.find(
    paciente => paciente.nombre === req.params.nombre
  );

  pacienteModificado.nombre = req.body.nombre;
  pacienteModificado.edad = req.body.edad;

  res.send("Paciente modificado");
}

function eliminarPaciente(req, res) {
  const pacienteEliminado = pacientes.findIndex(
    paciente => paciente.nombre === req.params.nombre
  );

  pacientes.splice(pacienteEliminado, 1);

  res.send("Paciente eliminado");
}

module.exports = {
  listarPacientes,
  buscarPaciente,
  agregarPaciente,
  modificarPaciente,
  eliminarPaciente
};
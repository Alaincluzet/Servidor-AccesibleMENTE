const express = require("express");
const router = express.Router();

const {
  listarPacientes,
  buscarPaciente,
  agregarPaciente,
  modificarPaciente,
  eliminarPaciente
} = require("../controllers/pacientes.controller");

router.get("/", listarPacientes);
router.get("/:nombre", buscarPaciente);
router.post("/", agregarPaciente);
router.put("/:nombre", modificarPaciente);
router.delete("/:nombre", eliminarPaciente);

module.exports = router;
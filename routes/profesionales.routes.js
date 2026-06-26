const express = require("express");
const router = express.Router();

const {
  listarProfesionales,
  buscarProfesional,
  agregarProfesional,
  modificarProfesional,
  eliminarProfesional
} = require("../controllers/profesionales.controller");

router.get("/", listarProfesionales);
router.get("/:nombre", buscarProfesional);
router.post("/", agregarProfesional);
router.put("/:nombre", modificarProfesional);
router.delete("/:nombre", eliminarProfesional);

module.exports = router;
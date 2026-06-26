const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarios = require("../data/usuarios");

const CLAVE_SECRETA = "accesiblemente_clave_secreta";

async function registrar(req, res) {
  const { tipo, nombre, email, cedula, password } = req.body;
  if (!tipo || !nombre || !password) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }
  if (tipo !== "paciente" && tipo !== "profesional") {
    return res.status(400).json({ mensaje: "Tipo de usuario inválido" });
  }
  if (tipo === "paciente" && !email) {
    return res.status(400).json({ mensaje: "El paciente debe tener mail" });
  }
  if (tipo === "profesional" && !cedula) {
    return res
      .status(400)
      .json({ mensaje: "El profesional debe tener cédula" });
  }

  const usuarioExistente = usuarios.find((usuario) => {
    if (tipo === "paciente") {
      return usuario.email === email && usuario.tipo === "paciente";
    }
    if (tipo === "profesional") {
      return usuario.cedula === cedula && usuario.tipo === "profesional";
    }
  });
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: "El usuario ya existe" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevoUsuario = {
    id: usuarios.length + 1,
    tipo,
    nombre,
    email: tipo === "paciente" ? email : null,
    cedula: tipo === "profesional" ? cedula : null,
    passwordHash,
    activo: true,
  };

  usuarios.push(nuevoUsuario);
  res.status(201).json({
    mensaje: "Usuario registrado correctamente",
    usuario: {
      id: nuevoUsuario.id,
      tipo: nuevoUsuario.tipo,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      cedula: nuevoUsuario.cedula,
    },
  });
}

async function login(req, res) {
  const { tipo, email, cedula, password } = req.body;

  if (!tipo || !password) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  let usuario;

  if (tipo === "paciente") {
    usuario = usuarios.find(
      (usuario) => usuario.tipo === "paciente" && usuario.email === email,
    );
  }
  if (tipo === "profesional") {
    usuario = usuarios.find(
      (usuario) => usuario.tipo === "profesional" && usuario.cedula === cedula,
    );
  }

  if (!usuario) {
    return res.status(401).json({ mensaje: "Datos incorrectos" });
  }
  const passwordCorrecta = await bcrypt.compare(password, usuario.passwordHash);
  if (!passwordCorrecta) {
    return res.status(401).json({ mensaje: "Datos incorrectos" });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      tipo: usuario.tipo,
    },
    CLAVE_SECRETA,
    { expiresIn: "1h" },
  );

  res.json({
    mensaje: "Inicio de sesión correcto",
    token,
    usuario: {
      id: usuario.id,
      tipo: usuario.tipo,
      nombre: usuario.nombre,
      email: usuario.email,
      cedula: usuario.cedula,
    },
  });
}
module.exports = {
  registrar,
  login,
};

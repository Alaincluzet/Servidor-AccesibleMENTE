const express = require("express");
const app = express();

const pacientesRoutes = require("./routes/pacientes.routes");
const profesionalesRoutes = require("./routes/profesionales.routes");
const authRoutes = require("./routes/auth.routes");
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/pacientes", pacientesRoutes);
app.use("/profesionales", profesionalesRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

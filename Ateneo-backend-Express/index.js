//Configuración del servidor
const app = require("./src/app");

// Variables de entorno
require('dotenv').config();
const { PORT } = process.env;

// Para levantar el servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
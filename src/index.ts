require("dotenv").config();
import MySQL from "./mysql/mysql";
import router from "./router/router";
import Server from "./server/server";

const port: number = Number(process.env.PORT);

const server = Server.init(port);
server.app.use(router);

//const mysql = new MySQL();

MySQL.intance;

server.start(() => {
  console.log(`Servidor Corriendo en el Puerto ${port} `);
});

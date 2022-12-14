"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mysql_1 = __importDefault(require("./mysql/mysql"));
const router_1 = __importDefault(require("./router/router"));
const server_1 = __importDefault(require("./server/server"));
const port = Number(process.env.PORT);
const server = server_1.default.init(port);
server.app.use(router_1.default);
//const mysql = new MySQL();
mysql_1.default.intance;
server.start(() => {
    console.log(`Servidor Corriendo en el Puerto ${port} `);
});

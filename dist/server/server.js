"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.middlewares();
    }
    middlewares() {
        //* Lectura y Parseo del Body
        this.app.use(express.json());
        //* Permite analizar el cuerpo de la solicitud con contenido
        this.app.use(express.urlencoded({ extended: true }));
    }
    static init(port) {
        return new Server(port);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, "../public");
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback());
        this.publicFolder();
    }
}
exports.default = Server;

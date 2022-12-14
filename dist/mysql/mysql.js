"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2/promise");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase Inicializada");
        this.connection = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });
        this.conectarDB();
    }
    static get intance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.intance.connection.query(query);
        });
    }
    conectarDB() {
        // this.connection.getConnection((err) => {
        //   if (err) {
        //     console.log(err.message);
        //     return;
        //   }
        //   this.conectado = true;
        //   console.log("Base de Datos Online");
        // });
        this.connection.getConnection();
    }
}
exports.default = MySQL;

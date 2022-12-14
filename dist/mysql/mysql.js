"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase Inicializada");
        this.connection = mysql.createConnection({
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
    static ejecutarQuery(query, callback) {
        this.intance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log("Error en Query");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("El Registro Solicitado no existe!");
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log("Base de Datos Online");
        });
    }
}
exports.default = MySQL;

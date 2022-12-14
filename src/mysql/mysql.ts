import { Connection } from "mysql";
import mysql = require("mysql2/promise");

export default class MySQL {
  //* Patron singleton -> Crear unica instanciá

  //Mismo tipo de la clase
  private static _instance: MySQL;

  connection: mysql.Pool;
  conectado: boolean = false;

  constructor() {
    console.log("Clase Inicializada");

    this.connection = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    this.conectarDB();
  }

  public static get intance() {
    return this._instance || (this._instance = new this());
  }

  static async ejecutarQuery(query: string) {
    this.intance.connection.query(query);
  }

  private conectarDB() {
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

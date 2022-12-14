import mysql = require("mysql2");

export default class MySQL {
  //* Patron singleton -> Crear unica instanciá

  //Mismo tipo de la clase
  private static _instance: MySQL;

  connection: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log("Clase Inicializada");

    this.connection = mysql.createConnection({
      host: "localhost",
      user: "node_user",
      password: "123456",
      database: "node_db",
    });

    this.conectarDB();
  }

  public static get intance() {
    return this._instance || (this._instance = new this());
  }

  static ejecutarQuery(query: string, callback: Function) {
    this.intance.connection.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log("Error en Query");
        console.log(err);
        return callback(err);
      }
      if (results.length === 0) {
        callback("El Registro Solicitado no existe!");
      } else {
        callback(null, results);
      }
    });
  }

  private conectarDB() {
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
//*OBTENER TODO
router.get("/heroes", (req, res) => {
    const query = `
    SELECT * FROM heroes
  `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err,
            });
        }
        else {
            res.json({
                ok: true,
                heroes,
            });
        }
    });
});
//*OBTENER POR ID
router.get("/heroes/:id", [(0, express_validator_1.check)("id", "El Id es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const escapeID = mysql_1.default.intance.connection.escape(id);
    const query = `
    SELECT * FROM heroes where id = ${escapeID}
  `;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err,
            });
        }
        else {
            res.json({
                ok: true,
                heroe: heroe[0],
            });
        }
    });
});
//*AGREGAR
router.post("/heroes", [(0, express_validator_1.check)("nombre", "El Nombre es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => {
    const { nombre, poder } = req.body;
    const query = `
    INSERT INTO heroes(nombre,poder)
    VALUES('${nombre}', '${poder}');
  `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err,
            });
        }
        else {
            res.json({
                ok: true,
                heroes,
            });
        }
    });
});
//*EDITAR
router.put("/heroes/:id", [(0, express_validator_1.check)("nombre", "El Nombre es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => {
    const id = req.params.id;
    const { nombre, poder } = req.body;
    const query = `
    UPDATE heroes
    SET nombre = '${nombre}', poder = '${poder}'
    WHERE id=${id};
  `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err,
            });
        }
        else {
            res.json({
                ok: true,
                heroes,
            });
        }
    });
});
//*ELIMINAR
router.delete("/heroes/:id", [(0, express_validator_1.check)("id", "El Id es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => {
    const id = req.params.id;
    const query = `
    DELETE FROM heroes WHERE id=${id};
  `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err,
            });
        }
        else {
            res.json({
                ok: true,
                heroes,
            });
        }
    });
});
exports.default = router;

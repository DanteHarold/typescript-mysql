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
router.get("/heroes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM heroes
  `;
    yield mysql_1.default.intance.connection
        .query(query)
        .then((data) => {
        res.status(400).json({
            ok: true,
            data: data[0],
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
}));
//*OBTENER POR ID
router.get("/heroes/:id", [(0, express_validator_1.check)("id", "El Id es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    // const escapeID = await MySQL.intance.connection.(id);
    const query = `
    SELECT * FROM heroes where id = ${id}
  `;
    yield mysql_1.default.intance.connection
        .query(query)
        .then((data) => {
        res.status(400).json({
            ok: true,
            data: data[0],
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
}));
//*AGREGAR
router.post("/heroes", [(0, express_validator_1.check)("nombre", "El Nombre es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, poder } = req.body;
    const query = `
    INSERT INTO heroes(nombre,poder)
    VALUES('${nombre}', '${poder}');
  `;
    yield mysql_1.default.intance.connection
        .query(query)
        .then((data) => {
        res.status(400).json({
            ok: true,
            data: data[0],
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
}));
//*EDITAR
router.put("/heroes/:id", [(0, express_validator_1.check)("nombre", "El Nombre es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { nombre, poder } = req.body;
    const query = `
    UPDATE heroes
    SET nombre = '${nombre}', poder = '${poder}'
    WHERE id=${id};
  `;
    yield mysql_1.default.intance.connection
        .query(query)
        .then((data) => {
        res.status(400).json({
            ok: true,
            data: data[0],
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
}));
//*ELIMINAR
router.delete("/heroes/:id", [(0, express_validator_1.check)("id", "El Id es Obligatorio").not().isEmpty(), validar_campos_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = `
    DELETE FROM heroes WHERE id=${id};
  `;
    yield mysql_1.default.intance.connection
        .query(query)
        .then((data) => {
        res.status(400).json({
            ok: true,
            data: data[0],
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
}));
exports.default = router;

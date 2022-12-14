import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";

import validarCampos from "../middlewares/validar-campos";
import { check } from "express-validator";
const router = Router();

//*OBTENER TODO
router.get("/heroes", (req: Request, res: Response) => {
  const query = `
    SELECT * FROM heroes
  `;
  MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        heroes,
      });
    }
  });
});
//*OBTENER POR ID
router.get(
  "/heroes/:id",
  [check("id", "El Id es Obligatorio").not().isEmpty(), validarCampos],
  (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const escapeID = MySQL.intance.connection.escape(id);
    const query = `
    SELECT * FROM heroes where id = ${escapeID}
  `;

    MySQL.ejecutarQuery(query, (err: any, heroe: Object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          heroe: heroe[0],
        });
      }
    });
  }
);
//*AGREGAR
router.post(
  "/heroes",
  [check("nombre", "El Nombre es Obligatorio").not().isEmpty(), validarCampos],
  (req: Request, res: Response) => {
    const { nombre, poder } = req.body;
    const query = `
    INSERT INTO heroes(nombre,poder)
    VALUES('${nombre}', '${poder}');
  `;
    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          heroes,
        });
      }
    });
  }
);
//*EDITAR
router.put(
  "/heroes/:id",
  [check("nombre", "El Nombre es Obligatorio").not().isEmpty(), validarCampos],
  (req: Request, res: Response) => {
    const id = req.params.id;
    const { nombre, poder } = req.body;
    const query = `
    UPDATE heroes
    SET nombre = '${nombre}', poder = '${poder}'
    WHERE id=${id};
  `;
    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          heroes,
        });
      }
    });
  }
);
//*ELIMINAR
router.delete(
  "/heroes/:id",
  [check("id", "El Id es Obligatorio").not().isEmpty(), validarCampos],
  (req: Request, res: Response) => {
    const id = req.params.id;
    const query = `
    DELETE FROM heroes WHERE id=${id};
  `;
    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          heroes,
        });
      }
    });
  }
);
export default router;

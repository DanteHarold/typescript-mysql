import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";

import validarCampos from "../middlewares/validar-campos";
import { check } from "express-validator";
const router = Router();

//*OBTENER TODO
router.get("/heroes", async (req: Request, res: Response) => {
  const query = `
    SELECT * FROM heroes
  `;
  await MySQL.intance.connection
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
});
//*OBTENER POR ID
router.get(
  "/heroes/:id",
  [check("id", "El Id es Obligatorio").not().isEmpty(), validarCampos],
  async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    // const escapeID = await MySQL.intance.connection.(id);
    const query = `
    SELECT * FROM heroes where id = ${id}
  `;

    await MySQL.intance.connection
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
  }
);
//*AGREGAR
router.post(
  "/heroes",
  [check("nombre", "El Nombre es Obligatorio").not().isEmpty(), validarCampos],
  async (req: Request, res: Response) => {
    const { nombre, poder } = req.body;
    const query = `
    INSERT INTO heroes(nombre,poder)
    VALUES('${nombre}', '${poder}');
  `;
    await MySQL.intance.connection
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
  }
);
//*EDITAR
router.put(
  "/heroes/:id",
  [check("nombre", "El Nombre es Obligatorio").not().isEmpty(), validarCampos],
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { nombre, poder } = req.body;
    const query = `
    UPDATE heroes
    SET nombre = '${nombre}', poder = '${poder}'
    WHERE id=${id};
  `;
    await MySQL.intance.connection
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
  }
);
//*ELIMINAR
router.delete(
  "/heroes/:id",
  [check("id", "El Id es Obligatorio").not().isEmpty(), validarCampos],
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const query = `
    DELETE FROM heroes WHERE id=${id};
  `;
    await MySQL.intance.connection
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
  }
);
export default router;

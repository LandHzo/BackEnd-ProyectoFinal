import Router from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Autenticar:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              - username
 *              - password
 *          example:
 *              username: katialand
 *              password: katialand
 *      res:
 *          type: object
 *          properties:
 *              mensaje:
 *                  type: string
 *              token:
 *                  type: string
 *          example:
 *              mensaje: Usuario autenticado
 *              password: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDk1NjU4NmNkNjFiN2IwNGFmYmVlMCIsImlhdCI6MTYzMjI0NzIyOSwiZXhwIjoxNjMyMzMzNjI5fQ.17caPgAzooObo-TawOiO5xFmAfcOmpgTfUadkS-G9S0
 */

/**
 * @swagger
 * tags:
 *  name: Autenticacion
 *  description: Generacion de tokens de accesos
 */

/**
 * @swagger
 * /autenticacion:
 *  post:
 *      summary: Generar un nuevo token
 *      tags: [Autenticacion]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Autenticar'
 *      responses:
 *          200:
 *              description: El token fue generado con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/res'
 *          500:
 *              description: Ocurrio un error
 *
 */
router.post("/autenticacion", usuarioController.autenticar);

export default router;

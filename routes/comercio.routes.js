import Router from "express";
import comercioController from "../controllers/comercioController.js";
import validarRoles from "../middleware/validar-roles.js";

const router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: basic
 *          bearerFormat: JWT
 *  security:
 *      - bearerAuth: []
 *  parameters:
 *      token:
 *          in: header
 *          name: token
 *          schema:
 *              type: string
 *              format: JWT
 *          required: true
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGE0ZjhhYjc5Y2U3NDYwYzZjZmUwZSIsImlhdCI6MTYzMjI2MDM5MSwiZXhwIjoxNjMyMzQ2NzkxfQ.27nBbj80aP_v7mvHLPz2U1bnwXD8qMVIOFlYg6NvtHI
 *      idComercio:
 *          in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 614956586cd61b7b04afbee0
 *          description: id del Comercio
 *  schemas:
 *      Comercio:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              latitud:
 *                  type: string
 *              longitud:
 *                  type: string
 *              nombre:
 *                  type: string
 *              nombrePropietario:
 *                  type: string
 *              telefono:
 *                  type: string
 *              categoria:
 *                  type: string
 *              descripcion:
 *                  type: string
 *              direccion:
 *                  type: string
 *          required:
 *              - latitud
 *              - longitud
 *              - nombre
 *              - nombrePropietario
 *              - telefono
 *              - categoria
 *              - descripcion
 *              - direccion
 *          example:
 *              _id: 614a3d3c15911e0f15e80c99
 *              latitud: 38.8951
 *              longitud: 38.8951
 *              nombre: El sope
 *              nombrePropietario: Josue
 *              telefono: 78526545
 *              categoria: Comida Mexicana
 *              descripcion: descripcion random
 *              direccion: Chalatenango
 */

/**
 * @swagger
 * tags:
 *  name: Comercios
 *  description: Operaciones de comercios
 */

/**
 * @swagger
 * /comercios:
 *  get:
 *      summary: Devuelve el listado de comercios
 *      tags: [Comercios]
 *      parameters:
 *        - $ref: '#/components/parameters/token'
 *      responses:
 *          200:
 *              description: Lista de comercios
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Comercio'
 *          500:
 *              description: Ocurrio un error
 */

router.get("/", validarRoles(["ver"]), comercioController.listado);

/**
 * @swagger
 * /comercios/{id}:
 *  get:
 *      summary: Obtienen un Comercio mediante su id
 *      tags: [Comercios]
 *      parameters:
 *        - $ref: '#/components/parameters/idComercio'
 *        - $ref: '#/components/parameters/token'
 *      responses:
 *          200:
 *              description: La descripcion del comercio
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comercio'
 *          404:
 *              description: El comercio no fue encontrado
 *          500:
 *              description: Ocurrio un error
 *
 */
router.get("/:id", validarRoles(["ver"]), comercioController.uno);

/**
 * @swagger
 * /comercios:
 *  post:
 *      summary: Crear un nuevo comercio
 *      tags: [Comercios]
 *      parameters:
 *        - $ref: '#/components/parameters/token'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comercio'
 *      responses:
 *          201:
 *              description: El comercio se creo exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comercio'
 *          500:
 *              description: Ocurrio un error
 *
 */

router.post("/",validarRoles(["crear"]), comercioController.registrar);

/**
 * @swagger
 * /comercios/{id}:
 *  put:
 *      summary: Actualiza el comercio mediante su id
 *      tags: [Comercios]
 *      parameters:
 *        - $ref: '#/components/parameters/idComercio'
 *        - $ref: '#/components/parameters/token'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comercio'
 *      responses:
 *          200:
 *              description: El comercio se creo exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comercio'
 *          500:
 *              description: ocurrio un error
 */

router.put("/:id", validarRoles(["editar"]), comercioController.actualizar);

/**
 * @swagger
 * /comercios/{id}:
 *  delete:
 *      summary: Elimina un comercio mediante su id
 *      tags: [Comercios]
 *      parameters:
 *        - $ref: '#/components/parameters/idComercio'
 *        - $ref: '#/components/parameters/token'
 *      responses:
 *          200:
 *              description: Comercio eliminado
 *          404:
 *              description: El comercio no fue encontrado
 *          500:
 *              description: ocurrio un error
 *
 */

router.delete("/:id", validarRoles(["eliminar"]), comercioController.eliminar);

export default router;

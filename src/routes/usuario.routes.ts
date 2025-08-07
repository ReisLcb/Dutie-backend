import { Router } from "express";
import { UsuarioController } from "../controller/usuario-controller";

const router = Router()

//Métodos GET
router.get("/usuarios", UsuarioController.getAll)
router.get("/usuarios/id/:id", UsuarioController.getById)
router.get("/usuarios/username/:nome_de_usuario", UsuarioController.getByUserName)
router.get("/usuarios/login/:nome_de_usuario/:senha", UsuarioController.login)

//Métodos POST e PUT
router.post("/usuarios", UsuarioController.create)
router.put("/usuarios/update/:id", UsuarioController.update)

//Método delete
router.delete("/usuarios/delete/:id", UsuarioController.delete)

export default router

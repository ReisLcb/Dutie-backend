import { Router } from "express";
import { UsuarioController } from "../controller/usuario-controller";

const router = Router()

//Métodos GET
router.get("/usuarios", UsuarioController.getAll)

//Métodos POST e PUT
router.post("/usuarios", UsuarioController.create)

export default router


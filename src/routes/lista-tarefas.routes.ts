import { Router } from "express";
import { ListaTarefasController } from "../controller/lista-tarefas-controller";

const router = Router()

// Métodos GET
router.get("/listaTarefas", ListaTarefasController.getAll)
router.get("/listaTarefas/id/:id", ListaTarefasController.getById)
router.get("/listaTarefas/titulo/:titulo", ListaTarefasController.getByName)
router.get("/listaTarefas/usuario/:usuario_id", ListaTarefasController.getByUserId)
router.get("/listaTarefas/tarefas/:id", ListaTarefasController.getTarefasLista)

// Método POST
router.post("/listaTarefas", ListaTarefasController.create)

// Método PUT
router.put("/listaTarefas/update/:id", ListaTarefasController.update)

// Método DELETE
router.delete("/listaTarefas/delete/:id", ListaTarefasController.delete)

export default router
import { Router } from "express";
import { TarefaController } from "../controller/task-controller";

const router = Router()

// Métodos GET
router.get("/tarefas", TarefaController.getAll)
router.get("/tarefas/nome/:nome", TarefaController.getByName)
router.get("/tarefas/id/:id", TarefaController.getById)

// Método POST
router.post("/tarefas", TarefaController.create)

// Método PUT
router.put("/tarefas/update/:id", TarefaController.update)

// Método DELETE
router.delete("/tarefas/delete/:id", TarefaController.delete)

export default router
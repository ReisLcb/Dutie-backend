import express from "express";
import cors from 'cors'
import UsuarioRotas from './routes/usuario.routes'
import TarefaRotas from './routes/tarefa.routes'
import ListaTarefasRotas from './routes/lista-tarefas.routes'
import { errorHandler } from "./middlewares/errorHandler";

const app = express()
const porta = 3000

app.use(express.json())
app.use(cors())
app.use("/", UsuarioRotas)
app.use("/", TarefaRotas)
app.use("/", ListaTarefasRotas)
app.use(errorHandler)

app.listen(porta, () =>{
    console.log(`Servidor iniciado em http://localhost:${porta}`)
})
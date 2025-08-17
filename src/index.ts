import express from "express";
import cors from 'cors'
import UsuarioRotas from './routes/usuario.routes'

const app = express()
const porta = 3000

app.use(express.json())
app.use(cors())
app.use("/", UsuarioRotas)

app.listen(porta, () =>{
    console.log(`Servidor iniciado em http://localhost:${porta}`)
})
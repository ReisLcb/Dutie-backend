import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const UsuarioController = {
  async getAll(req:Request, res:Response):Promise<any>{
    try{
      const usuarios = await prisma.usuario.findMany()
      return res.status(200).json(usuarios)
    }catch(erro){ 
      return res.status(400).json("Erro ao buscar usuários")
    }
  },

  async getById(req:Request, res:Response):Promise<any>{
    try{
      const { id } = req.params

      // Na próxima aula
    }catch(erro){
      return res.status(400).json("Erro ao buscar aluno")
    }
  },

  async create(req:Request, res:Response):Promise<any>{
    try{
      const { nome, nome_de_usuario, email, senha } = req.body

      const usuario = await prisma.usuario.create({
        data:{
          nome,
          nome_de_usuario,
          email,
          senha
        }
      })

      // Verificar se já existe um usuário com o mesmo nome de usuário ou email

      return res.status(200).json("Usuario criado com sucesso")
    }catch(erro){
      return res.status(400).json("Erro ao criar aluno")
    }
  }
}

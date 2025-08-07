import { NextFunction, Request, Response } from "express";
import { Usuario } from "../modelos/usuario";
import { HttpError } from "../errors/HttpError";
import { ListaTarefasController } from "./lista-tarefas-controller";

let proxId:number = 1
const usuarios:Usuario[] = []

export const UsuarioController = {
    async getAll(requisicao:Request, resposta:Response):Promise<any>{
        return resposta.status(200).json(usuarios)
    },

    async getById(requisicao:Request, resposta:Response, proximo:NextFunction):Promise<any>{
      try{
        const { id } = requisicao.params

        if(id && !isNaN(parseInt(id))){
            const usuarioBusca:Usuario|undefined = usuarios.find((user) => user.id == parseInt(id))

            if(usuarioBusca) return resposta.status(200).json(usuarioBusca)
            else throw new HttpError("Usuário não encontrado", 404)
        } else throw new HttpError("Id inválido", 400)
      } catch(erro){
        proximo(erro)
      }
    },

    async create(requisicao:Request, resposta:Response, proximo:NextFunction):Promise<any>{
      try{
        const { nome, nome_de_usuario, data_nascimento, email, senha } = requisicao.body

        if(nome && nome_de_usuario && email && senha){
          if(!usuarios.find((user) => user.nome_de_usuario.toLocaleUpperCase().includes(nome_de_usuario.toLocaleUpperCase()))){
            if(!usuarios.find((user) => user.email.toLocaleUpperCase().includes(email.toLocaleUpperCase()))){
            const usuario:Usuario = {
                id: proxId++,
                nome,
                data_nascimento,
                nome_de_usuario,
                email,
                senha
              }

              usuarios.push(usuario)
              return resposta.status(201).json(usuario)
            } else throw new HttpError("Esse e-mail já foi cadastrado", 400)
          } else throw new HttpError("Esse nome de usuário já foi cadastrado", 400)

        } else throw new HttpError("Preencha os campos corretamente", 400)
      } catch(erro){
        proximo(erro)
      }
    },

    async login(requisicao:Request, resposta:Response, proximo:NextFunction):Promise<any>{
      try{
        const { nome_de_usuario, senha } = requisicao.params

        if(nome_de_usuario && senha){
          const usuarioBusca = usuarios.find((user) => user.nome_de_usuario == nome_de_usuario && user.senha == senha)

          if(usuarioBusca) return resposta.status(200).json(usuarioBusca)
          else throw new HttpError("Usuário não encontrado", 404)
        } else throw new HttpError("Preencha os campos corretamente", 400)
    } catch(erro){
      proximo(erro)
    }
    },

    async getByUserName(requisicao:Request, resposta:Response, proximo:NextFunction):Promise<any>{
      try{
        const { nome_de_usuario } = requisicao.params

        if(nome_de_usuario){
          const usuariosBuscados:Usuario[] = usuarios.filter((user) => user.nome_de_usuario.toLocaleUpperCase().includes(nome_de_usuario.toLocaleUpperCase()))

          if(usuariosBuscados.length > 0) return resposta.status(200).json(usuariosBuscados)
          else throw new HttpError("Não há usuários com esse nome", 404)
        } else throw new HttpError("O nome deve ser informado", 400)
      }catch(erro){
        proximo(erro)
      }
    },

    async update(requisicao:Request, resposta:Response, proximo:NextFunction):Promise<any>{
      try{
        const { id } = requisicao.params
        const { nome, nome_de_usuario, data_nascimento, email, senha } = requisicao.body

        if(id && !isNaN(parseInt(id))){
            let usuarioBuscaIndice:number | undefined = usuarios.findIndex((user) => user.id == parseInt(id))

            if(usuarioBuscaIndice != -1 || usuarioBuscaIndice != undefined){
              if(!usuarios.find(user => user.nome_de_usuario.toUpperCase() == nome_de_usuario.toUpperCase() && user.id != parseInt(id))){
                if(!usuarios.find(user => user.email.toUpperCase() == email.toUpperCase() && user.id != parseInt(id))){
                usuarios[usuarioBuscaIndice] = {
                    id: parseInt(id),
                    nome,
                    data_nascimento,
                    nome_de_usuario,
                    email,
                    senha
                }
                return resposta.status(200).json(usuarios[usuarioBuscaIndice])
                } else throw new HttpError("Opa! Este E-mail já está sendo usado", 400)
              } else throw new HttpError("Opa! Este nome de usuário já está sendo usado", 400)
            } else throw new HttpError("Usuário não encontrado", 404)
        } else throw new HttpError("Id inválido", 400)
      } catch(erro){
        proximo(erro)
      }
    },

    async delete(requisicao:Request, resposta:Response, proximo:NextFunction):Promise<any>{
      try{
        const { id } = requisicao.params

        if(id && !isNaN(parseInt(id))){
            const usuarioBuscaIndice:number|undefined = usuarios.findIndex((user) => user.id == parseInt(id))

            if(usuarioBuscaIndice != -1 && usuarioBuscaIndice != undefined){
                usuarios.splice(usuarioBuscaIndice, 1)

                for(let lista of ListaTarefasController.retornarListas()){
                  if(lista.id == parseInt(id)){
                    ListaTarefasController.excluirTarefas(ListaTarefasController.buscaIdVetorListaTarefasId(lista.id)!.id) // Tem que ver se vai funcionar

                    ListaTarefasController.retornarListas().splice(ListaTarefasController.retornarListas().indexOf(lista), 1)
                  }
                }

                return resposta.status(200).json(usuarios)
            } throw new HttpError("Usuário não encontrado", 404)
        } else throw new HttpError("Id inválido", 400)
      } catch(erro){
        proximo(erro)
      }
    },

    buscaIdVetorUsuarioId(id:number): Usuario|undefined{
        let retorno:Usuario|undefined = usuarios.find(item => item.id == id)
        return retorno
    }
}
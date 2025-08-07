import { NextFunction, Request, Response } from "express";
import { Lista_tarefas } from "../modelos/lista-tarefas";
import { Tarefa } from "../modelos/tarefa";
import { HttpError } from "../errors/HttpError";
import { TarefaController } from "./task-controller";
import { UsuarioController } from "./usuario-controller";

let proxId = 1
let listasTarefas:Lista_tarefas[] = []

export const ListaTarefasController = {
    async getAll(req:Request, res:Response):Promise<any>{
        return res.status(200).json(listasTarefas)
    },

    async getById(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { id } = req.params

        if(id && !isNaN(parseInt(id))){
                let listaProcurada:Lista_tarefas|undefined = listasTarefas.find(list => list.id == parseInt(id))

                if(listaProcurada) return res.status(200).json(listaProcurada)
                else throw new HttpError("Lista não encontrada", 404)
        } else throw new HttpError("Id inválido", 400)
        }catch(erro){
            proximo(erro)
        }
    },

    async getByUserId(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { usuario_id } = req.params

        if(usuario_id && !isNaN(parseInt(usuario_id))){
                let listaProcurada:Lista_tarefas|undefined = listasTarefas.find(list => list.usuario_id == parseInt(usuario_id))

                if(listaProcurada) return res.status(200).json(listaProcurada)
                else throw new HttpError("Não há uma lista associada à esse usuário", 404)
        } else throw new HttpError("Id inválido", 400)
        }catch(erro){
            proximo(erro)
        }
    },

    async getTarefasLista(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { id } = req.params

        if(id && !isNaN(parseInt(id))){
                if(ListaTarefasController.buscaIdVetorListaTarefasId(parseInt(id))){
                    let tarefasPertecentesLista:Tarefa[] = TarefaController.retornarTarefas().filter(task => task.lista_tarefas_id == parseInt(id))
    
                    if(tarefasPertecentesLista.length > 0) return res.status(200).json(tarefasPertecentesLista)
                    else throw new HttpError("Não há nenhuma tarefa nesta lista", 404)
                } else throw new HttpError("Não há nenhuma lista com esse id", 404)
        } else throw new HttpError("Id inválido", 400)
        } catch(erro){
            proximo(erro)
        }
    },

    async getByName(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { titulo } = req.params

            if(titulo){
                let listasProcuradas:Lista_tarefas[] = listasTarefas.filter(list => list.titulo.toLocaleUpperCase().includes(titulo.toLocaleUpperCase()))

                if(listasProcuradas.length > 0){
                    return res.status(200).json(listasTarefas)
                } else throw new HttpError("Não há listas com esse título", 404)
            } else throw new HttpError("O nome deve ser fornecido", 400)
        } catch(erro){
            proximo(erro)
        }
    },

    async create(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { usuario_id, titulo, descricao, data_criacao, visibilidade } = req.body

            if(usuario_id && titulo && descricao && data_criacao && data_criacao && visibilidade){
                let listaTarefasUsuario:Lista_tarefas[] = listasTarefas.filter(list => list.usuario_id == parseInt(usuario_id))

                if(!listaTarefasUsuario.find(list => list.titulo == titulo)){
                if(UsuarioController.buscaIdVetorUsuarioId(parseInt(usuario_id))){
                    let lista:Lista_tarefas = {
                        id: proxId++,
                        usuario_id: usuario_id,
                        titulo: titulo,
                        descricao: descricao,
                        data_criacao: data_criacao,
                        data_ultima_alteracao: data_criacao,
                        visibilidade: visibilidade
                    }

                    listasTarefas.push(lista)
                    return res.status(200).json(lista)
                } else throw new HttpError("Não existe um usuário com esse id", 400)
                } else throw new HttpError("Já existe uma lista com esse título", 400)
            } else throw new HttpError("Preencha os campos corretamente", 400)
        } catch(erro){
            proximo(erro)
        }
    },

    async update(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { id } = req.params
            let { usuario_id, titulo, descricao, data_criacao, data_ultima_alteracao, visibilidade } = req.body

        if(id && !isNaN(parseInt(id))){
                let indiceListaProcurada:number|undefined = listasTarefas.findIndex(list => list.id == parseInt(id))

                if(indiceListaProcurada != -1 || indiceListaProcurada != undefined){
                    if(titulo && descricao && data_criacao && data_criacao && visibilidade){
                        if(usuario_id && ListaTarefasController.buscaIdVetorListaTarefasId(parseInt(id))?.id){
                            listasTarefas[indiceListaProcurada] = {
                                id: parseInt(id),
                                usuario_id,
                                titulo,
                                descricao,
                                data_criacao,
                                data_ultima_alteracao,
                                visibilidade
                            }
                            return res.status(200).json(listasTarefas[indiceListaProcurada])
                        } else throw new HttpError("O código do usuário não pode ser alterado", 401)
                    } else throw new HttpError("Preencha os campos corretamente", 400)
                } else throw new HttpError("Lista não encontrada", 400)
        } else throw new HttpError("Id inválido", 400)
        }catch(erro){
            proximo(erro)
        }
    },

    async delete(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { id } = req.params

        if(id && !isNaN(parseInt(id))){
                let indiceListaProcurada:number|undefined = listasTarefas.findIndex(list => list.id == parseInt(id)) 

                if(indiceListaProcurada != -1 || indiceListaProcurada != undefined){
                     let listaTarefasLista:Tarefa[] = TarefaController.retornarTarefas().filter(task => task.lista_tarefas_id == parseInt(id))

                     for(let tarefa of listaTarefasLista){
                        if(tarefa.lista_tarefas_id == parseInt(id)) TarefaController.retornarTarefas().splice(TarefaController.retornarTarefas().indexOf(tarefa), 1)
                     }

                    listasTarefas.splice(indiceListaProcurada, 1)
                    return res.status(200).json(listasTarefas)
                } else throw new HttpError("Lista não encontrada", 404)
        } else throw new HttpError("Id inválido", 400)
        } catch(erro){
            proximo(erro)
        }
    },

    async excluirTarefas(id:number){
        for(let tarefa of TarefaController.retornarTarefas()){
            if(tarefa.lista_tarefas_id == id){
                TarefaController.retornarTarefas().splice(TarefaController.retornarTarefas().indexOf(tarefa), 1)
            }
        }
    },

    retornarListas(){
        return listasTarefas
    },

    buscaIdVetorListaTarefasId(id:number): Lista_tarefas|undefined{
        let retorno:Lista_tarefas|undefined = listasTarefas.find(item => item.id == id)
        return retorno
    }
}
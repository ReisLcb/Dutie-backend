import { NextFunction, Request, Response } from "express";
import { Tarefa } from "../modelos/tarefa";
import { HttpError } from "../errors/HttpError";
import { ListaTarefasController } from "./lista-tarefas-controller";

let proxId = 1
let tarefas:Tarefa[] = []

export const TarefaController = {
    async getAll(req:Request, res:Response):Promise<any>{
        return res.status(200).json(tarefas)
    },

    async getById(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { id } = req.params

        if(id && !isNaN(parseInt(id))){
                let tarefaPRocurada:Tarefa|undefined = tarefas.find((task) => task.codigo == parseInt(id))

                if(tarefaPRocurada) return res.status(200).json(tarefaPRocurada)
                else throw new HttpError("Tarefa não encontrada", 404)
        } else throw new HttpError("Id inválido", 400)
        } catch(erro){
            proximo(erro)
        }
    },

    async getByName(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { nome } = req.params

            if(nome){
                let tarefasProcuradas:Tarefa[]|undefined = tarefas.filter((task) => task.nome.toLocaleUpperCase().includes(nome.toLocaleLowerCase()))

                if(tarefasProcuradas.length > 0) return res.status(200).json(tarefasProcuradas)
                else throw new HttpError("Não foi encontrada nenhuma tarefa com esse título", 404)
            } throw new HttpError("O título da tarefa deve ser fornecido", 400)
        }catch(erro){
            proximo(erro)
        }
    },

    async create(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { lista_tarefas_id, nome, descricao, prioridade, status } = req.body

            if(lista_tarefas_id && nome && descricao && prioridade && status){
                if(ListaTarefasController.buscaIdVetorListaTarefasId(parseInt(lista_tarefas_id)) != undefined){
                    let tarefa:Tarefa = {
                        codigo: proxId++,
                        lista_tarefas_id: lista_tarefas_id,
                        nome: nome,
                        descricao: descricao,
                        prioridade: prioridade,
                        status:status
                    }

                    tarefas.push(tarefa)
                    return res.status(201).json(tarefa)
                } else throw new HttpError("Não existe uma lista com esse id", 404)
            } else throw new HttpError("Preencha os campos corretamente", 400)
        }catch(erro){
            proximo(erro)
        }
    },

    async update(req:Request, res:Response, proximo:NextFunction):Promise<any>{
         try{
            let { id } = req.params
            let { lista_tarefas_id, nome, descricao, prioridade, status } = req.body

        if(id && !isNaN(parseInt(id))){
                let indiceTarefaProcurada:number|undefined = tarefas.findIndex((task) => task.codigo == parseInt(id))

                if(indiceTarefaProcurada != -1 || indiceTarefaProcurada != undefined){
                    if(nome && descricao && prioridade && status){
                        if(lista_tarefas_id == ListaTarefasController.buscaIdVetorListaTarefasId(parseInt(lista_tarefas_id))?.id){
                            tarefas[indiceTarefaProcurada] = {
                                codigo: parseInt(id),
                                lista_tarefas_id,
                                nome,
                                descricao,
                                prioridade,
                                status
                            }
                            return res.status(200).json(tarefas[indiceTarefaProcurada])
                        } else throw new HttpError("O código da lista não pode ser alterado", 401)
                    } else throw new HttpError("Preencha os campos corretamente", 400)
                } else throw new HttpError("Tarefa não encontrada", 400)
        } else throw new HttpError("Id inválido", 400)
         }catch(erro){
            proximo(erro)
         }
    },

    async delete(req:Request, res:Response, proximo:NextFunction):Promise<any>{
        try{
            let { id } = req.params

        if(id && !isNaN(parseInt(id))){
                const indiceTarefaProcurada:number|undefined = tarefas.findIndex((task) => task.codigo == parseInt(id))

                if(indiceTarefaProcurada != -1 || indiceTarefaProcurada != undefined){
                    tarefas.splice(indiceTarefaProcurada, 1)
                    return res.status(200).json(tarefas)
                } else throw new HttpError("Tarefa não encontrada", 404)
        } else throw new HttpError("Id inválido", 400)
        }catch(erro){
            proximo(erro)
        }
    },

    retornarTarefas():Tarefa[]{
        return tarefas
    }
}
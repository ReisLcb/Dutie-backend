import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export function errorHandler(error:any, requisicao:Request, resposta:Response, proximo:NextFunction):void{
  console.log(error)

  if(error instanceof HttpError){ //compara a variável e verifica se é uma instância da classe
    resposta.status(error.status).json({ error: error.message })
  } 
  resposta.status(500).json({ error: "Erro interno do servidor" })
}
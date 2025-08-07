export class HttpError extends Error{
  status:number

  constructor(message:string, status:number){
    super(message) // manda pro construtor do pai e recebe o erro do pai
    this.status = status
  }
}
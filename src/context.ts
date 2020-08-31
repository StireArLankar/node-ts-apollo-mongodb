import { Request, Response } from 'express'

export interface IContext {
  customField: string
  req: Request
  res: Response
}

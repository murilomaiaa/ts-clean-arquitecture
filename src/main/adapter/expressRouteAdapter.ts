import { Request, Response } from 'express'

import { HttpRequest } from '../../presentation/protocols'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const { body, statusCode } = await controller.handle(httpRequest)
    res.status(statusCode).json(body)
  }
}

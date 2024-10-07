import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import DOMPurify from 'isomorphic-dompurify';

class ValidationMiddleware {

  private getDirtyInputs(
    req: Request
  ): string[] {
    let dirtyFields: string[] = []
    for (let key of Object.keys(req.body)) {
      let originalString = req.body[key] as string
      let cleanedString = DOMPurify.sanitize(req.body[key]) as string
      if (originalString.length !== cleanedString.length) {
        dirtyFields.push(key)
        console.log(cleanedString)
      }
    }
    return dirtyFields
  }

  /* get the first invalid field 
   * and return the name of the field
   * and why it failed
  */
  private formatInvalidFields(error: Joi.ValidationError) {
    let firstError = error.details[0]
    let message = error.message.replace(/["\\]/g, '')
    message = message[0].toUpperCase() + message.slice(1)
    return {
      invalidField: firstError.path[0],
      reason: message
    }
  }

  private validate = <RequestType>(
    schema: Joi.ObjectSchema<RequestType>
  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
      let { error, value } = schema.validate(req.body)
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json(this.formatInvalidFields(error))
        return
      }
      req.body = value
      next()
    }
  }

  private sanitize = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let dirtyInputs = this.getDirtyInputs(req)
    if (dirtyInputs.length !== 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        dirtyInputs
      })
      return
    }
    next()
  }

  processFormData = (
    schema: Joi.ObjectSchema,
  ) => {
    return [
      this.validate(schema),
      this.sanitize,
    ]
  }
}

export const ValidationMiddlewares = new ValidationMiddleware()
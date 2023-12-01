import log from "@/api/middlewares/log"
import methodNotAllowed from "@/api/middlewares/methodNotAllowed"
import BaseModel from "@/db/models/BaseModel"
import TodoModel from "@/db/models/TodoModel"
import knex from "knex"
import knexfile from "../../knexfile.mjs"

const mw = (handlers) => async (req, res) => {
  const middlewares = handlers[req.method]
  const sanitizedMiddlewares = [log, ...(middlewares || [methodNotAllowed])]
  let currentMiddlewareIndex = 0
  const db = knex(knexfile)

  BaseModel.knex(db)

  const ctx = {
    db,
    models: {
      TodoModel,
    },
    req,
    res,
    next: async () => {
      const middleware = sanitizedMiddlewares[currentMiddlewareIndex]
      currentMiddlewareIndex += 1

      await middleware(ctx)
    },
  }

  await ctx.next()
}

export default mw

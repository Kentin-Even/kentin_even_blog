import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  idValidator,
  usernameValidator,
  roleValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        id: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { id },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(id).throwIfNotFound()

      res.send(user)
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        id: idValidator,
      },
      body: {
        email: emailValidator,
        username: usernameValidator,
        role: roleValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        body,
        query: { id },
      },
      res,
    }) => {
      const updatedUser = await UserModel.query()
        .updateAndFetchById(id, {
          ...body,
          updatedAt: UserModel.fn.now(),
        })
        .throwIfNotFound()

      res.send(updatedUser)
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        id: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { id },
      },
      res,
    }) => {
      const todo = await UserModel.query().findById(id).throwIfNotFound()

      await todo.$query().delete()

      res.send(todo)
    },
  ],
})

export default handle

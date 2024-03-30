import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  activeValidator,
  emailValidator,
  idValidator,
  roleValidator,
  usernameValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      res.send(user)
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
      body: {
        email: emailValidator.optional(),
        user: usernameValidator.optional(),
        role: roleValidator.optional(),
        active: activeValidator.optional(),
      },
    }),
    async ({
      models: { UserModel },
      input: {
        body,
        query: { userId },
      },
      res,
    }) => {
      const updatedUser = await UserModel.query()
        .updateAndFetchById(userId, {
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
        userId: idValidator,
      },
    }),
    async({
      models: { UserModel },
      req: {
        query: { userId },
      },
      res,
    }) => {
    await UserModel.query().findById(userId).throwIfNotFound()

      res.send({message: "Post delete"})
    }
  ],
})
export default handle
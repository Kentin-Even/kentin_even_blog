import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  passwordValidator,
  roleValidator,
  usernameValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        username: usernameValidator,
        email: emailValidator,
        role: roleValidator,
        password: passwordValidator,
      },
    }),
    async ({
      input: {
        body: { email, username, role, password },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insertAndFetch({
        email,
        username,
        role,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],
})

export default handle

import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { pageValidator } from "@/utils/validators"
import config from "@/web/config"

const handle = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({ res, models: { UserModel } }) => {
      const query = UserModel.query()
      const users = await query
        .clone()
        .orderBy("createdAt", "DESC")
        .limit(config.ui.itemsPerPage)
        .offset((query.page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()

      res.send({
        result: users,
        meta: {
          count,
        }
      })
    },
  ],
})

export default handle

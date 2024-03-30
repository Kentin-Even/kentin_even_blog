import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator } from "@/utils/validators"
const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async ({
      models: { PostsModel },
      input: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostsModel.query().findById(postId).throwIfNotFound()
      res.send(post)
    },
  ],
})

export default handle

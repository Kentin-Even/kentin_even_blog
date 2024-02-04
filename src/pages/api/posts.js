import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { titlePostValidator, contentPostValidator} from "@/utils/validators"
const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        title: titlePostValidator,
        content: contentPostValidator,
      },
    }),
    async ({
      models: { PostsModel },
      input: {
        body: { title, content},
      },
      res,
    }) => {
      const post = await PostsModel.query()
        .insertAndFetch({
          title,
          content,
        })
        .withGraphFetched("comments")

      res.send(post)
    },
  ],
})

export default handle
import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  titlePostValidator,
  contentPostValidator,
  pageValidator,
} from "@/utils/validators"
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
      session,
      input: {
        body: { title, content },
      },
      res,
    }) => {
      const post = await PostsModel.query()
        .insertAndFetch({
          title,
          content,
          userId: session.id,
        })
        .withGraphFetched("comments")
      res.send(post)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({
      res,
      models: { PostsModel },
    }) => {
      const query = PostsModel.query().withGraphFetched("comments")
      const posts = await query
        .clone()
        .orderBy("created_at", "DESC")

      res.send(posts)
    },
  ],
})

export default handle

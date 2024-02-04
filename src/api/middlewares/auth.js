import { ForbiddenError } from "@/api/errors"
import config from "@/config"
import jsonwebtoken from "jsonwebtoken"

const auth = async (ctx) => {
  const {
    req: {
      cookies: { [config.security.jwt.cookieName]: sessionToken },
    },
    next,
  } = ctx

  try {
    const { payload } = jsonwebtoken.verify(
      sessionToken,
      config.security.jwt.secret,
    )

    ctx.session = {
      id: payload.id,
      role: payload.role,
      userId: payload.id,
    }
    console.log(ctx.session)

    await next()
  } catch (err) {
    console.error(err)
    throw new ForbiddenError()
  }
}

export default auth

import { User } from '@/payload-types'
import { ExpressContent } from '@/server'
import { TRPCError, initTRPC } from '@trpc/server'
import { PayloadRequest } from 'payload/types'

const t = initTRPC.context<ExpressContent>().create()
export const router = t.router

//middleware for privateProcedure
const middleware = t.middleware
const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest

  const { user } = req as { user: User | null }

  if (!user || !user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      user,
    },
  })
})

//public
export const publicProcedure = t.procedure
//private
export const privateProcedure = t.procedure.use(isAuth)

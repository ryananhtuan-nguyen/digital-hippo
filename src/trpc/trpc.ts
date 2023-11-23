import { ExpressContent } from '@/server'
import { initTRPC } from '@trpc/server'

const t = initTRPC.context<ExpressContent>().create()
export const router = t.router

//public
export const publicProcedure = t.procedure

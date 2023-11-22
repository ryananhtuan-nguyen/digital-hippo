import { initTRPC } from '@trpc/server'

const t = initTRPC.context().create()
export const router = t.router

//public
export const publicProcedure = t.procedure

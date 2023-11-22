import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { publicProcedure, router } from './trpc'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      //get input
      const { email, password } = input
      //access to cms
      const payload = await getPayloadClient()

      //check if user already exists

      const { docs: user } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      //throw error if user exists
      if (user.length !== 0) throw new TRPCError({ code: 'CONFLICT' })

      //if not, create user
      await payload.create({
        collection: 'users',
        data: {},
      })
    }),
})

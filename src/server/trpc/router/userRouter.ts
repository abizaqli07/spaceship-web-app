import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query( async ({ input, ctx }) => {

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email
        }
      })
      return {
        userData: user
      };
    }),
});

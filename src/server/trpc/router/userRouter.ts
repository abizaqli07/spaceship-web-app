import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUser: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation( async ({ input, ctx }) => {

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

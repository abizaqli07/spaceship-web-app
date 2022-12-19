import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ctx}) => {
    return ctx.session
  }),
  getSessionData: publicProcedure.query(async ({ ctx }) => {

    if(ctx.session){
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session?.user?.email!
        }
      })
  
      return {
        session: user
      };
    }

    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

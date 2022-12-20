import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { pilotProfileRoute } from "./pilotRoute/profile";
import { pilotScheduleRoute } from "./pilotRoute/schedule";

export const pilotRouter = router({
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
    profile: pilotProfileRoute,
    schedule: pilotScheduleRoute,
});

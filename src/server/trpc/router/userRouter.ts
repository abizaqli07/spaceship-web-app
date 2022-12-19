import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { userProfileRoute } from "./userRoute/profile";
import { userScheduleRoute } from "./userRoute/schedule";
import { userTicketRoute } from "./userRoute/ticket";

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
  profile: userProfileRoute,
  schedule: userScheduleRoute,
  ticket: userTicketRoute,
});

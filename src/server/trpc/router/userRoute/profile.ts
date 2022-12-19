import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { GENDER } from "@prisma/client";

import { protectedProcedure, router } from "../../trpc";

export const userProfileRoute = router({
  getUserProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const userProfile = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email!
        },
        include: {
          passenger: true
        }
      })

      return {
        userProfile
      }
    }),
  upsertUserProfile: protectedProcedure
    .input(z.object({
      id_user: z.string(),
      fullname: z.string(),
      datebirth: z.string(),
      gender: z.nativeEnum(GENDER),
      no_tlp: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const upsert = await ctx.prisma.passenger.upsert({
          where: {
            userId: input.id_user
          },
          create: {
            userId: input.id_user,
            fullname: input.fullname,
            datebirth: input.datebirth,
            no_tlp: input.no_tlp,
            gender: input.gender,
          },
          update: {
            fullname: input.fullname,
            datebirth: input.datebirth,
            no_tlp: input.no_tlp,
            gender: input.gender
          }
        })
      } catch (e) {
        return {
          success: false,
          message: "Some error occured",
          error: e
        }
      }

      return {
        success: true,
        message: "User profile successfully updated",
        error: null
      }
    }),
});

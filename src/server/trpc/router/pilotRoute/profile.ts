import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { GENDER } from "@prisma/client";

import { protectedProcedure, router } from "../../trpc";

export const pilotProfileRoute = router({
  getPilotProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const pilotProfile = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email!
        },
        include: {
          pilots: true
        }
      })

      return {
        pilotProfile
      }
    }),
  updatePilotProfile: protectedProcedure
    .input(z.object({
      id_user: z.string(),
      name: z.string(),
      datebirth: z.string(),
      gender: z.nativeEnum(GENDER),
      no_tlp: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const update = await ctx.prisma.pilots.update({
          where: {
            userId: input.id_user
          },
          data: {
            name: input.name,
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
        message: "Pilott profile successfully updated",
        error: null
      }
    }),
});

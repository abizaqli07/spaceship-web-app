import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const adminPilotsRoute = router({
  getPilots: protectedProcedure
    .query(async ({ ctx }) => {
      const pilots = await ctx.prisma.pilots.findMany({
        orderBy: {
          is_verified: 'desc'
        }
      })

      return {
        pilots
      }
    }),
  getDetailPilots: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const detailPilots = await ctx.prisma.pilots.findFirst({
        where: {
          id_pilot: input.id
        },
        include: {
          schedule: {
            include: {
              destination: true,
              spaceship: true,
            }
          },
          user: true
        }
      })

      if (!detailPilots) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requested data not found on server"
        })
      }

      return {
        pilots: detailPilots
      }
    }),
});

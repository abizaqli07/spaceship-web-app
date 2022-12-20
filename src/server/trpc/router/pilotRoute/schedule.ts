import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const pilotScheduleRoute = router({
  getSchedule: protectedProcedure
  .query(async ({ ctx }) => {
    const schedule = await ctx.prisma.pilots.findUnique({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        schedule: {
          include: {
            destination: true,
            spaceship: true
          }
        }
      }
    })

    return {
      schedule
    }
  }),
getDetailSchedule: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const detailSchedule = await ctx.prisma.schedule.findFirst({
      where: {
        id_schedule: input.id
      },
      include: {
        destination: true,
        pilot: true,
        spaceship: true
      }
    })

    if (!detailSchedule) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Requested data not found on server"
      })
    }

    return {
      schedule: detailSchedule
    }
  }),
});
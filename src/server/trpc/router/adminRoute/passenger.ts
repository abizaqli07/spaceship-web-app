import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const adminPassengerRoute = router({
  getPassenger: protectedProcedure
  .query(async ({ ctx }) => {
    const passenger = await ctx.prisma.passenger.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      passenger
    }
  }),
getDetailPassenger: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const detailPassenger = await ctx.prisma.passenger.findFirst({
      where: {
        id_passenger: input.id
      },
      include: {
        ticket: {
          include: {
            schedule: {
              select: {
                destination: true,
                spaceship: true,
                time_depart:true,
                time_land: true
              }
            },
            ticket_has_status: true
          }
        },
        user: true
      }
    })

    if (!detailPassenger) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Requested data not found on server"
      })
    }

    return {
      passenger: detailPassenger
    }
  }),
});

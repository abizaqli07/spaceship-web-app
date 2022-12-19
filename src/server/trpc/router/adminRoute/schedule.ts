import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const adminScheduleRoute = router({
  getSchedule: protectedProcedure
  .query(async ({ ctx }) => {
    const schedule = await ctx.prisma.schedule.findMany({
      orderBy: {
        time_depart: 'desc'
      },
      include: {
        destination: true
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
inputSchedule: protectedProcedure
  .input(z.object({
    price: z.number(),
    capacity: z.number(),
    planetId: z.string(),
    pilotsId: z.string(),
    spaceshipId: z.string(),
    time_depart: z.string(),
    time_land: z.string()
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const insert = await ctx.prisma.schedule.create({
        data: {
          capacity: input.capacity,
          price: input.price,
          planetId: input.planetId,
          pilotsId: input.pilotsId,
          spaceshipId: input.spaceshipId,
          time_depart: new Date(input.time_depart),
          time_land: new Date(input.time_land)
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
      message: "Data schedule succesfully created",
      error: null
    }
  }),
updateSchedule: protectedProcedure
  .input(z.object({
    id: z.string().cuid(),
    price: z.number(),
    capacity: z.number(),
    planetId: z.string(),
    pilotsId: z.string(),
    spaceshipId: z.string(),
    time_depart: z.string(),
    time_land: z.string()
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const edit = await ctx.prisma.schedule.update({
        where: {
          id_schedule: input.id
        },
        data: {
          capacity: input.capacity,
          price: input.price,
          planetId: input.planetId,
          pilotsId: input.pilotsId,
          spaceshipId: input.spaceshipId,
          time_depart: new Date(input.time_depart),
          time_land: new Date(input.time_land)
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
      message: "Data schedule succesfully updated",
      error: null
    }
  }),
deleteSchedule: protectedProcedure
  .input(z.object({ id: z.string().cuid() }))
  .mutation(async ({ input, ctx }) => {
    try {
      const del = await ctx.prisma.schedule.delete({
        where: {
          id_schedule: input.id
        }
      })
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error occured on the server, failed deleting data"
      })
    }

    return {}
  }),
});
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const adminPlanetRoute = router({
  getPlanet: protectedProcedure
  .query(async ({ ctx }) => {
    const planet = await ctx.prisma.planet.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      planet
    }
  }),
getDetailPlanet: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const detailPlanet = await ctx.prisma.planet.findFirst({
      where: {
        id_planet: input.id
      }
    })

    if (!detailPlanet) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Requested data not found on server"
      })
    }

    return {
      planet: detailPlanet
    }
  }),
inputPlanet: protectedProcedure
  .input(z.object({
    name: z.string(),
    image: z.string().nullable(),
    description: z.string(),
    distance: z.number(),
    is_explored: z.boolean().nullable(),
    is_populated: z.boolean().nullable()
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const insert = await ctx.prisma.planet.create({
        data: {
          name: input.name,
          description: input.description,
          image: input.image,
          distance: input.distance,
          is_explored: input.is_explored,
          is_populated: input.is_populated
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
      message: "Data planet succesfully created",
      error: null
    }
  }),
updatePlanet: protectedProcedure
  .input(z.object({
    id: z.string().cuid(),
    name: z.string(),
    image: z.string().nullable(),
    description: z.string(),
    distance: z.number(),
    is_explored: z.boolean(),
    is_populated: z.boolean()
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const edit = await ctx.prisma.planet.update({
        where: {
          id_planet: input.id
        },
        data: {
          name: input.name,
          description: input.description,
          image: input.image,
          distance: input.distance,
          is_explored: input.is_explored,
          is_populated: input.is_populated
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
      message: "Data planet succesfully updated",
      error: null
    }
  }),
deletePlanet: protectedProcedure
  .input(z.object({ id: z.string().cuid() }))
  .mutation(async ({ input, ctx }) => {
    try {
      const del = await ctx.prisma.planet.delete({
        where: {
          id_planet: input.id
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
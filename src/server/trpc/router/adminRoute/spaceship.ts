import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const adminSpaceshipRoute = router({
  getSpaceship: protectedProcedure
  .query(async ({ ctx }) => {

    const spaceship = await ctx.prisma.spaceship.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      spaceship
    }

  }),
getDetailSpaceship: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {

    const detailSpaceship = await ctx.prisma.spaceship.findFirst({
      where: {
        id_spaceship: input.id
      }
    })

    if (!detailSpaceship) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Requested data not found on server"
      })
    }

    return {
      spaceship: detailSpaceship
    }

  }),
inputSpaceship: protectedProcedure
  .input(z.object({
    name: z.string(),
    image: z.string().nullable(),
    description: z.string(),
    model: z.string()
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const insert = await ctx.prisma.spaceship.create({
        data: {
          name: input.name,
          image: input.image,
          description: input.description,
          model: input.model
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
      message: "Spaceship succesfully created",
      error: null
    }
  }),
updateSpaceship: protectedProcedure
  .input(z.object({
    id: z.string().cuid(),
    name: z.string(),
    image: z.string().nullable(),
    description: z.string(),
    model: z.string()
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const edit = await ctx.prisma.spaceship.update({
        where: {
          id_spaceship: input.id
        },
        data: {
          name: input.name,
          image: input.image,
          description: input.description,
          model: input.model
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
      message: "Spaceship succesfully updated",
      error: null
    }
  }),
deleteSpaceship: protectedProcedure
  .input(z.object({ id: z.string().cuid() }))
  .mutation(async ({ input, ctx }) => {
    try {
      const del = await ctx.prisma.spaceship.delete({
        where: {
          id_spaceship: input.id
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

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const adminRouter = router({
  getUser: protectedProcedure
    .query(async ({ ctx }) => {

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email!
        }
      })

      return {
        userData: user
      };
    }),
  getSpaceship: protectedProcedure
    .mutation(async ({ ctx }) => {
      const spaceship = await ctx.prisma.spaceship.findMany()

      return {
        spaceshipData: spaceship
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
          messsage: "Some error occured",
          error: e
        }
      }

      return {
        success: true,
        messsage: "Spaceship succesfully created"
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
        return {
          success: false,
          message: "Some error occured while deleting",
          error: e
        }
      }

      return {
        success: true,
        message: "Success deleting spaceship",
      }
    })

});
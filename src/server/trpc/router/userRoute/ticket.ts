import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const userTicketRoute = router({
  buyTicket: protectedProcedure
    .input(z.object({
      id_schedule: z.string(),
      id_passenger: z.string()
    }))
    .mutation(async ({ input, ctx }) => {

      try {
        const insert = await ctx.prisma.ticket.create({
          data: {
            passengerId: input.id_passenger,
            scheduleId: input.id_schedule,
            ticket_has_status: {
              create: {
                status: "ACTIVE"
              }
            }
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
        message: "Ticket succesfully buy",
        error: null
      }

    }),
  getTicket: protectedProcedure
    .query(async ({ ctx }) => {

      const userProfile = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email!
        },
        include: {
          passenger: {
            include: {
              ticket: true
            }
          }
        }
      })

      return {
        userProfile
      }
    }),
})

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
              ticket: {
                include: {
                  ticket_has_status: true
                }
              }
            }
          }
        }
      })

      return {
        userProfile
      }
    }),
  getDetailTicket: protectedProcedure
    .query(async ({ ctx }) => {

      const ticket = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email!
        },
        include: {
          passenger: {
            include: {
              ticket: {
                include: {
                  schedule: {
                    include: {
                      destination: true,
                      spaceship: true
                    }
                  },
                  ticket_has_status: true
                },
                orderBy: {
                  ticket_has_status: {
                    status: "asc"
                  }
                }
              }
            }
          }
        }
      })

      return {
        ticket: ticket?.passenger?.ticket
      }
    }),
  cancelBuyTicket: protectedProcedure
    .input(z.object({
      id_ticket: z.string().cuid()
    }))
    .mutation(async ({ input, ctx }) => {

      try {
        const cancel = await ctx.prisma.ticket.update({
          where: {
            id_ticket: input.id_ticket
          },
          data: {
            ticket_has_status: {
              update: {
                status: "WAITING"
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
        message: "Ticket Cancellation Submitted",
        error: null
      }

    }),
  deleteTicket: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const del = await ctx.prisma.ticket.delete({
          where: {
            id_ticket: input.id
          },
          include: {
            ticket_has_status: true
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
        message: "Ticket Data Deleted",
        error: null
      }
    }),
})

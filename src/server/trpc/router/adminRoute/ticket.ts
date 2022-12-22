import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const adminTicketRoute = router({
  approveCancel: protectedProcedure
    .input(z.object({
      id: z.string().cuid()
    }))
    .mutation(async ({ input, ctx }) => {

      try {
        const cancel = await ctx.prisma.ticket.update({
          where: {
            id_ticket: input.id
          },
          data: {
            ticket_has_status: {
              update: {
                status: "CANCELLED"
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
        message: "Ticket Cancellation Approved",
        error: null
      }

    })
});

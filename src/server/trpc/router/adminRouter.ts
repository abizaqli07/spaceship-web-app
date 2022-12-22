import { protectedProcedure, router } from "../trpc";
import { adminBlogRoute } from "./adminRoute/blog";
import { adminPassengerRoute } from "./adminRoute/passenger";
import { adminPilotsRoute } from "./adminRoute/pilots";
import { adminPlanetRoute } from "./adminRoute/planet";
import { adminScheduleRoute } from "./adminRoute/schedule";
import { adminSpaceshipRoute } from "./adminRoute/spaceship";
import { adminTicketRoute } from "./adminRoute/ticket";

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
  getIdObject: protectedProcedure
    .query(async ({ ctx }) => {
      const pilotId = await ctx.prisma.pilots.findMany({
        select: {
          id_pilot: true,
          name: true,
          is_verified: true
        },
        orderBy: {
          is_verified: 'asc'
        },
      })

      const spaceshipId = await ctx.prisma.spaceship.findMany({
        select: {
          id_spaceship: true,
          name: true
        },
        orderBy: {
          created_at: 'desc'
        }
      })

      const planetId = await ctx.prisma.planet.findMany({
        select: {
          id_planet: true
        },
        orderBy: {
          created_at: 'desc'
        }
      })


      return {
        dataId: { pilotId, spaceshipId, planetId }
      }
    }),
  spaceship: adminSpaceshipRoute,
  planet: adminPlanetRoute,
  schedule: adminScheduleRoute,
  passenger: adminPassengerRoute,
  pilots: adminPilotsRoute,
  ticket: adminTicketRoute,
  blog: adminBlogRoute,
});
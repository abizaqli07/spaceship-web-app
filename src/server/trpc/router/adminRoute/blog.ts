import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../../trpc";

export const adminBlogRoute = router({
  getBlog: protectedProcedure
    .query(async ({ ctx }) => {
      const blog = await ctx.prisma.blog.findMany({
        orderBy: {
          created_at: 'desc'
        }
      })

      return {
        blog
      }
    }),
  getDetailBlog: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const detailblog = await ctx.prisma.blog.findFirst({
        where: {
          id_blog: input.id
        }
      })

      if (!detailblog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requested data not found on server"
        })
      }

      return {
        blog: detailblog
      }
    }),
  inputBlog: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      link: z.string(),
      image: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const insert = await ctx.prisma.blog.create({
          data: {
            title: input.title,
            description: input.description,
            link: input.link,
            image: input.image
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
        message: "Data blog succesfully created",
        error: null
      }
    }),
  updateBlog: protectedProcedure
    .input(z.object({
      id: z.string().cuid(),
      title: z.string(),
      description: z.string(),
      link: z.string(),
      image: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const edit = await ctx.prisma.blog.update({
          where: {
            id_blog: input.id
          },
          data: {
            title: input.title,
            description: input.description,
            link: input.link,
            image: input.image
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
        message: "Data blog succesfully updated",
        error: null
      }
    }),
  deleteBlog: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const del = await ctx.prisma.blog.delete({
          where: {
            id_blog: input.id
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
import { GENDER } from '@prisma/client'

import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { hash } from "bcryptjs";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const signUpRouter = router({
  userSignUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;
      try {
        const user = await ctx.prisma.user.create({
          data: {
            email: email,
            username: username,
            password: await hash(password, 12)
          }
        })
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: "User Already Exists"
            })
          }
        }

      }
    }),
  pilotSignUp: publicProcedure
    .input(z.object({
      email: z.string().email(),
      username: z.string(),
      password: z.string(),
      name: z.string(),
      datebirth: z.string(),
      gender: z.nativeEnum(GENDER),
      no_tlp: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const pilot = await ctx.prisma.user.create({
          data: {
            email: input.email,
            username: input.username,
            password: await hash(input.password, 12),
            role: "PILOT",
            pilots: {
              create: {
                name: input.name,
                datebirth: input.datebirth,
                gender: input.gender,
                no_tlp: input.no_tlp,
              }
            }
          }
        })
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: "User Already Exists"
            })
          }
        }
      }

    })
});
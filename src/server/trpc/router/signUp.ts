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
    .mutation( async ({ input, ctx }) => {
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
        if (e instanceof PrismaClientKnownRequestError){
          if (e.code === 'P2002'){
            throw new TRPCError({
              code: 'CONFLICT',
              message: "User Already Exists"
            })
          }
        }
        
      }
    })
});
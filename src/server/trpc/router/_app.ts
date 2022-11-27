import { signUpRouter } from "./signUp";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./userRouter";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  signUp: signUpRouter,
  userRouter: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

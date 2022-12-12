import { signUpRouter } from "./signUp";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./userRouter";
import { adminRouter } from "./adminRouter";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  signUp: signUpRouter,
  userRouter: userRouter,
  adminRouter: adminRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

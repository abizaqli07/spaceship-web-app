import { signUpRouter } from "./signUp";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./userRouter";
import { adminRouter } from "./adminRouter";
import { pilotRouter } from "./pilotRouter";

export const appRouter = router({
  auth: authRouter,
  signUp: signUpRouter,
  userRouter: userRouter,
  adminRouter: adminRouter,
  pilotRouter: pilotRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

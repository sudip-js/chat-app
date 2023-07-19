import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import {
  Chat,
  ForgotPassword,
  PageNotFound,
  ResetPassword,
  SignIn,
  SignUp,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

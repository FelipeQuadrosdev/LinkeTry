import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { Networks } from "./pages/networks";
import { Cadastro } from "./pages/Cadastro";
import { ErrorPage } from "./pages/error";

import { Private } from "./router/Private";

const router = createBrowserRouter([

  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/admin",
    element: <Private><Admin /></Private>
  },
  {
    path: "/admin/social",
    element: <Private><Networks /></Private>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])

export default router;

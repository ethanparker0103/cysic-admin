import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/pages/Home/index";


export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ],
  {
    basename: "/m",
  }
);

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ContextProvider } from "./context/Auth";
import Home from "./pages/Home/Home";
import Index from "./pages/Home/Index";
import ReqAuth from "./component/reqAuth/ReqAuth";
import Sign from "./pages/sign/Sign";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ReqAuth>
        <Home />
      </ReqAuth>
    ),
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
  {
    path: "/sign",
    element: <Sign />,
  },
]);
function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />;
    </ContextProvider>
  );
}

export default App;

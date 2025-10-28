import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../ui/pages/mainPage/MainPage.jsx";
import PoolsPage from "../../ui/pages/poolsPage/PoolsPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/pools",
    element: <PoolsPage />,
  },
]);

export default routes;

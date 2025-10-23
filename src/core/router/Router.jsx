import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../../ui/pages/mainPage/MainPage.jsx";
import { PoolsPage } from "../../ui/pages/poolsPage/PoolsPage.jsx";
import { StakingPage } from "../../ui/pages/stakingPage/StakingPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/pools",
    element: <PoolsPage />,
  },
  {
    path: "/staking",
    element: <StakingPage />,
  },
]);

export { routes };

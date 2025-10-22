import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../../ui/pages/mainPage/MainPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

export { routes };

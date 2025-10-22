import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "../../core/context/Context.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from "../../core/router/Router.jsx";
import "./App.css";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={routes} />
    </ContextProvider>
  );
}

export default App;

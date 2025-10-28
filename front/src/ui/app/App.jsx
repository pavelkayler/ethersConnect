import "./App.css";
import { ContextProvider } from "../../core/context/Context.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "/src/core/router/Router.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={routes} />
      </ContextProvider>
    </>
  );
}

export default App;

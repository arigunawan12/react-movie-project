
import "./index.css";
// import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movie from "./pages/home";
import Login from "./pages/login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Login />
        </>
      ),
      errorElement: <p>Page Not Found</p>,
    },
    {
      path: "/movie",
      element: <>{localStorage.getItem("sessionId") ? <Movie /> : <Login />}</>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

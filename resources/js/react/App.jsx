import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/home",
      element: <Dashboard />,
    },
    {
      path: "/transaction",
      element: <Transaction />,
    },
    {
      path: "/product",
      element: <Products />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);


    return (
        <RouterProvider router={router} />
    );
}

export default App;

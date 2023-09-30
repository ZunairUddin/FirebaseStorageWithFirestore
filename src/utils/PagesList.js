import AddProduct from "../pages/AddProduct/AddProduct";
import Home from "../pages/Home/Home";

export const pagesList = [
  {
    routeName: "Home",
    path: "/",
    element: <Home />,
  },

  {
    routeName: "AddProduct",
    path: "/AddProduct",
    element: <AddProduct />,
  },
];

import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../views/layout/App";
import User from "../views/auth/User";
import Role from "../views/auth/Role";
import Login from "../views/public/Login";
import Home from "../views/home";
import Item from "../views/item";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to="home" replace />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "user",
                element: <User />,
            },
            {
                path: "role",
                element: <Role />,
            },
            {
                path: "item",
                element: <Item />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
];

export default createBrowserRouter(routes);

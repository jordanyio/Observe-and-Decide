import { RouterProvider, createBrowserRouter } from "react-router-dom";


import Home from "../components/Home/Home"

import Form from "../components/Form/Form"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "/apply",
        element: <Form></Form>
    }

])
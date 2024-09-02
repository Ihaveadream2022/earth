import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./stores";
import { RouterProvider } from "react-router-dom";
import router from "./routers";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

// prettier-ignore
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";

export default (
    <>
        <Route
            path="register"
            element={LazyLoad(() => import("./Register"))()}
        ></Route>
        <Route
            path="login"
            element={LazyLoad(() => import("./Login"))()}
        ></Route>
    </>
);

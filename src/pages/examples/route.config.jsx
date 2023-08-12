import { Route } from "react-router-dom";
import LazyLoad from "../../lazy_loadings/lazyLoading";
import Example from "./Example";

export default (
  <Route path="/e" element={<Example />}>
    <Route
      path="about"
      element={LazyLoad(() => import("./abouts/About"))()}
    ></Route>
  </Route>
);

import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";

import Home from "./Home";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Body from "./components/Body";
import AuthRoute from "../auths/Route";
import api from "@api";
import Receipts from "./components/Receipts";
let isAdmin = false;
async function authenAdmin() {
    await api.users
        .authenToken({
            token: localStorage.getItem("token"),
        })
        .then((res) => {
            if (res.status == 200) {
                if (res.data.data.role == "ADMIN") {
                    isAdmin = true;
                }
            }
        })
        .catch((err) => {
            console.log("err", err);
        });
    if (isAdmin) {
        return LazyLoad(() => import("../auths/Admin"))();
    } else {
        return <>404</>;
    }
}

export default (
    <>
        <Route path="/" element={<Home />}>
            {AuthRoute}
            <Route path="/" element={<Body />}></Route>;
            <Route path="category/:category" element={<Product />}></Route>;
            <Route path="/products/:id" element={<ProductDetail />}></Route>;
            <Route path="/cart" element={<Cart />}></Route>;
            <Route path="/payment" element={<Payment />}></Route>;
            {/* <Route path="/admin" element={<Admin />}></Route>; */}
            <Route path="/admin" element={await authenAdmin()}></Route>
            <Route path="/receipts" element={<Receipts />}></Route>;
            <Route
                path="profile"
                element={LazyLoad(() => import("../auths/Info"))()}
            ></Route>
        </Route>
    </>
);

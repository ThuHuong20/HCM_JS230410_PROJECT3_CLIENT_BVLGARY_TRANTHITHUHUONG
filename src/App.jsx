import "./main.scss";
import { Routes } from "react-router-dom";
import { useEffect, createContext } from "react";
import api from "@api";
/* Route Config */
import AuthRoute from "@pages/auths/Route";
import HomeRoute from "@pages/home/Route";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@actions/user";
import actions from "./stores/actions";
/* Context Config */
export const RootContext = createContext();

function App() {
    const store = useSelector((store) => store);
    const dispatch = useDispatch();
    // checklogin, giai token,tao user store
    useEffect(() => {
        dispatch(userActions.authenToken());
    }, []);
    // khi da dawng nhap thi keo cart cua user ve
    useEffect(() => {
        if (!store.userStore.data) {
            return;
        }
        api.purchase
            .findCart(store.userStore.data?.id)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(actions.cartActions.setCartData(res.data.data));
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert("sập!");
            });
    }, [store.userStore.data]);
    // khi da dawng nhap thi keo cart cua user ve
    useEffect(() => {
        if (!store.userStore.data) {
            return;
        }
        api.receipt
            .findReceipt(store.userStore.data?.id)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(
                        actions.receiptActions.setReceiptData(res.data.data)
                    );
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert("sập!");
            });
    }, [store.userStore.data]);

    return (
        <RootContext.Provider
            value={{
                dispatch,
                userActions,
                userStore: store.userStore,
                productStore: store.productStore,
                cartStore: store.cartStore,
                cartActions: actions.cartActions,
                productActions: actions.productActions,
                receiptStore: store.receiptStore,
            }}
        >
            <Routes>
                {/* Auth Routing */}
                {AuthRoute}
                {/* Home */}
                {HomeRoute}
            </Routes>
        </RootContext.Provider>
    );
}

export default App;

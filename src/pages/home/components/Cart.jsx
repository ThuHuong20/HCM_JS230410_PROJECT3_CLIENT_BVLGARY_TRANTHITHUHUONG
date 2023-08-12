import "./cart.scss";
import React, { useEffect, useState, useContext } from "react";
import { RootContext } from "@/App";
import api from "@api";
import { convertToUSD } from "@mieuteacher/meomeojs";
import { message, Modal } from "antd";
message.config({
    top: 120,
    duration: 1,
    maxCount: 1,
    rtl: true,
    prefixCls: "my-message",
});
export default function Cart() {
    const { cartStore, userStore, cartActions, dispatch } =
        useContext(RootContext);
    const [cartItems, setCartItems] = useState(null);
    useEffect(() => {
        if (cartStore.data) {
            setCartItems(cartStore.data.cart_details);
        }
    }, [cartStore.data]);

    function deleteItem(type, id) {
        api.purchase
            .updateCart(userStore.data?.id, {
                type,
                cart_detail_record_edited: {
                    id,
                },
            })
            .then((res) => {
                // gọi hàm kéo cart detail về lại!
                api.purchase
                    .findCart(userStore.data?.id)
                    .then((res) => {
                        if (res.status == 200) {
                            dispatch(cartActions.setCartData(res.data.data));
                        } else {
                            alert(res.data.message);
                        }
                    })
                    .catch((err) => {
                        alert("sập!");
                    });
            })
            .catch((err) => {});
    }

    function updateCart(e, item) {
        // 1 update, 0 delete
        /* req.body = {type, cart_detail_record_edited} */
        let quantityEl = e.target.parentNode.querySelector(".quantity");
        let quantity = Number(quantityEl.innerText);
        if (e.target.innerText == "-") {
            if (quantity == 1) {
                if (window.confirm("Xóa ok?!")) {
                    // xóa
                    deleteItem(0, item.id);
                }
            }
            // cập nhật -
            api.purchase
                .updateCart(userStore.data?.id, {
                    type: 1,
                    cart_detail_record_edited: {
                        id: item.id,
                        quantity: --quantity,
                    },
                })
                .then((res) => {
                    // gọi hàm kéo cart detail về lại!
                    api.purchase
                        .findCart(userStore.data?.id)
                        .then((res) => {
                            if (res.status == 200) {
                                dispatch(
                                    cartActions.setCartData(res.data.data)
                                );
                            } else {
                                alert(res.data.message);
                            }
                        })
                        .catch((err) => {
                            alert("sập!");
                        });
                })
                .catch((err) => {});
        } else {
            // cập nhật +
            api.purchase
                .updateCart(userStore.data?.id, {
                    type: 1,
                    cart_detail_record_edited: {
                        id: item.id,
                        quantity: ++quantity,
                    },
                })
                .then((res) => {
                    // gọi hàm kéo cart detail về lại!
                    api.purchase
                        .findCart(userStore.data?.id)
                        .then((res) => {
                            if (res.status == 200) {
                                dispatch(
                                    cartActions.setCartData(res.data.data)
                                );
                            } else {
                                alert(res.data.message);
                            }
                        })
                        .catch((err) => {
                            alert("sập!");
                        });
                })
                .catch((err) => {});
        }
    }

    return (
        <div>
            <div className="cart_container">
                <div className="cart_shipping">
                    <h1>MY BAG: {cartItems?.length} ITEM</h1>
                    <p>
                        <i className="fa-solid fa-truck"></i>
                    </p>
                    <p>This order qualifies for FREE Shipping!</p>
                </div>
                <div>
                    {cartItems?.length > 0 ? (
                        cartItems?.map((item, index) => (
                            <div
                                key={Date.now() * Math.random()}
                                className="cart_content"
                            >
                                <div className="cart_image">
                                    <img
                                        src={`${item.product.avatar}`}
                                        alt=""
                                    />
                                </div>
                                <div className="cart_item">
                                    <h1> {item.product.name}</h1>
                                    <div className="cart_price">
                                        <div className="price">
                                            <span>
                                                {convertToUSD(
                                                    item.product.price
                                                )}
                                            </span>
                                        </div>
                                        <div className="cart_count">
                                            <button
                                                onClick={(e) => {
                                                    updateCart(e, item);
                                                }}
                                            >
                                                -
                                            </button>
                                            <span className="quantity">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    updateCart(e, item);
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <i
                                                onClick={() => {
                                                    if (
                                                        Modal.warning({
                                                            content:
                                                                "Do you want to delete this product?",
                                                        })
                                                    ) {
                                                        // xóa
                                                        deleteItem(0, item.id);
                                                    }
                                                }}
                                                style={{
                                                    color: " #de7474",
                                                    fontSize: "20px",
                                                }}
                                                className="fa-solid fa-trash"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "30px",
                                marginTop: "7px",
                                fontWeight: "bold",
                            }}
                        >
                            Your Cart Is Empty
                        </div>
                    )}
                </div>
                <div className="total">
                    <h1>Total</h1>
                    <p
                        style={{
                            color: "#de7474",
                            fontWeight: "bold",
                            fontSize: "25px",
                        }}
                    >
                        {cartItems
                            ? convertToUSD(
                                  cartItems?.reduce((value, nextItem) => {
                                      return (value +=
                                          nextItem.quantity *
                                          nextItem.product.price);
                                  }, 0)
                              )
                            : 0}
                    </p>
                    <button
                        onClick={() => {
                            window.location.href = "/payment";
                        }}
                    >
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}

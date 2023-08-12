import React, { useContext, useState, useEffect } from "react";
import "./payment.scss";
import { RootContext } from "@/App";
import { convertToUSD } from "@mieuteacher/meomeojs";
import axios from "axios";
import Qr from "./qrs/Qr";
import { message } from "antd";
export default function Payment() {
    const { cartStore, userStore } = useContext(RootContext);
    const [cartItems, setCartItems] = useState(null);
    const [qrShow, setQrShow] = useState(false);
    const [qrData, setQrData] = useState(null);
    useEffect(() => {
        if (cartStore.data) {
            setCartItems(cartStore.data.cart_details);
        }
    }, [cartStore.data]);

    function saveReceipt(eventForm) {
        /* Reset Form Action */
        eventForm.preventDefault();

        /* Req.body.receiptInfor */
        let receiptInfor = {
            receipt_code: cartStore.data.id,
            total: cartStore.data.cart_details.reduce((result, nextItem) => {
                return (result += nextItem.quantity * nextItem.product.price);
            }, 0),
            pay_mode: eventForm.target.payment.value,
            paid: eventForm.target.payment.value == "CASH" ? false : true,
            user_id: userStore.data.id,
        };
        /* Req.body.receiptDetails */
        let receiptDetails = [];
        for (let i in cartStore.data.cart_details) {
            receiptDetails.push({
                product_id: cartStore.data.cart_details[i].product_id,
                quantity: cartStore.data.cart_details[i].quantity,
                note: cartStore.data.cart_details[i].note,
            });
        }

        /* Cash */
        axios
            .post("http://localhost:4000/apis/v1/purchase/order", {
                receiptInfor,
                receiptDetails,
            })
            .then((res) => {
                message.success("Cảm ơn bạn đã mua hàng!");
                // chuyển trang receipt
                console.log("Đã save receipt", res.data);
            })
            .catch((err) => {
                alert("bala");
            });
        return;
    }
    function checkOut(eventForm) {
        /* Zalo */
        if (eventForm.target.payment.value == "ZALO") {
            axios
                .post("http://localhost:4000/apis/v1/purchase/zalo-create", {
                    receiptCode: cartStore.data.id,
                    receiptTotal: cartStore.data.cart_details.reduce(
                        (result, nextItem) => {
                            return (result +=
                                nextItem.quantity * nextItem.product.price);
                        },
                        0
                    ),
                    userName:
                        userStore.data.first_name + userStore.data.last_name,
                })
                .then((res) => {
                    if (res.status == 200) {
                        /* 
                        - khi thành công sẽ nhận được QR code
                        - orderId, url
                        - Lặp vô tận trong 5 phút liên tục kiểm tra tiền đã vào túi chưa.
                        - show QRCODE
                        */
                        setQrData({
                            url: res.data.url,
                            title: `Scan with ZaloPay`,
                            orderId: res.data.orderId,
                        });
                        setQrShow(true);
                        /* 
                            Check kết quả giao dịch
                        */
                        let tradeInterval;
                        let cancelTrade = setTimeout(() => {
                            // sau 10' hủy giao dịch (600000)
                            clearInterval(tradeInterval);
                            setQrShow(false);
                            setQrData(null);
                            alert("Giao dịch đã bị hủy vì quá lâu!");
                        }, 60000);
                        tradeInterval = setInterval(() => {
                            //console.log("đang kiểm tra thanh toán mỗi 5s");
                            axios
                                .get(
                                    `http://localhost:4000/apis/v1/purchase/zalo-confirm/${res.data.orderId}`
                                )
                                .then((checkRes) => {
                                    if (checkRes.status == 200) {
                                        // chuyển qua trang hóa đơn
                                        clearInterval(tradeInterval);
                                        // thu hồi QR
                                        setQrShow(false);
                                        setQrData(null);
                                        clearTimeout(cancelTrade);
                                        // xử lý database
                                        saveReceipt(eventForm);
                                    }
                                })
                                .catch((err) => {
                                    alert("zalo sập!");
                                });
                        }, 5000);
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                    alert("Tạm thời không thể thanh toán phương thức này!");
                });
            return;
        } else {
            saveReceipt(eventForm);
        }
    }
    return (
        <div>
            <div>
                <div className="shipping">
                    <div
                        onSubmit={(eventForm) => {
                            eventForm.preventDefault();
                        }}
                        className="form-group"
                        style={{ position: "relative" }}
                    >
                        <h2>Information</h2>
                        <div className="form-groupInput">
                            <input
                                id="name"
                                className="form-group-input"
                                type="text"
                                placeholder="Name"
                                name="userName"
                            />
                            <br />
                            <input
                                id="phone"
                                className="form-group-input"
                                type="text"
                                placeholder="Phone Number"
                                name="userPhoneNumber"
                            />
                            <br />
                            <input
                                id="address"
                                className="form-group-input"
                                type="text"
                                placeholder="Address"
                                name="userAddress"
                            />
                            <br />
                        </div>
                        {/* Xử lý tại đây */}
                        <form
                            onSubmit={(eventForm) => {
                                checkOut(eventForm);
                            }}
                        >
                            <div className="shippingDetails">
                                <p>Payment methods</p>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="CASH"
                                />
                                <span>Cash</span>

                                <input
                                    className="zalo"
                                    type="radio"
                                    name="payment"
                                    value="ZALO"
                                />
                                <span> Zalo</span>

                                <input
                                    type="radio"
                                    name="payment"
                                    value="MOMO"
                                />
                                <span>Momo</span>
                                <div className="shippingDetails_button">
                                    <img src="../images/payment.png" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="form-group-checkout"
                            >
                                Check Out
                            </button>
                        </form>
                        <p className="validate-email" />
                        {qrShow && qrData != null ? <Qr {...qrData} /> : <></>}
                    </div>
                    <div className="informationLine">
                        {cartItems?.map((item, index) => (
                            <div>
                                <div className="informationLine_product">
                                    <img src={`${item.product.avatar}`} />
                                    <div className="informationLine_text">
                                        <h4>{item.product.name}</h4>
                                        <p>
                                            {convertToUSD(item.product.price)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="informationLine_total">
                            <h3>Total:</h3>
                            <span>
                                {convertToUSD(
                                    cartItems?.reduce((value, nextItem) => {
                                        return (value +=
                                            nextItem.quantity *
                                            nextItem.product.price);
                                    }, 0)
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

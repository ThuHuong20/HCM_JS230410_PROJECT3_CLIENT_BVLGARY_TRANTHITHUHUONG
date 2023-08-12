import { useEffect, useContext, useState } from "react";
import "./productDetail.scss";
import { useParams } from "react-router-dom";
import { RootContext } from "@/App";
import { convertToUSD } from "@mieuteacher/meomeojs";
import api from "@api";
export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { userStore, productStore, dispatch, productActions, cartActions } =
        useContext(RootContext);

    useEffect(() => {
        dispatch(productActions.findProductById(id));
    }, [id]);

    function addToCart() {
        // product_id Int
        // quantity   Int
        // note       String?
        let data = {
            product_id: productStore.data.id,
            quantity,
            note: "huong dep gai",
        };

        api.purchase
            .addToCart(userStore.data.id, data)
            .then((res) => {
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
            .catch((err) => {
                alert("looix");
            });
    }

    return (
        <div>
            <div className="detail_container">
                <div className="detail_img">
                    <img
                        style={{
                            width: "400px",
                            height: "400px",
                        }}
                        name="productImg"
                        className="productImg"
                        src={productStore?.data?.avatar}
                        alt=""
                    />
                </div>
                <div className="detail_content">
                    <h1>{productStore?.data?.name}</h1>

                    <div className="quantity-container">
                        <span
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                fontSize: "25px",
                            }}
                        >
                            {convertToUSD(productStore?.data?.price)}
                        </span>
                        <div className="count_product">
                            <button
                                className="count"
                                onClick={() => {
                                    if (quantity > 1) {
                                        setQuantity(quantity - 1);
                                    }
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    -
                                </span>
                            </button>

                            <span
                                className="quantity"
                                style={{ fontSize: "25px" }}
                            >
                                {quantity}
                            </span>
                            <button
                                className="count"
                                onClick={() => {
                                    if (quantity > 0) {
                                        setQuantity(quantity + 1);
                                    }
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    +
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="buttonAddCart">
                        <button
                            onClick={() => {
                                addToCart();
                            }}
                            type="submit"
                            className="addToCart"
                        >
                            Add To Cart
                        </button>
                        <br />
                        <div>
                            <br />
                            <span>
                                <img
                                    style={{ width: "30px", height: "30px" }}
                                    src="../images/6.png"
                                    alt=""
                                />
                                Complimentary Standard Shipping
                            </span>
                            <br />
                            <span>
                                <img
                                    style={{ width: "30px", height: "30px" }}
                                    src="../images/7.png"
                                    alt=""
                                />
                                Complimentary Returns & Exchanges
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail_des">
                <h3>Description</h3>
                <div>{productStore?.data?.des}</div>
            </div>
            <div className="bulgari_services">
                <div>
                    <h1 style={{ textAlign: "center", paddingTop: "30px" }}>
                        EXCLUSIVE BULGARI SERVICES
                    </h1>
                </div>
                <div className="bulgari_services_text">
                    <div>
                        <h3>
                            <img src="../images/car.png" alt="" />
                            Complimentary Shipping
                        </h3>
                        <p>
                            Shop our exquisite creations now and get free
                            delivery on all orders.
                        </p>
                        <a
                            href="https://www.bulgari.com/en-us/order-information/deliveryMethods--page__services.html"
                            tabindex="0"
                        >
                            Discover more
                        </a>
                    </div>
                    <div>
                        <h3>
                            <img src="../images/2.png" alt="" />
                            Complimentary Returns & Exchanges
                        </h3>
                        <p>
                            We offer free returns and exchanges on all orders
                            placed online.
                        </p>
                        <a
                            href="https://www.bulgari.com/en-us/order-information/returns&amp;exchanges--page__services.html"
                            tabindex="0"
                        >
                            Discover more
                        </a>
                    </div>
                    <div>
                        <h3>
                            <img src="../images/3.png" alt="" />
                            Pay with Klarna
                        </h3>
                        <p>
                            Shop now and pay in 4 interest-free installments
                            with Klarna.
                        </p>
                        <a
                            href="https://www.bulgari.com/en-us/order-information/klarna-page-services.html"
                            tabindex="0"
                        >
                            Discover more
                        </a>
                    </div>
                    <div>
                        <h3>
                            <img src="../images/4.png" alt="" />
                            Client Advisor
                        </h3>
                        <p>
                            The perfect advice is always at hand with our
                            customer care service.
                        </p>
                        <a
                            href="https://www.bulgari.com/en-us/contact-us/contact-us--page__services.html"
                            tabindex="0"
                        >
                            Discover more
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

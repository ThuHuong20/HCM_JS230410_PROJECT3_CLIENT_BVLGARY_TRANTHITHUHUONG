import React, { useEffect, useState } from "react";
import "./product.scss";
import { useParams, useNavigate } from "react-router-dom";
import { convertToUSD } from "@mieuteacher/meomeojs";
import api from "@api";
export default function Product() {
    const { category } = useParams();
    const [pageData, setPageData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        api.categories
            .findByCategory(category)
            .then((res) => {
                if (res.status == 200) {
                    console.log("res.data.data", res.data.data);
                    setPageData(res.data.data);
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert("sap server");
            });
    }, [category]);

    return (
        <div className="card_container">
            <div className="Card">
                {pageData?.products?.map((product, index) => (
                    <div
                        key={Date.now() * Math.random()}
                        className="card_img"
                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                        <img
                            src={product.avatar}
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card_name">
                            <div className="card-text">
                                <span>{product.name}</span>
                            </div>
                            <div
                                style={{ fontSize: "20px" }}
                                className="card-price"
                            >
                                <p>{convertToUSD(product.price)}</p>
                                <span
                                    style={{
                                        marginLeft: "50px",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                    }}
                                >
                                    Product Detail
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

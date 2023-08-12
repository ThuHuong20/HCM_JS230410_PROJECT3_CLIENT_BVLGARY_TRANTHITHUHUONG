import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchProduct from "@components/SearchProduct";
import { userActions } from "../stores/slices/user";
import { RootContext } from "@/App";
import api from "@api";
import { message, Modal } from "antd";
message.config({
    top: 120,
    duration: 1,
    maxCount: 1,
    rtl: true,
    prefixCls: "my-message",
});
export default function Navbar() {
    const { cartStore } = useContext(RootContext);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        api.categories
            .findMany()
            .then((res) => {
                if (res.status == 200) {
                    setCategories(res.data.data);
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert("sap server");
            });
    }, []);
    return (
        <nav>
            <div className="nav_content">
                <div className="left_content">
                    {/* Logo */}
                    {/* <img
                        src={`${process.env.REACT_APP_SERVER_HOST}bvlgari.png`}
                        className="logo"
                    /> */}
                    <h1
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        B V L G A R I
                    </h1>
                </div>
                <div className="middle_content">
                    <a
                        className="item"
                        href="/"
                        style={{ color: "black", textDecoration: "none" }}
                    >
                        Home
                    </a>
                    <a className="item" href="">
                        <div className="dropdown">
                            <a
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                }}
                                className="dropdown-toggle"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Menu
                            </a>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                {categories.map((category) => (
                                    <Link
                                        to={`category/${category.id}`}
                                        className="dropdown-item"
                                        key={Date.now() * Math.random()}
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </a>
                    <a
                        className="item"
                        style={{ color: "black", textDecoration: "none" }}
                        href="https://www.bulgari.com/en-us/corporate-social-responsibility/supply-chain.html"
                    >
                        About
                    </a>
                    <a
                        className="item"
                        style={{ color: "black", textDecoration: "none" }}
                        href="https://www.bulgari.com/en-us/magazine"
                    >
                        Stories
                    </a>
                </div>
                <div className="right_content">
                    {/* Search */}
                    <div className="searchBox d-flex" role="search">
                        <div id="search_box">
                            <SearchProduct />
                        </div>
                    </div>
                    {localStorage.getItem("token") ? (
                        <div className="dropdown">
                            <a
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    className="brand_name"
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                </span>
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <a className="dropdown-item" href="/profile">
                                    Profile
                                </a>
                                <a
                                    href="/"
                                    style={{ cursor: "pointer" }}
                                    className="dropdown-item"
                                    onClick={() => {
                                        alert("Are you sure want to logout?");
                                        localStorage.removeItem("token");
                                        // Modal.success({
                                        //     content:
                                        //         "Are you sure want to logout?",
                                        // });
                                    }}
                                >
                                    Log Out
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="dropdown">
                            <a
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa-regular fa-user"> </i>
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <a className="dropdown-item" href="/register">
                                    Register
                                </a>
                                <a className="dropdown-item" href="/login">
                                    Log In
                                </a>
                            </div>
                        </div>
                    )}
                    {/* Wishlist */}
                    <i className="fa-regular fa-heart"></i>
                    {/* Cart */}
                    <i
                        onClick={() => {
                            window.location.href = "/cart";
                        }}
                        className="fa-solid fa-bag-shopping"
                        style={{ cursor: "pointer" }}
                    ></i>
                    <p style={{ color: "red" }}>
                        {cartStore.data?.cart_details?.reduce(
                            (result, nextItem) => {
                                return (result += nextItem.quantity);
                            },
                            0
                        )}
                    </p>
                </div>
            </div>
        </nav>
    );
}

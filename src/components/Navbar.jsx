import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchProduct from "@components/SearchProduct";
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
  const { cartStore, localCartState, userStore } = useContext(RootContext);
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

  const [cartLocalTotal, setCartLocalTotal] = useState(null);

  async function totalCartAsync() {
    if (!localStorage.getItem("token")) {
      if (localStorage.getItem("carts")) {
        let carts = JSON.parse(localStorage.getItem("carts"));
        for (let i in carts) {
          carts[i].product = await api.products
            .findProductById(carts[i].product_id)
            .then((res) => res.data.data);
        }
        let total = carts.reduce((result, nextItem) => {
          return (result += nextItem.quantity);
        }, 0);

        setCartLocalTotal(total);
      }
    }
  }

  useEffect(() => {
    totalCartAsync();
  }, [localCartState]);

  
  useEffect(() => {
    console.log("userStore", userStore)
  }, [userStore.data]);

  function totalCart() {
    return cartStore.data?.cart_details?.reduce((result, nextItem) => {
      return (result += nextItem.quantity);
    }, 0);
  }
  return (
    <nav>
      <div className="nav_content">
        <div className="left_content">
          <h1
            style={{
              cursor: "pointer",
              fontFamily: "'Times New Roman', Times, serif",
            }}
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

                {userStore.data?.role == "ADMIN" ? (
                  <a className="dropdown-item" href="/admin">
                    Admin
                  </a>
                ) : (
                  <></>
                )}

                <a
                  //href="/"
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => {
                    //alert("Are you sure want to logout?");
                    Modal.confirm({
                      content: "Are you sure want to logout?",
                       onOk: () => {
                              window.location.href = "/";
                            },
                    }); 
                     localStorage.removeItem("token");
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
            {cartLocalTotal != null ? cartLocalTotal : totalCart()}
          </p>
        </div>
      </div>
    </nav>
  );
}

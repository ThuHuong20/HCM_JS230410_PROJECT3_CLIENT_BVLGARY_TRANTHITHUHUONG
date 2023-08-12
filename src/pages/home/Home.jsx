import "./home.scss";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { RootContext } from "../../App";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { userActions } from "@actions/user";

function Home() {
    const { userStore } = useContext(RootContext);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.authenToken());
    }, []);
    return (
        <div className="root_page">
            {/* Before Nav */}
            <section className="before_nav">
                <div className="before_nav_content">
                    <span className="brand_name"></span>
                    <div className="feature">
                        <span
                            className="feature_item"
                            onClick={() => {
                                window.location.href =
                                    "https://www.bulgari.com/en-us/storelocator/";
                            }}
                        >
                            Find A Store
                        </span>
                        <span
                            className="feature_item"
                            onClick={() => {
                                window.location.href =
                                    "https://www.bulgari.com/en-us/contact-us--info.html";
                            }}
                        >
                            Help
                        </span>
                        <span
                            className="feature_item"
                            onClick={() => {
                                window.location.href =
                                    "https://www.bulgari.com/en-us/contact-us--info.html";
                            }}
                        >
                            Join Us
                        </span>
                        {localStorage.getItem("token") ? (
                            <span className="feature_item">
                                {/* {t("hello")} */}
                                Hello {userStore?.data?.last_name}
                            </span>
                        ) : (
                            <span
                                className="feature_item"
                                onClick={() => {
                                    window.location.href = "./login";
                                }}
                            >
                                Sign In
                            </span>
                        )}
                    </div>
                </div>
            </section>
            {/* Navbar */}
            <Navbar />
            {/* Body */}
            <section className="body_container">
                <div className="body_container_center">
                    <Outlet />
                    {/* <Banner />
                    <Content /> */}
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;

import React, { useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function Content() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };
    const sliderRef = useRef();

    return (
        <div className="container">
            <div className="container_text">
                <h1>SERPENTI STYLE</h1>
                <p>
                    A modern muse meets the magnetic allure of an icon.
                    Embracing the audacious attitude of Serpenti, Anne Hathaway
                    elevates her style with on-trend handbags and mesmerizing
                    jewelry creations inspired by the fascinating snake.
                </p>
            </div>
            <div className="container_img">
                <div className="container_img_one">
                    <img
                        src={`${process.env.REACT_APP_SERVER_HOST}home/a1.avif`}
                    />
                    <img
                        src={`${process.env.REACT_APP_SERVER_HOST}home/a4.avif`}
                    />
                </div>
                <div className="container_img_one">
                    <img
                        src={`${process.env.REACT_APP_SERVER_HOST}home/a2.avif`}
                    />
                    <img
                        src={`${process.env.REACT_APP_SERVER_HOST}home/a3.avif`}
                    />
                </div>
            </div>
            <div className="container_product">
                <div className="container_product_h1">
                    <h1>OUR INSPIRING CREATIONS</h1>
                </div>
                <div className="container_product_item">
                    <Link style={{ textDecoration: "none" }} to="category/2">
                        <div className="container_product_item_a">
                            <img
                                src={`${process.env.REACT_APP_SERVER_HOST}home/necklace.avif`}
                            />

                            <div className="overlay">
                                <div className="text"></div>
                            </div>
                            <h5>NECKLACES</h5>
                        </div>
                    </Link>
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="category/1"
                    >
                        <div className="container_product_item_b">
                            <img
                                src={`${process.env.REACT_APP_SERVER_HOST}home/rings.avif`}
                            />
                            <div className="overlayb">
                                <div className="textb"></div>
                            </div>
                            <h5>RINGS</h5>
                        </div>
                    </Link>
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="category/3"
                    >
                        <div className="container_product_item_c">
                            <img
                                src={`${process.env.REACT_APP_SERVER_HOST}home/watch.avif`}
                            />
                            <div className="overlayc">
                                <div className="textc"></div>
                            </div>
                            <h5>WATCHES</h5>
                        </div>
                    </Link>
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="category/4"
                    >
                        <div className="container_product_item_d">
                            <img
                                src={`${process.env.REACT_APP_SERVER_HOST}home/bag.avif`}
                            />
                            <div className="overlayd">
                                <div className="textd"></div>
                            </div>
                            <h5>BAGS</h5>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="container_product_page">
                <div className="container_product_page_h1">
                    <h1>MOST COVETED CREATIONS</h1>
                    <div className="test">
                        <i
                            onClick={() => {
                                sliderRef.current.slickNext();
                            }}
                            className="testprev fa-solid fa-chevron-left"
                        ></i>
                        <Slider ref={sliderRef} {...settings}>
                            <div>
                                <div
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={`${process.env.REACT_APP_SERVER_HOST}necklaces/1.avif`}
                                    />
                                    <b>SERPENTI VIPER BRACELET</b>
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={`${process.env.REACT_APP_SERVER_HOST}rings/5.avif`}
                                    />
                                    <b>SERPENTI VIPER RING</b>
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={`${process.env.REACT_APP_SERVER_HOST}bags/b.avif`}
                                    />
                                    <b>SERPENTINE TOTE</b>
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={`${process.env.REACT_APP_SERVER_HOST}watches/w6.avif`}
                                    />
                                    <b>SERPENTI TUBOGAS WATCH</b>
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={`${process.env.REACT_APP_SERVER_HOST}rings/3.avif`}
                                    />
                                    <b>B.ZERO1 BRACELET</b>
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={`${process.env.REACT_APP_SERVER_HOST}bags/b7.avif`}
                                    />
                                    <b>SERPENTI BAIA SHOULDER BAG</b>
                                </div>
                            </div>
                        </Slider>
                        <i
                            onClick={() => {
                                sliderRef.current.slickPrev();
                            }}
                            className="testnext fa-solid fa-chevron-right"
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

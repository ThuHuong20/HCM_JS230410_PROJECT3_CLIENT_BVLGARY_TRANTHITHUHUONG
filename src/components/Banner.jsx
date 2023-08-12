import React, { useEffect, useRef } from "react";
export default function Banner() {
    return (
        <div className="carousel-inner video">
            {/* Single item */}
            <div className="carousel-item active">
                <video className="img-fluid" autoPlay loop muted>
                    <source
                        src={`${process.env.REACT_APP_SERVER_HOST}home/banner.mp4`}
                        type="video/mp4"
                    />
                </video>
                <div className="video-caption">
                    <div
                        data-wg-text-color="white"
                        data-wg-text-align="center"
                        className="video_caption_text"
                    >
                        <div className="video_caption_text_h1">
                            <h1>EMPOWERED BEAUTY</h1>
                        </div>
                        <div className="video_caption_text_a">
                            <a
                                className="button white"
                                href="https://www.bulgari.com/en-us/jewelry/new-arrivals"
                            >
                                SHOP JEWELRY
                            </a>
                            <a
                                className="button white"
                                href="https://www.bulgari.com/en-us/bags-and-accessories/womens/handbags"
                            >
                                SHOP HANDBAGS
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

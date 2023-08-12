import React from "react";
import "./Loading.scss";

export default function Loading() {
    return (
        <div className="loading_container">
            <img
                className="rotating-image"
                src={`${process.env.REACT_APP_SERVER_HOST}loading.png`}
            />
        </div>
    );
}

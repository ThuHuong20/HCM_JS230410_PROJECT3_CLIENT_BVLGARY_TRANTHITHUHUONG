import React, { useContext, useState, useEffect } from "react";
import "./receiptDetail.scss";
import { convertToUSD } from "@mieuteacher/meomeojs";
import { RootContext } from "@/App";
export default function ReceiptDetail(props) {
  const { receiptStore } = useContext(RootContext);
  console.log("receiptStore:", receiptStore);

  return (
    <div className="opacity">
      <div className="receiptDetail_container">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {props.popData.map((item, index) => (
            <div key={Date.now() * Math.random()} className="informationLine">
              <div className="informationLine_product">
                <img src={item.product.avatar} />
                <div className="informationLine_text">
                  <h4>{item.product.name} </h4>
                  <p>{convertToUSD(item.product.price)} </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          className="informationLine_total_price"
        >
          <div style={{ display: "flex" }}>
            <h1>
              Total:
              <span style={{ marginLeft: "10px", color: "red" }}>
                {convertToUSD(
                  props.popData.reduce((total, product) => {
                    return total + product.quantity * product.product.price;
                  }, 0),
                )}
              </span>
            </h1>
          </div>
          <div>
            <button
              style={{ marginTop: "19px", marginRight: "10px" }}
              type="button"
              class="btn btn-info"
              onClick={() => {
                props.setShowDetail(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

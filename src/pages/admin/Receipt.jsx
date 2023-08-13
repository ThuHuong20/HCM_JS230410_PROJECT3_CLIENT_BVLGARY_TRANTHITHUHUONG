import React, { useEffect, useState } from "react";
import api from "@api";
import { Modal } from "antd";
export default function Receipt() {
  const [receipts, setReceipt] = useState(null);
  useEffect(() => {
    api.receipt
      .findMany()
      .then((res) => {
        if (res.status == 200) {
          setReceipt(res.data.data);
        } else {
          Modal.error({
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        alert("sập");
      });
  }, []);

  function checkPaid(receiptId) {
    api.receipt
      .update(receiptId, { paid: true })
      .then((res) => {
        if (res.status == 200) {
          api.receipt
            .findMany()
            .then((res) => {
              if (res.status == 200) {
                setReceipt(res.data.data);
              } else {
                Modal.error({
                  content: res.data.message,
                });
              }
            })
            .catch((err) => {
              alert("sập");
            });
        } else {
          // xử lý fail
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Receipt Code</th>
          <th scope="col">total</th>
          <th scope="col">paid</th>
          <th scope="col">pay_mode</th>
          <th scope="col">paid_time</th>
          <th scope="col">create_at</th>
          <th scope="col">user infor</th>
          <th scope="col">products</th>
          <th scope="col">tools</th>
        </tr>
      </thead>
      <tbody>
        {receipts?.map((receipt, index) => (
          <tr key={Date.now() * Math.random()}>
            <th scope="row">1</th>
            <td>{receipt.receipt_code}</td>
            <td>{receipt.total}</td>
            <td style={{ color: `${receipt.paid ? "" : "red"}` }}>
              {receipt.paid ? "paid" : "unpaid"}
            </td>
            <td>{receipt.pay_mode}</td>
            <td>{receipt.create_at}</td>
            <td>{receipt.update_at}</td>
            <td
              onClick={() => {
                let preString = `
                  Name: ${
                    receipt.user.first_name + " " + receipt.user.last_name
                  }
                  Email: ${receipt.user.email}
                `;
                window.alert(preString);
              }}
              style={{ cursor: "pointer" }}
            >
              {receipt.user.first_name + " " + receipt.user.last_name}
            </td>
            <td
              onClick={() => {
                let preString = `
                  STT      Product Name     Price      Quantity     Total
                `;

                for (let i in receipt.receipt_details) {
                  preString += `
                    ${i + 1}      ${
                      receipt.receipt_details[i].product.name
                    }      ${receipt.receipt_details[i].product.price}      ${
                      receipt.receipt_details[i].quantity
                    }      ${
                      receipt.receipt_details[i].quantity *
                      receipt.receipt_details[i].product.price
                    }      
                  `;
                }

                window.alert(preString);
              }}
              style={{ cursor: "pointer" }}
            >
              Show
            </td>
            <td>
              {!receipt.paid ? (
                <button
                  onClick={() => {
                    checkPaid(receipt.id);
                  }}
                  className="btn btn-primary"
                >
                  Đã Thanh Toán
                </button>
              ) : (
                <></>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

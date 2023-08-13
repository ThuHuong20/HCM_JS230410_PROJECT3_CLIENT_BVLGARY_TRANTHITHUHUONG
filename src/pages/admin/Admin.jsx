import React from "react";
import { Outlet } from "react-router-dom";
import "./auth.scss";
export default function Admin() {
  return (
    <div>
      <h1 style={{ marginLeft: "650px" }}>
        <a style={{ textDecoration: "none", color: "black" }} href="/admin">
          ADMIN
        </a>
      </h1>
      <ul>
        <li>
          <a
            style={{ textDecoration: "none", color: "black" }}
            href="/admin/product-manage"
          >
            Product Manage
          </a>
        </li>
        <li>
          <a
            style={{ textDecoration: "none", color: "black" }}
            href="/admin/receipt-manage"
          >
            Receipt Manage
          </a>
        </li>
      </ul>
      <Outlet></Outlet>
    </div>
  );
}

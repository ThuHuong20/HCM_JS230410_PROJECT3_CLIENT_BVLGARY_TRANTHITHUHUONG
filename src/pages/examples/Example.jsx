import React from "react";
import { Outlet } from "react-router-dom";
export default function Example() {
  return (
    <div>
      <h1>Example</h1>
      <Outlet></Outlet>
    </div>
  );
}

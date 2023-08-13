import React, { useEffect } from "react";

export default function NotAccept({ title, url }) {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  }, []);
  return <div style={{ height: "100vh" }}>{title}</div>;
}

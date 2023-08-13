import React from "react";
import "./qr.scss";
import { QRCode, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function Qr({ url, title, orderId }) {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <div className="qr_modal">
      <h2>{title}</h2>
      {/* <h2>{orderId}</h2> */}
      <QRCode
        value={url}
        icon="https://seeklogo.com/images/Z/zalopay-logo-643ADC36A4-seeklogo.com.png"
      />
      <Spin indicator={antIcon} />
    </div>
  );
}

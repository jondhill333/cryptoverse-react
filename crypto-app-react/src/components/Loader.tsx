import React, { FC } from "react";
import { Spin } from "antd";

const Loader: FC = () => (
  <div className="loader">
    <Spin />
  </div>
);

export default Loader;

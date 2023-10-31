import React from "react";
import { Spin } from "antd";

export const LoadingPage: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <div className="relative h-full md:ml-[22.5vw]">
        <span className="absolute top-1/2 left-1/2 -translate-x-[24px] -translate-y-[24px]">
          <Spin />
        </span>
      </div>
    </div>
  );
};

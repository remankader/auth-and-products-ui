import React, { ReactNode } from "react";

interface helperMsgProps {
  id?: string;
  className?: string;
  alertType?: "default" | "danger" | "success";
  children: string;
}

function helperMsg({
  id,
  className,
  alertType = "default",
  children,
}: helperMsgProps) {
  return (
    <small
      id={id}
      className={`block
      my-0
      pt-px
      px-1
      text-xs
      leading-none
      h-2 ${
        alertType === "danger"
          ? "text-rose-500"
          : alertType === "success"
          ? "text-green-500"
          : "text-gray-400"
      } ${className}`}
    >
      {children}
    </small>
  );
}

export default helperMsg;

"use client";

import { AuthComponent } from "./components/home/auth";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { ProductComponent } from "./components/home/product";

export default function HomePage() {
  const { authStatusData } = useSelector((state: any) => state.auth);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    setAuthorized(authStatusData);
  }, [authStatusData]);

  useEffect(() => {
    if (getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`)) {
      setAuthorized(true);
    }

    setShowContent(true);
  }, []);

  return (
    <div className="flex justify-center h-full">
      {showContent && (authorized ? <ProductComponent /> : <AuthComponent />)}
    </div>
  );
}

"use client";

import { jwtLogout } from "@/store/reducers/auth-slice.reducer";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`) ||
      !getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`)
    ) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (
      getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`) ||
      getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}rt`)
    ) {
      const refreshToken = getCookie(
        `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}rt`
      );
      dispatch(jwtLogout({ refreshToken }));
      deleteCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`);
      deleteCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}rt`);
      window.location.reload();
    }
  }, []);

  return <>{/* page should redirect */}</>;
}

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { jwtUpdateAccessToken } from "@/store/reducers/auth-slice.reducer";
import { setTopBarMsg } from "@/store/reducers/misc.reducer";

export default function TopBarComponent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { jwtUpdateAccessTokenData } = useSelector((state: any) => state.auth);
  const { topBarMsgData } = useSelector((state: any) => state.misc);
  const pathname = usePathname();
  const [generalMsgType, setGeneralMsgType] = useState<string>("");
  const [generalMsg, setGeneralMsg] = useState<string>("");

  useEffect(() => {
    const refreshToken = getCookie(
      `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}rt`
    );
    if (refreshToken) {
      dispatch(jwtUpdateAccessToken({ refreshToken }));
    }
  }, []);

  useEffect(() => {
    if (jwtUpdateAccessTokenData.success) {
      setCookie(
        `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`,
        jwtUpdateAccessTokenData.data.accessToken
      );
    } else if (
      jwtUpdateAccessTokenData.messages &&
      getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`) &&
      pathname !== "/logout"
    ) {
      const logout = jwtUpdateAccessTokenData.messages.find(
        (obj: any) => obj.param === "logout"
      );

      if (logout) {
        router.push("/logout");
      }
    }
  }, [jwtUpdateAccessTokenData]);

  useEffect(() => {
    if (
      topBarMsgData.msgType &&
      topBarMsgData.msg &&
      pathname === topBarMsgData.pathname
    ) {
      setGeneralMsgType(topBarMsgData.msgType);
      setGeneralMsg(topBarMsgData.msg);

      dispatch(setTopBarMsg({ msgType: "", msg: "", pathname: "" }));
    }
  }, [topBarMsgData]);

  useEffect(() => {
    if (!topBarMsgData.msgType) {
      setGeneralMsgType("");
    }
  }, [pathname]);

  return (
    <>
      {generalMsgType === "success" && (
        <div
          className="text-teal-700 bg-teal-400/10 border
        border-teal-500/20 p-4 mb-2"
          role="alert"
        >
          <div className="flex justify-center">
            <h3 className="flex">
              <div className="px-1 text-xs sm:text-sm">
                <span className="font-semibold">Success: </span>
                {generalMsg}
              </div>
            </h3>
          </div>
        </div>
      )}

      {generalMsgType === "error" && (
        <div
          className="text-rose-700 bg-rose-400/10 border
        border-rose-500/20 p-4 mb-2"
          role="alert"
        >
          <div className="flex justify-center">
            <h3 className="flex">
              <div className="px-1">
                <span className="font-semibold">Error: </span>
                {generalMsg}
              </div>
            </h3>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useSelector } from "react-redux";
import DesktopMenuComponent from "./menu/desktop-menu";
import MobileMenuComponent from "./menu/mobile-menu";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function NavigationBarComponent() {
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
    <div className="flex justify-between relative z-30">
      {showContent && (
        <>
          <div className="w-2/3 flex">
            <MobileMenuComponent authorized={authorized} />
            <DesktopMenuComponent authorized={authorized} />
          </div>
          <div className="">
            {authorized ? (
              <Menu>
                <Menu.Button
                  className="border border-gray-300
                  rounded-md p-2.5 active:bg-gray-100 shadow-sm"
                >
                  <UserCircleIcon className="h-6 w-6 text-gray-500" />
                </Menu.Button>
                <div className="bg-white absolute right-0 mt-0.5 shadow-md">
                  <Menu.Items>
                    <Menu.Item>
                      <Link
                        href="/logout"
                        className="mb-[-1px] py-2.5 px-5 block w-full font-semibold
                        min-w-[200px] border border-gray-300 hover:bg-gray-100 
                        hover:!no-underline active:bg-gray-200 linkMono"
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </div>
              </Menu>
            ) : (
              <Link href="/" className="flex ml-0.5 pt-3 px-2">
                <span className="font-semibold">Login</span>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

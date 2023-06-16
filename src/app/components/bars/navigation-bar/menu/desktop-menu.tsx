import Link from "next/link";
import { MenuItem, menuItems } from "./menu-items";

export default function DesktopMenuComponent({ authorized }: { authorized: boolean }) {
  return (
    <div className="hidden md:flex w-full justify-between">
      <ul className="flex">
        {menuItems.map((item: MenuItem, index: number) =>
          item.visibility === "always" ||
          (item.visibility === "authorized" && authorized) ||
          (item.visibility === "unauthorized" && !authorized) ? (
            <li key={index}>
              <Link href={item.link} className="flex ml-0.5 pt-3 px-2">
                <span className="font-semibold">{item.text}</span>
              </Link>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}

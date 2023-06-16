export interface MenuItem {
  text: string;
  link: string;
  visibility: "always" | "authorized" | "unauthorized";
}

export const menuItems: MenuItem[] = [
  {
    text: "Home",
    link: "/",
    visibility: "always",
  },
  {
    text: "Product",
    link: "/",
    visibility: "authorized",
  },
];

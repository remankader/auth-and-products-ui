export const PRODUCT_NAME_MAX_LENGTH: number = 200;
export const PRODUCT_CATEGORIES: { id: number; name: string }[] = [
  {
    id: 1,
    name: "Bath",
  },
  {
    id: 2,
    name: "Bedding",
  },
  {
    id: 3,
    name: "Kitchen",
  },
];

export const PRODUCT_STATUS: { id: number; name: string }[] = [
  {
    id: 1,
    name: "Available",
  },
  {
    id: 2,
    name: "Discontinued",
  },
];

export const PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE: number = 6;
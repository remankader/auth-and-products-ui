import Button from "@/shared/components/form/button";
import Checkbox from "@/shared/components/form/checkbox";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { AddProductComponent } from "./add-product";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "@/store/reducers/product-slice.reducer";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE,
  PRODUCT_STATUS,
} from "@/shared/constants/product";
import { UpdateProductComponent } from "./update-product";
import { DeleteProductComponent } from "./delete-product";

export function ProductComponent() {
  const dispatch = useDispatch();
  const { getProductListData } = useSelector((state: any) => state.product);
  const [productList, setProductList] = useState<any>({});
  const [productTableList, setProductTableList] = useState<any>({});
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectAllCheckState, setSelectAllCheckState] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [productDataToUpdate, setProductDataToUpdate] = useState<any>({});
  const [productDataAdded, setProductDataAdded] = useState<boolean>(false);
  const [productDataUpdated, setProductDataUpdated] = useState<boolean>(false);
  const [productDataDeleted, setProductDataDeleted] = useState<boolean>(false);
  let [addProductModalIsOpen, setAddProductModalIsOpen] =
    useState<boolean>(false);
  let [updateProductModalIsOpen, setUpdateProductModalIsOpen] =
    useState<boolean>(false);
  let [deleteProductModalIsOpen, setDeleteProductModalIsOpen] =
    useState<boolean>(false);

  // handle get product list response
  useEffect(() => {
    if (getProductListData.success && getProductListData.data?.list?.length) {
      setTotalProducts(getProductListData.data?.total || null);

      const list = getProductListData.data.list;

      setProductList(list);

      const formattedList = list.map((eachObj: any) => {
        const categoryName =
          PRODUCT_CATEGORIES.find((c) => c.id === eachObj.categoryId)?.name ||
          "";
        const statusName =
          PRODUCT_STATUS.find((c) => c.id === eachObj.statusId)?.name || "";

        return {
          id: eachObj.id,
          nameObj: { name: eachObj.name, id: eachObj.id },
          categoryId: eachObj.categoryId,
          categoryName,
          price: eachObj.price,
          statusName,
          createdAt: eachObj.createdAt.split("T")[0],
        };
      });

      setProductTableList(formattedList);
    }
  }, [getProductListData]);

  useEffect(() => {
    setSelectAllCheckState(false);
    handleGetProductList();
  }, [page]);

  useEffect(() => {
    if (productDataAdded) {
      if (page === 1) {
        handleGetProductList();
      } else {
        setPage(1);
      }

      setProductDataAdded(false);
    }
  }, [productDataAdded]);

  useEffect(() => {
    if (productDataUpdated) {
      handleGetProductList();
      setProductDataUpdated(false);
    }
  }, [productDataUpdated]);

  useEffect(() => {
    if (productDataDeleted) {
      handleGetProductList();
      setProductDataDeleted(false);
    }
  }, [productDataDeleted]);

  // useEffect(() => {
  //   console.log("selectedProductIds: ", selectedProductIds);
  // }, [selectedProductIds]);

  // handle get product list
  const handleGetProductList = () => {
    dispatch(
      getProductList({
        skip: PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE * (page - 1),
        take: PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE,
      })
    );
  };

  return (
    <div className="w-full">
      <div className="pt-4">
        <h1>Product List</h1>
        <hr />
      </div>
      {/* table section */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <>
                <th scope="col" className="px-2 py-3">
                  <Checkbox
                    checked={selectAllCheckState}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectAllCheckState(true);

                        setSelectedProductIds(
                          Array.from(
                            new Set([
                              ...selectedProductIds,
                              ...productList.map((obj: any) => obj.id),
                            ])
                          )
                        );
                      } else {
                        setSelectAllCheckState(false);
                        setSelectedProductIds(
                          selectedProductIds.filter(
                            (el: any) =>
                              !productList
                                .map((obj: any) => obj.id)
                                .includes(el)
                          )
                        );
                      }
                    }}
                  />
                </th>

                {[
                  "Product name",
                  "Category ID",
                  "Category Name",
                  "Unit Price",
                  "Status",
                  "Available Since",
                ].map((each, k) => (
                  <th scope="col" className="px-2 py-3" key={k}>
                    {each}
                  </th>
                ))}
              </>
            </tr>
          </thead>
          <tbody className="[&>*:nth-child(odd)]:bg-gray-100">
            {productTableList.length &&
              productTableList.map((eachObj: any, objKey: number) => (
                <tr className="border-b" key={objKey}>
                  {Object.keys(eachObj).length
                    ? Object.keys(eachObj).map((each: any, k: number) => (
                        <td className="px-2 py-4" key={k}>
                          {each === "id" ? (
                            <Checkbox
                              checked={selectedProductIds.includes(
                                eachObj[each]
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedProductIds([
                                    ...selectedProductIds,
                                    eachObj[each],
                                  ]);
                                } else {
                                  setSelectedProductIds(
                                    selectedProductIds.filter(
                                      (id: any) => id !== eachObj[each]
                                    )
                                  );
                                }
                              }}
                            />
                          ) : each === "nameObj" ? (
                            <Button
                              className="border-none text-left !p-0"
                              style="link"
                              onClick={() => {
                                setProductDataToUpdate(
                                  productList.find(
                                    (obj: any) => obj.id === eachObj[each].id
                                  )
                                );
                                setUpdateProductModalIsOpen(true);
                              }}
                            >
                              {eachObj[each].name.length > 60
                                ? `${eachObj[each].name.slice(0, 60)}...`
                                : eachObj[each].name}
                            </Button>
                          ) : (
                            eachObj[each]
                          )}
                        </td>
                      ))
                    : "--"}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination section */}
      <div className="mt-4 flex">
        <div className="h-8 pt-1.5 text-gray-500 w-32">
          {totalProducts
            ? (page - 1) * PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE + 1
            : 0}{" "}
          -{" "}
          {totalProducts
            ? page * PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE > totalProducts
              ? totalProducts
              : page * PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE
            : 0}{" "}
          OF {totalProducts}
        </div>
        <div className="flex ml-1">
          <div>
            <Button
              type="button"
              className="!px-2"
              style="link"
              disabled={page <= 1 ? true : false}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            </Button>
          </div>
          <div>
            <Button
              type="button"
              className="!px-2 ml-2.5"
              style="link"
              disabled={
                !totalProducts ||
                totalProducts <= page * PRODUCT_LIST_DEFAULT_TAKE_PER_PAGE
                  ? true
                  : false
              }
              onClick={() => setPage(page + 1)}
            >
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* primary buttons section */}
      <div className="mt-7 flex">
        <div>
          <Button
            type="button"
            onClick={() => {
              setAddProductModalIsOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>
        <div className="ml-5">
          <Button
            type="button"
            onClick={() => {
              selectedProductIds.length && setDeleteProductModalIsOpen(true);
            }}
          >
            Delete Products
          </Button>
        </div>
      </div>

      {/* modals */}
      <AddProductComponent
        setProductDataAdded={setProductDataAdded}
        addProductModalIsOpen={addProductModalIsOpen}
        setAddProductModalIsOpen={setAddProductModalIsOpen}
      />

      <UpdateProductComponent
        productDataToUpdate={productDataToUpdate}
        setProductDataUpdated={setProductDataUpdated}
        updateProductModalIsOpen={updateProductModalIsOpen}
        setUpdateProductModalIsOpen={setUpdateProductModalIsOpen}
      />

      <DeleteProductComponent
        selectedProductIds={selectedProductIds}
        setProductDataDeleted={setProductDataDeleted}
        deleteProductModalIsOpen={deleteProductModalIsOpen}
        setDeleteProductModalIsOpen={setDeleteProductModalIsOpen}
      />
    </div>
  );
}

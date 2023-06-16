import ErrorMessageList from "@/shared/components/error-message-list";
import Button from "@/shared/components/form/button";
import InputText from "@/shared/components/form/input-text";
import Select from "@/shared/components/form/select";
import HelperMsg from "@/shared/components/msg/helper-msg";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_STATUS,
} from "@/shared/constants/product";
import { setTopBarMsg } from "@/store/reducers/misc.reducer";
import { updateProduct } from "@/store/reducers/product-slice.reducer";
import { Dialog } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function UpdateProductComponent({
  productDataToUpdate,
  updateProductModalIsOpen,
  setProductDataUpdated,
  setUpdateProductModalIsOpen,
}: {
  productDataToUpdate: any;
  setProductDataUpdated: (updated: boolean) => void;
  updateProductModalIsOpen: boolean;
  setUpdateProductModalIsOpen: (isOpen: boolean) => void;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { updateProductData } = useSelector((state: any) => state.product);
  const [productNameErrorMsg, setProductNameErrorMsg] = useState<string>("");
  const [priceErrorMsg, setPriceErrorMsg] = useState<string>("");
  const [generalErrorMsg, setGeneralErrorMsg] = useState<[]>([]);
  const [showGeneralErrorMsg, setShowGeneralErrorMsg] =
    useState<boolean>(false);
  const [updateButtonDisabled, setUpdateButtonDisabled] =
    useState<boolean>(false);
  const [allowSetTopBarMsg, setAllowSetTopBarMsg] = useState<boolean>(false);

  // handle update product response
  useEffect(() => {
    setUpdateButtonDisabled(false);

    if (updateProductData.success && allowSetTopBarMsg) {
      setUpdateProductModalIsOpen(false);
      setProductDataUpdated(true);

      const msgType = "success";
      const msg = "Product updated successfully";
      dispatch(setTopBarMsg({ msgType, msg, pathname }));
    }

    if (!updateProductData.success && updateProductData.messages) {
      const findMsgByParam = (param: string) => {
        return (
          updateProductData.messages.find((obj: any) => obj.param === param)
            ?.msg || ""
        );
      };

      setProductNameErrorMsg(findMsgByParam("productName"));
      setPriceErrorMsg(findMsgByParam("price"));

      const selectedParams = ["productName", "price"];

      if (showGeneralErrorMsg) {
        setGeneralErrorMsg(
          updateProductData.messages.filter(function (obj: any) {
            return !selectedParams.includes(obj.param);
          })
        );
      }
    }
  }, [updateProductData]);

  // validation
  const validate = (name: string, value: string) => {
    let message = "";

    switch (name) {
      case "productName":
        if (!value) {
          message = "Product name is required";
        } else if (value.length > PRODUCT_NAME_MAX_LENGTH) {
          message = `Product name can be maximum ${PRODUCT_NAME_MAX_LENGTH} characters`;
        }
        setProductNameErrorMsg(message);
        break;
      case "price":
        if (!value) {
          message = "Price is required";
        } else if (
          Number(value) < 0 ||
          (Number(value) !== 0 && isNaN(Number(value)))
        ) {
          message = "Invalid price";
        }
        setPriceErrorMsg(message);
        break;
    }

    const success = message ? false : true;
    return success;
  };

  // handle update product submit
  const handleUpdateProductSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    let validationStatus = true;

    const ct = event.currentTarget;

    const validateData = {
      productName: ct.productName.value,
      price: ct.price.value,
    };

    Object.entries(validateData).map(([k, v]) => {
      const validationStatusEach = validate(k, v);
      validationStatus =
        validationStatusEach && validationStatus ? true : false;
      return validationStatus;
    });

    if (validationStatus) {
      const data = {
        productName: ct.productName.value,
        categoryId: Number(ct.category.value),
        price: Number(ct.price.value),
        statusId: Number(ct.status.value),
      };

      dispatch(updateProduct({ id: productDataToUpdate.id, data }));

      setGeneralErrorMsg([]);
      setShowGeneralErrorMsg(true);
      setUpdateButtonDisabled(true);
      setAllowSetTopBarMsg(true);
    }
  };

  return (
    <Dialog
      open={updateProductModalIsOpen}
      onClose={() => setUpdateProductModalIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto rounded bg-white py-4 px-6 md:px-11 w-full md:w-[500px]">
            <Dialog.Title>
              <div>
                <h2>Update Product</h2>
                <hr />
              </div>
            </Dialog.Title>

            <ErrorMessageList errorMessageList={generalErrorMsg} />

            <form onSubmit={handleUpdateProductSubmit}>
              <div>
                <div className="mb-3 flex-row md:flex">
                  <label
                    htmlFor="productName"
                    className="w-1/4 pt-1.5 pr-2 font-semibold"
                  >
                    Product Name
                  </label>
                  <div className="flex-row md:w-3/4 py-1.5 md:py-0">
                    <InputText
                      name="productName"
                      id="productName"
                      alertType={`${
                        productNameErrorMsg ? "danger" : "default"
                      }`}
                      defaultValue={productDataToUpdate.name}
                      onChange={(e) => validate(e.target.name, e.target.value)}
                    />
                    <HelperMsg
                      alertType={productNameErrorMsg ? "danger" : "default"}
                    >
                      {productNameErrorMsg}
                    </HelperMsg>
                  </div>
                </div>

                <div className="mb-3 flex-row md:flex">
                  <label
                    htmlFor="category"
                    className="w-1/4 pt-1.5 pr-2 font-semibold"
                  >
                    Category
                  </label>
                  <div className="md:w-3/4 py-1.5 md:py-0">
                    <Select
                      name="category"
                      id="category"
                      defaultValue={productDataToUpdate.categoryId}
                      options={PRODUCT_CATEGORIES}
                    />
                  </div>
                </div>

                <div className="mb-3 flex-row md:flex">
                  <label
                    htmlFor="price"
                    className="w-1/4 pt-1.5 pr-2 font-semibold"
                  >
                    Unite Price
                  </label>
                  <div className="flex-row md:w-3/4 py-1.5 md:py-0">
                    <div className="flex">
                      <div className="pt-1 pr-0.5 text-gray-300 font-semibold text-base">
                        $
                      </div>
                      <InputText
                        name="price"
                        id="price"
                        alertType={`${priceErrorMsg ? "danger" : "default"}`}
                        defaultValue={productDataToUpdate.price}
                        onChange={(e) =>
                          validate(e.target.name, e.target.value)
                        }
                        onBlur={(e) => validate(e.target.name, e.target.value)}
                      />
                    </div>
                    <HelperMsg alertType={priceErrorMsg ? "danger" : "default"}>
                      {priceErrorMsg}
                    </HelperMsg>
                  </div>
                </div>

                <div className="mb-3 flex-row md:flex">
                  <label
                    htmlFor="status"
                    className="w-1/4 pt-1.5 pr-2 font-semibold"
                  >
                    Status
                  </label>
                  <div className="md:w-3/4 py-1.5 md:py-0">
                    <Select
                      name="status"
                      id="status"
                      defaultValue={productDataToUpdate.statusId}
                      options={PRODUCT_STATUS}
                    />
                  </div>
                </div>

                <div className="flex pt-2.5 justify-end">
                  <div>
                    <Button disabled={updateButtonDisabled}>Update</Button>
                  </div>
                  <div className="ml-2.5">
                    <Button
                      type="button"
                      className="bg-white hover:!bg-gray-200 !text-gray-800 !border-gray-400"
                      onClick={() => {
                        setUpdateProductModalIsOpen(false);
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

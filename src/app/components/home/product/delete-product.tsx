import ErrorMessageList from "@/shared/components/error-message-list";
import Button from "@/shared/components/form/button";
import { setTopBarMsg } from "@/store/reducers/misc.reducer";
import { deleteProduct } from "@/store/reducers/product-slice.reducer";
import { Dialog } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function DeleteProductComponent({
  selectedProductIds,
  setProductDataDeleted,
  deleteProductModalIsOpen,
  setDeleteProductModalIsOpen,
}: {
  selectedProductIds: number[];
  setProductDataDeleted: (deleted: boolean) => void;
  deleteProductModalIsOpen: boolean;
  setDeleteProductModalIsOpen: (isOpen: boolean) => void;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { deleteProductData } = useSelector((state: any) => state.product);
  const [productNameErrorMsg, setProductNameErrorMsg] = useState<string>("");
  const [generalErrorMsg, setGeneralErrorMsg] = useState<[]>([]);
  const [showGeneralErrorMsg, setShowGeneralErrorMsg] =
    useState<boolean>(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] =
    useState<boolean>(false);
  const [allowSetTopBarMsg, setAllowSetTopBarMsg] = useState<boolean>(false);

  // handle delete product response
  useEffect(() => {
    setDeleteButtonDisabled(false);

    if (deleteProductData.success && allowSetTopBarMsg) {
      setDeleteProductModalIsOpen(false);
      setProductDataDeleted(true);

      const msgType = "success";
      const msg = `${selectedProductIds.length} ${
        selectedProductIds.length > 1 ? "products" : "product"
      } deleted successfully`;
      dispatch(setTopBarMsg({ msgType, msg, pathname }));
    }

    if (!deleteProductData.success && deleteProductData.messages) {
      const findMsgByParam = (param: string) => {
        return (
          deleteProductData.messages.find((obj: any) => obj.param === param)
            ?.msg || ""
        );
      };

      if (showGeneralErrorMsg) {
        setGeneralErrorMsg(deleteProductData.messages);
      }
    }
  }, [deleteProductData]);

  // handle delete product
  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ productIds: selectedProductIds }));

    setGeneralErrorMsg([]);
    setShowGeneralErrorMsg(true);
    setDeleteButtonDisabled(true);
    setAllowSetTopBarMsg(true);
  };

  return (
    <Dialog
      open={deleteProductModalIsOpen}
      onClose={() => setDeleteProductModalIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto rounded bg-white py-4 px-6 md:px-11 w-full md:w-[500px]">
            <Dialog.Title>
              <div>
                <h2>Delete Product</h2>
                <hr />
              </div>
            </Dialog.Title>

            <ErrorMessageList errorMessageList={generalErrorMsg} />

            <div className="mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedProductIds.length}</span>{" "}
              {selectedProductIds.length > 1 ? "products" : "product"}?
            </div>

            <div className="flex pt-2.5 justify-end">
              <div>
                <Button
                  disabled={deleteButtonDisabled}
                  onClick={handleDeleteProduct}
                >
                  Delete
                </Button>
              </div>
              <div className="ml-2.5">
                <Button
                  type="button"
                  className="bg-white hover:!bg-gray-200 !text-gray-800 !border-gray-400"
                  onClick={() => {
                    setDeleteProductModalIsOpen(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

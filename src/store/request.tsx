import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

// requests
export default function request(
  endpoint: string,
  method: string,
  payloadType?: "params" | "data",
  payload?: any,
  onUploadProgress?: (progressEvent: any) => void
): any {
  const req: any = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_PATH}/${endpoint}`,
    headers: {
      Authorization: String(
        `Bearer ${
          getCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`) || ""
        }`
      ),
    },
  };

  if (payloadType && payload) {
    if (payloadType === "params") {
      req.params = payload;
    } else {
      req.data = payload;
    }
  }

  if (onUploadProgress) {
    req.onUploadProgress = onUploadProgress;
  }

  return axios
    .request(req)
    .then((response: any) => {
      return filterSuccessResponse(response);
    })
    .catch((error) => {
      if (error.response.data?.message?.param === "logout") {
        deleteCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`);
        deleteCookie(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}rt`);
        window.location.reload();
      }
      return filterErrorResponse(error.response);
    });
}

// filter success response
function filterSuccessResponse(response: any) {
  const success = response.data?.success || true;
  const status = response.status || 200;
  const messages = messageFormatter(response.data, status);
  const data = response.data?.data || {};

  return { success, status, messages, data };
}

// filter error response
function filterErrorResponse(response: any) {
  const success = response?.data?.success || false;
  const status = response?.status || 400;
  const messages = messageFormatter(response?.data, status);
  const data = response?.data?.data || {};

  return { success, status, messages, data };
}

function messageFormatter(responseData: any, status: number) {
  let messages = responseData?.messages || [];

  if (!responseData?.success && !messages.length) {
    const statusCode = status ? `(status: ${status})` : "";
    messages = [{ msg: `Something went wrong ${statusCode}` }];
  }

  return messages;
}

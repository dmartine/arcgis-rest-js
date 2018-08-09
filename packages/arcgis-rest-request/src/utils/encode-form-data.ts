/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

import { processParams, requiresFormData } from "./process-params";
import { encodeQueryString } from "./encode-query-string";
/**
 * Encodes parameters in a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object in browsers or in a [FormData](https://github.com/form-data/form-data) in Node.js
 *
 * @param params An object to be encoded.
 * @returns The complete [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
 */
export function encodeFormData(params: any): FormData | string {
  const useFormData = requiresFormData(params);
  const newParams = processParams(params);
  if (useFormData) {
    const formData = new FormData();
    Object.keys(newParams).forEach((key: any) => {
      if (typeof File !== "undefined" && newParams[key] instanceof File) {
        // Pass on the file's name to override defaults such as "blob"
        formData.append(key, newParams[key], newParams[key].name);
      } else if (
        typeof Blob !== "undefined" &&
        newParams[key] instanceof Blob
      ) {
        // Pass on the key as the file name to override defaults such as "blob"
        formData.append(key, newParams[key], key);
      } else {
        formData.append(key, newParams[key]);
      }
    });
    return formData;
  } else {
    return encodeQueryString(params);
  }
}

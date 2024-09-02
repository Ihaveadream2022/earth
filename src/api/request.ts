import requestBase from "./requestBase";
import { RequestResponse, RequestItemParams, RequestItemData, RequestItemDataDelete } from "../types";

export const itemList = (params: RequestItemParams): Promise<RequestResponse> =>
    requestBase.request({
        method: "get",
        url: "/items",
        params: params,
    });
export const itemAdd = (data: RequestItemData): Promise<RequestResponse> =>
    requestBase.request({
        method: "post",
        url: "/items",
        data: data,
    });

export const itemEdit = (data: RequestItemData): Promise<RequestResponse> => {
    return requestBase.request({
        method: "put",
        url: "/items/" + data.id,
        data: data,
    });
};
export const itemDelete = (data: RequestItemDataDelete): Promise<RequestResponse> =>
    requestBase.request({
        method: "delete",
        url: "/items/" + data.id,
    });

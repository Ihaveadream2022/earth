/* OAuth */
interface RequestResponse {
    code: number;
    message: string;
    data: any;
}
interface RequestOAuthLoginParams {
    username: string;
    password: string;
    code: number;
    uuid: string;
}
interface RequestOAuthUpdatePasswordData {
    oldPassword: string;
    newPassword: string;
}
export type { RequestResponse, RequestOAuthLoginParams, RequestOAuthUpdatePasswordData };
/* OAuth */

/* Item */
interface RequestItemParams {
    pageSize: number;
    pageNo: number;
    keyword?: string;
}
interface RequestItemData {
    id?: number | null;
    name: string;
    common?: string;
    verb?: string;
    noun?: string;
    adjective?: string;
    adverb?: string;
    conjunction?: string;
    preposition?: string;
}
interface RequestItemDataDelete {
    id: number | null;
}
export type { RequestItemParams, RequestItemData, RequestItemDataDelete };
/* Item */

/* Store */
interface StoreReducerStateAuth {
    ACCESS_TOKEN: string | undefined;
}
interface StoreReducerStateCollapse {
    isCollapse: boolean;
}
interface StoreReducerStateCounter {
    value: number;
}
export type { StoreReducerStateAuth, StoreReducerStateCollapse, StoreReducerStateCounter };
/* Store */

export var __esModule: boolean;
export default userApi;
declare namespace userApi {
    export { login };
    export { queryMe };
    export { update };
    export { logout };
    export { create };
    export { remove };
}
declare function login(data: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function queryMe(): Promise<import("axios").AxiosResponse<any, any>>;
declare function update(data: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function logout(): Promise<import("axios").AxiosResponse<any, any>>;
declare function create(data: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function remove(data: any): Promise<import("axios").AxiosResponse<any, any>>;

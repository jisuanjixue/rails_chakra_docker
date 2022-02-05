export var __esModule: boolean;
export default categoriesApi;
declare namespace categoriesApi {
    export { list };
    export { create };
    export { update };
    export { remove };
}
declare function list(): Promise<import("axios").AxiosResponse<any, any>>;
declare function create(data: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function update(payload: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function remove(id: any): Promise<import("axios").AxiosResponse<any, any>>;

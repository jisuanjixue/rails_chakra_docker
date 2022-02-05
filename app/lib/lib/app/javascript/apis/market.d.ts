export var __esModule: boolean;
export default marketApi;
declare namespace marketApi {
    export { update };
    export { list };
    export { create };
    export { remove };
}
declare function update(payload: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function list(): Promise<import("axios").AxiosResponse<any, any>>;
declare function create(data: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function remove(id: any): Promise<import("axios").AxiosResponse<any, any>>;

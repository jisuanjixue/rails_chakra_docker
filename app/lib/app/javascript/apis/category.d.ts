declare const categoriesApi: {
    list: () => Promise<import("axios").AxiosResponse<any, any>>;
    create: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
    update: (payload: any) => Promise<import("axios").AxiosResponse<any, any>>;
    remove: (id: any) => Promise<import("axios").AxiosResponse<any, any>>;
};
export default categoriesApi;

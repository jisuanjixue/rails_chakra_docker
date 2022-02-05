declare const marketApi: {
    update: (payload: any) => Promise<import("axios").AxiosResponse<any, any>>;
    list: () => Promise<import("axios").AxiosResponse<any, any>>;
    create: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
    remove: (id: any) => Promise<import("axios").AxiosResponse<any, any>>;
};
export default marketApi;

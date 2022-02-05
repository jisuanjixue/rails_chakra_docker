declare const userApi: {
    login: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
    queryMe: () => Promise<import("axios").AxiosResponse<any, any>>;
    update: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
    logout: () => Promise<import("axios").AxiosResponse<any, any>>;
    create: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
    remove: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
};
export default userApi;

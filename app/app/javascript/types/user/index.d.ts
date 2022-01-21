interface UserRegister {
    name: string;
    email: string;
    password: string;
}
interface UserLogin {
    login: string;
    password: string;
    password_confirmation: string;
}
interface UserInfo {
    id: string;
    name: string;
    email: string;
}

export { UserRegister, UserLogin, UserInfo  }
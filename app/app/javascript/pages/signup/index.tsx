import React, { useState, useCallback } from "react";
import {
  // useQueryClient,
  useMutation,
} from "react-query";
import userApi from "../../apis/user";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../../types/user";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
  });

  const handValue = useCallback(
    e => setUser({ ...user, [e.target.name]: e.target.value }),
    [user.name, user.email, user.password]
  );

  const userRegistration = useMutation(
    (user: UserRegister) => userApi.create(user),
    {
      mutationKey: "userRegistration",
      onSuccess: () => {
        navigate("/");
      },
      onError: (err, variables) => {
        console.log(err, variables);
      },
    }
  );

  const handleSubmit = () => {
    userRegistration.mutate(user);
  };

  return (
    <>
      <div className="flex min-h-screen items-center bg-gray-50">
        <div className="mx-auto h-full max-w-4xl flex-1 rounded-lg bg-white shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                className="h-full w-full object-cover"
                src="https://source.unsplash.com/user/erondu/1600x900"
                alt="img"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <h1 className="mb-4 text-center text-2xl font-bold text-gray-700">
                  注册
                </h1>
                <div>
                  <label className="block text-sm">昵称</label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Name"
                    value={user.name}
                    name="name"
                    onChange={e => handValue(e)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">电子邮件</label>
                  <input
                    type="email"
                    className="w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Email Address"
                    value={user.email}
                    name="email"
                    onChange={e => handValue(e)}
                  />
                </div>
                <div>
                  <label className="mt-4 block text-sm">密码</label>
                  <input
                    className="w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Password"
                    type="password"
                    value={user.password}
                    name="password"
                    onChange={e => handValue(e)}
                  />
                </div>
                <button
                  className="focus:shadow-outline-blue mt-4 block w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600"
                  onClick={() => handleSubmit()}
                >
                  注册
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

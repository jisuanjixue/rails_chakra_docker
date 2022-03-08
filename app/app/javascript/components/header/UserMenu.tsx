import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Link, useHistory } from "react-router-dom";
import Transition from "../../utils/Transition";
import { UserContext } from "../../controllers/ContextManager";
import userApi from "../../apis/user";
import { UserInfo } from "../../types/user";
import { useMutation, useQueryClient } from "react-query";

const UserMenu = (props = {}) => {
  const queryClient = useQueryClient();
  const navigate = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState(state.user);

  const trigger: any = useRef(null);
  const dropdown: any = useRef(null);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const logoutUser = useMutation(() => userApi.logout(), {
    onSuccess: data => {
      if (data.status === 200) {
        navigate.push("/");
        localStorage.removeItem("token");
      }
    },
  });

  const handOut = () => {
    logoutUser.mutate();
    setDropdownOpen(!dropdownOpen);
  };

  const handEditUser = () => {
    setIsShow(true);
    setDropdownOpen(!dropdownOpen);
  };

  const handValue = useCallback(
    e => setUser({ ...user, name: e.target.value }),
    [user.name, user.id]
  );

  const updateUserInfo = useMutation((user: UserInfo) => userApi.update(user), {
    mutationKey: "editUser",
    onError: (_err, _user, context: any) => {
      queryClient.setQueryData(
        ["currentUser", context.user.id],
        context.previousValue
      );
    },
    // Always refetch after error or success:
    onSettled: (user: any) => {
      queryClient.invalidateQueries(["currentUser", user.id]);
    },
  });

  const onSubmit = () => {
    updateUserInfo.mutate(user, {
      onSuccess: data => {
        console.log(
          "🚀 ~ file: UserMenu.tsx ~ line 94 ~ onSubmit ~ data",
          data
        );
        setIsShow(false);
        dispatch({ type: "updateUser", payload: data });
      },
    });
    if (updateUserInfo.isSuccess) {
      setIsShow(false);
      return (
        <div className="alert alert-success">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            <label>操作成功</label>
          </div>
        </div>
      );
    }

    if (updateUserInfo.isError) {
      <div className="alert alert-error">
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
          </svg>
          <label>操作失败</label>
        </div>
      </div>;
    }
  };

  const onClose = () => {
    setIsShow(false);
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex items-center justify-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" /> */}
        <div className="flex items-center truncate">
          <span className="ml-2 text-sm font-medium truncate group-hover:text-gray-800">
            {user.name}
          </span>
          <svg
            className="w-3 h-3 ml-1 text-gray-400 fill-current shrink-0"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="min-w-44 absolute top-full right-0 z-10 mt-1 origin-top-right overflow-hidden rounded border border-gray-200 bg-white py-1.5 shadow-lg"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        appear={undefined}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="mb-1 border-b border-gray-200 px-3 pt-0.5 pb-2">
            <div className="font-medium text-gray-800">{user.name}</div>
            <div className="text-xs italic text-gray-500">管理员</div>
          </div>
          <ul>
            <li>
              <Link
                className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="/"
                onClick={() => handEditUser()}
              >
                设置
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="/logout"
                onClick={() => handOut()}
              >
                退出
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
      {isShow && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="form-control">
              <label className="label">
                <span className="label-text">请填入用户昵称</span>
              </label>
              <input
                value={user.name}
                id="add"
                onChange={event => handValue(event)}
                type="text"
                placeholder="用户昵称"
                className="input input-bordered"
              />
            </div>
            <div className="modal-action">
              <div className="btn btn-primary" onClick={() => onSubmit()}>
                确定
              </div>
              <div className="btn" onClick={() => onClose()}>
                关闭
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

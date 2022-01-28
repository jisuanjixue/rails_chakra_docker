import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";

function Help() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

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

  return (
    <div className="relative ml-3 inline-flex">
      <button
        ref={trigger}
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition duration-150 hover:bg-gray-200 ${
          dropdownOpen && "bg-gray-200"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Need help?</span>
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current text-gray-500"
            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
          />
        </svg>
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
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="px-4 pt-1.5 pb-2 text-xs font-semibold uppercase text-gray-400">
            Need help?
          </div>
          <ul>
            <li>
              <Link
                className="flex items-center py-1 px-3 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg
                  className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-300"
                  viewBox="0 0 12 12"
                >
                  <rect y="3" width="12" height="9" rx="1" />
                  <path d="M2 0h8v2H2z" />
                </svg>
                <span>Documentation</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center py-1 px-3 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg
                  className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-300"
                  viewBox="0 0 12 12"
                >
                  <path d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM10 7L8.207 5.207l-3 3-1.414-1.414 3-3L5 2h5v5z" />
                </svg>
                <span>Support Site</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center py-1 px-3 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg
                  className="mr-2 h-3 w-3 shrink-0 fill-current text-indigo-300"
                  viewBox="0 0 12 12"
                >
                  <path d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z" />
                </svg>
                <span>Contact us</span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default Help;

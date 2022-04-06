import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";

function Notifications() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger: any = useRef(null);
  const dropdown: any = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) {
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
    <div className="relative inline-flex ml-3">
      <button
        ref={trigger}
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition duration-150 hover:bg-gray-200 ${dropdownOpen && "bg-gray-200"}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path className="text-gray-500 fill-current" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" />
          <path
            className="text-gray-400 fill-current"
            d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
          />
        </svg>
        <div className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></div>
      </button>

      <Transition
        className="min-w-80 absolute top-full right-0 z-10 -mr-48 mt-1 origin-top-right overflow-hidden rounded border border-gray-200 bg-white py-1.5 shadow-lg sm:mr-0"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        appear={undefined}
      >
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          <div className="px-4 pt-1.5 pb-2 text-xs font-semibold uppercase text-gray-400">Notifications</div>
          <ul>
            <li className="border-b border-gray-200 last:border-0">
              <Link className="block px-4 py-2 hover:bg-gray-50" to="#0" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className="block mb-2 text-sm">
                  📣 <span className="font-medium text-gray-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400">Feb 12, 2021</span>
              </Link>
            </li>
            <li className="border-b border-gray-200 last:border-0">
              <Link className="block px-4 py-2 hover:bg-gray-50" to="#0" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className="block mb-2 text-sm">
                  📣 <span className="font-medium text-gray-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400">Feb 9, 2021</span>
              </Link>
            </li>
            <li className="border-b border-gray-200 last:border-0">
              <Link className="block px-4 py-2 hover:bg-gray-50" to="#0" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className="block mb-2 text-sm">
                  🚀
                  <span className="font-medium text-gray-800">Say goodbye to paper receipts!</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400">Jan 24, 2020</span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default Notifications;

import React, { useState, useRef, useEffect } from "react";
import Transition from "../../utils/Transition.js";

function FilterButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger: any = useRef(null);
  const dropdown: any = useRef(null);

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
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className="min-w-56 absolute top-full left-0 right-auto z-10 mt-1 origin-top-right overflow-hidden rounded border border-gray-200 bg-white pt-1.5 shadow-lg md:left-auto md:right-0"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        appear={undefined}
      >
        <div ref={dropdown}>
          <div className="px-4 pt-1.5 pb-2 text-xs font-semibold uppercase text-gray-400">
            Filters
          </div>
          <ul className="mb-4">
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm font-medium">
                  Direct VS Indirect
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm font-medium">
                  Real Time Value
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm font-medium">Top Channels</span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm font-medium">
                  Sales VS Refunds
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm font-medium">Last Order</span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm font-medium">Total Spent</span>
              </label>
            </li>
          </ul>
          <div className="border-t border-gray-200 bg-gray-50 px-3 py-2">
            <ul className="flex items-center justify-between">
              <li>
                <button className="btn-xs border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-600">
                  Clear
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-indigo-500 text-white hover:bg-indigo-600"
                  onClick={() => setDropdownOpen(false)}
                  onBlur={() => setDropdownOpen(false)}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default FilterButton;

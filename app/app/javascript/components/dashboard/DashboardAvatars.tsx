import React from 'react';
import { Link } from 'react-router-dom';

function DashboardAvatars() {
  return (
    <ul className="flex flex-wrap justify-center mb-8 -ml-px -space-x-3 sm:justify-start sm:mb-0">
      <li>
        <Link className="block" to="#0">
          <img className="rounded-full w-9 h-9 bg-user"  width="36" height="36" alt="User 01" />
        </Link>
      </li>
      <li>
        <Link className="block" to="#0">
          <img className="rounded-full w-9 h-9 bg-user" width="36" height="36" alt="User 02" />
        </Link>
      </li>
      <li>
        <Link className="block" to="#0">
          <img className="rounded-full w-9 h-9 bg-user" width="36" height="36" alt="User 03" />
        </Link>
      </li>
      <li>
        <Link className="block" to="#0">
          <img className="rounded-full w-9 h-9 bg-user" width="36" height="36" alt="User 04" />
        </Link>
      </li>
      <li>
        <button className="flex items-center justify-center ml-2 text-indigo-500 transition duration-150 bg-white border border-gray-200 rounded-full shadow-sm w-9 h-9 hover:border-gray-300">
          <span className="sr-only">Add new user</span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
        </button>
      </li>
    </ul>
  );
}

export default DashboardAvatars;

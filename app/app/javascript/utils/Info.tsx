import React, { useState } from "react";
import Transition from "./Transition";

function Info({ children, className, containerClassName }) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setInfoOpen(true)}
      onMouseLeave={() => setInfoOpen(false)}
      onFocus={() => setInfoOpen(true)}
      onBlur={() => setInfoOpen(false)}
    >
      <button
        className="block"
        aria-haspopup="true"
        aria-expanded={infoOpen}
        onClick={e => e.preventDefault()}
      >
        <svg className="h-4 w-4 fill-current text-gray-400" viewBox="0 0 16 16">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
        </svg>
      </button>
      <div className="absolute bottom-full left-1/2 z-10 -translate-x-1/2 transform">
        <Transition
          show={infoOpen}
          tag="div"
          className={`mb-2 overflow-hidden rounded border border-gray-200 bg-white p-3 shadow-lg ${containerClassName}`}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
          appear={undefined}
        >
          {children}
        </Transition>
      </div>
    </div>
  );
}

export default Info;

import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "./utils";

export function Button({ children, className, ...rest }) {
  return (
    <Link
      className={classNames(
        "flex justify-center items-center",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

export default function StorageApp() {
  return <Outlet />;
}

StorageApp.propTypes = {};

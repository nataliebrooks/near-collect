import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

export default function VendorApp() {
  return <Outlet />;
}

VendorApp.propTypes = {};
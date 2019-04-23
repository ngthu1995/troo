import React from "react";
import UserLayout from "../../../hoc/user";
import ManageBrands from "./manage_brands";
import ManageLifestyles from "./manage_lifestyles";

const ManageCategories = () => {
  return (
    <UserLayout>
      <ManageBrands />
      <ManageLifestyles />
    </UserLayout>
  );
};

export default ManageCategories;

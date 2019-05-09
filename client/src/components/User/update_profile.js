import React from "react";
import UserLayout from "../../hoc/user";
import UpdatePersonalNfo from "./update_personal_nfo";

const UpdateProfile = () => {
  return (
    <UserLayout>
      <UpdatePersonalNfo>
        <h1>Profile</h1>
      </UpdatePersonalNfo>
    </UserLayout>
  );
};

export default UpdateProfile;

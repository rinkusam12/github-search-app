import React from "react";
import { AllUsersModel } from "../../lib/AllUsersModel";
import User from "./User";

const Users: React.FC<{ lists: AllUsersModel["search"]["nodes"] }> = (
  props
) => {
  return (
    <div>
      {props?.lists?.map((l, i) => (
        <User {...l} key={i} />
      ))}
    </div>
  );
};

export default Users;

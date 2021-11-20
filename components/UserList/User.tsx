import Image from "next/image";
import React from "react";
import { User } from "../../lib/AllUsersModel";
import Link from "next/link";
const User: React.FC<User> = (props) => {
  return (
    <Link href={`/user/${props.login}`}>
      <a className="border-t-1 border-b-1 border-purple-600 my-9 flex gap-3 items-center cursor-pointer hover:bg-purple-300 hover:text-white transition-all duration-300 ease-out">
        {props.avatarUrl && (
          <Image
            layout="fixed"
            width={100}
            height={100}
            unoptimized
            src={props.avatarUrl}
            alt={props.name}
          />
        )}
        <div>
          <h3>{props.login}</h3>
          <p>
            <a href={props.url}>{props.url}</a>
          </p>
        </div>
      </a>
    </Link>
  );
};

export default User;

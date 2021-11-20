import React, { useState } from "react";
import { User } from "../../lib/AllUsersModel";
import { searchUser } from "../../lib/gitApi";
import Input from "../Input";
import Users from "../UserList/Users";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<User[]>();
  const [hasNext, setHasNext] = useState(false);
  const [afterCursor, setAfterCursor] = useState<string>();

  const fetchUsers = async (newFetch?: boolean) => {
    let users;
    if (newFetch) {
      users = await searchUser(query);
      setUserList(users.search.nodes);
    } else {
      users = await searchUser(query, afterCursor);
      setUserList([...userList, ...users.search.nodes]);
    }
    setHasNext(users.search.pageInfo.hasNextPage);
    setAfterCursor(users.search.pageInfo.endCursor);
    setLoading(false);
  };

  return (
    <div className="border-1 border-purple-600 mt-4">
      <div className="max-w-lg mx-auto py-9">
        <Input
          label="Type user name and press enter to search"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          hideLabel
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              fetchUsers(true);
            }
          }}
        />
      </div>
      <Users lists={userList} />
      {hasNext && (
        <div className="text-center">
          <button
            className="border-1 border-purple-600 px-5 py-3 my-4 hover:text-white hover:bg-purple-600"
            onClick={() => {
              setLoading(true);
              hasNext && fetchUsers();
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchUser;

import React, { useEffect, useState } from "react";
import { useContributor } from "../../context/contributorContext";
import { User } from "../../lib/AllUsersModel";
import { getAllContributers } from "../../lib/gitApi";
import Input from "../Input";
import Loader from "../Loader/Loader";
import Users from "../UserList/Users";

const Contributors = () => {
  const [query, setQuery] = useState("");
  const { repo, setRepo, userList, setUserList } = useContributor();
  let lo = userList && userList?.length === 0 && !!repo;
  const [filterUserList, setFilterUserList] = useState<User[]>(userList);
  const [loading, setLoading] = useState(lo);
  useEffect(() => {
    if (lo) {
      (async () => {
        const data = await getAllContributers(repo.owner.login, repo.name);
        let a: User[] = data.data.map((u) => {
          return {
            avatarUrl: u.avatar_url,
            login: u.login,
            name: u.login,
            url: u.html_url,
          };
        });
        if (data.headers.link) {
          let t = data.headers.link.split(",");
          let last = t[1].split(";")[0].replace("<", "").replace(">", "");
          let totalPage = +last.split("&page=")[1];
          for (let i = 2; i <= totalPage; i++) {
            let d = await getAllContributers(repo.owner.login, repo.name, i);
            let c: User[] = d.data.map((u) => {
              return {
                avatarUrl: u.avatar_url,
                login: u.login,
                name: "",
                url: u.html_url,
              };
            });
            a.push(...c);
          }
        }

        setUserList(a);
        setFilterUserList(a);
        setLoading(false);
      })();
    }
  }, []);

  if (!repo)
    return (
      <div className="border-1 border-purple-600 mt-4 h-56 place-items-center grid">
        No repository selected. Use search repository tab to search and select
        repository find its contributor.
      </div>
    );
  console.log(userList.length);

  return (
    <div className="border-1 border-purple-600 mt-4">
      {loading && (
        <div className="text-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          <div className="max-w-lg mx-auto py-9">
            <Input
              label="Type contributor username and press enter to search"
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              hideLabel
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  if (query) {
                    let ft = userList.filter((c) => c.login.includes(query));
                    setFilterUserList(ft);
                  } else {
                    setFilterUserList(userList);
                  }
                }
              }}
            />
          </div>
          <div className="px-5">
            <p>Repository: {repo.name}</p>
            <p>Repository Owner: {repo.owner.login}</p>
            <p>
              Repository URL:{" "}
              <a href={repo.url} target="_blank">
                {repo.url}
              </a>{" "}
            </p>
            <p>Total Contributer: {userList.length}</p>
          </div>
          <Users lists={filterUserList} />{" "}
        </>
      )}
    </div>
  );
};

export default Contributors;

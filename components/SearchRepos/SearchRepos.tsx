import React, { useState } from "react";
import { User } from "../../lib/AllUsersModel";
import { searchRepos, searchUser } from "../../lib/gitApi";
import { SearchRepoModel, Repo } from "../../lib/SearchRepoModel";
import Input from "../Input";
import Repos from "../RepoList/Repos";
import Users from "../UserList/Users";

const SearchRepos = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoList, setRepoList] = useState<Repo[]>();
  const [hasNext, setHasNext] = useState(false);
  const [afterCursor, setAfterCursor] = useState<string>();

  const fetchRepos = async (newFetch?: boolean) => {
    let repos: SearchRepoModel;
    if (newFetch) {
        
      repos = await searchRepos(query);
      console.log(repos);
      
      setRepoList(repos.search.nodes);
    } else {
      repos = await searchRepos(query, afterCursor);
      setRepoList([...repoList, ...repos.search.nodes]);
    }
    setHasNext(repos.search.pageInfo.hasNextPage);
    setAfterCursor(repos.search.pageInfo.endCursor);
    setLoading(false);
  };

  return (
    <div className="border-1 border-purple-600 mt-4">
      <div className="max-w-lg mx-auto py-9">
        <Input
          label="Type repository name and press enter to search"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          hideLabel
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              fetchRepos(true);
            }
          }}
        />
      </div>
          <Repos list={repoList} />
      {hasNext && (
        <div className="text-center">
          <button
            className="border-1 border-purple-600 px-5 py-3 my-4 hover:text-white hover:bg-purple-600"
            onClick={() => {
              setLoading(true);
              hasNext && fetchRepos();
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchRepos;

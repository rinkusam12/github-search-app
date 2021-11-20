import React from "react";
import { useContributor } from "../../context/contributorContext";
import { Repo } from "../../lib/SearchRepoModel";
import Link from 'next/link';
const RepoComponent: React.FC<Repo> = (props) => {
  const { setRepo, setUserList } = useContributor();
  return (
    <div className="border-t-1 border-b-1 border-purple-600 my-9 py-10 px-5 flex justify-between gap-3 items-center cursor-pointer hover:bg-purple-300 hover:text-white transition-all duration-300 ease-out">
      <div>
        <h3>Name: {props.name}</h3>
        <p>Owner: {props.owner.login}</p>
        <p>
          <a href={props.url}>{props.url}</a>
        </p>
      </div>
      <div>
          <Link href={`/repo/${props.owner.login}/${props.name}`}>
        <a
        
            className="border-1 border-black px-5 py-4 hover:bg-gray-500 hover:border-none"
        >
          Search contributors for this repository.
        </a>
            </Link>
      </div>
    </div>
  );
};

export default RepoComponent;

import React, { useContext, useState } from "react";
import { User } from "../lib/AllUsersModel";
import { Repo } from "../lib/SearchRepoModel";

export const ContributerContext = React.createContext<{
  repo: Repo;
  setRepo: React.Dispatch<React.SetStateAction<Repo>>;
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
}>(null);

const ContributerProvider: React.FC = (props) => {
  const [repo, setRepo] = useState<Repo>(null);
  const [userList, setUserList] = useState<User[]>();

  return (
    <ContributerContext.Provider
      value={{ repo, setRepo, userList, setUserList }}
    >
      {props.children}
    </ContributerContext.Provider>
  );
};

export default ContributerProvider;

export function useContributor() {
  const { repo, setRepo, userList, setUserList } =
    useContext(ContributerContext);
  return { repo, setRepo, userList, setUserList };
}

import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Contributors from "../../../components/Contributors/Contributors";
import { useContributor } from "../../../context/contributorContext";
import { getRepoDetails } from "../../../lib/gitApi";
import { RepoDetailModel } from "../../../lib/RepoDetailModel";

const ReposInfo: React.FC<{ repo: RepoDetailModel }> = (props) => {
  const [render, setRender] = useState(false);
  const { setRepo, setUserList } = useContributor();
  useEffect(() => {
    setUserList([]);
    setRepo({
      name: props.repo.repository.name,
      owner: props.repo.repository.owner,
      url: props.repo.repository.url,
    });
    setRender(true);
  }, []);
  return (
    <div>
      <a className="py-4 block px-5" href="/">Back to homepage</a>
      <div className="border-1 border-purple-600 text-center">
        <h1 className="text-3xl py-4">
          Repository Name: {props.repo.repository.name}
        </h1>
        <p className="text-sm py-4">
          Organization: {props.repo.repository.owner.login}
        </p>
        <p className="text-sm py-4">
          Repository URL:{" "}
          <a href={props.repo.repository.url}>{props.repo.repository.url}</a>{" "}
        </p>
        <p>
          <img
            width="100px"
            height="100px"
            className="mx-auto py-4"
            src={props.repo.repository.openGraphImageUrl}
            alt={props.repo.repository.name}
          />
        </p>
      </div>
      {render && <Contributors />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let name = ctx.params.name as string;
  let owner = ctx.params.owner as string;
  const repo = await getRepoDetails(name, owner);
  return {
    props: {
      repo,
    },
  };
};

export default ReposInfo;
